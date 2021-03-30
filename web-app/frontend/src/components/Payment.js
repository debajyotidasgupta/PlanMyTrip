import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { useLocation } from 'react-router-dom'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    body: {
        display:'flex',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
    },
    heading:{
        fontSize: '3em',
        fontWeight: '700',
        color: 'black'
    },
    formControl: {
        height: '80%',
        width: '40%',
        margin: 'auto',
        marginTop: '110px',
        boxShadow: '5px 10px 18px #fe435b',
        boxSizing: 'border-box',
        padding: '50px'
    },
    button: {
        margin: theme.spacing(1, 1, 0, 0),
    },
}));

export default function Payment(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('Choose wisely');

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setHelperText(' ');
        setError(false);
    };
    const location = useLocation();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (value === 'best') {
            setHelperText('You got it!');
            setError(false);
        } else if (value === 'worst') {
            setHelperText('Sorry, wrong answer!');
            setError(true);
        } else {
            //setHelperText('Please select an option.');
            //setError(true);
            axios.post('/api/flight/payment',{bookings:location.state.bookings},{withCredentials:true}).then(res=>{
                if(Response.status>201)
                {
                    alert('Payment failed');
                    props.history.push({
                        pathname: '/',
                    })
                }
                else
                {
                    alert('Payment successful!!');
                    props.history.push({
                        pathname: '/',
                    })
                }
            })
        }
    };

    return (
        <form onSubmit={ handleSubmit } className={ classes.body }>
            <FormControl component="fieldset" error={ error } className={ classes.formControl }>
                <FormLabel component="legend" className={ classes.heading }>PAYMENT POTRAL</FormLabel>
                <RadioGroup aria-label="quiz" name="quiz" value={ value } onChange={ handleRadioChange }>
                    <FormControlLabel value="nbank" control={ <Radio /> } label="Net Banking" />
                    <FormControlLabel value="card" control={ <Radio /> } label="Credit/Debit Card" />
                </RadioGroup>
                <FormHelperText>{ helperText }</FormHelperText>
                <Button type="submit" variant="outlined" color="primary" className={ classes.button }>
                    Make Payment
        </Button>
            </FormControl>
        </form>
    );
}
