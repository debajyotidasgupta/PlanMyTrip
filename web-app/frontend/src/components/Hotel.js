import axios from 'axios';
import React, { Component } from 'react'
// import { KeyboardDatePicker } from '@material-ui/pickers';

import '../styles/Hotel.scss'

export class Hotel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            rooms: null,
            showModal: false
        }
    }
    
    render() {
        return (
            <div classsName="big">
                <div className="header">
                    { this.state.data === null ? (
                        <div>
                            <h1>Hotel Roxandrea</h1>
                            <h3>More than an Hotel ... An Experience</h3>
                        </div>
                    ) : (
                        <div style={{"backgroundColor": "whitesmoke", "overflow": "auto", "marginTop": "200px", "marginLeft": "40px", "marginRight": "40px", "padding": "50px", "fontSize": "1.2rem" }}>
                            { this.state.data.hotels.length === 0 ? "Oops! No hotel found" :  (
                                <div style={{"display": "flex", "flexDirection": "column"}}>
                                    {
                                        this.state.data.hotels.map(elt => (
                                            <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "space-evenly",
                                            "borderWidth" : "1px", "borderStyle": "solid", "borderColor": "black", "padding": "10px", "margin": "5px"}}>
                                                <div style={{"display": "flex", "flexDirection": "column"}}>
                                                    <h2>{elt.hotel_name}</h2>
                                                    <small>{elt.address_line_1 + "," + elt.city + ", " + elt.state }</small>
                                                </div>
                                                <div style={{"display": "flex", "flexDirection": "column"}}>
                                                    <p>From ₹ {elt.min_cost}</p>
                                                    <button onClick={(e) => {
                                                        e.preventDefault();
                                                        let start_date = document.getElementById('check-in').value;
                                                        let end_date = document.getElementById('check-out').value;
                                                        axios.get(`/api/hotel/rooms?hotel_id=${elt.hotel_id}&start_date=${start_date}&end_date=${end_date}`)
                                                            .then(res => {
                                                                this.setState({
                                                                    ...this.state,
                                                                    rooms: res.data.rooms,
                                                                    showModal: true
                                                                })
                                                            })
                                                    }}>Check out the rooms</button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) }
                        </div>
                    )}
                    <div className="form">
                        <form action="#" className="content">
                            <div className="box">
                                <label>City</label>
                                <input type="text" id="city" placeholder="City"></input>
                            </div>
                            <div className="box">
                                <label>Check-in Date</label>
                                <input type="text" id="check-in" placeholder="Check-in Date"></input>
                            </div>
                            <div className="box">
                                <label>Check-out Date</label>
                                <input type="text" id="check-out" placeholder="Check-out Date"></input>
                                {/* <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Date picker dialog"
                                    format="yyyy/mm/dd"
                                    value={ selectedDate }
                                    onChange={ handleDateChange }
                                    KeyboardButtonProps={ {
                                        'aria-label': 'change date',
                                    } }
                                /> */}
                            </div>
                            {/* <div className="box">
                                <label>Room</label>
                                <select name="" id="" className="">
                                    <option value="" className="">Suite</option>
                                    <option value="" className="">Family Room</option>
                                    <option value="" className="">Deluxe Room</option>
                                    <option value="" className="">Classic Room</option>
                                    <option value="" className="">Superior Room</option>
                                    <option value="" className="">Luxury Room</option>
                                </select>
                            </div> */}
                            {/* <div className="box">
                                <label>Guests</label>
                                <select name="" id="" className="">
                                    <option value="" className="">1 Adult</option>
                                    <option value="" className="">2 Adult</option>
                                    <option value="" className="">3 Adult</option>
                                    <option value="" className="">4 Adult</option>
                                    <option value="" className="">5 Adult</option>
                                    <option value="" className="">6 Adult</option>
                                </select>
                            </div> */}
                        </form>
                        <div className="side" onClick={(e) => {
                            e.preventDefault();
                            let city = document.getElementById('city').value;
                            let start_date = document.getElementById('check-in').value;
                            let end_date = document.getElementById('check-out').value;

                            axios.get(`/api/hotel/?city=${city}&start_date=${start_date}&end-date=${end_date}`)
                                .then(resp => {
                                    this.setState({
                                        ...this.state,
                                        data: resp.data
                                    })
                                })
                        }} style={{cursor: "pointer"}}>
                            <span className="ha">check availibility</span>
                            <span className="hb">Best Price Guaranteed!</span>
                        </div>
                    </div>
                    {
                        this.state.showModal ? (
                            <div style={{zIndex: 999,"display": "flex", "transform": "translateY(-150px)", "flexDirection": "column", "backgroundColor": "whitesmoke", "overflow": "auto", "marginTop": "200px", "marginLeft": "40px", "marginRight": "40px", "padding": "50px", "fontSize": "1.2rem"}}>
                                <div style={{display: "flex", justifyContent: "space-around", alignContent: "flex-end"}}>
                                    <button onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({
                                            ...this.state,
                                            showModal: false
                                        })
                                    }}>Close</button>
                                </div>

                                {
                                    this.state.rooms.map(elt => (
                                        <div style={{"display": "flex", "flexDirection": "row", "justifyContent": "space-evenly",
                                            "borderWidth" : "1px", "borderStyle": "solid", "borderColor": "black", "padding": "10px", "margin": "5px"}}>
                                                <div style={{"display": "flex", "flexDirection": "column"}}>
                                                    <h2>Room {elt.room_no}</h2>
                                                    <small>₹ { elt.cost }</small>
                                                </div>
                                                <div style={{"display": "flex", "flexDirection": "column"}}>
                                                    <button onClick={(e) => {
                                                        e.preventDefault();
                                                        let start_date = document.getElementById('check-in').value;
                                                        let end_date = document.getElementById('check-out').value;
                                                        axios.post(`/api/hotel/booking`, {
                                                            hotel_id: elt.hotel_id,
                                                            room_no: elt.room_no,
                                                            start_date: start_date,
                                                            end_date: end_date,
                                                            no_of_persons: 1
                                                        }, {withCredentials: true})
                                                            .then(res => {
                                                                alert(res.data.message);
                                                            })
                                                    }}>Book</button>
                                                </div>  
                                        </div>
                                    ))
                                }

                            </div>
                        ) : ""
                    }
                </div>
            </div>
        )
    }
}

export default Hotel

