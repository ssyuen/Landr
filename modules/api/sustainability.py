from flask import Blueprint, jsonify, request, abort
from flask_cors import cross_origin
from selenium import webdriver
from bs4 import BeautifulSoup

sust_api_bp = Blueprint('sust_api_bp', __name__, url_prefix='/api/sustainability')


@sust_api_bp.route('/esg', methods=['GET'])
@cross_origin()
def esg():
    param = request.args.get('symbol')
    if not param:
        abort(400)
    param = param.strip()

    options = webdriver.ChromeOptions()
    options.add_argument('--ignore-certificate-errors')
    options.add_argument('--incognito')
    options.add_argument('--headless')
    driver = webdriver.Chrome("bin/chromedriver/chromedriver.exe", chrome_options=options)

    driver.get(f"https://finance.yahoo.com/quote/{param}/sustainability")

    soup = BeautifulSoup(driver.page_source, "html.parser")
    try:
        total_esg = \
            soup.select("#Col1-0-Sustainability-Proxy .Fz\\(36px\\).Fw\\(600\\).D\\(ib\\).Mend\\(5px\\)")[0].text
        total_esg_cat = \
            soup.select("#Col1-0-Sustainability-Proxy .Fz\\(s\\).Fw\\(500\\).smartphone_Pstart\\(4px\\)")[0].text
    except IndexError:
        total_esg = "N/A"
        total_esg_cat = "N/A"

    return jsonify(
        total_esg=total_esg,
        total_esg_cat=total_esg_cat
    )
