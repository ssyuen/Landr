import React, { useState, useEffect } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CircularProgress, Grid, IconButton, Tooltip, Typography } from '@material-ui/core'


export const CompanyData = (props) => {
    const SENTIMENT_URL = 'http://localhost:5000/api/news/get_sentiment?symbol='
    const SUS_URL = 'http://localhost:5000/api/sustainability/esg?symbol='

    const { stock } = props;

    const [sentimentFetched, setSentimentFetched] = useState(false)
    const [buzz, setBuzz] = useState(0)
    const [bull, setBull] = useState(0)

    const [susFetched, setSusFetched] = useState(false)
    const [esgTotalGrade, setEsgTotalGrade] = useState('')
    const [esgTotalScore, setEsgTotalScore] = useState(0)
    const [cat, setCat] = useState('')
    const [ctvsy, setCtvsy] = useState(0)
    const [esg, setEsg] = useState(0)



    useEffect(() => {
        if (!sentimentFetched) {
            fetch(SENTIMENT_URL + stock.id, {
                method: 'GET',
                mode: 'cors',
            })
                .then(data => data.json())
                .then(data => {
                    setBuzz(data.sentiment.buzz.buzz)
                    setBull(data.sentiment.sentiment.bullishPercent)

                })
            setSentimentFetched(!sentimentFetched)
        }

        if (!susFetched) {
            fetch(SUS_URL + stock.id, {
                method: 'GET',
                mode: 'cors',
            })
                .then(data => data.json())
                .then(data => {
                    setEsgTotalGrade(data.esg_total_grade)
                    setEsgTotalScore(data.esg_total_score)
                    setCat(data.yahoo_esg_cat)
                    setCtvsy(data.yahoo_ctvsy)
                    setEsg(data.yahoo_esg)
                })
            setSusFetched(!susFetched)
        }
    })

    return (
        <Grid container>
            <Grid item xs>
                <Tooltip title="The name of the company" aria-label="The name of the company">
                    <Typography>
                        Company: {stock.Name}
                    </Typography>
                </Tooltip>
                <Tooltip title="The current trading price of the stock" aria-label="The current trading price of the stock">
                    <Typography>
                        Price: {stock.price}
                    </Typography>
                </Tooltip>
                <Tooltip title="The price earnings ratio of the stock" aria-label="The price earnings ratio of the stock">
                    <Typography>
                        P/E Ratio: {stock.['p/e ratio']}
                    </Typography>
                </Tooltip>
                <Tooltip title="The current trading volume of the stock" aria-label="The current trading volume of the stock">
                    <Typography>
                        Volume: {stock.volume}
                    </Typography>
                </Tooltip>
                <Tooltip title="The systematic risk of the stock compared to the entire market" aria-label="The systematic risk of the stock compared to the entire market">
                    <Typography>
                        Beta: {stock.beta}
                    </Typography>
                </Tooltip>
                <Tooltip title="The total dollar market value of the outstanding shares" aria-label="The total dollar market value of the outstanding shares">
                    <Typography>
                        Market Cap.: {stock['Market Cap']}
                    </Typography>
                </Tooltip>
                <Tooltip title="The market sector that the company resides in" aria-label="The market sector that the company resides in">
                    <Typography>
                        Sector: {stock.sector}
                    </Typography>
                </Tooltip>
            </Grid>
            <Grid item xs>
                <Tooltip title="The ESG total grade is an ESG rating indicating overall sustainability scaling from: CCC, CC, C, BBB,...AAA where AAA has the best score." aria-label="The ESG total grade is an ESG rating indicating overall sustainability scaling from: CCC, CC, C, BBB,...AAA where AAA has the best score.">
                    <Typography >
                        ESG Total Grade: {esgTotalGrade}
                    </Typography>
                </Tooltip>
                <Tooltip title="The ESG total score is a numerical value representing the ESG total grade." aria-label="The ESG total score is a numerical value representing the ESG total grade.">
                    <Typography>
                        ESG Total Score: {esgTotalScore}
                    </Typography>
                </Tooltip>
                <Tooltip title="The ESG Category is a measure of risk assessment as a categorical measure. All data and summary taken from Yahoo Finance." aria-label="The ESG Category is a measure of risk assessment as a categorical measure. All data and summary taken from Yahoo Finance.">
                    <Typography>
                        ESG Category: {cat}
                    </Typography>
                </Tooltip>

                <Tooltip title="The Yahoo controversy risk score identifies incidents and events that may negatively impact investors. Controversies are rated on a scale from one to five with five denoting the most serious controversies. All data and summary taken from Yahoo Finance" aria-label="The Yahoo controversy risk score identifies incidents and events that may negatively impact investors. Controversies are rated on a scale from one to five with five denoting the most serious controversies. All data and summary taken from Yahoo Finance">
                    <Typography>
                        Controversy: {ctvsy}
                    </Typography>
                </Tooltip>
                <Tooltip title="The Yahoo sustainability ESG (environmental, social, governance) risk score is a measure of unmanaged risk on an absolute scale of 0-100, with a lower score signaling less unmanaged ESG risk. All data and summary taken from Yahoo Finance." aria-label="The Yahoo sustainability ESG (environmental, social, governance) risk score is a measure of unmanaged risk on an absolute scale of 0-100, with a lower score signaling less unmanaged ESG risk. All data and summary taken from Yahoo Finance.">
                    <Typography>
                        Yahoo ESG: {esg}
                    </Typography>
                </Tooltip>

            </Grid>
            <Grid item xs>
                <Tooltip title="The references to this stock in the news relative to the average news a stock receives; buzz above 1 is more referenced." aria-label="The references to this stock in the news relative to the average news a stock receives; buzz above 1 is more referenced.">
                    <Typography style={{ color: (buzz >= 1 ? 'green' : 'red') }}>
                        Buzz: {buzz}
                    </Typography>
                </Tooltip>
                <Tooltip title="Positive sentiment gathered over a variety of news sources regarding the stock; a score of 1 is highly positive sentiment." aria-label="Positive sentiment gathered over a variety of news sources regarding the stock; a score of 1 is highly positive sentiment.">
                    <Typography style={{ color: (bull >= 1 ? 'green' : 'red') }}>
                        Bullish Sentiment: {bull}
                    </Typography>
                </Tooltip>
            </Grid>

        </Grid>
    )
}