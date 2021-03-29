import React, { Component } from 'react'
import '../styles/FlightBooking.scss'
import {Button} from '@material-ui/core'
import { Redirect, withRouter } from 'react-router-dom'

export class FlightResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            flights: typeof this.props.location.state === 'undefined' ? [] : this.props.location.state.flights
        };
    }
    book = (i)=>{
        console.log(i);
    } 
    getFlights = ()=>{
        const flightOptions = [];
        const flights = this.state.flights;
        const className = "row-even"
        for(var i=0;i<flights.length;i++){
            const flight = flights[i];
            if(i%2==0)
            className = "row-even"
            else
            className = "row-odd"
            flightOptions.push(
                <tr className={className}>
                    <th>flight.flight_id</th>
                    <th>flight.airlines</th>
                    <th>flight.departure</th>
                    <th>flight.deat_type</th>
                    <th>flight.seats</th>
                    <th value={i}><Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit"
                            onClick={this.book}
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
                                {/* <th>Book</th> */}
                                {/* <th><Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className="submit"
                                    >Book
                                </Button>
                                </th> */}
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

export default withRouter(FlightResult);