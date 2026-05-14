from escpos.printer import Usb, Network, File
from config import Config

def get_printer():
    if Config.PRINTER_TYPE == 'usb':
        return Usb(Config.PRINTER_USB_VENDOR, Config.PRINTER_USB_PRODUCT)
    elif Config.PRINTER_TYPE == 'network':
        return Network(Config.PRINTER_NETWORK_HOST, Config.PRINTER_NETWORK_PORT)
    else:
        return File(Config.PRINTER_FILE_PATH)

def print_receipt(order):
    p = get_printer()
    # Заголовок
    p.set(align='center', bold=True, double_height=True)
    p.text("RESTOPARK\n")
    p.set(bold=False, double_height=False)
    p.text("г. Самара, Южное шоссе 5\n")
    p.text("Тел: +7 (XXX) XXX-XX-XX\n")
    p.text("-" * 32 + "\n")
    # Номер заказа
    p.set(align='left')
    p.text(f"Заказ №{order.order_number}\n")
    p.text(f"Дата: {order.created_at.strftime('%d.%m.%Y %H:%M')}\n")
    p.text("-" * 32 + "\n")
    # Товары
    p.set(bold=True)
    p.text("Товар               Кол-во  Сумма\n")
    p.set(bold=False)
    total = 0
    for item in order.items:
        name = item.menu_item.name[:20] if item.menu_item else "Блюдо удалено"
        qty = item.quantity
        price = item.price * qty
        total += price
        p.text(f"{name:<20} {qty:>3} x {item.price:>5} = {price:>6}р\n")
    p.text("-" * 32 + "\n")
    p.set(bold=True, double_height=True)
    p.text(f"ИТОГО: {total} руб.\n")
    p.set(bold=False, double_height=False)
    p.text("-" * 32 + "\n")
    p.text("Спасибо за заказ!\n")
    if order.serve_time and order.serve_time != 'now':
        p.text(f"Подача: {order.serve_time}\n")
    p.cut()
    p.close()

def print_kitchen_order(order):
    """Печать кухонного заказа (без цен, с акцентом на блюда)."""
    p = get_printer()
    p.set(align='center', bold=True, double_height=True)
    p.text("КУХНЯ\n")
    p.set(bold=False, double_height=False)
    p.text("-" * 32 + "\n")
    p.text(f"Заказ №{order.order_number}\n")
    p.text(f"Время: {order.created_at.strftime('%H:%M')}\n")
    p.text("-" * 32 + "\n")
    for item in order.items:
        name = item.menu_item.name if item.menu_item else "???"
        p.text(f"  {item.quantity} x {name}\n")
    p.cut()
    p.close()