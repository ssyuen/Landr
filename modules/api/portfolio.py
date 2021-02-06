from flask import Blueprint, jsonify
import finviz
import finnhub

# This API key is already public so it doesn't make a difference
finnhub_client = finnhub.Client(api_key="c02ql9n48v6v3d2p6ojg")

portfolio_api_bp = Blueprint('portfolio_api_bp', __name__)


@portfolio_api_bp.route('/get_ticker', methods=['GET'])
def get_ticker():
    all_values = finnhub_client.stock_symbols('US')

    ll = []
    for val in all_values:
        ll.append(finviz.get_stock(val['symbol']))

    return jsonify(
        ll
    )
