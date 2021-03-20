import React, { Component } from 'react'
import '../styles/Flight.scss'
import {Button,TextField} from '@material-ui/core'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import Autocomplete from '@material-ui/lab/Autocomplete'

const airports = [
    {id: 'BBS', city: 'Bhubaneswar'},
    {id: 'CAL', city: 'Kolkata'},
];

export class Flight extends Component {
    constructor(){
        super();
        this.state = {
            id: 'BBS',
            city: 'Bhubaneswar',
        }
    }

    render() {
    return (<Autocomplete
                        options={airports}
                        getOptionLabel={option=>option.city}
                        id="airports"
                        value={this.state.city}
                        onChange={(event,newAirport)=>{
                            if(newAirport){
                                return this.setState(
                                    {
                                        id: newAirport.id,
                                        city: newAirport.city, 
                                    }
                                );
                            }
                        }}
                        renderInput={params=>{
                            <TextField {...params} label="From" margin="normal"/>
                        }}
                        style={{height: 300, 
                            opacity:1.0,
                            visibility: 1,
                        }}
                        />
        );
    }
}

export default Flight;