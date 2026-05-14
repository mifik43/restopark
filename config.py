import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///restopark.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static', 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME') or 'admin'
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD') or 'admin123'

    PRINTER_TYPE = os.environ.get('PRINTER_TYPE', 'usb')  # usb, network, file
    PRINTER_USB_VENDOR = 0x04b8  # Пример для Epson
    PRINTER_USB_PRODUCT = 0x0202
    PRINTER_NETWORK_HOST = '192.168.1.100'
    PRINTER_NETWORK_PORT = 9100
    PRINTER_FILE_PATH = 'receipt.txt'  # для отладки в файл