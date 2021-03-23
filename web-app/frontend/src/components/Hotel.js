import React, { Component } from 'react'
// import { KeyboardDatePicker } from '@material-ui/pickers';

import '../styles/Hotel.scss'

export class Hotel extends Component {
    render() {
        return (
            <div classsName="big">
                <div className="header">
                    <h1>Hotel Roxandrea</h1>
                    <h3>More than an Hotel ... An Eperience</h3>
                    <div className="form">
                        <form action="#" className="content">
                            <div className="box">
                                <label>Check-in Date</label>
                                <input type="text" name="check-in" placeholder="Check-in Date"></input>
                            </div>
                            <div className="box">
                                <label>Check-out Date</label>
                                <input type="text" name="check-out" placeholder="Check-out Date"></input>
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
                            <div className="box">
                                <label>Room</label>
                                <select name="" id="" className="">
                                    <option value="" className="">Suite</option>
                                    <option value="" className="">Family Room</option>
                                    <option value="" className="">Deluxe Room</option>
                                    <option value="" className="">Classic Room</option>
                                    <option value="" className="">Superior Room</option>
                                    <option value="" className="">Luxury Room</option>
                                </select>
                            </div>
                            <div className="box">
                                <label>Guests</label>
                                <select name="" id="" className="">
                                    <option value="" className="">1 Adult</option>
                                    <option value="" className="">2 Adult</option>
                                    <option value="" className="">3 Adult</option>
                                    <option value="" className="">4 Adult</option>
                                    <option value="" className="">5 Adult</option>
                                    <option value="" className="">6 Adult</option>
                                </select>
                            </div>
                        </form>
                        <div className="side">
                            <span className="ha">check availibility</span>
                            <span className="hb">Best Price Guaranteed!</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Hotel

