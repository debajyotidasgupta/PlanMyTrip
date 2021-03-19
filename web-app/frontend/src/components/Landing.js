import React, { Component } from 'react'
import '../styles/Landing.scss'

import top1 from '../assets/images/top_1.jpg'
import top2 from '../assets/images/top_2.jpg'
import top3 from '../assets/images/top_3.jpg'
import top4 from '../assets/images/top_4.jpg'

export class Landing extends Component {

    render() {
        return (
            <div className="main">
                <div className="landing">
                    <h1>discover</h1>
                    <h3>Discover new worlds</h3>
                </div>
                <div className="offer">

                    <div className="offer-header">
                        <h2>Top destinations in Europe</h2>
                        <h3>TAKE A LOOK AT THESE OFFERS</h3>
                    </div>

                    <div className="offer-container">
                        <div className="offer-card">
                            <img src={ top1 } />
                            <h4>From $890</h4>
                            <h1>Paris, France</h1>
                        </div>
                        <div className="offer-card">
                            <img src={ top2 } />
                            <h4>From $890</h4>
                            <h1>Italian Rivera</h1>
                        </div>
                        <div className="offer-card">
                            <img src={ top3 } />
                            <h4>From $890</h4>
                            <h1>Clique Terre</h1>
                        </div>
                        <div className="offer-card">
                            <img src={ top4 } />
                            <h4>From $890</h4>
                            <h1>Santorini Greece</h1>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Landing
