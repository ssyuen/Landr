import React, { useState, useEffect } from 'react'
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import logo from '../../Images/landrlogo.png'
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // border: '5px solid red'
    },
    logo: {
        marginRight: theme.spacing(2),
    },
    fullHeight: {
        ...theme.mixins.toolbar,
    },
}));

export const Navbar = () => {
    const theme = useTheme();

    const [value, setValue] = useState("home");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const classes = useStyles();

    return (
        <div className={classes.root} >
            <AppBar position="static" style={{ background: "#212121" }}>
                <Toolbar>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <IconButton edge="start" className={classes.logo} color="inherit" aria-label="Home">
                                <Typography color="inherit" variant="title">LANDR</Typography>
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Tabs className={classes.fullHeight} onChange={handleChange} value={value}>
                                <Tab className={classes.fullHeight} label="Home" icon={<HomeIcon />} value="home" to='/Home' component={Link} />
                                <Tab className={classes.fullHeight} label="Portfolio" icon={<FolderIcon />} value="portfolio" to='/Portfolio' component={Link} />
                                <Tab className={classes.fullHeight} label="Profile" icon={<AccountBoxIcon />} value="profile" to='/Profile' component={Link} />
                            </Tabs>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}
