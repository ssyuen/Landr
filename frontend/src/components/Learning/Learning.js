import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { FormControl, FormControlLabel, FormGroup, Grid, Paper, Radio, RadioGroup, TextField, Input, Slider, FormLabel, Button, Card, CardContent, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    header: {
        width: '100%',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(10),
    },
    button: {
        margin: theme.spacing(1),
    }
}));

export const Learning = () => {

    const [fetchedData, setFetchedData] = useState({})
    const [recData, setRecData] = useState({})
    const [remainingData, setRemainingData] = useState([])
    const [reset, setReset] = useState(true);

    const [monthlyIncome, setMonthlyIncome] = useState(0)
    const [riskLevel, setRiskLevel] = useState('balanced')


    const classes = useStyles();
    const [value, setValue] = React.useState(30);
    const handleSliderChange = (event, newValue) => {
        if (newValue > 100) {
            setValue(100)
        }
        else {
            setValue(newValue);
        }

    };
    const handleInputChange = (event) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };
    const handleBlur = () => {
        if (value < 1) {
            setValue(1);
        } else if (value > 100) {
            setValue(100);
        }
    };

    const ETF_URL = `/api/portf/get_rec?monthlyIncome=${monthlyIncome}&savingsPercent=${value}&risk=${riskLevel}`
    const handleSubmit = () => {
        console.log(ETF_URL)
        fetch(ETF_URL, {
            method: 'GET',
            mode: 'cors',
        })
            .then(data => data.json())
            .then(data => {
                console.log(data)
                setFetchedData(data)
                setRecData(data.recommended)
                setRemainingData(data.rest)
                setReset(false)
            })
    }

    const handleReset = () => {
        setReset(!reset)
        setMonthlyIncome(0)
        setRiskLevel('balanced')
        setValue(30)
    }

    return (
        <div className={classes.header}>
            <Grid container spacing="3">
                <Grid item xs>
                    <Typography variant="h2">
                        Learning
                    </Typography>
                    <Typography style={{paddingTop:'20px'}}>
                        Sustainable Investments are the future of investing as we move toward an environmental, social, and governance sustainability. BlackRock offers a variety of sustainable investment equities which allow you to grow your money over a period of time. An ETF, or exchange traded fund, is one of these investment securities which are a diverse collection of stocks from many sectors. 
                    </Typography>
                    <Typography style={{paddingTop:'10px'}} >
                    To view the best sustainable BlackRock ETF for you, check out our calculator below. Input your estimated monthly earnings, your monthly savings percentage, and  whether you'd like a low, balanced, or high risk return. Lower risk ETFs have lower returns and vice versa.
                    </Typography>
                    <Paper style={{ padding: '10px', marginTop: '50px' }}>
                        <Grid container>
                            <Grid item xs>
                                <FormControl component="fieldset" style={{ padding: '10px' }}>
                                    <FormLabel>Monthly Income</FormLabel>
                                    <TextField id="monthlyIncome" onChange={(e) => setMonthlyIncome(Number(e.target.value))} defaultValue={monthlyIncome} value={monthlyIncome} type="number" />
                                    <FormLabel style={{ paddingTop: '10px', paddingBottom: '10px' }}>Risk Tolerance</FormLabel>
                                    <RadioGroup row defaultValue={riskLevel}>
                                        <FormControlLabel control={<Radio />} value="low" labelPlacement="bottom" label="Low" onClick={(e) => setRiskLevel(e.target.value)} />
                                        <FormControlLabel control={<Radio />} value="balanced" labelPlacement="bottom" label="Balanced" onClick={(e) => setRiskLevel(e.target.value)} />
                                        <FormControlLabel control={<Radio />} value="high" labelPlacement="bottom" label="High" onClick={(e) => setRiskLevel(e.target.value)} />
                                    </RadioGroup>
                                    <FormGroup row style={{ paddingTop: '10px' }}>
                                        <FormLabel>Monthly Savings %</FormLabel>
                                        <Slider
                                            value={typeof value === 'number' ? value : 0}
                                            onChange={handleSliderChange}
                                            aria-labelledby="input-slider"
                                        />
                                        <Input
                                            className={classes.input}
                                            value={value}
                                            margin="dense"
                                            onChange={handleInputChange}
                                            onBlur={handleBlur}
                                            inputProps={{
                                                step: 10,
                                                min: 1,
                                                max: 50,
                                                type: 'number',
                                                'aria-labelledby': 'input-slider',
                                            }}
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs>
                                <Typography variant="h6">
                                    ETF Recommendation Calculator
                                </Typography>
                                <Typography>
                                    Based off the three parameters, we aim to introduce the most ideal ETF for your current standings.
                                </Typography>
                                <Button disabled={monthlyIncome === 0 ? true : false} style={{ marginTop: '90px', float: 'right' }} variant="contained" color="primary" className={classes.button} onClick={handleSubmit}>
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                </Grid>
                <Grid item xs>
                    {console.log(Object.keys(fetchedData) === 0)}
                    {reset ? <div></div> :

                        <div>
                            <Typography variant="h4">
                                Your Recommended Fund
                            </Typography>
                            <Card style={{ padding: '10px' }}>
                                <CardContent>
                                    <Typography variant="h4">
                                        {recData.Name} ({recData.Ticker}) | {recData.Price}
                                    </Typography>
                                    <Typography variant="h5">
                                        Net Assets: {recData['Net Assets']}
                                    </Typography>
                                    <Typography variant="h5">
                                        P/E Ratio: {recData['P/E Ratio']}
                                    </Typography>
                                    <Typography variant="h4" style={{ paddingTop: '15px' }}>
                                        Why should you buy into it?
                                            </Typography>
                                    <Typography variant="h6">
                                        {recData.Why}
                                    </Typography>

                                </CardContent>
                                <Button variant="contained" onClick={handleReset}>Reset Calculator</Button>
                            </Card>
                            <Typography variant="h4" style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                                Remaining Funds
                            </Typography>
                            {remainingData.map(etf => {
                                return (
                                    <Accordion>
                                        <AccordionSummary>
                                            <Typography variant="h5">
                                                {etf.Name} ({etf.Ticker}) | {etf.Price}
                                            </Typography>

                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Grid container>
                                                <Grid item xs>
                                                    <Typography variant="h5">
                                                        Net Assets: {etf['Net Assets']}
                                                    </Typography>
                                                    <Typography variant="h5">
                                                        P/E Ratio: {etf['P/E Ratio']}
                                                    </Typography>
                                                    <Typography variant="h5">
                                                        P/E Ratio: {etf['P/E Ratio']}
                                                    </Typography>
                                                    <Typography variant="h4" style={{ paddingTop: '15px' }}>
                                                        Why should you buy into it?
                                            </Typography>
                                                    <Typography variant="h6">
                                                        {etf.Why}
                                                    </Typography>
                                                </Grid>
                                            </Grid>

                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })}

                        </div>


                    }
                </Grid>
            </Grid>
        </div>
    )
}