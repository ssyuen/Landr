import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    header: {
        width: '100%',
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(10),
    },
}));

export const Learning = () => {
    const classes = useStyles();

    return (
        <div className={classes.header}>
                <Typography variant="h2" component="h2" gutterBottom>
                    WIP
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Under construction
                </Typography>
            </div>
    )
}