import React, { Component } from 'react'
import '../styles/Train.scss'
import {Button} from '@material-ui/core'
import TrainIcon from '@material-ui/icons/Train';
import { Redirect } from 'react-router-dom'

export class Train extends Component {
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
                <Redirect to={"/train/results"}/>
            );
        }
        return(
            <div className="main">
                <div className="bg-train"></div>
                <div className="paper">
                    <form className="form-train" onSubmit={this.handleSubmit} noValidate>
                        <div className="row">
                            <div className="column">
                                <div className="form-input">
                                    <datalist id="stations">
                                        <option>BBS</option>
                                        <option>CAL</option>
                                    </datalist>
                                    <input autoComplete="on" list="stations" placeholder="Departure" style={{fontWeight:"bolder",color:"white"}}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div className="form-input">
                                    <datalist id="stations">
                                        <option>BBS</option>
                                        <option>CAL</option>
                                    </datalist>
                                    <input autoComplete="on" list="stations" placeholder="Arrival" style={{fontWeight:"bolder",color:"white"}}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <input type="date" name="dob" required label="Date-of-journey"/>
                                    <label style={{color:"white"}}>Date of Journey</label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <select>
                                        <option value="" disabled selected>Select Coach Class</option>
                                        <option value="AC">AC</option>
                                        <option value="CC">CC</option>
                                        <option value="FC">FC</option>
                                        <option value="SL">SL</option>
                                        <option value="2S">2S</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div class="form-input">
                                    <input type="number" min="0" name="no-of-passengers" required style={{color:"white"}}/>
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
                        endIcon={<TrainIcon/>}
                        >
                            Search Trains
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Train;