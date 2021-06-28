import React, { Component } from 'react'
import '../styles/Account.scss'
import {Button} from '@material-ui/core'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export class Account extends Component {
    constructor(props){
        super(props);
    }
    render(){
        var type,name,email,phone,rating;
        type=localStorage.getItem('user_type')
        name=localStorage.getItem('name')
        email=localStorage.getItem('email')
        phone=localStorage.getItem('phone')
        rating=localStorage.getItem('rating')
        if(!type||type.length<1)
        type="not given"
        if(!phone||phone.length<1)
        phone="not given"
        if(!rating||rating.length<1)
        rating="not given"
        return ( 
            <div className="main">
                <div className="bg">
                </div>
                <div className="paper">
                    <div className="user-info">
                        <div className="row">
                            <div className="column">
                                <div className="info">
                                <h1>Your Name: {name}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div className="info">
                                <h1>Your email: {email}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div className="info">
                                <h1>Your Phone No: {phone}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div className="info">
                                <h1>Your User type: {type}</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="column">
                                <div className="info">
                                <h1>Your rating: {rating}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>                
            );
    }
}

export default Account;