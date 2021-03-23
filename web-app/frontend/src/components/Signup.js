import React, { Component } from 'react'
import '../styles/Signup.scss'
import {Button} from '@material-ui/core'

export class Signup extends Component {
    render(){
    return (
        <div class="main">
            <div className="bg">
            </div>
            <div className="paper">
                <form className="form-signup" noValidate>
                    <div class="row">
                    <div class="column">
                    <div class="form-input">
                        <input type="text" name="name" required/>
                        <label>Name</label>
                    </div>
                    <div class="form-input">
                        <input type="date" name="dob" required label="Date-of-birth"/>
                        <label>Date of Birth</label>
                    </div>
                    <div class="form-input">
                        <input type="email" name="email" required/>
                        <label>Email</label>
                    </div>
                    <div class="form-input">
                        <input type="password" name="password" required/>
                        <label>Password</label>
                    </div>
                    <div class="form-input">
                        <input type="password" name="confirm-password" required/>
                        <label>Confirm Passowrd</label>
                    </div>
                    <div class="form-input">
                        <select>
                            <option value="" disabled selected>Select Account Type</option>
                            <option value="general">General</option>
                            <option value="business">Business</option>
                        </select>
                    </div>
                    </div>
                    <div class="column">
                    <div class="form-input">
                        <input type="text" name="address" required/>
                        <label>Address Line</label>
                    </div>
                    <div class="form-input">
                        <input type="text" name="city" required/>
                        <label>City</label>
                    </div>
                    <div class="form-input">
                        <input type="text" name="state" required/>
                        <label>State</label>
                    </div>
                    <div class="form-input">
                        <input type="text" name="country" required/>
                        <label>Country</label>
                    </div>
                    <div class="form-input">
                        <input type="text" name="pincode" required/>
                        <label>Pincode</label>
                    </div>
                    <div class="form-input">
                        <input type="tel" name="phone" required/>
                        <label>Phone No</label>
                    </div>
                    </div>
                    </div>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submit"
                    >
                        Register
                    </Button>
                </form>
            </div>
        </div>
        );
    }
}

export default Signup;