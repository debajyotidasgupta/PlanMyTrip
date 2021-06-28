import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const deep_blue = '#131a2f';
const sweet_pink = '#fe435b';

const useStyles = makeStyles({
    footer: {
        width: '100%',
        height: '25vh',
        backgroundColor: deep_blue,
        display: 'flex',
        justifyContent: 'space-around',
    },
    child:{
        height: '100%',
        width: '20%',
        backgroundColor: 'green',
        color: 'white',
        lineHeight: 1,
        display: 'flex',
        flexDirection: 'column',
    }
});

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={ classes.footer }>
            <div styles="margin-top: 20px;" className={classes.child} >
                <h1>PLANMYTRIP</h1>
                <h5>TRAVEL AGENCY</h5>
            </div>
            <div className={classes.child}>
                <h3>Latest News</h3>
                <div></div>
                <div styles="align-items: left;">The leading player in online flight bookings in India, PlanMyTrip offers great offers, some of the lowest airfares, exclusive discounts and a seamless online booking experience. Flight, hotel and holiday bookings through the desktop.</div>
            </div>
            <div className={classes.child}>
                <h1>Tags</h1>
            </div>
        </div>
    );
}
