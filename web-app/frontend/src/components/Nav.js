import React, { Component } from 'react'
import '../styles/Nav.scss'
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search';
import logo from '../assets/images/logo.png';
import { withRouter } from 'react-router-dom'

export class Nav extends Component {
    constructor(props){
        super(props);
    }
    handleLogout = e=>{
        e.preventDefault();
        
        axios.delete('http://127.0.0.1:5000/auth/logout',{withCredentials: true}).then(res=>{
            console.log("Pakistan called")
            localStorage.setItem('name','');
            localStorage.setItem('email','');
            localStorage.setItem('phone','');
            localStorage.setItem('user_type','');
            localStorage.setItem('rating','');
            alert('You have been logged out successfully!')
            this.props.history.push({
                pathname: '/'
            })
        })
        
    }
    getFlights = e=>{
        e.preventDefault();

        axios.get('http://127.0.0.1:5000/airport/').then(res=>{
            console.log("China called")
            localStorage.setItem('airports',res.data.airports)
            this.props.history.push({
                pathname: '/flight'
            })
        })
    }
    render() {
        const name= localStorage.getItem('name');
        let logAccount;
        if(!name){
            logAccount = <li className=""><a href="/login">Login</a></li>
        }
        else{
            logAccount = 
                <div className="drop">
                    <li className=""><a href="#">About Me</a></li>
                    <div className="drop-content">
                        <ul>
                            <li><a href="/account">My Account</a></li>
                            <li><a href="#" onClick={this.handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
        }
        return (
            <nav>
                <div className="logo">
                    <img src={ logo } alt="logo" />
                    <div className="company">
                        <h2>PLANMYTRIP</h2>
                        <h4>TRAVEL AGENCY</h4>
                    </div>
                </div>

                <ul className="nav-links">
                    <li className="active"><a href="/">Home</a></li>
                    <div className="drop">
                        <li className=""><a href="#">Bookings</a></li>
                        <div className="drop-content">
                            <ul>
                                <li><a href="/hotel">Hotel</a></li>
                                <li><a href="/flight" onClick={this.getFlights}>Flight</a></li>
                                <li><a href="#">Cruise</a></li>
                                <li><a href="/train">Train</a></li>
                                <li><a href="#">Bus</a></li>
                            </ul>
                        </div>
                    </div>

                    <li className=""><a href="#">Offers</a></li>
                    <li className=""><a href="/blog">Blogs</a></li>
                    <li className=""><a href="#">Contact</a></li>
                    {logAccount}
                    {/* <li className=""><a href="/login">Login</a></li> */}
                </ul>

                <div className="search-class">
                    <SearchIcon className="search" />
                </div>
            </nav>
        )
    }
}

export default withRouter(Nav);