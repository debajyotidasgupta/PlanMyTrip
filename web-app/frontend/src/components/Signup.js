import React, { Component } from 'react'
import '../styles/Signup.scss'
import {Button} from '@material-ui/core'

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
            phone: 0
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
        });
        if(this.state.password !== this.state.confirmPassword)
        {
            document.getElementsByName("confirm-password")[0].style.color = "red";
        }
    }
    handleUserTypeChange= e=>{
        this.setState({
            user_type: e.target.value.toLowerCase(),
        })
    }
    handlePhoneChange= e=>{
        this.setState({
            phone: Number(e.target.value),
        })
        if(this.phone<100000000 || this.phone>9999999999)
        {
            document.getElementsByName("phone")[0].style.color = "red";
        }
    }
    handleDobChange = e=>{
        var dob = e.target.value;
        var sql_dob = '';
        var year = e.target.value.substr(6,4);
        var month= e.target.value.substr(3,2);
        var date = e.target.value.substr(0,2);
        sql_dob.concat(year,'-',month,'-',date);
        this.setState({
            dob: sql_dob,
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
        var myHeaders = new Headers();
        myHeaders.append("Cookie", document.cookie);

        //var requestOptions = ;

        //console.log(requestOptions);
        myHeaders.append("Content-type","application/json");
        fetch("http://127.0.0.1:5000/auth/register", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                dob: this.state.dob,
                name: this.state.name,
                phone: this.state.phone                
            }),
            credentials: 'same-origin'
        })
        .then(response => {
            console.log(response);
        });
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

export default Signup;