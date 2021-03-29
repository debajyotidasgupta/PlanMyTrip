import React, { Component } from 'react'
import '../styles/Login.scss'
import {Button} from '@material-ui/core'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export class Account extends Component {
    constructor(props){
        super(props);
    }
    handleSubmit = e=>{
        e.preventDefault();
        
        axios.delete('http://127.0.0.1:5000/auth/logout',{withCredentials: true}).then(res=>{
            console.log("Pakistan")
            console.log(res.body);
            console.log(res.headers);
        })
        
    }
    render(){
    return (
        <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className="submit"
        onClick={this.handleSubmit}
        >
            Logout
        </Button>     
        );
    }
}

export default Account;