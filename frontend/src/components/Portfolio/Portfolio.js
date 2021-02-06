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

const rows = [
    { id: 'AAPL', Name: 'Apple', 'Market Cap': 'Jon', price: 35, 'p/e ratio': 10, 'sector': 'Information Technology' },
    { id: 'MSFT', Name: 'Microsoft', 'Market Cap': 'Cersei', price: 42, 'p/e ratio': 10, 'sector': 'Information Technology' },
    { id: 'T', Name: 'Lannister', 'Market Cap': 'Jaime', price: 45, 'p/e ratio': 10, 'sector': 'Telecommunication Services' },
    { id: 'KO', Name: 'Coca-Cola', 'Market Cap': 'Arya', price: 16, 'p/e ratio': 10, 'sector': 'Consumer Staples' },
    { id: 'AAL', Name: 'American Airlines', 'Market Cap': 'Daenerys', price: null, 'p/e ratio': 10, 'sector': 'Industrials' },
    { id: 'GME', Name: 'Gamestop', 'Market Cap': null, price: 150, 'p/e ratio': 10, 'sector': 'Consumer Discretionary' },
    { id: 'AMC', Name: 'AMC', 'Market Cap': 'Ferrara', price: 44, 'p/e ratio': 10, 'sector': 'Consumer Discretionary' },
    { id: 'BAC', Name: 'Bank of America', 'Market Cap': 'Rossini', price: 36, 'p/e ratio': 10, 'sector': 'Financials' },
    { id: 'VOO', Name: 'VOO', 'Market Cap': 'Harvey', price: 65, 'p/e ratio': 10, 'sector': 'N/A' },
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

export const Portfolio = () => {
    const [stockData, setStockData] = useState({})
    const [stockDataFetched, setStockDataFetched] = useState(false)

    const [stocksToAdd, addStock] = useState([])

    useEffect(() => {
        if (!stockDataFetched) {
            // FETCH ALL STOCK DATA HERE
            // SET IT INTO stockData
            // SET stockDataFetched to True
            setStockDataFetched(true)
        }

    })

    // const  = () => {

    // }

    const classes = useStyles();
    return (
        <div style={{ height: '400px' }}>
            <DataGrid
                autoPageSize
                rows={rows}
                columns={columns}

                checkboxSelection
                onSelectionChange={stock => {
                    addStock([...stocksToAdd, stock])
                }}
                showToolbar
                components={{
                    Toolbar: GridToolbar
                }}
            />
            <Doughnut data={data}></Doughnut>
            
             
        </div>

    )
}