# sync_slugs.py
from app import app, db
from models import Category

def transliterate(text):
    # Простая транслитерация русских букв в латиницу
    mapping = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e',
        'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
        'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
        'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
        'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya',
        ' ': '-', '_': '-', ',': '', '.': '', '?': '', '!': '', '(':'', ')':'',
        '/': '-', '\\': '-'
    }
    text = text.lower()
    result = ''
    for ch in text:
        result += mapping.get(ch, ch)
    # Убираем повторяющиеся дефисы
    while '--' in result:
        result = result.replace('--', '-')
    return result.strip('-')

def update_slugs():
    with app.app_context():
        categories = Category.query.all()
        for cat in categories:
            # Генерируем slug из названия
            new_slug = transliterate(cat.name)
            # Для подкатегорий добавляем префикс родительской категории (опционально)
            if cat.parent:
                parent_slug = transliterate(cat.parent.name)
                new_slug = cat.name.lower().replace(' ', '-').replace('(', '').replace(')', '')
                #new_slug = f"{parent_slug}-{new_slug}"
            if cat.slug != new_slug:
                print(f"Обновление: {cat.slug} -> {new_slug}")
                cat.slug = new_slug
        db.session.commit()
        print("Готово!")

if __name__ == '__main__':
    update_slugs()