from os import getenv
from dotenv import load_dotenv

load_dotenv(".env")

CONFIG = {
    "MYSQL_USER": getenv("MYSQL_USER", "root"),
    "MYSQL_PASSWORD": getenv("MYSQL_PASSWORD", "pwd"),
    "MYSQL_DB": getenv("MYSQL_DB", "planmytrip"),
    "MYSQL_HOST": getenv("MYSQL_HOST", "localhost"),
    "MYSQL_PORT": getenv("MYSQL_PORT", 3306),
    "MYSQL_CURSORCLASS": 'DictCursor',
    "secret_key": getenv("SECRET_KEY", "chupkesechupkesechandkeanchaltale")
}