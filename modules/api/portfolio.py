from flask import Blueprint, jsonify, request, abort
from flask_cors import cross_origin
import finviz
import finnhub
import json

# This API key is already public so it doesn't make a difference
finnhub_client = finnhub.Client(api_key="c02ql9n48v6v3d2p6ojg")

portfolio_api_bp = Blueprint('portfolio_api_bp', __name__, url_prefix='/api/portf')


@portfolio_api_bp.route('/get_all_tickers', methods=['GET'])
@cross_origin()
def get_all_tickers():
    with open('static_data/feb2eod.json') as f:
        data = json.load(f)
    return jsonify(data['info'])


@portfolio_api_bp.route('/get_tickers', methods=['GET'])
@cross_origin()
def get_tickers():
    param = request.args.get('symbols')
    if not param:
        abort(400)
    param = param.strip()

    symbol_list = param.split(",")

    ll = []
    for symbol in symbol_list:
        ticker_info = finnhub_client.company_basic_financials(symbol, metric='all')
        ll.append({
            symbol: ticker_info['metric']
        })

    return jsonify(ll)


@portfolio_api_bp.route('/get_rec', methods=['GET'])
@cross_origin()
def get_rec():
    monthly_income = request.args.get('monthlyIncome')
    savings_percent = request.args.get('savingsPercent')
    risk = request.args.get('risk')

    if not monthly_income or not savings_percent or not risk:
        abort(400)

    try:
        monthly_income = float(monthly_income)
        savings_percent = round(int(savings_percent) / 100, 2)
        risk = str(risk).strip().lower()

        if risk != 'low' and risk != 'balanced' and risk != 'high':
            raise Exception
    except:
        abort(400)

    with open('static_data/ishares.json') as f:
        ishares = json.load(f)

    if risk == 'low':
        lb = 0
        ub = 4
    elif risk == 'balanced':
        lb = 5
        ub = 6
    else:
        lb = 7
        ub = 10

    risk_narrowed = []
    for item in ishares["items"]:
        risk = int(item['Five Risk'])
        if lb <= risk <= ub:
            risk_narrowed.append(item)

    spending_power = monthly_income * savings_percent

    for item in risk_narrowed:
        price = item['Price'].replace("$", "")
        share_price = float(price)
        item['Buying Power'] = round(spending_power / share_price, 2)

    rec = max(risk_narrowed, key=lambda x: x['Buying Power'])
    ishares["items"].remove(rec)

    return jsonify(
        recommended=rec,
        rest=ishares['items']
    )
