from flask import Blueprint, jsonify

news_api_bp = Blueprint('news_api_bp', __name__)


@news_api_bp.route('/test_function', methods=['GET'])
def test_function():
    return jsonify(
        Hello="World"
    )
