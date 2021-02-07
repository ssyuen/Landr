import React, { useState, useEffect, useRef } from 'react'

import { Accordion, AccordionDetails, AccordionSummary, Button, Card, CardContent, CircularProgress, Grid, IconButton, Tooltip, Typography } from '@material-ui/core'

import { AddIcon, CloseIcon, DataGrid, GridToolbar, stringNumberComparer } from '@material-ui/data-grid';
import { Doughnut } from 'react-chartjs-2'
import RemoveIcon from '@material-ui/icons/Remove';
import { CompanyData } from '../CompanyData/CompanyData';
import { PortfolioOverview } from '../PortfolioOverview/PortfolioOverview';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    header: {
        width: '100%',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2),
    }
}));

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
    const classes = useStyles();

    const addingStock = useRef(false)
    const addedStock = useRef('')

    const updatingStock = useRef(false)
    const updatedStock = useRef('')

    const increment = useRef(false)
    const decrement = useRef(false)

    const [stockData, setStockData] = useState([])
    const [stockDataFetched, setStockDataFetched] = useState(false)

    const [modifiedGraph, setModifiedGraph] = useState(false)

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
            fetch('http://35.194.74.101:5000/api/portf/get_all_tickers', {
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


    useEffect(() => {
        if (addingStock.current) {
            console.log(userPortfolioData.datasets[0].data, 'checking added stock')
            console.log(tickSharePair, 'checking ticksharepair')
            let temp = userPortfolioData.datasets[0].data
            console.log(temp)
            setUserPortfolioData(prevPortData => ({
                labels: [...prevPortData.labels, addedStock.current],
                datasets: [{
                    data: [...prevPortData.datasets[0].data, tickSharePair[[addedStock.current]]],
                    backgroundColor: [...prevPortData.datasets[0].backgroundColor],
                    borderColor: [...prevPortData.datasets[0].borderColor],
                }]
            }))
            addingStock.current = false;
        }

        if (updatingStock.current) {
            if (increment.current) {
                let temp = { ...userPortfolioData }
                let indexOfStock = temp.labels.indexOf(updatedStock.current)
                let count = temp.datasets[0].data[indexOfStock]
                count += 1
                temp.datasets[0].data[indexOfStock] = count
                setUserPortfolioData(temp)
                increment.current = false
            }
            if (decrement.current) {
                let temp = { ...userPortfolioData }
                let indexOfStock = temp.labels.indexOf(updatedStock.current)
                let count = temp.datasets[0].data[indexOfStock]
                count -= 1
                temp.datasets[0].data[indexOfStock] = count
                setUserPortfolioData(temp)
                decrement.current = false
            }

            // setUserPortfolioData(prevPortData => ({
            //     labels: [...prevPortData.labels],
            //     datasets: [{
            //         data: [...prevPortData.datasets[0].data, tickSharePair[[updatedStock.current]]],
            //         backgroundColor: [...prevPortData.datasets[0].backgroundColor],
            //         borderColor: [...prevPortData.datasets[0].borderColor],
            //     }]
            // }))
            setModifiedGraph(!modifiedGraph)

            setUserPortfolioData((prevState) => {
                return prevState
            })
            updatingStock.current = false;
        }
    }, [tickSharePair])



    return (
        <div style={{ height: '600px', padding: '25px' }}>
            <div className={classes.header}>
                <Typography variant="h2" component="h2" gutterBottom>
                    Build your Portfolio!
                </Typography>
            </div>
            <DataGrid
                autoPageSize
                rows={stockData}
                columns={columns}

                checkboxSelection
                onSelectionChange={stock => {

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

                        var oldInd = 0
                        console.log('looking for ', oldSet[0])
                        console.log(userPortfolioData.labels)
                        for (let i = 0; i < userPortfolioData.labels.length; i++) {
                            console.log(userPortfolioData.labels[i])
                            console.log(userPortfolioData.labels[i].localeCompare(oldSet[0]))
                            if (userPortfolioData.labels[i] === oldSet[0]) {
                                console.log('found at ', i)
                                oldInd = i
                                break
                            }

                        }
                        let oldTicker = oldSet[0]

                        let temp = tickSharePair
                        delete temp[oldTicker]
                        let oldData = userPortfolioData
                        oldData.datasets[0].data.splice(oldInd, 1)
                        console.log(oldData.datasets[0].data, 'checking subbed data')
                        setTickSharePair(temp)
                        setUserPortfolioData(prevPortData => (
                            {
                                labels: stock.rowIds,
                                datasets: [{
                                    // data: [...prevPortData.datasets[0].data.slice(0, -1)],
                                    data: oldData.datasets[0].data,
                                    backgroundColor: [...prevPortData.datasets[0].backgroundColor],
                                    borderColor: [...prevPortData.datasets[0].borderColor],
                                }]
                            }
                        ))
                    }
                    // ADDING A STOCK TO PORTFOLIO
                    else {
                        console.log('adding')
                        let tickerName = stock.rowIds[stock.rowIds.length - 1]
                        console.log(tickerName)
                        let oldData = userPortfolioData
                        console.log(oldData)
                        setTickSharePair({ ...tickSharePair, [tickerName]: 1 })
                        addingStock.current = true;
                        addedStock.current = tickerName;
                        // setUserPortfolioData(prevPortData => ({
                        //     labels: [...prevPortData.labels, tickerName],
                        //     datasets: [{
                        //         data: [...prevPortData.datasets[0].data, tickSharePair[[tickerName]]],
                        //         backgroundColor: [...prevPortData.datasets[0].backgroundColor],
                        //         borderColor: [...prevPortData.datasets[0].borderColor],
                        //     }]
                        // }))


                    }

                    setCurrPortLength(stock.rowIds.length - 1)
                }}
                showToolbar
                components={{
                    Toolbar: GridToolbar
                }
                }
            />
            <Grid container justify="space-between" spacing={2}>
                <Grid item xs>
                    {!modifiedGraph ? <Doughnut data={userPortfolioData}></Doughnut> : <CircularProgress />}



                </Grid>
                <Grid item xs>
                    {userPortfolioData.labels.length !== 0 ? <Card>
                        <CardContent>
                            {userPortfolioData.labels.map(ticker => {
                                return (
                                    <Accordion>
                                        <AccordionSummary>
                                            <Typography variant="h5">
                                                {ticker} -- {tickSharePair.[ticker]} {tickSharePair.[ticker] > 1 ? 'shares' : 'share'}
                                            </Typography>
                                            <IconButton
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    let oldCount = tickSharePair.[ticker]
                                                    setTickSharePair({ ...tickSharePair, [ticker]: oldCount + 1 })
                                                    updatingStock.current = true;
                                                    updatedStock.current = ticker;
                                                    increment.current = true;
                                                    setModifiedGraph(!modifiedGraph)
                                                }}
                                                onFocus={(event) => event.stopPropagation()}>
                                                <AddIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={e => {
                                                    e.stopPropagation()
                                                    let oldCount = tickSharePair.[ticker]
                                                    if (oldCount > 1) {
                                                        setTickSharePair({ ...tickSharePair, [ticker]: oldCount - 1 })
                                                        updatingStock.current = true;
                                                        updatedStock.current = ticker;
                                                        decrement.current = true;
                                                        setModifiedGraph(!modifiedGraph)
                                                    }

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
                                                        <CompanyData stock={stock} />
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
                <Grid container>
                    <Grid item xs>
                        {userPortfolioData.labels.length !== 0 ?
                            <PortfolioOverview tickSharePair={tickSharePair}
                                stock={stockData.filter((stock) => {
                                    return userPortfolioData.labels.includes(stock.id)
                                })} /> :
                            <div />}
                    </Grid>
                    <Grid item xs />
                </Grid>
            </Grid>



        </div>

    )
}