<p align="center">
    <img alt="Landr Logo" src="assets/landrlogo.png">
</p>

<p align="center">
 <a href="https://www.python.org/downloads/release/python-375/" target="_blank">
    <img alt="Made with Python" src="https://forthebadge.com/images/badges/made-with-python.svg">
  </a>
  
  <a href="https://github.com/ssyuen/GreenRock/graphs/contributors" target="_blank">
    <img alt="Built with love" src="https://forthebadge.com/images/badges/built-with-love.svg">  
  </a>
  
   <a href="https://github.com/ssyuen/GreenRock/graphs/contributors" target="_blank">
    <img alt="Gluten Free" src="https://forthebadge.com/images/badges/made-with-crayons.svg">
  </a>
  
  <br>
  
  <a href="https://github.com/ssyuen/GreenRock/commits/master" target="_blank">
    <img alt="Last Commit" src="https://img.shields.io/github/last-commit/ssyuen/GreenRock/master.svg?style=for-the-badge">
  </a>
  
  <a href="https://github.com/ssyuen/GreenRock/graphs/contributors" target="_blank">
    <img alt="Landr contributors" src="https://img.shields.io/github/contributors/ssyuen/GreenRock.svg?style=for-the-badge">
  </a>
</p>

<br>
<br>

## Objective
For the UGAHacks **BlackRock** challenge, we wanted to build a platform that would allow users to build their own
portfolio with helpful tooltips and information with sustainable investments in mind. This project comes at a time
when many people are beginning to invest their money into the market, and we believe Landr, pronounced as Lander,
educates them about certain important performance metrics while holding to account risk and portfolio sustainability.
We chose the name Lander because of the recent investing frenzy of going to the moon. We hope Landr will help land you
on the moon and land you a great portfolio.

## Introduction
Landr is a web application that allows an individual to build their portfolio. They can choose a variety of stocks by
searching or filtering by price, sector, name, and other variables. Landr also provides very unique information such
as a ticker ESG (Environment, Social and Governance) risk rating and overall sustainability score. Landr also provides
the same information to your portfolio by aggregating risk and weighting share amounts. In addition to sustainability,
the platform provides news sentiment whether your portfolio has bullish or bearish sentiment based off the news.

## Audience
Our target audience is anybody who is looking to invest their money responsibly while remaining educated about
the risks and rewards of their investments.

### Landr Platform Structure
The frontend stack of Landr was created with React.js and various other libraries for data visualization. The backend
stack was created using Python 3 and Flask. Landr is a responsive application by virtue of the front end stack.

## Key Challenges
Our main challenges included Data Visualization and API access. There are many free API's which give plenty of information.
We decided that we did not want to simply query the information and display it to the user. Factors such as sustainability
risk, controversy, and news sentiment are aggregated and weighted based on various factors of your portfolio such as
number of shares, share price, and total portfolio value.

### Important Note
**The initial data shown on the 'Build Your Portfolio' table is EOD S&P 500 stock information from Friday, February 5**. 
This could easily have been replaced with live data, but we encountered API restrictions for daily call limits.

## How we utilized APIs and other tools through our demo
- **Finnhub.io** for ticker information and basic company financials
- **Finviz** for certain ticker visuals
- **BeautifulSoup** + **Selenium** for web-scraping Yahoo ESG risk data for a single ticker
- **RapidApi** + **ESG Data (esg.enterprise.app)** for ESG total scores for a single ticker
- **D3** Charts for Data visualization

## How would we improve Landr?
Given more time, our team would have loved to incorporate a more immersive and user centric design. This would mean
the ability to save portfolios and preferences to a cloud instance. Furthermore, we would have loved to add creative
and unique data from other APIs to really tailor information based on the user's interests.

# Technical? Run it yourself!

## Requirements

- Python - version must be `>= 3.7`  
- pip + pipenv
- Node.js

## Setup

Run `pipenv install` if you are cloning the project for the first time or if any new packages have been added.

## Execution

### Backend commands
For development on a unix based environment, go to the root project directory: 
```
pipenv run server
```

For development on a windows environment, go to the root project directory:
```
pipenv shell
.\start.ps1
```

### Frontend commands
To run the frontend locally: `npm start`
To install new packages from new changes: `npm ci`

