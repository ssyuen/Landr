from flask import Flask
import secrets


def create_server():
    app = Flask(__name__)
    
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
