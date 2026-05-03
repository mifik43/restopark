import re

with open('static/js/script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Извлекаем объект menuData
match = re.search(r'const menuData = ({.*?});', content, re.DOTALL)
if not match:
    print("Не найден menuData")
    exit()

js_obj = match.group(1)
# Убираем trailing commas (недопустимые в Python) — упрощённо
# Преобразуем true/false/null
python_obj = js_obj.replace('true', 'True').replace('false', 'False').replace('null', 'None')

# Сохраняем как Python-словарь
with open('menu_data.py', 'w', encoding='utf-8') as f:
    f.write(f"MENU = {python_obj}\n")

print("menu_data.py создан!")