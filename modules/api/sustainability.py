import requests
from flask import Blueprint, jsonify, request, abort
from flask_cors import cross_origin
from selenium import webdriver
from bs4 import BeautifulSoup

from server import driver

sust_api_bp = Blueprint('sust_api_bp', __name__, url_prefix='/api/sustainability')

@sust_api_bp.route('/esg', methods=['GET'])
@cross_origin()
def esg():
    param = request.args.get('symbol')
    if not param:
        abort(400)
    param = param.strip()
    return _get_esg_for_symbol(param)


def _get_esg_for_symbol(symbol):
    driver.get(f"https://finance.yahoo.com/quote/{symbol}/sustainability")

    soup = BeautifulSoup(driver.page_source, "html.parser")

    yahoo_esg = soup.select("#Col1-0-Sustainability-Proxy .Fz\\(36px\\).Fw\\(600\\).D\\(ib\\).Mend\\(5px\\)")
    yahoo_esg_cat = soup.select("#Col1-0-Sustainability-Proxy .Fz\\(s\\).Fw\\(500\\).smartphone_Pstart\\(4px\\)")
    yahoo_env_risk = soup.select('#Col1-0-Sustainability-Proxy .D\\(ib\\).Fz\\(23px\\).smartphone_Fz\\(22px\\).Fw\\(600\\)[data-reactid="35"]')
    yahoo_soc_risk = soup.select('#Col1-0-Sustainability-Proxy .D\\(ib\\).Fz\\(23px\\).smartphone_Fz\\(22px\\).Fw\\(600\\)[data-reactid="43"]')
    yahoo_gov_risk = soup.select('#Col1-0-Sustainability-Proxy .D\\(ib\\).Fz\\(23px\\).smartphone_Fz\\(22px\\).Fw\\(600\\)[data-reactid="51"]')
    yahoo_ctvsy = soup.select('.D\\(ib\\).Fz\\(36px\\).Fw\\(500\\)[data-reactid="79"]')

    url = "https://esg-environmental-social-governance-data.p.rapidapi.com/search"
    querystring = {"q": symbol}
    headers = {
        'x-rapidapi-key': "26c6486bd1msh19e9440170cabdcp119f29jsne6eb28dc1308",
        'x-rapidapi-host': "esg-environmental-social-governance-data.p.rapidapi.com"
    }

    r = requests.request("GET", url, headers=headers, params=querystring)
    esg_broad = r.json()[0]

    return jsonify(
        yahoo_esg=yahoo_esg[0].text if len(yahoo_esg) != 0 else None,
        yahoo_esg_cat=yahoo_esg_cat[0].text if len(yahoo_esg_cat) != 0 else None,
        yahoo_env_risk=yahoo_env_risk[0].text if len(yahoo_env_risk) != 0 else None,
        yahoo_soc_risk=yahoo_soc_risk[0].text if len(yahoo_soc_risk) != 0 else None,
        yahoo_gov_risk=yahoo_gov_risk[0].text if len(yahoo_gov_risk) != 0 else None,
        yahoo_ctvsy=yahoo_ctvsy[0].text if len(yahoo_ctvsy) != 0 else None,
        esg_total_grade=esg_broad.get("total_grade"),
        esg_total_score=esg_broad.get("total")
    )


@sust_api_bp.route('/esg_all', methods=['GET'])
@cross_origin()
def esg_all():
    param = request.args.get('symbols')
    port_val = request.args.get("totalPortfolioValue")

    if not param or not port_val:
        abort(400)

    port_val = float(port_val)
    symbols = param.split(",")  # ['AAPL|2|153.23', 'TSLA|3|850.20', 'PFE|1|15.22', 'T|2|45.25']

    total_risk = 0
    total_controversy = 0

    for symbol in symbols:
        share_split = symbol.split("|")
        ticker = str(share_split[0])
        num_shares = int(share_split[1])
        share_price = float(share_split[2])

        weight = (num_shares * share_price) / port_val
        resp = _get_esg_for_symbol(ticker).json

        if resp['yahoo_esg'] is None or resp['yahoo_ctvsy'] is None:
            continue

        risk = int(resp["yahoo_esg"]) * weight
        total_risk += risk
        total_controversy += int(resp['yahoo_ctvsy'])

    return jsonify(
        total_risk=total_risk,
        total_controversy=total_controversy,
        total_controversy_min=0,
        total_controversy_max=5 * len(symbols)
    )

