import React, { useState, useEffect } from 'react'
import { Card, CardContent, CircularProgress, Tooltip, Typography } from '@material-ui/core'

export const PortfolioOverview = (props) => {

    const { tickSharePair, stock } = props

    let symbols = ''
    let totalValue = 0

    stock.forEach(obj => {
        symbols += obj.id + '|' + tickSharePair[obj.id] + '|' + obj.price + ','
        totalValue += tickSharePair[obj.id] * obj.price
    });
    symbols = symbols.substring(0, symbols.length - 1);
    console.log(symbols)
    // for(const [key, value] of Object.entries(tickSharePair)) {
    //     symbols += key + '|' + tickSharePair[key] + '|' + stock
    // }

    const SUS_URL = `http://localhost:5000/api/sustainability/esg_all?symbols=${symbols}&totalPortfolioValue=${totalValue}`
    const SENTIMENT_URL = `http://localhost:5000/api/news/get_total_sentiment?symbols=${symbols}&totalPortfolioValue=${totalValue}`


    const [portDataFetched, setPortDataFetched] = useState(false)
    const [totalRisk, setTotalRisk] = useState(0)
    const [totalControversy, setTotalControversy] = useState(0)
    const [totalControversyMax, setTotalControversyMax] = useState(0)
    const [portData, setPortData] = useState({})

    const [sentimentDataFetched, setSentimentDataFetched] = useState(false)
    const [bull, setBull] = useState(0)
    const [sentData, setSentData] = useState({})

    const [loadingSus, setLoadingSus] = useState(true)
    const [loadingSent, setLoadingSent] = useState(true)

    useEffect(() => {
        fetch(SUS_URL, {
            method: 'GET',
            mode: 'cors',
        })
            .then(data => data.json())
            .then(data => {
                setPortData(data)
                setTotalRisk(totalRisk + data.total_risk)
                setTotalControversy(totalControversy + data.total_controversy)
                setTotalControversyMax(totalControversyMax + data.total_controversy_max)
                setLoadingSus(!loadingSus)
            })
        // if (!portDataFetched) {
        //     console.log('here')
        //     fetch(SUS_URL, {
        //         method: 'GET',
        //         mode: 'cors',
        //     })
        //         .then(data => data.json())
        //         .then(data => {
        //             setPortData(data)
        //             setTotalRisk(totalRisk + data.total_risk)
        //             setTotalControversy(totalControversy + data.total_controversy)
        //             setTotalControversyMax(totalControversyMax + data.total_controversy_max)
        //         })
        //     setPortDataFetched(!portDataFetched)
        // }
        fetch(SENTIMENT_URL, {
            method: 'GET',
            mode: 'cors',
        })
            .then(data => data.json())
            .then(data => {
                setSentData(data)
                setBull(bull + data.bullish_sentiment)
                setLoadingSent(() => {
                    console.log(loadingSent)
                    return !loadingSent
                })
            })
        // if (!sentimentDataFetched) {
        //     fetch(SENTIMENT_URL, {
        //         method: 'GET',
        //         mode: 'cors',
        //     })
        //         .then(data => data.json())
        //         .then(data => {
        //             setSentData(data)
        //             setBull(bull + data.bullish_sentiment)
        //         })
        //     setSentimentDataFetched(!sentimentDataFetched)
        // }


    }, [stock])
    return (

        <Card>
            
            <CardContent>
                <Typography variant="h4">
                    Portfolio Overview
                </Typography>
                <Typography variant="h6">
                    Sustainability Overview
                </Typography>
                <Typography>
                    {loadingSus ? <CircularProgress /> : `Total Risk: ${totalRisk}`}
                </Typography>
                <Typography>
                    {loadingSus ? <CircularProgress /> : `Total Controversy: ${totalControversy}/${totalControversyMax}`}
                </Typography>
                <Typography variant="h6">
                    Sentiment Overview
                </Typography>
                <Typography>
                    {loadingSent ? <CircularProgress /> : `Overall Bullish Sentiment: ${bull}`}
                </Typography>
            </CardContent>
        </Card>
    )
}