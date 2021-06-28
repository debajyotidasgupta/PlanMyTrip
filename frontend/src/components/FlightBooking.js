import React, { Component } from 'react'
import '../styles/FlightBooking.scss'
import {Button} from '@material-ui/core'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

export class FlightBooking extends Component {
    constructor(props){
        super(props);
        this.state = {
            flights: typeof this.props.location.state === 'undefined' ? [] : this.props.location.state.flights
        };
    }
    book = (i)=>{
        console.log(i);
        /*axios.post('http://127.0.0.1:5000/flight/booking',details,{withCredentials: true}).then(res=>{
            console.log("Bhutan called")
            this.props.history.push({
                pathname: '/'
            })
        });*/
        this.props.history.push({
            pathname: '/flight/booking',
            state: {
                flight: this.state.flights[i]
            }
        })
    } 
    book2 = ()=>{
        this.props.history.push({
            pathname: '/flight/booking',
            state: {
                flight: {
                    flight_id: 1,
                    airlines: 'Kingfisher',
                    departure: '2001-01-01',
                    seat_type: 'economic',
                    seats: 2,
                    fare: 40000,
                }
            }
        })
    }
    getFlights = ()=>{
        const flightOptions = [];
        const flights = this.state.flights;
        console.log("flightd=")
        console.log(flights)
        var className = "row-even"
        for(var i=0;i<flights.length;i++){
            const flight = flights[i];
            if(i%2==0)
            className = "row-even"
            else
            className = "row-odd"
            flightOptions.push(
                <tr className={className}>
                    <th>{flight.flight_id}</th>
                    <th>{flight.airlines}</th>
                    <th>{flight.departure}</th>
                    <th>{flight.seat_type}</th>
                    <th>{flight.seats}</th>
                    <th>{flight.fare}</th>
                    <th value={i}><Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit"
                            onClick={this.book.bind(this,i)}
                            >Book
                        </Button>
                    </th>
                </tr>
            );
        }
        return flightOptions;
    }   
    render() {
        return(
            <div className="main-flight">
                <div className='head-flight'>
                </div>
                <div className="paper-flight">
                    <div className="content-flight">
                        <div className="row">
                            <div className="column">
                                <h1>Available flights:</h1>
                            </div>
                        </div>
                        {/* {this.getFlights()} */}
                        <div className="tbdiv">
                        <table>
                            <tr className="row-odd">
                                <th>FLIGHT ID</th>
                                <th>AIRLINES</th>
                                <th>DEPARTURE TIME</th>
                                <th>SEAT TYPE</th>
                                <th>AVAILABLE SEATS</th>
                                <th>FARE</th>
                                <th>Book</th>
                            </tr>
                            {this.getFlights()}
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(FlightBooking);