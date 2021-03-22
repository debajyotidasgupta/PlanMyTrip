import React, { Component } from 'react'
import '../styles/Flight.scss'
import {Button} from '@material-ui/core'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightIcon from '@material-ui/icons/Flight'
import { Redirect } from 'react-router-dom'

export class Flight extends Component {
    constructor(props){
        super(props);
        this.state = {
            submitted: false,
        };
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            submitted: true,
        });
        console.log(this.state.submitted);
    }
    render() {
        if (this.state.submitted){
            return(
                <Redirect to={"/flight/results"}/>
            );
        }
        return(
            <div className="main">
                <div className="bg-flight"></div>
                <div className="paper">
                    <form className="form-flight" onSubmit={this.handleSubmit} noValidate>
                        <div className="row">
                            <div className="column-left">
                                <div className="form-input">
                                    <datalist id="airports">
                                        <option>BBS</option>
                                        <option>CAL</option>
                                    </datalist>
                                    <input autoComplete="on" list="airports" placeholder="Departure" style={{fontWeight:"bolder"}}/>
                                </div>
                            </div>
                            <div className="column-right">
                                <span><FlightTakeoffIcon
                                style={{fontSize:40,color:"#131a2f",
                                }}/></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column-left">
                                <div className="form-input">
                                    <datalist id="airports">
                                        <option>BBS</option>
                                        <option>CAL</option>
                                    </datalist>
                                    <input autoComplete="on" list="airports" placeholder="Arrival" style={{fontWeight:"bolder"}}/>
                                </div>
                            </div>
                            <div className="column-right">
                                <span><FlightLandIcon
                                style={{fontSize:40,color:"#131a2f",
                                }}/></span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <input type="date" name="dob" required label="Date-of-birth"/>
                                    <label style={{color:"#131a2f"}}>Date of Journey</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <select>
                                        <option value="" disabled selected>Select Ticket Class</option>
                                        <option value="premium-business">Premium Business</option>
                                        <option value="business">Business</option>
                                        <option value="first-class">First Class</option>
                                        <option value="economy">Economy</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <input type="number" min="0" name="no-of-passengers" required/>
                                    <label>No of passengers</label>
                                </div>
                            </div>
                        </div>
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="submit"
                        endIcon={<FlightIcon/>}
                        >
                            Search Flights
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Flight;