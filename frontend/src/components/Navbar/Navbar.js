import React from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CodeIcon from '@material-ui/icons/Code';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    links: {
        marginRight: theme.spacing(4),
    },
}));


export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    {/* Icon  */}
                    <IconButton edge="start" className={classes.icon} color="inherit" aria-label="menu">
                        <CodeIcon />
                    </IconButton>
                    {/* Links */}
                    <Button color="inherit" className={classes.links} >Porfolio</Button>
                    
                    {/* <Divider orientation="vertical" flexItem /> */}
                    
                    <Button color="inherit" className={classes.links}>About</Button>
                    
                    {/* <Divider orientation="vertical" flexItem /> */}

                    <Typography variant="h6" className={classes.title}>
                        <Button color="inherit">Profile</Button>
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )

}