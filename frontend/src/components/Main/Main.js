import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import rocketImage from '../../Images/rocket.png'
import { Grid } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles((theme) => ({
    header: {
        width: '100%',
        marginTop: theme.spacing(6),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(10),
    },
    root: {
        flexGrow: 1,
    },
    card: {
        margin: theme.spacing(4),
        height: '500px',
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
        },
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export const Main = () => {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.header}>
                <Typography variant="h2" component="h2" gutterBottom>
                    Build your Portfolio
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                </Typography>
            </div>

            <Grid container className={classes.root} direction="row" justify="center" alignItems="center">
                <Grid item xs={4}>
                    <Slide direction="up" in={true}>
                        <Card className={classes.card}>
                            <CardMedia
                                component="img"
                                alt="Image"
                                height="250"
                                image={rocketImage}
                                title="rocket"
                                cardImageHover
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    TO THE MOON
                                    </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    GME GO BRRR
                                    </Typography>
                            </CardContent>
                        </Card>
                    </Slide>
                </Grid>
                <Grid item xs={4}>
                    <Slide direction="up" in={true} style={{ transitionDelay: '500ms' }}>
                        <Card className={classes.card}>
                            <CardMedia
                                component="img"
                                alt="Image"
                                height="250"
                                image={rocketImage}
                                title="rocket"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    TO THE MOON
                                    </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    GME GO BRRR
                                    </Typography>
                            </CardContent>
                        </Card>
                    </Slide>
                </Grid>
                <Grid item xs={4}>
                    <Slide direction="up" in={true} style={{ transitionDelay: '1000ms' }}>
                        <Card className={classes.card}>
                            <CardMedia
                                component="img"
                                alt="Image"
                                height="250"
                                image={rocketImage}
                                title="rocket"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    TO THE MOON
                                    </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    GME GO BRRR
                                    </Typography>
                            </CardContent>
                        </Card>
                    </Slide>
                </Grid>
            </Grid>
        </div>

    )
}

export default Main