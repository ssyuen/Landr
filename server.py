from Flask import Flask
import secrets


def create_server():
    app = Flask(__name__)
    
    with app.app_context():
        

        #secret_key generation
        app.secret_key = secrets.token_urlsafe(256)
        

        # if you reformat this code, the imports go up resulting in
        # circular importing which breaks the blueprint architecture

        # from routes.common import routes as common_routes
        # from routes.user import routes as user_routes
        # from routes.admin import routes as admin_routes
        # from routes.api import routes as api_routes
        # from routes.errors.routes import page_not_found,logic_error

        # app.register_blueprint(common_routes.common_bp)
        # app.register_blueprint(user_routes.user_bp, url_prefix="/nileuser")
        # app.register_blueprint(admin_routes.admin_bp, url_prefix="/admin")
        # app.register_blueprint(api_routes.api_bp,url_prefix="/api")

        # app.register_error_handler(404,page_not_found)
        # app.register_error_handler(500,logic_error)

    return app