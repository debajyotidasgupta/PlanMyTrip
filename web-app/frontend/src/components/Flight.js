import React, { Component } from 'react'
import '../styles/Flight.scss'
import {Button} from '@material-ui/core'
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import FlightLandIcon from '@material-ui/icons/FlightLand';
import FlightIcon from '@material-ui/icons/Flight'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

export class Flight extends Component {
    constructor(props){
        super(props);
        this.state = {
            from: '',
            to: '',
            doj: '',
            class: '',
            nop: 0,
        };
    }
    handleFromChange = (e) => {
        this.setState({
            from: e.target.value
        })
    }
    handleToChange = (e) => {
        this.setState({
            to: e.target.value
        })
    }
    handleDojChange = (e)=>{
        this.setState({
            doj: e.target.value
        })
    }
    handleClassChange = (e)=>{
        this.setState({
            class: e.target.value
        })
    }
    handleNopChange = (e)=>{
        this.setState({
            nop : Number(e.target.value)
        })
    }
    validateInputs = ()=>{
        if(this.state.from.length<1){
            alert('Select from where to depart');
            return false;
        }
        else if(this.state.to.length<1){
            alert('select destination');
            return false;
        }
        else if(this.state.doj.length<1){
            alert('Select date of journey');
            return false;
        }
        else if(this.state.class.length<1){
            alert('Select ticket class');
            return false;
        }
        else{
            return true;
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.validateInputs()){
            console.log("nop="+this.state.nop)
            const data = {
                from: this.state.source,
                to: this.state.destination,
                date_of_journey: this.state.doj,
                ticket_class: this.state.class,
                passengers: this.state.nop,
            }
            axios.get('http://127.0.0.1:5000/flight/',{params:data}).then(res=>{
                console.log("Bhutan called")
                this.props.history.push({
                    pathname: '/flight/results',
                    state: {
                        flights: res.data.flights
                    },
            })
        })
        }
    }
    getAirports = ()=>{
        const airportOptions = [];
        const airports = localStorage.getItem('airports');
        for(var i=0;i<airports.length;i++){
            const airport = airports[i]
            airportOptions.push(
                <option>{airport}</option>
            );
        }
        return airportOptions;
    }
    render() {
        const airportOptions = this.getAirports();
        return(
            <div className="main">
                <div className="bg-flight"></div>
                <div className="paper">
                    <form className="form-flight" onSubmit={this.handleSubmit} noValidate>
                        <div className="row">
                            <div className="column-left">
                                <div className="form-input">
                                    <datalist id="airports">
                                        {airportOptions}
                                    </datalist>
                                    <input name="from" onChange={this.handleFromChange} autoComplete="on" list="airports" placeholder="Departure" style={{fontWeight:"bolder"}}/>
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
                                        {airportOptions}
                                    </datalist>
                                    <input name="to" onChange={this.handleToChange} autoComplete="on" list="airports" placeholder="Arrival" style={{fontWeight:"bolder"}}/>
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
                                    <input type="date" onChange={this.handleDojChange} name="doj" required label="Date-of-journey"/>
                                    <label style={{color:"#131a2f"}}>Date of Journey</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <select onChange={this.handleClassChange}>
                                        <option value="" disabled selected>Select Ticket Class</option>
                                        <option value="premium_business_class">Premium Business</option>
                                        <option value="business_class">Business</option>
                                        <option value="first_class">First Class</option>
                                        <option value="economy">Economy</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <input type="number" min="0" onChange={this.handleNopChange} name="no-of-passengers" required/>
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

export default withRouter(Flight);