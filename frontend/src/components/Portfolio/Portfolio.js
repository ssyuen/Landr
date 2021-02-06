import React, { useState, useEffect } from 'react'

import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, Grid, IconButton, Tooltip, Typography } from '@material-ui/core'

import { AddIcon, CloseIcon, DataGrid, GridToolbar } from '@material-ui/data-grid';
import { Doughnut } from 'react-chartjs-2'
import RemoveIcon from '@material-ui/icons/Remove';

const columns = [
    { field: 'id', headerName: 'Ticker', width: 100 },
    { field: 'Name', headerName: 'Name', width: 180 },
    { field: 'Market Cap', headerName: 'Market Cap', width: 200 },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        width: 90,
    },
    {
        field: 'p/e ratio',
        headerName: 'P/E Ratio',
        type: 'number',
        width: 120,
    },
    {
        field: 'sector',
        headerName: 'Sector',
        width: 250,
    },
];



export const Portfolio = () => {
    const [stockData, setStockData] = useState([])
    const [stockDataFetched, setStockDataFetched] = useState(false)


    const [userPortfolioData, setUserPortfolioData] = useState({
        labels: [],
        datasets: [{
            label: 'Portfolio Breakdown',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 302, 255, 0.2)',
                'rgba(255, 259, 64, 0.2)',
                'rgba(255, 199, 132, 0.2)',
                'rgba(54, 122, 235, 0.2)',
                'rgba(255, 236, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 202, 255, 0.2)',
                'rgba(255, 352, 64, 0.2)',
                'rgba(255, 29, 132, 0.2)',
                'rgba(54, 132, 235, 0.2)',
                'rgba(255, 106, 86, 0.2)',
                'rgba(75, 152, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 154, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 302, 255, 0.2)',
                'rgba(255, 259, 64, 0.2)',
                'rgba(255, 199, 132, 0.2)',
                'rgba(54, 122, 235, 0.2)',
                'rgba(255, 236, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 202, 255, 0.2)',
                'rgba(255, 352, 64, 0.2)',
                'rgba(255, 29, 132, 0.2)',
                'rgba(54, 132, 235, 0.2)',
                'rgba(255, 106, 86, 0.2)',
                'rgba(75, 152, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 154, 64, 0.2)',
            ],
            borderWidth: 1,
        }]
    })
    const [currPortLength, setCurrPortLength] = useState(0)

    const [tickSharePair, setTickSharePair] = useState({})

    useEffect(() => {
        if (!stockDataFetched) {
            // FETCH ALL STOCK DATA HERE
            fetch('http://localhost:5000/api/portf/get_all_tickers', {
                method: 'GET',
                mode: 'cors',


            })
                .then(data => data.json())
                .then(data => {
                    // SET IT INTO stockData

                    let rows = []
                    data.forEach(res => {

                        let tickerName = Object.getOwnPropertyNames(res)[0]

                        // VALUSE REFERS TO THE OBJECT POINTED BY tickerName
                        let values = res[tickerName]
                        let companyName = values['Company']
                        let stockPrice = values['Price']
                        let peRatio = values['P/E']
                        let sector = values['Industry']
                        let marketCap = values['Market Cap']
                        let volatility = values['Volatility']
                        let beta = values['Beta']
                        let volume = values['Volume']


                        rows.push({
                            id: tickerName,
                            Name: companyName,
                            price: stockPrice,
                            'p/e ratio': peRatio,
                            'Market Cap': marketCap,
                            'sector': sector,
                            volatility: volatility,
                            beta: beta,
                            volume: volume,
                        })
                    });
                    setStockData(rows)
                    // SET stockDataFetched to True
                    setStockDataFetched(true)
                })

        }

    })



    return (
        <div style={{ height: '600px' }}>
            <Typography variant="h2" component="h2" gutterBottom>
                Build Your Portfolio!
            </Typography>
            <DataGrid
                autoPageSize
                rows={stockData}
                columns={columns}

                checkboxSelection
                onSelectionChange={stock => {
                    console.log(stock)
                    if (stock.rowIds.length === 0) {
                        setTickSharePair({})
                        setUserPortfolioData(prevPortData => (
                            {
                                labels: [],
                                datasets: [{
                                    data: [],
                                    backgroundColor: [...prevPortData.datasets[0].backgroundColor],
                                    borderColor: [...prevPortData.datasets[0].borderColor],
                                }]
                            }))
                    }

                    // DONT LET USER DO THIS
                    else if (stock.rowIds.length === 501) {
                        let data = []

                        for (let i = 0; i < 501; i++) {
                            data.push(10)
                        }
                        setUserPortfolioData(prevPortData => (

                            {
                                labels: stock.rowIds,
                                datasets: [{
                                    data: [...prevPortData.datasets[0].data, 10],
                                    backgroundColor: [...prevPortData.datasets[0].backgroundColor],
                                    borderColor: [...prevPortData.datasets[0].borderColor],
                                }]
                            }))
                    }
                    // SUBTRACTING A STOCK FROM PORFTOLIO
                    else if (stock.rowIds.length - 1 < currPortLength) {
                        let currentSet = new Set(stock.rowIds)
                        let oldSet = userPortfolioData.labels.filter(ticker => !currentSet.has(ticker))
                        console.log(oldSet)
                        let oldTicker = oldSet[0]
                        let temp = tickSharePair
                        delete temp[oldTicker]
                        console.log(temp)
                        setTickSharePair(temp)
                        setUserPortfolioData(prevPortData => (
                            {
                                labels: stock.rowIds,
                                datasets: [{
                                    data: [...prevPortData.datasets[0].data.slice(0, -1)],
                                    backgroundColor: [...prevPortData.datasets[0].backgroundColor],
                                    borderColor: [...prevPortData.datasets[0].borderColor],
                                }]
                            }
                        ))
                    }
                    // ADDING A STOCK TO PORTFOLIO
                    else {
                        let tickerName = stock.rowIds[stock.rowIds.length - 1]
                        setTickSharePair({ ...tickSharePair, [tickerName]: 10 })

                        setUserPortfolioData(prevPortData => ({
                            labels: [...prevPortData.labels, tickerName],
                            datasets: [{
                                data: [...prevPortData.datasets[0].data, tickSharePair[[tickerName]]],
                                backgroundColor: [...prevPortData.datasets[0].backgroundColor],
                                borderColor: [...prevPortData.datasets[0].borderColor],
                            }]
                        }))


                    }
                    console.log(tickSharePair)
                    setCurrPortLength(stock.rowIds.length - 1)
                }}
                showToolbar
                components={{
                    Toolbar: GridToolbar
                }
                }
            />
            <Grid container justify="space-between">
                <Grid item xs>
                    <Doughnut data={userPortfolioData}></Doughnut>


                </Grid>
                <Grid item xs>
                    {userPortfolioData.labels.length !== 0 ? <Card>
                        <CardContent>
                            {userPortfolioData.labels.map(ticker => {
                                return (
                                    <Accordion>
                                        <AccordionSummary>
                                            <Typography variant="h5">
                                                {ticker} -- {tickSharePair.[ticker]} shares
                                            </Typography>
                                            <IconButton
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    let oldCount = tickSharePair.[ticker]
                                                    setTickSharePair({...tickSharePair, [ticker]: oldCount + 1})
                                                }}
                                                onFocus={(event) => event.stopPropagation()}>
                                                <AddIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    let oldCount = tickSharePair.[ticker]
                                                    setTickSharePair({...tickSharePair, [ticker]: oldCount - 1})
                                                }}
                                                onFocus={(event) => event.stopPropagation()}>
                                                <RemoveIcon />
                                            </IconButton>
                                        </AccordionSummary>
                                        <AccordionDetails>

                                            {
                                                stockData.filter((stock) => {
                                                    return stock.id === ticker
                                                }).map(stock => {

                                                    return (
                                                        <div>

                                                            <Tooltip title="The name of the company">
                                                                <Typography>
                                                                    Company: {stock.Name}
                                                                </Typography>
                                                            </Tooltip>
                                                            <Tooltip title="The current trading price of the stock">
                                                                <Typography>
                                                                    Price: {stock.price}
                                                                </Typography>
                                                            </Tooltip>
                                                            <Tooltip title="The price earnings ratio of the stock">
                                                                <Typography>
                                                                    P/E Ratio: {stock.['p/e ratio']}
                                                                </Typography>
                                                            </Tooltip>
                                                            <Tooltip title="The current trading volume of the stock">
                                                                <Typography>
                                                                    Volume: {stock.volume}
                                                                </Typography>
                                                            </Tooltip>
                                                            <Tooltip title="The systematic risk of the stock compared to the entire market">
                                                                <Typography>
                                                                    Beta: {stock.beta}
                                                                </Typography>
                                                            </Tooltip>
                                                            <Tooltip title="The total dollar market value of the outstanding shares">
                                                                <Typography>
                                                                    Market Cap.: {stock['Market Cap']}
                                                                </Typography>
                                                            </Tooltip>
                                                            <Tooltip title="The market sector that the company resides in">
                                                                <Typography>
                                                                    Sector: {stock.sector}
                                                                </Typography>
                                                            </Tooltip>

                                                        </div>


                                                    )
                                                })

                                            }
                                        </AccordionDetails>
                                    </Accordion>

                                )
                            })}
                        </CardContent>
                    </Card> : <div></div>}

                </Grid>
            </Grid>



        </div>

    )
}