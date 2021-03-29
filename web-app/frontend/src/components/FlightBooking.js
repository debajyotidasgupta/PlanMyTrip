import React, { Component } from 'react'
import '../styles/Flight.scss'
import { Redirect, withRouter } from 'react-router-dom'

export class FlightResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            flights: this.props.location.state.flights
        };;
    }
    
    render() {
        return(
            <div className="main">
                <div className="bg-flight"></div>
                <div className="paper">
                    <form className="form-flight" onSubmit={this.handleSubmit} noValidate>
                        
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(FlightResult);