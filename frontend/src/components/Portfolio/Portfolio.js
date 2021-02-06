import React, { useState, useEffect } from 'react'

import { Box, Checkbox, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Table, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid';



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
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const Portfolio = () => {
    const [stockData, setStockData] = useState({})
    const [stockDataFetched, setStockDataFetched] = useState(false)

    useEffect(() => {
        if (!stockDataFetched) {
            // FETCH ALL STOCK DATA HERE
            // SET IT INTO stockData
            // SET stockDataFetched to True
            setStockDataFetched(true)
        }

    }
    )
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container spacing='3'>
                <Grid item className={classes.filter} xs={'auto'}>
                    <FormControl>
                        <FormLabel>Filters</FormLabel>

                        <FormControlLabel control={<Checkbox />} value="energy" label="Energy" />
                        <FormControlLabel control={<Checkbox />} value="materials" label="Materials" />
                        <FormControlLabel control={<Checkbox />} value="industrials" label="Industrials" />
                        <FormControlLabel control={<Checkbox />} value="consumer_disc" label="Consumer Discretionary" />
                        <FormControlLabel control={<Checkbox />} value="consumer_stap" label="Consumer Staples" />
                        <FormControlLabel control={<Checkbox />} value="health_care" label="Health Care" />
                        <FormControlLabel control={<Checkbox />} value="financials" label="Financials" />
                        <FormControlLabel control={<Checkbox />} value="info_tech" label="Information Technology" />
                        <FormControlLabel control={<Checkbox />} value="telecom_services" label="Telecommunication Services" />
                        <FormControlLabel control={<Checkbox />} value="utilities" label="Utilities" />
                        <FormControlLabel control={<Checkbox />} value="real_estate" label="Real Estate" />

                    </FormControl>
                </Grid>
                <Grid item xs={'6'}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        checkboxSelection
                    />


                </Grid>



            </Grid>
        </div>

    )
}