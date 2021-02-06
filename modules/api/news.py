from flask import Blueprint, jsonify, request, abort
from flask_cors import cross_origin
import finnhub

finnhub_client = finnhub.Client(api_key="c02ql9n48v6v3d2p6ojg")

news_api_bp = Blueprint('news_api_bp', __name__, url_prefix='/api/news')


@news_api_bp.route('/test_function', methods=['GET'])
@cross_origin()
def test_function():
    return jsonify(
        Hello="World"
    )

@news_api_bp.route('/get_sentiment', methods=['GET'])
@cross_origin()
def get_sentiment():
    param = request.args.get('symbol')
    if not param:
        abort(400)
    param = param.strip()
    return _get_sentiment_for_symbol(param)


def _get_sentiment_for_symbol(symbol):
    sentiment_info = finnhub_client.news_sentiment(symbol)
    print(sentiment_info)
    return jsonify(sentiment=sentiment_info)

@news_api_bp.route('/get_total_sentiment', methods=['GET'])
@cross_origin()
def get_total_sentiment():
    param = request.args.get('symbols')
    port_val = request.args.get("totalPortfolioValue")
    
    if not param or not port_val:
        abort(400)

    port_val = float(port_val)
    symbols = param.split(",")  # ['AAPL|2|153.23', 'TSLA|3|850.20', 'PFE|1|15.22', 'T|2|45.25']
    
    total_bullish_sentiment = 0

    for symbol in symbols:
        share_split = symbol.split("|")
        ticker = str(share_split[0])
        num_shares = int(share_split[1])
        share_price = float(share_split[2])

        weight = (num_shares * share_price) / port_val
        resp = _get_sentiment_for_symbol(ticker).json
        
        if resp and resp['sentiment'] and resp['sentiment']['sentiment']:
            resp = resp['sentiment']['sentiment']['bullishPercent']
            total_bullish_sentiment += resp * num_shares * share_price / port_val

    return jsonify(bullish_sentiment=total_bullish_sentiment)