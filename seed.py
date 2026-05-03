# seed.py — заполнение базы начальными данными (города, админ, демо-категории)
import os
from app import app, db
from models import City, User, Category, MenuItem

def seed():
    with app.app_context():
        # Очистка
        db.create_all()
        
        # Очистка старых данных
        print("Удаление старых данных...")
        MenuItem.query.delete()
        Category.query.delete()
        User.query.delete()
        City.query.delete()
        db.session.commit()

        # 1. Города
        print("Создание городов...")
        samara = City(name='Самара Амбар 3500', slug='samara-ambar')
        belgorod_sitimoll = City(name='Белгород Ситимолл', slug='belgorod-sitimoll')
        belgorod_mezonin = City(name='Белгород Мезонин', slug='belgorod-mezonin')
        db.session.add_all([samara, belgorod_sitimoll, belgorod_mezonin])
        db.session.commit()

        # 2. Администратор
        print("Создание администратора...")
        admin = User(username='admin', is_admin=True)
        admin.set_password('admin123')
        db.session.add(admin)
        manager = User(username='samara', is_admin=False, city_id=samara.id)
        manager.set_password('samara123')
        db.session.add(manager)
        db.session.commit()

        # 3. Демо-категории для Самары (потом замените своими)
        print("Добавление демо-категорий для Самары...")
        demos = [
            {"name": "Горячие блюда", "slug": "hot"},
            {"name": "Напитки", "slug": "drinks",
             "subs": [
                 {"name": "Чай", "slug": "tea"},
                 {"name": "Кофе", "slug": "coffee"}
             ]}
        ]
        for c in demos:
            cat = Category(name=c["name"], slug=c["slug"], city_id=samara.id, order=0)
            db.session.add(cat)
            db.session.flush()
            if "subs" in c:
                for sub in c["subs"]:
                    sub_cat = Category(name=sub["name"], slug=f'{c["slug"]}-{sub["slug"]}',
                                       parent_id=cat.id, city_id=samara.id, order=0)
                    db.session.add(sub_cat)

        # 4. Пустые категории для Белгородов
        for city in [belgorod_sitimoll, belgorod_mezonin]:
            for c in demos:
                cat = Category(name=c["name"], slug=c["slug"], city_id=city.id, order=0)
                db.session.add(cat)
                db.session.flush()
                if "subs" in c:
                    for sub in c["subs"]:
                        sub_cat = Category(name=sub["name"], slug=f'{c["slug"]}-{sub["slug"]}',
                                           parent_id=cat.id, city_id=city.id, order=0)
                        db.session.add(sub_cat)

        db.session.commit()
        print("Готово! База инициализирована.")

if __name__ == '__main__':
    seed()