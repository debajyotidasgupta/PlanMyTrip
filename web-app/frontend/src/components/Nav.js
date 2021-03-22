import React, { Component } from 'react'
import '../styles/Nav.scss'
import SearchIcon from '@material-ui/icons/Search';
import logo from '../assets/images/logo.png';

export class Nav extends Component {
    render() {

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
                                <li><a href="#">Hotel</a></li>
                                <li><a href="/flight">Flight</a></li>
                                <li><a href="#">Cruise</a></li>
                                <li><a href="/train">Train</a></li>
                                <li><a href="#">Bus</a></li>
                            </ul>
                        </div>
                    </div>

                    <li className=""><a href="#">Offers</a></li>
                    <li className=""><a href="#">Blogs</a></li>
                    <li className=""><a href="#">Contact</a></li>
                    <li className=""><a href="/login">Login</a></li>
                </ul>

                <div className="search-class">
                    <SearchIcon className="search" />
                </div>
            </nav>
        )
    }
}

export default Nav