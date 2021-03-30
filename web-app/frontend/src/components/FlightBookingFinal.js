import React, { Component } from 'react'
import '../styles/Flight.scss'
import {Button} from '@material-ui/core'
import { Redirect, withRouter } from 'react-router-dom'
import FlightIcon from '@material-ui/icons/Flight'
import axios from 'axios'

export class FlightBookingFinal extends Component {
    constructor(props){
        super(props);
        this.state = {
            flight: typeof this.props.location.state === 'undefined' ? 
            {
                flight_id: '',
                airlines: '',
                departure: '',
                seat_type: '',
                seats: 0,
                fare: 0,
            } : {
                flight_id: this.props.location.state.flight.flight_id,
                airlines: this.props.location.state.flight.airlines,
                departure: this.props.location.state.flight.departure,
                seat_type: this.props.location.state.flight.seat_type,
                seats: this.props.location.state.flight.seats,
                fare: parseFloat(this.props.location.state.flight.fare)
            },
            totalFare: 0, 
            seats: 0,
        };
    }
    validateInputs = () => {
        return true;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.validateInputs()){
            const data = {
                flight_id : this.state.flight.flight_id,
                airlines: this.state.flight.airlines,
                departure: this.state.flight.departure,
                seat_type: this.state.flight.seat_type,
                seats: this.state.seats,
                fare: this.state.flight.fare,
            }
            console.log(data);
            axios.post('/api/flight/booking',data,{withCredentials:true}).then(res=>{
                alert('Payment successful')
                this.props.history.push({
                    pathname: '/'
            })
        })
        }
    }
    setTotalFare = (e)=>{
        this.setState({
            seats: Number(e.target.value)
        })
        this.setState({
            totalFare: Number(e.target.value)*this.state.flight.fare
        })
    }
    render() {

        return(
            <div className="main">
                <div className="bg-flight"></div>
                <div className="paper">
                    <form className="form-flight" onSubmit={this.handleSubmit} noValidate>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <input value={this.state.flight.departure} type="date" name="doj" required label="Date-of-journey" readOnly/>
                                    <label style={{color:"#131a2f"}}>Date of Journey</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <input className="bki" type="number" min="0" max={this.state.flight.seats} onChange={this.setTotalFare} name="no-of-passengers" required/>
                                    <label>No of passengers</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <input className="bki" value={this.state.flight.flight_id} type="text" name="flight-id" required readOnly/>
                                    <label>Flight ID</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <input className="bki" value={this.state.flight.airlines} type="text" name="airlines" required readOnly/>
                                    <label>Airlines</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <input className="bki" value={this.state.flight.seat_type} type="text" name="seat-type" required readOnly/>
                                    <label>Seat Type</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <input className="bki" value={this.state.totalFare} type="number" name="fare" required readOnly/>
                                    <label>Total Fare</label>
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
                            Book
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(FlightBookingFinal);