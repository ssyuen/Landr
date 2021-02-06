from flask import Flask
from flask_cors import CORS
from selenium import webdriver

import secrets

options = webdriver.ChromeOptions()
options.add_argument('--ignore-certificate-errors')
options.add_argument('--incognito')
options.add_argument('--headless')
driver = webdriver.Chrome("bin/chromedriver/chromedriver.exe", chrome_options=options)

def create_server():
    app = Flask(__name__)
    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    with app.app_context():
        
        # secret_key generation
        app.secret_key = secrets.token_urlsafe(256)

        # if you reformat this code, the imports go up resulting in
        # circular importing which breaks the blueprint architecture

        from modules.api import news 
        from modules.api import portfolio 
        from modules.api import sustainability as sust

        app.register_blueprint(news.news_api_bp)
        app.register_blueprint(portfolio.portfolio_api_bp)
        app.register_blueprint(sust.sust_api_bp)

        # app.register_error_handler(404,page_not_found)
        # app.register_error_handler(500,logic_error)

    return app
