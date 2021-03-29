import React, { Component } from 'react'
import '../styles/Nav.scss'
import axios from 'axios'
import SearchIcon from '@material-ui/icons/Search';
import logo from '../assets/images/logo.png';
import { withRouter } from 'react-router-dom'

export class Nav extends Component {
    constructor(props) {
        super(props);
    }
    handleLogout = e => {
        e.preventDefault();

        axios.defaults.withCredentials = true
        axios.delete('/api/auth/logout').then(res => {

            console.log('savj')
            localStorage.clear();
            alert('You have been logged out successfully!')

            window.location.reload()
            // this.props.history.push({
            //     pathname: '/'
            // })
        })

    }
    getFlights = e => {
        e.preventDefault();

        axios.get('/api/airport/').then(res => {
            localStorage.setItem('airports', res.data.airports)
            this.props.history.push({
                pathname: '/flight'
            })
        })
    }
    render() {
        const name = localStorage.getItem('name');
        let logAccount;
        if (!name) {
            logAccount = <li className=""><a href="/login">Login</a></li>
        }
        else {
            logAccount =
                <div className="drop">
                    <li className=""><a href="#">About Me</a></li>
                    <div className="drop-content">
                        <ul>
                            <li><a href="/account">My Account</a></li>
                            <li><a href="/" onClick={this.handleLogout}>Logout</a></li>
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
                                <li><a href="/flight" onClick={ this.getFlights }>Flight</a></li>
                                <li><a href="#">Cruise</a></li>
                                <li><a href="/train">Train</a></li>
                                <li><a href="#">Bus</a></li>
                            </ul>
                        </div>
                    </div>

                    <li className=""><a href="#">Offers</a></li>
                    <li className=""><a href="/blog">Blogs</a></li>
                    <li className=""><a href="#">Contact</a></li>
                    { logAccount }
                    {/* <li className=""><a href="/login">Login</a></li> */ }
                </ul>

                <div className="search-class">
                    <SearchIcon className="search" />
                </div>
            </nav>
        )
    }
}

export default withRouter(Nav);