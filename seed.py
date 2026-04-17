import sys
import os
from app import app, db
from models import Category, MenuItem
from menu_data import MENU  # импорт готового словаря

def populate_db(menu_data):
    with app.app_context():
        print("Очистка старых данных...")
        MenuItem.query.delete()
        Category.query.delete()
        db.session.commit()

        categories_map = {}

        for slug, cat_data in menu_data.items():
            title = cat_data.get('title', slug)
            cat = Category(name=title, slug=slug, order=0)
            db.session.add(cat)
            db.session.flush()
            categories_map[slug] = cat
            print(f"Категория: {title} (slug={slug})")

            if 'subgroups' in cat_data:
                for sub_slug, sub_data in cat_data['subgroups'].items():
                    sub_title = sub_data.get('title', sub_slug)
                    sub_cat = Category(
                        name=sub_title,
                        slug=f"{slug}-{sub_slug}",
                        parent_id=cat.id,
                        order=0
                    )
                    db.session.add(sub_cat)
                    db.session.flush()
                    categories_map[f"{slug}-{sub_slug}"] = sub_cat
                    print(f"  Подкатегория: {sub_title} (slug={slug}-{sub_slug})")

        db.session.commit()

        for slug, cat_data in menu_data.items():
            cat = categories_map[slug]
            if 'subgroups' in cat_data:
                for sub_slug, sub_data in cat_data['subgroups'].items():
                    sub_cat = categories_map[f"{slug}-{sub_slug}"]
                    for item in sub_data.get('items', []):
                        add_item(item, sub_cat.id)
            else:
                for item in cat_data.get('items', []):
                    add_item(item, cat.id)

        db.session.commit()
        print("Готово! База заполнена.")

def add_item(item_data, category_id):
    item = MenuItem(
        name=item_data.get('name', ''),
        description=item_data.get('description', ''),
        price=int(item_data.get('price', 0)),
        weight=item_data.get('weight', ''),
        volume=item_data.get('volume', ''),
        calories=item_data.get('calories', ''),
        proteins=item_data.get('proteins', ''),
        fats=item_data.get('fats', ''),
        carbs=item_data.get('carbs', ''),
        icon_class=item_data.get('imageIcon', 'fa-utensils'),
        image_path=item_data.get('imagePath', ''),
        alcohol_content=item_data.get('alcoholContent', ''),
        order=0,
        category_id=category_id,
        is_available=True
    )
    db.session.add(item)

if __name__ == '__main__':
    print("Заполнение базы из menu_data.MENU...")
    populate_db(MENU)