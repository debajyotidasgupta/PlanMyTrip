import React, { Component } from 'react'
import '../styles/Login.scss'
import {Button} from '@material-ui/core'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
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
        fetch("http://127.0.0.1:5000/auth/login", {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
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
                <form className="form-login" onSubmit={this.handleSubmit} noValidate>
                    <div class="form-input">
                        <input type="email" name="email" onChange={this.handleEmailChange} required/>
                        <label>Email address</label>
                    </div>
                    <div class="form-input">
                        <input type="password" name="password" onChange={this.handlePasswordChange} required/>
                        <label>Password</label>
                    </div>
                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submit"
                    >
                        Login
                    </Button>
                    <ul className="links">
                        <li><a href="#">Forgot password?
                        </a></li>
                        <li><a href="/signup">Don't have an account? Sign Up
                        </a></li>
                    </ul>
                </form>
            </div>
        </div>
        );
    }
}

export default Login;