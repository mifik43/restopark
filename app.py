import os
from datetime import datetime
from flask import Flask, render_template, request, jsonify, session, redirect, url_for, flash
from flask_migrate import Migrate
from werkzeug.utils import secure_filename
from config import Config
from models import db, Category, MenuItem, Order, OrderItem, GameSession
from cameras_config import CAMERAS

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
migrate = Migrate(app, db)


os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# ---------- Главные страницы ----------
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/menu')
def menu_page():
    categories = Category.query.order_by(Category.order).all()
    def build_tree(cats, parent=None):
        result = []
        for cat in cats:
            if cat.parent_id == (parent.id if parent else None):
                cat_data = cat.to_dict()
                # переименовываем в 'dishes', чтобы не конфликтовать с методом словаря
                cat_data['dishes'] = [item.to_dict() for item in cat.items.filter_by(is_available=True).order_by(MenuItem.order)]
                cat_data['subcategories'] = build_tree(cats, cat)
                result.append(cat_data)
        return result
    menu_tree = build_tree(categories)
    return render_template('menu.html', menu_tree=menu_tree)

@app.route('/games')
def games_page():
    return render_template('games.html')

@app.route('/cartoons')
def cartoons_page():
    return render_template('cartoons.html')

@app.route('/kitchen')
def kitchen_page():
    return render_template('kitchen.html')

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

# ---------- Камеры ----------
@app.route('/cameras')
def cameras_page():
    return render_template('cameras.html', cameras=CAMERAS)

@app.route('/camera/<int:cam_id>')
def camera_single(cam_id):
    cam = next((c for c in CAMERAS if c["id"] == cam_id), None)
    if not cam:
        return "Камера не найдена", 404

    # Определяем индексы для навигации
    ids = [c["id"] for c in CAMERAS]
    try:
        idx = ids.index(cam_id)
    except ValueError:
        idx = -1
    prev_id = ids[idx - 1] if idx > 0 else None
    next_id = ids[idx + 1] if idx != -1 and idx < len(ids) - 1 else None

    return render_template('camera_single.html', cam=cam, prev_id=prev_id, next_id=next_id)

# ---------- API для меню ----------
@app.route('/api/categories')
def api_categories():
    categories = Category.query.order_by(Category.order).all()
    result = []
    for cat in categories:
        cat_dict = cat.to_dict()
        cat_dict['items'] = [item.to_dict() for item in cat.items.filter_by(is_available=True).order_by(MenuItem.order)]
        result.append(cat_dict)
    return jsonify(result)

# ---------- API для заказов ----------
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
    db.session.flush()

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

@app.route('/api/orders/active')
def api_active_orders():
    orders = Order.query.filter(Order.status.in_(['confirmed', 'cooking'])).order_by(Order.created_at.asc()).all()
    return jsonify([order.to_dict() for order in orders])

@app.route('/api/order/<int:order_id>/status', methods=['POST'])
def api_update_order_status(order_id):
    order = Order.query.get_or_404(order_id)
    new_status = request.get_json().get('status')
    if new_status in ['cooking', 'ready', 'completed']:
        order.status = new_status
        db.session.commit()
    return jsonify(order.to_dict())

def generate_order_number():
    import random, string
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))

# ---------- Админ-панель ----------
def admin_required(f):
    def decorated(*args, **kwargs):
        if not session.get('admin_logged_in'):
            return redirect(url_for('admin_login'))
        return f(*args, **kwargs)
    decorated.__name__ = f.__name__
    return decorated

@app.route('/admin/login', methods=['GET', 'POST'])
def admin_login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        if username == app.config['ADMIN_USERNAME'] and password == app.config['ADMIN_PASSWORD']:
            session['admin_logged_in'] = True
            return redirect(url_for('admin_dashboard'))
        flash('Неверные данные', 'danger')
    return render_template('admin/login.html')

@app.route('/admin/logout')
def admin_logout():
    session.pop('admin_logged_in', None)
    return redirect(url_for('admin_login'))

@app.route('/admin')
@admin_required
def admin_dashboard():
    categories_count = Category.query.count()
    items_count = MenuItem.query.count()
    orders_count = Order.query.count()
    return render_template('admin/dashboard.html',
                           categories_count=categories_count,
                           items_count=items_count,
                           orders_count=orders_count)

# ---------- Категории ----------
@app.route('/admin/categories')
@admin_required
def admin_categories():
    categories = Category.query.order_by(Category.order).all()
    return render_template('admin/categories.html', categories=categories)

@app.route('/admin/categories/add', methods=['POST'])
@admin_required
def admin_category_add():
    name = request.form.get('name')
    slug = request.form.get('slug')
    parent_id = request.form.get('parent_id')
    if parent_id == '':
        parent_id = None
    order = int(request.form.get('order', 0))
    cat = Category(name=name, slug=slug, parent_id=parent_id, order=order)
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
    parent_id = request.form.get('parent_id')
    cat.parent_id = None if parent_id == '' else int(parent_id)
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

# ---------- Блюда ----------
@app.route('/admin/items')
@admin_required
def admin_items():
    items = MenuItem.query.order_by(MenuItem.category_id, MenuItem.order).all()
    categories = Category.query.order_by(Category.name).all()
    return render_template('admin/items.html', items=items, categories=categories)

@app.route('/admin/items/add', methods=['POST'])
@admin_required
def admin_item_add():
    name = request.form.get('name')
    price = int(request.form.get('price', 0))
    category_id = int(request.form.get('category_id'))
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
    is_available = bool(request.form.get('is_available'))

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
        description=description, weight=weight, volume=volume,
        image_path=image_path, icon_class=icon_class,
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
    item.is_available = bool(request.form.get('is_available'))

    image_file = request.files.get('image')
    if image_file and image_file.filename:
        filename = secure_filename(image_file.filename)
        base, ext = os.path.splitext(filename)
        timestamp = datetime.utcnow().strftime('%Y%m%d%H%M%S')
        filename = f"{base}_{timestamp}{ext}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        image_file.save(filepath)
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

# ---------- Заказы (админ) ----------
@app.route('/admin/orders')
@admin_required
def admin_orders():
    orders = Order.query.order_by(Order.created_at.desc()).all()
    return render_template('admin/orders.html', orders=orders)

# ---------- Статистика игр (админ) ----------
@app.route('/admin/stats')
@admin_required
def admin_stats():
    # сессии игр сгруппируем для показа
    sessions = GameSession.query.order_by(GameSession.start_time.desc()).limit(100).all()
    return render_template('admin/stats.html', sessions=sessions)

# ---------- API для статистики игр (из клиента) ----------
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

@app.route('/kitchen-admin')
def kitchen_admin():
    return render_template('kitchen.html')

@app.cli.command('init-db')
def init_db():
    db.create_all()
    print("Database initialized.")

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)