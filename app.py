import os
from datetime import datetime
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
from flask_migrate import Migrate
from werkzeug.utils import secure_filename
from config import Config
from models import db, Category, MenuItem, City, User, GameSession, Camera, Order, OrderItem

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
migrate = Migrate(app, db)

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

@app.context_processor
def inject_city():
    return dict(City=City, User=User)

# ---------- Аутентификация (на основе модели User) ----------
def admin_required(f):
    def decorated(*args, **kwargs):
        if not session.get('admin_logged_in'):
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    decorated.__name__ = f.__name__
    return decorated

def get_current_city_id():
    if not session.get('admin_logged_in'):
        return None
    user = User.query.get(session.get('user_id'))
    if user and user.is_admin:
        city_id = session.get('current_city_id')
        if city_id and City.query.get(city_id):
            return city_id
        # Если город удалён, сбрасываем сессию
        session.pop('current_city_id', None)
        return None
    elif user and user.city_id:
        return user.city_id
    return None

def city_required(f):
    """Требует, чтобы город был выбран (для супер‑админа) или определён"""
    def decorated(*args, **kwargs):
        city_id = get_current_city_id()
        if city_id is None:
            flash('Выберите город для работы', 'warning')
            return redirect(url_for('admin_cities'))
        return f(*args, **kwargs)
    decorated.__name__ = f.__name__
    return decorated

def generate_order_number():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            session['admin_logged_in'] = True
            session['user_id'] = user.id
            return redirect(url_for('admin_dashboard'))
        flash('Неверные данные', 'danger')
        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            session['admin_logged_in'] = True
            session['user_id'] = user.id
            if not user.is_admin and user.city_id:
                session['current_city_id'] = user.city_id
            return redirect(url_for('admin_dashboard'))
    return render_template('admin/login.html')

@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_logged_in', None)
    session.pop('user_id', None)
    return redirect(url_for('admin_login'))

# ---------- Главные страницы ----------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/menu')
def menu_page():
    return render_template('menu.html')

@app.route('/games')
def games_page():
    return render_template('games.html')

@app.route('/cartoons')
def cartoons_page():
    return render_template('cartoons.html')

@app.route('/kitchen')
def kitchen_page():
    return render_template('kitchen.html')

@app.route('/cameras')
def cameras_page():
    return render_template('cameras.html')

# ---------- Игры ----------
@app.route('/game-3d')
def game_3d():
    return render_template('game-3d.html')

@app.route('/racing')
def racing():
    return render_template('racing.html')

@app.route('/3match')
def match3():
    return render_template('3match.html')

@app.route('/saper')
def saper():
    return render_template('saper.html')

@app.route('/snake')
def snake():
    return render_template('snake.html')

@app.route('/tetris')
def tetris():
    return render_template('tetris.html')

# ---------- API для меню (с фильтром по городу) ----------
@app.route('/api/categories')
def api_categories():
    city_id = request.args.get('city_id', 1, type=int)  # по умолчанию первый город
    categories = Category.query.filter_by(city_id=city_id).order_by(Category.order).all()
    result = []
    for cat in categories:
        cat_dict = cat.to_dict()
        cat_dict['items'] = [item.to_dict() for item in cat.items.filter_by(is_available=True).order_by(MenuItem.order)]
        result.append(cat_dict)
    return jsonify(result)

@app.route('/api/cities')
def api_cities():
    cities = City.query.all()
    return jsonify([{'id': c.id, 'name': c.name, 'slug': c.slug} for c in cities])

# ---------- Статистика игр ----------
@app.route('/api/game/start', methods=['POST'])
def api_game_start():
    data = request.get_json()
    game_id = data.get('game_id')
    if not game_id:
        return jsonify({'error': 'game_id required'}), 400
    session = GameSession(game_id=game_id, start_time=datetime.utcnow())
    db.session.add(session)
    db.session.commit()
    return jsonify({'session_id': session.id})

@app.route('/api/game/end', methods=['POST'])
def api_game_end():
    data = request.get_json()
    session_id = data.get('session_id')
    if not session_id:
        return jsonify({'error': 'session_id required'}), 400
    session = GameSession.query.get(session_id)
    if session and not session.end_time:
        session.end_time = datetime.utcnow()
        db.session.commit()
    return jsonify({'status': 'ok'})

# ---------- Админ-панель ----------
@app.route('/admin')
@admin_required
def admin_dashboard():
    categories_count = Category.query.count()
    items_count = MenuItem.query.count()
    cities_count = City.query.count()
    users_count = User.query.count()
    return render_template('admin/dashboard.html',
                           categories_count=categories_count,
                           items_count=items_count,
                           cities_count=cities_count,
                           users_count=users_count)

# ---------- API для настроек города ----------
@app.route('/api/city/<int:city_id>')
def api_city_info(city_id):
    city = City.query.get_or_404(city_id)
    cameras = Camera.query.filter_by(city_id=city_id).all()
    return jsonify({
        'id': city.id,
        'name': city.name,
        'slug': city.slug,
        'address': city.address,
        'working_hours': city.working_hours,
        'phone': city.phone,
        'footer_info': city.footer_info,
        'cameras': [{'id': c.id, 'name': c.name, 'stream_url': c.stream_url} for c in cameras]
    })

@app.route('/api/cameras/<int:city_id>')
def api_cameras(city_id):
    cameras = Camera.query.filter_by(city_id=city_id).all()
    return jsonify([{'id': c.id, 'name': c.name, 'stream_url': c.stream_url} for c in cameras])

# ---------- Админка: редактирование города ----------
@app.route('/admin/city/<int:id>', methods=['GET', 'POST'])
@admin_required
def admin_city_edit(id):
    city = City.query.get_or_404(id)
    if request.method == 'POST':
        city.name = request.form.get('name')
        city.slug = request.form.get('slug')
        city.address = request.form.get('address')
        city.working_hours = request.form.get('working_hours')
        city.phone = request.form.get('phone')
        city.footer_info = request.form.get('footer_info')
        db.session.commit()
        flash('Город обновлён', 'success')
        return redirect(url_for('admin_cities'))
    return render_template('admin/city_edit.html', city=city)

# ---------- Админка: выбор города для управления меню ----------
@app.route('/select_city', methods=['POST'])
def select_city():
    city_id = request.form.get('city_id')
    if city_id:
        session['selected_city_id'] = int(city_id)
    return redirect(request.referrer or url_for('index'))


@app.route('/admin/switch_city/<int:city_id>')
@admin_required
def admin_switch_city(city_id):
    user = User.query.get(session['user_id'])
    if not user or not user.is_admin:
        flash('Недостаточно прав', 'danger')
        return redirect(url_for('admin_dashboard'))
    city = City.query.get(city_id)
    if city is None:
        flash('Город не найден', 'danger')
        return redirect(url_for('admin_dashboard'))
    session['current_city_id'] = city_id
    flash(f'Город переключён на {city.name}', 'success')
    return redirect(url_for('admin_dashboard'))


# ---------- Админка: управление камерами ----------
@app.route('/admin/cameras')
@admin_required
def admin_cameras():
    cities = City.query.all()
    city_id = request.args.get('city', type=int)
    if city_id:
        cameras = Camera.query.filter_by(city_id=city_id).all()
    else:
        cameras = Camera.query.all()
    return render_template('admin/cameras.html', cameras=cameras, cities=cities, selected_city=city_id)

@app.route('/admin/cameras/add', methods=['POST'])
@admin_required
def admin_camera_add():
    name = request.form.get('name')
    stream_url = request.form.get('stream_url')
    city_id = request.form.get('city_id')
    camera = Camera(name=name, stream_url=stream_url, city_id=city_id)
    db.session.add(camera)
    db.session.commit()
    flash('Камера добавлена', 'success')
    return redirect(url_for('admin_cameras'))

@app.route('/admin/cameras/edit/<int:id>', methods=['POST'])
@admin_required
def admin_camera_edit(id):
    cam = Camera.query.get_or_404(id)
    cam.name = request.form.get('name')
    cam.stream_url = request.form.get('stream_url')
    cam.city_id = request.form.get('city_id')
    db.session.commit()
    flash('Камера обновлена', 'success')
    return redirect(url_for('admin_cameras'))

@app.route('/admin/cameras/delete/<int:id>')
@admin_required
def admin_camera_delete(id):
    cam = Camera.query.get_or_404(id)
    db.session.delete(cam)
    db.session.commit()
    flash('Камера удалена', 'success')
    return redirect(url_for('admin_cameras'))

# ---------- Управление городами ----------
@app.route('/admin/cities')
@admin_required
def admin_cities():
    cities = City.query.all()
    return render_template('admin/cities.html', cities=cities)

@app.route('/admin/cities/add', methods=['POST'])
@admin_required
def admin_city_add():
    city = City(
        name=request.form.get('name'),
        slug=request.form.get('slug'),
        address=request.form.get('address', ''),
        working_hours=request.form.get('working_hours', ''),
        phone=request.form.get('phone', ''),
        footer_info=request.form.get('footer_info', '')
    )
    db.session.add(city)
    db.session.commit()
    flash('Город добавлен', 'success')
    return redirect(url_for('admin_cities'))


@app.route('/admin/cities/delete/<int:id>')
@admin_required
def admin_city_delete(id):
    city = City.query.get_or_404(id)
    db.session.delete(city)
    db.session.commit()
    flash('Город удалён', 'success')
    return redirect(url_for('admin_cities'))

# ---------- Управление пользователями ----------
@app.route('/admin/users')
@admin_required
def admin_users():
    users = User.query.all()
    cities = City.query.all()
    return render_template('admin/users.html', users=users, cities=cities)

@app.route('/admin/users/add', methods=['POST'])
@admin_required
def admin_user_add():
    username = request.form.get('username')
    password = request.form.get('password')
    city_id = request.form.get('city_id') or None
    is_admin = request.form.get('is_admin') == 'on'
    if not username or not password:
        flash('Логин и пароль обязательны', 'danger')
        return redirect(url_for('admin_users'))
    if User.query.filter_by(username=username).first():
        flash('Пользователь с таким логином уже существует', 'danger')
        return redirect(url_for('admin_users'))
    user = User(username=username, is_admin=is_admin, city_id=city_id)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    flash('Пользователь добавлен', 'success')
    return redirect(url_for('admin_users'))

@app.route('/admin/users/edit/<int:id>', methods=['POST'])
@admin_required
def admin_user_edit(id):
    user = User.query.get_or_404(id)
    user.username = request.form.get('username')
    password = request.form.get('password')
    user.city_id = request.form.get('city_id') or None
    user.is_admin = request.form.get('is_admin') == 'on'
    if password:
        user.set_password(password)
    db.session.commit()
    flash('Пользователь обновлён', 'success')
    return redirect(url_for('admin_users'))

@app.route('/admin/users/delete/<int:id>')
@admin_required
def admin_user_delete(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    flash('Пользователь удалён', 'success')
    return redirect(url_for('admin_users'))

# ---------- Управление категориями (учёт города) ----------
@app.route('/admin/categories')
@admin_required
@city_required
def admin_categories():
    city_id = get_current_city_id()
    categories = Category.query.filter_by(city_id=city_id).order_by(Category.order).all()
    all_categories = Category.query.order_by(Category.order).all()
    cities = City.query.all()
    return render_template('admin/categories.html', 
                           categories=categories, 
                           cities=cities, 
                           all_categories=all_categories,
                           current_city_id=city_id)

@app.route('/admin/categories/add', methods=['POST'])
@admin_required
@city_required
def admin_category_add():
    city_id = get_current_city_id()
    name = request.form.get('name')
    slug = request.form.get('slug')
    parent_id = request.form.get('parent_id') or None
    city_id = request.form.get('city_id') or None
    order = int(request.form.get('order', 0))
    if not name or not slug or not city_id:
        flash('Название, slug и город обязательны', 'danger')
        return redirect(url_for('admin_categories'))
    cat = Category(name=name, slug=slug, parent_id=parent_id, city_id=city_id, order=order)
    db.session.add(cat)
    db.session.commit()
    flash('Категория добавлена', 'success')
    return redirect(url_for('admin_categories'))

@app.route('/admin/categories/edit/<int:id>', methods=['POST'])
@admin_required
def admin_category_edit(id):
    cat = Category.query.get_or_404(id)
    cat.name = request.form.get('name')
    cat.slug = request.form.get('slug')
    cat.parent_id = request.form.get('parent_id') or None
    city_id = request.form.get('city_id')
    if city_id:
        cat.city_id = int(city_id)
    else:
        flash('Необходимо выбрать город', 'danger')
        return redirect(url_for('admin_categories'))
    cat.order = int(request.form.get('order', 0))
    db.session.commit()
    flash('Категория обновлена', 'success')
    return redirect(url_for('admin_categories'))

@app.route('/admin/categories/delete/<int:id>')
@admin_required
def admin_category_delete(id):
    cat = Category.query.get_or_404(id)
    db.session.delete(cat)
    db.session.commit()
    flash('Категория удалена', 'success')
    return redirect(url_for('admin_categories'))

# ---------- Управление блюдами (учёт города) ----------
@app.route('/admin/items')
@admin_required
@city_required
def admin_items():
    city_id = get_current_city_id()
    categories = Category.query.filter_by(city_id=city_id).order_by(Category.order).all()
    items = MenuItem.query.filter_by(city_id=city_id).order_by(MenuItem.category_id, MenuItem.order).all()
    cities = City.query.all()
    return render_template('admin/items.html', items=items, categories=categories, cities=cities)

@app.route('/admin/items/add', methods=['POST'])
@admin_required
def admin_item_add():
    name = request.form.get('name')
    price = int(request.form.get('price', 0))
    category_id = int(request.form.get('category_id'))
    city_id = request.form.get('city_id')
    if not city_id:
        flash('Необходимо выбрать город', 'danger')
        return redirect(url_for('admin_categories'))
    city_id = int(city_id)
    description = request.form.get('description', '')
    weight = request.form.get('weight', '')
    volume = request.form.get('volume', '')
    order = int(request.form.get('order', 0))
    icon_class = request.form.get('icon_class', 'fa-utensils')
    alcohol = request.form.get('alcohol_content', '')
    calories = request.form.get('calories', '')
    proteins = request.form.get('proteins', '')
    fats = request.form.get('fats', '')
    carbs = request.form.get('carbs', '')
    is_available = request.form.get('is_available') == 'on'

    image_file = request.files.get('image')
    image_path = None
    if image_file and image_file.filename:
        filename = secure_filename(image_file.filename)
        base, ext = os.path.splitext(filename)
        timestamp = datetime.utcnow().strftime('%Y%m%d%H%M%S')
        filename = f"{base}_{timestamp}{ext}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image_file.save(filepath)
        image_path = f"/static/uploads/{filename}"

    item = MenuItem(
        name=name, price=price, category_id=category_id,
        city_id=city_id, description=description, weight=weight,
        volume=volume, image_path=image_path, icon_class=icon_class,
        alcohol_content=alcohol, calories=calories,
        proteins=proteins, fats=fats, carbs=carbs,
        order=order, is_available=is_available
    )
    db.session.add(item)
    db.session.commit()
    flash('Блюдо добавлено', 'success')
    return redirect(url_for('admin_items'))

@app.route('/admin/items/edit/<int:id>', methods=['POST'])
@admin_required
def admin_item_edit(id):
    item = MenuItem.query.get_or_404(id)
    item.name = request.form.get('name')
    item.price = int(request.form.get('price', 0))
    item.category_id = int(request.form.get('category_id'))
    city_id = request.form.get('city_id')
    if not city_id:
        flash('Необходимо выбрать город', 'danger')
        return redirect(url_for('admin_items'))
    item.city_id = int(city_id)
    item.description = request.form.get('description', '')
    item.weight = request.form.get('weight', '')
    item.volume = request.form.get('volume', '')
    item.order = int(request.form.get('order', 0))
    item.icon_class = request.form.get('icon_class', 'fa-utensils')
    item.alcohol_content = request.form.get('alcohol_content', '')
    item.calories = request.form.get('calories', '')
    item.proteins = request.form.get('proteins', '')
    item.fats = request.form.get('fats', '')
    item.carbs = request.form.get('carbs', '')
    item.is_available = request.form.get('is_available') == 'on'

    image_file = request.files.get('image')
    if image_file and image_file.filename:
        filename = secure_filename(image_file.filename)
        base, ext = os.path.splitext(filename)
        timestamp = datetime.utcnow().strftime('%Y%m%d%H%M%S')
        filename = f"{base}_{timestamp}{ext}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image_file.save(filepath)
        # Удаляем старый файл, если был
        if item.image_path:
            old_path = os.path.join(app.root_path, item.image_path.lstrip('/'))
            if os.path.exists(old_path):
                os.remove(old_path)
        item.image_path = f"/static/uploads/{filename}"

    db.session.commit()
    flash('Блюдо обновлено', 'success')
    return redirect(url_for('admin_items'))

@app.route('/admin/items/delete/<int:id>')
@admin_required
def admin_item_delete(id):
    item = MenuItem.query.get_or_404(id)
    if item.image_path:
        old_path = os.path.join(app.root_path, item.image_path.lstrip('/'))
        if os.path.exists(old_path):
            os.remove(old_path)
    db.session.delete(item)
    db.session.commit()
    flash('Блюдо удалено', 'success')
    return redirect(url_for('admin_items'))

# ---------- Статистика игр (просмотр) ----------
@app.route('/admin/statistics')
@admin_required
def admin_statistics():
    # Простейший вывод сессий
    sessions = GameSession.query.order_by(GameSession.start_time.desc()).limit(100).all()
    return render_template('admin/statistics.html', sessions=sessions)


# Создание заказа из корзины
@app.route('/api/order/create', methods=['POST'])
def api_create_order():
    data = request.get_json()
    cart_items = data.get('cart', [])
    serve_time = data.get('serve_time', 'now')
    customer_name = data.get('customer_name', 'Гость')
    is_main_order = data.get('is_main_order', True)

    if not cart_items:
        return jsonify({'error': 'Корзина пуста'}), 400

    total_price = 0
    order = Order(
        order_number=generate_order_number(),
        status='confirmed',
        total_price=0,
        customer_name=customer_name,
        serve_time=serve_time,
        is_main_order=is_main_order
    )
    db.session.add(order)
    db.session.flush()  # чтобы получить id

    for item_data in cart_items:
        menu_item = MenuItem.query.get(item_data['id'])
        if not menu_item:
            continue
        order_item = OrderItem(
            order_id=order.id,
            menu_item_id=menu_item.id,
            quantity=item_data['quantity'],
            price=menu_item.price
        )
        db.session.add(order_item)
        total_price += menu_item.price * item_data['quantity']

    order.total_price = total_price
    db.session.commit()

    return jsonify({'order_number': order.order_number, 'order_id': order.id, 'total_price': total_price})

# Получение списка заказов (для кухни) — активные (confirmed, cooking)
@app.route('/api/orders/active')
def api_active_orders():
    orders = Order.query.filter(Order.status.in_(['confirmed', 'cooking'])).order_by(Order.created_at.asc()).all()
    return jsonify([order.to_dict() for order in orders])

# Обновление статуса заказа (кухня)
@app.route('/api/order/<int:order_id>/status', methods=['POST'])
def api_update_order_status(order_id):
    order = Order.query.get_or_404(order_id)
    new_status = request.get_json().get('status')
    if new_status in ['cooking', 'ready', 'completed']:
        order.status = new_status
        db.session.commit()
    return jsonify(order.to_dict())


@app.route('/admin/orders')
@admin_required
def admin_orders():
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return render_template('admin/orders.html', orders=orders)


# ---------- Инициализация базы данных ----------
@app.cli.command('init-db')
def init_db():
    db.create_all()
    print("База данных создана.")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)