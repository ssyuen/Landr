import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import environmentImage from '../../Images/environment.PNG'
import socialImage from '../../Images/social.PNG'
import governanceImage from '../../Images/company.png'
import { Grid } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';
import logo from '../../Images/landrlogo.png'


const useStyles = makeStyles((theme) => ({
    // background: {
    //     backgroundImage: leafImage
    // },
    header: {
        width: '100%',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(10),
    },
    logo: {
        height: '300px',
        width: 'auto',
        marginBottom: theme.spacing(10),
    },
    root: {
        flexGrow: 1,
    },
    card: {
        margin: theme.spacing(4),
        height: '600px',
        "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
            transitionDelay: '1000ms !important'
        },
    },
    media : {
        objectFit: 'scale-down !important' 
    },
    control: {
        padding: theme.spacing(2),
    },
}));

export const Main = () => {
    const classes = useStyles();

    return (
        <div className={classes.background}>
            <div className={classes.header}>
                <Typography variant="h2" component="h2" gutterBottom>
                    Build your ESG Portfolio.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Make your portfolio reflect your best vision for our future. Always be thinking ahead. Be optimistic.
                </Typography>
            </div>

        {/* 
            <CardMedia
                className={classes.logo}
                image={logo}
                title="Logo"

            /> */}

            <Grid container className={classes.root} direction="row" justify="center" alignItems="center">
                <Grid item xs={4}>
                    <Slide direction="up" in={true}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                component="img"
                                height="300"
                                alt="Image"
                                image={environmentImage}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    E is for Environmental
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    The environmental component requires research into a variety of elements that illustrate a company's impact on the Earth,
                                    in both positive and negative ways. A company that's an actively good steward for the environment might be deserving of your dollars.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Slide>
                </Grid>
                <Grid item xs={4}>
                    <Slide direction="up" in={true} style={{ transitionDelay: '500ms' }}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                component="img"
                                height="300"
                                alt="Image"
                                image={socialImage}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    S is for Social
                                    </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    The social component consists of people-related elements like company culture and issues that impact employees, customers, consumers, and suppliers -- both within the company and in greater society.
                                    </Typography>
                            </CardContent>
                        </Card>
                    </Slide>
                </Grid>
                <Grid item xs={4}>
                    <Slide direction="up" in={true} style={{ transitionDelay: '1000ms' }}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                component="img"
                                alt="Image"
                                height="300"
                                image={governanceImage}
                                />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    G is for Corporate Governance
                                    </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    The corporate governance component relates to the board of directors and company oversight, as well as shareholder-friendly versus management-centric attitude. In less dry terms,
                                    ESG investors analyze how corporate managements and boards relate to different stakeholders, how the business is run, and whether the corporate incentives align with the business's success.
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