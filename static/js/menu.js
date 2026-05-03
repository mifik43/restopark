// static/js/menu.js — универсальная версия с поддержкой любых подгрупп
const SHOW_NUTRITION = false;
const SHOW_WEIGHT = false;
const USE_DISH_IMAGES = true;
const SHOW_ALCOHOL_CONTENT = true;

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let menuData = {};
let currentSubgroupId = null;

// ---------- Загрузка данных с сервера ----------
async function loadMenuData() {
    const cityId = localStorage.getItem('selectedCityId');
    if (!cityId) return; // страница-заглушка уже показана
    try {
        const response = await fetch(`/api/categories?city_id=${cityId}`);
        const categories = await response.json();
        } catch(error) {
        console.error(error);
    }

        // Построение структуры menuData
        menuData = {};
        const categoryMap = {};

        // Сохраняем все категории в map
        categories.forEach(cat => {
            categoryMap[cat.id] = {
                ...cat,
                items: cat.items || [],
                subgroups: {}
            };
            
            
        });

        // Распределяем подкатегории по родителям
        categories.forEach(cat => {
            if (cat.parent_id) {
                const parent = categoryMap[cat.parent_id];
                if (parent) {
                    if (!parent.subgroups) parent.subgroups = {};
                    parent.subgroups[cat.slug] = {
                        title: cat.name,
                        icon: cat.icon_class || 'fa-glass-whiskey',
                        items: cat.items || []
                    };
                    // Удаляем подкатегорию из корневого списка
                    delete categoryMap[cat.id];
                }
            }
        });

        // Оставшиеся категории — корневые
        Object.values(categoryMap).forEach(cat => {
            menuData[cat.slug] = {
                title: cat.name,
                items: cat.items || []
            };
            if (cat.subgroups && Object.keys(cat.subgroups).length > 0) {
                menuData[cat.slug].subgroups = cat.subgroups;
                menuData[cat.slug].type = 'dropdown';
            }
        });

        console.log('menuData loaded:', menuData); // для отладки

        initNavigation();
        renderMenuSections();
        updateCartCount();
        setupTouchEvents();

        const firstCategory = Object.keys(menuData)[0];
        if (firstCategory) showCategory(firstCategory);
    } catch (error) {
        console.error('Ошибка загрузки меню:', error);
    }
}

// Поиск блюда по ID
function findItemById(itemId) {
    for (const catSlug in menuData) {
        const cat = menuData[catSlug];
        if (cat.subgroups) {
            for (const subSlug in cat.subgroups) {
                const found = cat.subgroups[subSlug].items.find(i => i.id === itemId);
                if (found) return found;
            }
        } else {
            const found = cat.items.find(i => i.id === itemId);
            if (found) return found;
        }
    }
    return null;
}

// ---------- Инициализация страницы ----------
document.addEventListener('DOMContentLoaded', loadMenuData);

// ---------- Навигация и отрисовка ----------
function initNavigation() {
    const categoryNav = document.getElementById('categoryNav');
    const mobileCategories = document.getElementById('mobileCategories');
    categoryNav.innerHTML = '';
    mobileCategories.innerHTML = '';

    Object.keys(menuData).forEach((categoryId, index) => {
        const category = menuData[categoryId];
        
        const desktopLink = document.createElement('a');
        desktopLink.href = '#';
        desktopLink.dataset.category = categoryId;
        desktopLink.textContent = category.title;
        if (index === 0) desktopLink.classList.add('active');
        desktopLink.addEventListener('click', e => {
            e.preventDefault();
            showCategory(categoryId);
            updateActiveNav(categoryId);
        });
        categoryNav.appendChild(desktopLink);

        const mobileLink = document.createElement('a');
        mobileLink.href = '#';
        mobileLink.dataset.category = categoryId;
        mobileLink.textContent = category.title;
        if (index === 0) mobileLink.classList.add('active');
        mobileLink.addEventListener('click', e => {
            e.preventDefault();
            showCategory(categoryId);
            updateActiveNav(categoryId);
            closeMobileNav();
        });
        mobileCategories.appendChild(mobileLink);
    });

    if (window.innerWidth <= 768) initMobileQuickNav();
}

function initMobileQuickNav() {
    const quickNav = document.getElementById('categoryQuickNav');
    quickNav.innerHTML = '';
    Object.keys(menuData).forEach((categoryId, index) => {
        const category = menuData[categoryId];
        const link = document.createElement('a');
        link.href = '#';
        link.dataset.category = categoryId;
        link.textContent = category.title;
        if (index === 0) link.classList.add('active');
        link.addEventListener('click', e => {
            e.preventDefault();
            showCategory(categoryId);
            updateActiveNav(categoryId);
            const element = document.getElementById(`category-${categoryId}`);
            if (element) {
                const offset = 150;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
        quickNav.appendChild(link);
    });
}

function updateActiveNav(categoryId) {
    document.querySelectorAll('.category-nav a, .mobile-categories a, .category-quick-nav a').forEach(a => {
        a.classList.toggle('active', a.dataset.category === categoryId);
    });
}

function showCategory(categoryId) {
    document.querySelectorAll('.category-section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById(`category-${categoryId}`);
    if (section) {
        section.classList.add('active');
        if (window.innerWidth <= 768) {
            setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
        }
    }
}

// ---------- Рендер меню ----------
function renderMenuSections() {
    const menuSections = document.getElementById('menuSections');
    menuSections.innerHTML = '';

    Object.keys(menuData).forEach(categoryId => {
        const category = menuData[categoryId];
        const section = document.createElement('section');
        section.id = `category-${categoryId}`;
        section.className = 'category-section';

        let itemsHTML = '';
        
        if (category.subgroups && Object.keys(category.subgroups).length > 0) {
            // Категория с подгруппами (например, Напитки)
            let tabsHTML = '<div class="drinks-tabs-container"><div class="drinks-tabs">';
            Object.keys(category.subgroups).forEach(subgroupId => {
                const subgroup = category.subgroups[subgroupId];
                const icon = subgroup.icon || 'fa-glass-whiskey';
                tabsHTML += `<div class="drinks-tab" data-subgroup="${subgroupId}"><i class="fas ${icon}"></i>${subgroup.title}</div>`;
            });
            tabsHTML += '</div><div class="drinks-content"><div class="menu-grid" id="subgroupMenuGrid"></div></div></div>';
            
            let totalItems = 0;
            Object.values(category.subgroups).forEach(sub => totalItems += sub.items.length);
            section.innerHTML = `
                <div class="category-title"><h2>${category.title}</h2><span>${totalItems} позиций</span></div>
                ${tabsHTML}
            `;
            
            // Загружаем первую подгруппу
            const firstSub = Object.keys(category.subgroups)[0];
            if (firstSub) {
                setTimeout(() => {
                    loadSubgroupItems(category, firstSub);
                    currentSubgroupId = firstSub;
                    const firstTab = document.querySelector(`.drinks-tab[data-subgroup="${firstSub}"]`);
                    if (firstTab) firstTab.classList.add('active');
                }, 0);
            }
        } else {
            // Обычная категория без подгрупп
            category.items.forEach(item => {
                const cartItem = cart.find(ci => ci.id === item.id);
                itemsHTML += renderMenuItem(item, cartItem ? cartItem.quantity : 0);
            });
            section.innerHTML = `
                <div class="category-title"><h2>${category.title}</h2><span>${category.items.length} позиций</span></div>
                <div class="menu-grid">${itemsHTML}</div>
            `;
        }

        menuSections.appendChild(section);
    });

    setupImageClickHandlers();
    setupAddToCartHandlers();
    setupDrinksTabHandlers();
}

function loadSubgroupItems(category, subgroupId) {
    const grid = document.getElementById('subgroupMenuGrid');
    const subgroup = category.subgroups[subgroupId];
    if (!grid || !subgroup) return;
    
    let html = '';
    subgroup.items.forEach(item => {
        const cartItem = cart.find(ci => ci.id === item.id);
        html += renderMenuItem(item, cartItem ? cartItem.quantity : 0);
    });
    grid.innerHTML = html;
}

function renderMenuItem(item, quantityInCart) {
    const showWeight = SHOW_WEIGHT && item.weight && item.weight.trim() !== '';
    const showVolume = item.volume && item.volume.trim() !== '';
    const showAlcohol = SHOW_ALCOHOL_CONTENT && item.alcohol_content;
    const imagePath = item.image_path ? 
        (item.image_path.startsWith('/') ? item.image_path : '/static/' + item.image_path) : '';
    
    return `
    <div class="menu-card" data-id="${item.id}">
        <div class="card-image">
            <i class="fas ${item.icon_class || 'fa-utensils'} dish-icon"></i>
            ${USE_DISH_IMAGES && imagePath ? `
            <img class="dish-image" src="${imagePath}" alt="${item.name}" loading="lazy"
                 onload="this.classList.add('loaded'); this.parentElement.querySelector('.dish-icon').style.display='none';"
                 onerror="this.style.display='none'; this.parentElement.querySelector('.dish-icon').style.display='block';">` : ''}
        </div>
        <div class="card-content">
            <div class="card-header">
                <h3 class="card-title">${item.name}</h3>
                <div class="card-price">${item.price} ₽</div>
            </div>
            <div class="info-row">
                ${showWeight ? `<span class="weight-info">${item.weight}</span>` : ''}
                ${showVolume ? `<span class="volume-info">${item.volume}</span>` : ''}
                ${showAlcohol ? `<span class="alcohol-info">${item.alcohol_content}</span>` : ''}
            </div>
            ${item.description ? `<p class="card-description">${item.description}</p>` : ''}
            <div class="card-footer">
                <button class="add-to-cart" data-id="${item.id}">
                    ${quantityInCart > 0 ? `${quantityInCart} в корзине` : 'В корзину'}
                </button>
            </div>
        </div>
    </div>`;
}

// ---------- Обработчики событий ----------
function setupImageClickHandlers() {
    document.addEventListener('click', e => {
        const cardImage = e.target.closest('.card-image');
        if (cardImage) {
            const img = cardImage.querySelector('.dish-image.loaded');
            if (img && img.src) openImageModal(img.src);
        }
    });
}

function setupAddToCartHandlers() {
    document.addEventListener('click', e => {
        const btn = e.target.closest('.add-to-cart');
        if (btn) {
            e.preventDefault();
            e.stopPropagation();
            addToCart(parseInt(btn.dataset.id));
        }
    });
}

function setupDrinksTabHandlers() {
    document.addEventListener('click', e => {
        const tab = e.target.closest('.drinks-tab');
        if (tab) {
            e.preventDefault();
            const subgroupId = tab.dataset.subgroup;
            if (subgroupId && subgroupId !== currentSubgroupId) {
                // Найти родительскую категорию (активную секцию)
                const activeSection = document.querySelector('.category-section.active');
                const categoryId = activeSection.id.replace('category-', '');
                const category = menuData[categoryId];
                if (category) {
                    loadSubgroupItems(category, subgroupId);
                    currentSubgroupId = subgroupId;
                    document.querySelectorAll('.drinks-tab').forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                }
            }
        }
    });
}

// ---------- Модальные окна и корзина (без изменений) ----------
function openImageModal(src) {
    const modal = document.getElementById('imageModal');
    document.getElementById('modalImage').src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function openMobileNav() {
    document.getElementById('mobileNav').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    document.getElementById('mobileNav').classList.remove('active');
    document.body.style.overflow = '';
}

function openCart() {
    renderCartItems();
    document.getElementById('cartModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
    document.body.style.overflow = '';
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    toast.style.backgroundColor = type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : 'var(--primary-dark)';
    setTimeout(() => toast.classList.remove('show'), 3000);
}

// Корзина
function addToCart(itemId) {
    const item = findItemById(itemId);
    if (!item) return;
    const existing = cart.find(i => i.id === itemId);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: item.id, name: item.name, price: item.price, quantity: 1 });
    }
    updateCartCount();
    saveCartToLocalStorage();
    updateAddToCartButton(itemId);
    const btn = document.querySelector(`.add-to-cart[data-id="${itemId}"]`);
    if (btn) {
        btn.classList.add('added');
        setTimeout(() => btn.classList.remove('added'), 300);
    }
    showToast(`"${item.name}" добавлен в корзину`, 'success');
    if (navigator.vibrate) navigator.vibrate(50);
}

function updateQuantity(itemId, change) {
    const index = cart.findIndex(i => i.id === itemId);
    if (index === -1) return;
    const cartItem = cart[index];
    const newQty = cartItem.quantity + change;
    if (newQty <= 0) {
        cart.splice(index, 1);
        showToast(`"${cartItem.name}" удалён из корзины`, 'error');
    } else {
        cartItem.quantity = newQty;
        const item = findItemById(itemId);
        showToast(`Количество "${item.name}" изменено на ${newQty}`, 'info');
    }
    updateCartCount();
    saveCartToLocalStorage();
    updateAddToCartButton(itemId);
    renderCartItems();
    if (navigator.vibrate) navigator.vibrate(30);
}

function removeFromCart(itemId) {
    const index = cart.findIndex(i => i.id === itemId);
    if (index === -1) return;
    const name = cart[index].name;
    if (confirm(`Удалить "${name}" из корзины?`)) {
        cart.splice(index, 1);
        updateCartCount();
        saveCartToLocalStorage();
        updateAddToCartButton(itemId);
        renderCartItems();
        showToast(`"${name}" удалён из корзины`, 'error');
    }
}

function updateCartCount() {
    const total = cart.reduce((sum, i) => sum + i.quantity, 0);
    document.getElementById('cartCount').textContent = total;
    const icon = document.getElementById('cartIcon');
    icon.style.color = total > 0 ? 'var(--primary-red)' : 'var(--primary-dark)';
}

function updateAddToCartButton(itemId) {
    const btn = document.querySelector(`.add-to-cart[data-id="${itemId}"]`);
    if (!btn) return;
    const cartItem = cart.find(i => i.id === itemId);
    if (cartItem) {
        btn.textContent = `${cartItem.quantity} в корзине`;
        btn.style.backgroundColor = '#4CAF50';
    } else {
        btn.textContent = 'В корзину';
        btn.style.backgroundColor = '';
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const cityId = localStorage.getItem('selectedCityId');
    if (!cityId) {
        document.body.innerHTML = '<div style="text-align:center;padding:100px;"><h1>Устройство не настроено</h1><p>Обратитесь к администратору</p></div>';
        throw new Error('No city selected');
    }
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const totalSpan = document.getElementById('cartTotal');
    if (cart.length === 0) {
        container.innerHTML = `<div class="empty-cart"><i class="fas fa-shopping-cart"></i><p>Корзина пуста</p></div>`;
        totalSpan.textContent = '0';
        return;
    }
    let html = '';
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} ₽ за шт.</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn decrease" data-id="${item.id}" ${item.quantity <= 1 ? 'disabled' : ''}><i class="fas fa-minus"></i></button>
                <span class="cart-item-quantity">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}"><i class="fas fa-plus"></i></button>
            </div>
            <div class="cart-item-total">${itemTotal} ₽</div>
            <div class="cart-item-actions">
                <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i><span class="remove-text">Удалить</span></button>
            </div>
        </div>`;
    });
    container.innerHTML = html;
    totalSpan.textContent = total;

    container.querySelectorAll('.decrease').forEach(b => b.addEventListener('click', () => updateQuantity(parseInt(b.dataset.id), -1)));
    container.querySelectorAll('.increase').forEach(b => b.addEventListener('click', () => updateQuantity(parseInt(b.dataset.id), 1)));
    container.querySelectorAll('.remove-item').forEach(b => b.addEventListener('click', () => removeFromCart(parseInt(b.dataset.id))));

cartItems.innerHTML = itemsHTML;
cartTotal.textContent = total;

// Добавляем выбор времени подачи и кнопку
const footer = document.createElement('div');
footer.className = 'cart-footer';
footer.innerHTML = `
    <div class="serve-time">
        <label><input type="radio" name="serveTime" value="now" checked> Подать сейчас</label>
        <label><input type="radio" name="serveTime" value="later"> Подать позже</label>
    </div>
    <button class="checkout-btn" id="checkoutBtn">Оплатить заказ</button>
`;
cartItems.parentNode.appendChild(footer);

document.getElementById('checkoutBtn').addEventListener('click', submitOrder);
}

function setupTouchEvents() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', e => {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) e.preventDefault();
        lastTouchEnd = now;
    }, false);
}

function handleResize() {
    if (window.innerWidth <= 768) {
        initMobileQuickNav();
        const tabs = document.querySelector('.drinks-tabs');
        if (tabs) { tabs.style.overflowX = 'auto'; tabs.style.paddingBottom = '10px'; }
    } else {
        document.getElementById('categoryQuickNav').innerHTML = '';
        const tabs = document.querySelector('.drinks-tabs');
        if (tabs) tabs.style.overflowX = 'visible';
    }
}

function submitOrder() {
    if (cart.length === 0) return;
    const serveTime = document.querySelector('input[name="serveTime"]:checked').value;
    // Здесь можно запросить имя гостя или использовать дефолтное
    const customerName = 'Гость';
    const isMainOrder = true; // Пока основной заказ

    fetch('/api/order/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cart: cart,
            serve_time: serveTime,
            customer_name: customerName,
            is_main_order: isMainOrder
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.order_number) {
            // Показываем сообщение с номером заказа
            const modal = document.getElementById('cartModal');
            modal.innerHTML = `
                <div class="order-confirmation">
                    <h2>Заказ №${data.order_number} принят!</h2>
                    <p>Сумма: ${data.total_price} ₽</p>
                    <p>Время подачи: ${serveTime === 'now' ? 'сразу' : 'позже'}</p>
                    <p>Ваш заказ готовится. Среднее время ожидания 15-20 минут.</p>
                    <button class="btn" id="newOrderBtn">Новый заказ</button>
                    <button class="btn" id="addToOrderBtn">Дозаказать</button>
                </div>
            `;
            document.getElementById('newOrderBtn').addEventListener('click', () => {
                cart = [];
                saveCartToLocalStorage();
                updateCartCount();
                closeCart();
            });
            document.getElementById('addToOrderBtn').addEventListener('click', () => {
                // Дозаказ: создаём новый заказ с пометкой is_main_order=False
                // Пока просто очищаем корзину и показываем меню
                cart = [];
                saveCartToLocalStorage();
                updateCartCount();
                closeCart();
                showToast('Добавьте блюда в корзину и оформите дозаказ', 'info');
            });
        }
    });
}

window.addEventListener('resize', handleResize);

// Привязка событий интерфейса
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cartIcon').addEventListener('click', openCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    document.getElementById('mobileMenuBtn').addEventListener('click', openMobileNav);
    document.getElementById('closeMobileNav').addEventListener('click', closeMobileNav);
    document.getElementById('closeImageModal').addEventListener('click', closeImageModal);
    document.getElementById('imageModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeImageModal(); });
    document.getElementById('cartModal').addEventListener('click', e => { if (e.target === e.currentTarget) closeCart(); });
    document.getElementById('mobileNav').addEventListener('click', e => { if (e.target === e.currentTarget) closeMobileNav(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeImageModal(); });
});