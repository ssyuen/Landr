import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

export const About = () => {
    const classes = useStyles();

    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, [])

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} variant="h5" component="h2">
                       Objective
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                    For the UGAHacks BlackRock challenge, we wanted to build a platform that would allow users to build their 
                    own portfolio with helpful tooltips and information with sustainable investments in mind. This project 
                    comes at a time when many people are beginning to invest their money into the market, and we believe Landr, 
                    pronounced as Lander, educates them about certain important performance metrics while holding to account risk 
                    and portfolio sustainability. We chose the name Lander because of the recent investing frenzy of going to the 
                    moon. We hope Landr will help land you on the moon and land you a great portfolio.
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}