import React, { Component } from 'react'
import '../styles/Landing.scss'

import top1 from '../assets/images/top_1.jpg'
import top2 from '../assets/images/top_2.jpg'
import top3 from '../assets/images/top_3.jpg'
import top4 from '../assets/images/top_4.jpg'

import popular1 from '../assets/images/popular_1.jpg'
import popular2 from '../assets/images/popular_2.jpg'
import popular3 from '../assets/images/popular_3.jpg'
import popular4 from '../assets/images/popular_4.jpg'
import popular5 from '../assets/images/popular_5.jpg'
import popular6 from '../assets/images/popular_6.jpg'
import popular7 from '../assets/images/popular_7.jpg'
import popular8 from '../assets/images/popular_8.jpg'

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

                <div className="last">
                    <div className="last-card">
                        <div className="last-card-content">
                            <h3 id="head">Bali</h3>
                            <div className="last-pt">55%</div>
                            <h2>Last Minute Offer</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar sed mauris eget tincidunt. Sed lectus nulla, tempor vel</p>
                            <button>See Offer</button>
                        </div>
                    </div>

                    <div className="last-card">
                        <div className="last-card-content">
                            <h3 id="head">Bali</h3>
                            <div className="last-pt">55%</div>
                            <h2>Last Minute Offer</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar sed mauris eget tincidunt. Sed lectus nulla, tempor vel</p>
                            <button>See Offer</button>
                        </div>
                    </div>
                </div>

                <div className="offer" id="bottom">
                    <div className="offer-header">
                        <h2>Popular destinations in 2018</h2>
                        <h3>TAKE A LOOK AT THESE OFFERS</h3>
                    </div>

                    <div className="popular-container">
                        <div className="popular-card-section">
                            <div className="popular-card">
                                <img src={ popular1 } />
                                <h4>From $890</h4>
                                <h1>Turkey</h1>
                            </div>
                            <div className="popular-card">
                                <img src={ popular2 } />
                                <h4>From $890</h4>
                                <h1>Hawaii</h1>
                            </div>
                            <div className="popular-card">
                                <img src={ popular3 } />
                                <h4>From $890</h4>
                                <h1>Ireland</h1>
                            </div>
                            <div className="popular-card">
                                <img src={ popular4 } />
                                <h4>From $890</h4>
                                <h1>Thailand</h1>
                            </div>
                        </div>
                        <div className="popular-card-section">
                            <div className="popular-card">
                                <img src={ popular5 } />
                                <h4>From $890</h4>
                                <h1>Croatia</h1>
                            </div>
                            <div className="popular-card">
                                <img src={ popular6 } />
                                <h4>From $890</h4>
                                <h1>Bali</h1>
                            </div>
                            <div className="popular-card">
                                <img src={ popular7 } />
                                <h4>From $890</h4>
                                <h1>France</h1>
                            </div>
                            <div className="popular-card">
                                <img src={ popular8 } />
                                <h4>From $890</h4>
                                <h1>Vietnam</h1>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Landing
