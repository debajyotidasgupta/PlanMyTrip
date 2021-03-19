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
                    <li className="active"><a href="#">Bookings</a></li>
                    <li className=""><a href="#">Offers</a></li>
                    <li className=""><a href="#">Blogs</a></li>
                    <li className=""><a href="#">Contact</a></li>
                    <li className=""><a href="#">Login</a></li>
                </ul>

                <div className="search-class">
                    <SearchIcon className="search" />
                </div>
            </nav>
        )
    }
}

export default Nav