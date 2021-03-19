import React, { Component } from 'react'
import '../styles/Login.scss'
import {Button} from '@material-ui/core'

export class Login extends Component {
    render(){
    return (
        <div className="paper">
            <form className="form" noValidate>
                <div class="form-input">
                    <input type="email" name="email" required/>
                    <label>Email address</label>
                </div>
                <div class="form-input">
                    <input type="password" name="password" required/>
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
        );
    }
}

export default Login;