import React, { Component } from 'react'
import '../styles/Flight.scss'
import {Button} from '@material-ui/core'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';

export class Flight extends Component {
    render() {
        return(
            <div className="main">
                <div className="bg-flight"></div>
                <div className="paper">
                    <form className="form-flight" noValidate>
                        <div className="form-input">
                            <datalist id="airports">
                                <option>BBS</option>
                                <option>CAL</option>
                            </datalist>
                            <input autoComplete="on" list="airports" placeholder="Depart From" style={{fontWeight:"bolder"}}/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Flight;