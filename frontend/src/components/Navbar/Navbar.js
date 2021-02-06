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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        // border: '5px solid red'
    },
    fullHeight: {
        ...theme.mixins.toolbar,
    },
}));

export const Navbar = () => {

    const [value, setValue] = useState("home");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <Typography color="inherit" variant="title">GreenRock</Typography>
                        </Grid>
                        <Grid item>
                            <Tabs className={classes.fullHeight} onChange={handleChange} value={value}>
                                <Tab className={classes.fullHeight} label="Home" icon={<HomeIcon/>} value="home" to='/Home' component={Link}/>
                                <Tab className={classes.fullHeight} label="Portfolio" icon={<FolderIcon/>} value="portfolio" to='/Portfolio' component={Link}/>
                                <Tab className={classes.fullHeight} label="Profile" icon={<AccountBoxIcon/>} value="profile" to='/Profile' component={Link}/>
                            </Tabs>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    )
}
