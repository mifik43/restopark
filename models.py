from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class Category(db.Model):
    __tablename__ = 'categories'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    slug = db.Column(db.String(100), unique=True, nullable=False)
    order = db.Column(db.Integer, default=0)
    parent_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=True)
    parent = db.relationship('Category', remote_side=[id], backref='subcategories')
    items = db.relationship('MenuItem', backref='category', lazy='dynamic', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'slug': self.slug,
            'order': self.order,
            'parent_id': self.parent_id
        }

class MenuItem(db.Model):
    __tablename__ = 'menu_items'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Integer, nullable=False)
    weight = db.Column(db.String(50))
    volume = db.Column(db.String(50))
    calories = db.Column(db.String(50))
    proteins = db.Column(db.String(20))
    fats = db.Column(db.String(20))
    carbs = db.Column(db.String(20))
    image_path = db.Column(db.String(500))
    icon_class = db.Column(db.String(100), default='fa-utensils')
    alcohol_content = db.Column(db.String(20))
    is_available = db.Column(db.Boolean, default=True)
    order = db.Column(db.Integer, default=0)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'weight': self.weight,
            'volume': self.volume,
            'calories': self.calories,
            'proteins': self.proteins,
            'fats': self.fats,
            'carbs': self.carbs,
            'image_path': self.image_path,
            'icon_class': self.icon_class,
            'alcohol_content': self.alcohol_content,
            'is_available': self.is_available,
            'order': self.order,
            'category_id': self.category_id
        }

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.String(20), unique=True, nullable=False)
    status = db.Column(db.String(20), default='confirmed')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    total_price = db.Column(db.Integer, nullable=False)
    customer_name = db.Column(db.String(100), default='Гость')
    serve_time = db.Column(db.String(20), default='now')
    is_main_order = db.Column(db.Boolean, default=True)

    items = db.relationship('OrderItem', backref='order', lazy='dynamic', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'order_number': self.order_number,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'total_price': self.total_price,
            'customer_name': self.customer_name,
            'serve_time': self.serve_time,
            'is_main_order': self.is_main_order,
            'items': [item.to_dict() for item in self.items]
        }

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    menu_item_id = db.Column(db.Integer, db.ForeignKey('menu_items.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)
    price = db.Column(db.Integer, nullable=False)

    menu_item = db.relationship('MenuItem')

    def to_dict(self):
        return {
            'id': self.id,
            'menu_item_id': self.menu_item_id,
            'name': self.menu_item.name if self.menu_item else 'Удалённое блюдо',
            'quantity': self.quantity,
            'price': self.price
        }

class GameSession(db.Model):
    __tablename__ = 'game_sessions'
    id = db.Column(db.Integer, primary_key=True)
    game_id = db.Column(db.String(50), nullable=False)
    start_time = db.Column(db.DateTime, default=datetime.utcnow)
    end_time = db.Column(db.DateTime, nullable=True)