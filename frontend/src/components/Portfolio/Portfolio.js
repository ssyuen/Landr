import React, { useState, useEffect } from 'react'

import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
// import { Doughnut } from '@reactchartjs/react-chart.js'
import { Doughnut } from 'react-chartjs-2'



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // border: '5px solid red'
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,

    },
    filter: {

        textAlign: 'left',
        color: theme.palette.text.secondary,
        margin: '15px',
        border: '1px solid grey',
        borderRadius: '25px',
        boxShadow: '3px 3px 3px grey'
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




const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
}

const randomRgba = () => {
    var o = Math.round, r = Math.random, s = 255;
    let red = o(r() * s)
    let green = o(r() * s)
    let blue = o(r() * s)

    return {
        unfilled: 'rgba(' + red + ',' + green + ',' + blue + ',' + .2 + ')',
        filled: 'rgba(' + red + ',' + green + ',' + blue + ',' + 1 + ')',
    };
}

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
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        }]
    })
    const [currPortLength, setCurrPortLength] = useState(0)

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


                        rows.push({ id: tickerName, Name: companyName, price: stockPrice, 'p/e ratio': peRatio, 'Market Cap': marketCap, 'sector': sector })
                    });
                    setStockData(rows)
                    // SET stockDataFetched to True
                    setStockDataFetched(true)
                })




        }

    })



    const classes = useStyles();
    return (
        <div style={{ height: '600px' }}>
            <DataGrid
                autoPageSize
                rows={stockData}
                columns={columns}

                checkboxSelection
                onSelectionChange={stock => {
                    if (stock.rowIds.length === 0) {
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
                        let tickerNames = []
                        let data = []
                        stock.rowIds.forEach(ticker => {

                            tickerNames.push(ticker)
                        });
                        for (let i = 0; i < 501; i++) {
                            data.push(10)
                        }
                        setUserPortfolioData(prevPortData => (

                            {
                                labels: [tickerNames],
                                datasets: [{
                                    label: [...prevPortData.datasets[0].label],
                                    data: [data],
                                    borderWidth: [prevPortData.datasets[0].borderWidth],
                                }]
                            }))
                    }
                    // SUBTRACTING A STOCK FROM PORFTOLIO
                    else if (stock.rowIds.length - 1 < currPortLength) {

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
                        let colors = randomRgba()
                        setUserPortfolioData(prevPortData => ({
                            labels: [...prevPortData.labels, tickerName],
                            datasets: [{
                                data: [...prevPortData.datasets[0].data, 10],
                                backgroundColor: [...prevPortData.datasets[0].backgroundColor],
                                borderColor: [...prevPortData.datasets[0].borderColor],
                            }]
                        }))

                    }
                    setCurrPortLength(stock.rowIds.length - 1)

                }}
                showToolbar
                components={{
                    Toolbar: GridToolbar
                }}
            />
            <Doughnut data={userPortfolioData}></Doughnut>


        </div>

    )
}