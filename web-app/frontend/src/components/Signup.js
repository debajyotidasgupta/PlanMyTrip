import React, { Component } from 'react'
import '../styles/Signup.scss'
import {Button} from '@material-ui/core'
import axios from 'axios'
import { Redirect, withRouter } from 'react-router-dom'

var emailRegEx = new RegExp(/^[a-zA-Z0-9]+@[a-zA-z0-9]+.[a-zA-Z]+/);

export class Signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            dob: '',
            email: '',
            password: '',
            confirmPassword: '',
            user_type: 'general',
            phone: ''
        }
    }
    validateInputs = ()=>{
        if(this.state.name.length < 1){
            alert('Name required');
            return false;
        }
        else if(this.state.dob.length < 1){
            alert('Date of birth required');
            return false;
        }
        else if(!emailRegEx.test(this.state.email))
        {
            alert('Enter valid email address');
            return false;
        }
        else if(this.state.password.length < 8){
            alert('Password should be at least 8 characters long');
            return false;
        }
        else if(this.state.password!==this.state.confirmPassword){
            alert('Confirm password did not match');
            return false;
        }
        else if(isNaN(this.state.phone) || this.state.phone.length!==10){
            alert('Enter a 10 digit phone no');
            return false;
        }
        else{
            this.setState({
                phone: Number(this.state.phone)
            },()=>{
                return true;
            });
            return true;
        }
    }
    handleNameChange = e=>{
        this.setState({
            name: e.target.value,
        });
    }
    handleEmailChange= e=>{
        this.setState({
            email: e.target.value,
        });
    }
    handlePasswordChange= e=>{
        this.setState({
            password: e.target.value,
        });
    }
    handleConfirmPasswordChange= e=>{
        this.setState({
            confirmPassword: e.target.value,
        },()=>{
            console.log("confirm value="+this.state.confirmPassword);
            if(this.state.password !== this.state.confirmPassword)
            {
                document.getElementsByName("confirm-password")[0].style.color = "red";
            }
            else
            {
                document.getElementsByName("confirm-password")[0].style.color = "white";
            }
        });
    }
    handleUserTypeChange= e=>{
        this.setState({
            user_type: e.target.value.toLowerCase(),
        })
    }
    handlePhoneChange= e=>{
        if(isNaN(e.target.value)){
            document.getElementsByName("phone")[0].style.color = "red";
        }
        else{
            this.setState({
                phone: e.target.value,
            },()=>{
                if(isNaN(this.state.phone) || this.state.phone.length!==10)
                {
                    document.getElementsByName("phone")[0].style.color = "red";
                }
                else
                {
                    document.getElementsByName("phone")[0].style.color = 'white';
                }
            })
        }
    }
    handleDobChange = e=>{
        this.setState({
            dob: e.target.value,
        });
    }
    handleSubmit = e=>{
        e.preventDefault();
        
        /*axios.post('https://0468eb026a63.ap.ngrok.io/auth/login',{user},{withCredentials: true}).then(res=>{
            console.log("Pakistan")
            console.log(res.body);
            return(
                <Redirect to={"/light/results"}/>
            );
        })*/
        if(this.validateInputs())
        {
            // var myHeaders = new Headers();
            // myHeaders.append("Cookie", document.cookie);
            // myHeaders.append("Content-type","application/json");
            // fetch("/api/auth/register", {
            //     method: 'POST',
            //     headers: myHeaders,
            //     body: JSON.stringify({
            //         email: this.state.email,
            //         password: this.state.password,
            //         dob: this.state.dob,
            //         name: this.state.name,
            //         phone: this.state.phone                
            //     }),
            //     credentials: 'same-origin'
            // })
            // .then(response => {
            //     console.log(response);
            // });
            const user = {
                email: this.state.email,
                password: this.state.password,
                dob: this.state.dob,
                name: this.state.name
            }
            axios.post('/api/auth/register',user,{withCredentials:true}).then(res=>{
                if(res.data.message=="User created")
                    alert("Registration done. Try to login using your email and password.")
                else
                    alert("Registration failed")
                this.props.history.push({
                    pathname: '/'
                })
            })
        }
    }
    render(){
    return (
        <div class="main">
            <div className="bg">
            </div>
            <div className="paper">
                <form className="form-signup" onSubmit={this.handleSubmit} noValidate>
                    <div class="row">
                    <div class="column">
                    <div class="form-input">
                        <input type="text" name="name" onChange={this.handleNameChange} required/>
                        <label>Name</label>
                    </div>
                    <div class="form-input">
                        <input type="date" name="dob" onChange={this.handleDobChange} required label="Date-of-birth"/>
                        <label>Date of Birth</label>
                    </div>
                    <div class="form-input">
                        <input type="email" name="email" onChange={this.handleEmailChange} required/>
                        <label>Email</label>
                    </div>
                    <div class="form-input">
                        <input type="password" name="password" onChange={this.handlePasswordChange} required/>
                        <label>Password</label>
                    </div>
                    <div class="form-input">
                        <input type="password" name="confirm-password" onChange={this.handleConfirmPasswordChange} required/>
                        <label>Confirm Passowrd</label>
                    </div>
                    <div class="form-input">
                        <select onChange={this.handleUserTypeChange}>
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
                        <input type="tel" name="phone" onChange={this.handlePhoneChange} required/>
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

export default withRouter(Signup);