import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    header: {
        width: '100%',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2),
    },
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    card: {
        margin: theme.spacing(4),
        height: '200px',
        width: '50%',
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
            transitionDelay: '1000ms !important'
        },
    },
}));

export const About = () => {
    const classes = useStyles();

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, [])

    return (
        <div>
            <div className={classes.header}>
                <Typography variant="h2" component="h2" gutterBottom>
                    About LANDR
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Under construction
                </Typography>
            </div>
            <Grid container direction="column" alignItems="center" justify="center" spacing={0}>
                <Grid item xs={12}>
                    <Card className={classes.card} data-aos="zoom-in-right">
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Objective
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                For the UGAHacks BlackRock challenge, we wanted to build a platform that would allow users to build their
                                own portfolio with helpful tooltips and information with sustainable investments in mind. This project
                                comes at a time when many people are beginning to invest their money into the market, and we believe Landr,
                                pronounced as Lander, educates them about certain important performance metrics while holding to account risk
                                and portfolio sustainability. We chose the name Lander because of the recent investing frenzy of going to the
                                moon. We hope Landr will help land you on the moon and land you a great portfolio.
                                </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.card} data-aos="zoom-in-left">
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Introduction
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Landr is a web application that allows an individual to build their portfolio. They can choose a variety of stocks by searching
                                or filtering by price, sector, name, and other variables. Landr also provides very unique information such as a ticker ESG (Environment, Social and Governance)
                                risk rating and overall sustainability score. Landr also provides the same information to your portfolio by aggregating risk and weighting share amounts.
                                In addition to sustainability, the platform provides news sentiment whether your portfolio has bullish or bearish sentiment based off the news.
                                </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.card} data-aos="zoom-in-right">
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Audience
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Our target audience is anybody who is looking to invest their money responsibly while remaining educated about the risks and rewards of their investments.
                                </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.card} data-aos="zoom-in-right">
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Landr Platform Structure
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                The frontend stack of Landr was created with React.js and various other libraries for data visualization. The backend stack was created using Python 3 and Flask. Landr is a responsive application by virtue of the front end stack.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.card} data-aos="zoom-in-right">
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Key Challenges
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Our main challenges included Data Visualization and API access. There are many free API's which give plenty of information. We decided that we did not want to simply query the information and display it to the user. Factors such as sustainability risk, controversy, and news sentiment are aggregated and weighted based on various factors of your portfolio such as number of shares, share price, and total portfolio value.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.card} data-aos="zoom-in-right">
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                Important Note
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                The initial data shown on the 'Build Your Portfolio' table is EOD S&P 500 stock information from Friday, February 5. This could easily have been replaced with live data, but we encountered API restrictions for daily call limits.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.card} data-aos="zoom-in-right">
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                How we utilized APIs and other tools through our demo
                                </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Finnhub.io for ticker information and basic company financials
                                Finviz for certain ticker visuals
                                BeautifulSoup + Selenium for web-scraping Yahoo ESG risk data for a single ticker
                                RapidApi + ESG Data (esg.enterprise.app) for ESG total scores for a single ticker
                                D3 Charts for Data visualization
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </div>
    )
}