from flask import Blueprint, jsonify, request
import finviz
import finnhub
import json

# This API key is already public so it doesn't make a difference
finnhub_client = finnhub.Client(api_key="c02ql9n48v6v3d2p6ojg")

portfolio_api_bp = Blueprint('portfolio_api_bp', __name__, url_prefix='/api/portf')


@portfolio_api_bp.route('/get_all_tickers', methods=['GET'])
def get_all_tickers():
    with open('feb2eod.json') as f:
        data = json.load(f)
    return jsonify(data['info'])


@portfolio_api_bp.route('/get_tickers', methods=['GET'])
def get_ticker():
    param = request.args.get('symbols')
    symbol_list = param.split(",")

    ll = []
    for symbol in symbol_list:
        ticker_info = finnhub_client.company_basic_financials(symbol, metric='all')
        ll.append({
            symbol: ticker_info
        })

    return jsonify(ll)
