import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import '../styles/Blog.scss'

export default class Blog extends Component {

    render() {
        return (
            <div className="main">
                <div className='head'>
                    <h1>Blogs</h1>
                    <h3>Read About World Around You</h3>

                    <Button
                        className="add"
                        href={ "/blogPost?user_id=" + localStorage.getItem('user_id') }
                    >Add New Blog</Button>
                </div>

                <div className="content">
                    <div className="blogs">
                        <SingleBlog
                            url="https://trabeauli.com/wp-content/uploads/2018/04/Italy.jpg"
                            author="Debajyoti Dasgupta"
                            date="29 January, 2021"
                            commentsNo="1"
                            title="Travel Around The World"
                            shortDescription="Italy is an enticing country. It is such a wonderful and best place that it is almost impossible to define its beauty with the help of a few words. It is a beautiful, serene, spell-binding, alluring and mesmerizing country. Be it a child, young, or an old person everyone is awestruck by its magical disposition. Maybe this is the reason why visiting Italy is a part of the bucket list of so many people. It pre-possesses a rich history, some of the world’s most famous monuments such as the Leani"
                            blog_id="1"
                        />
                        <SingleBlog
                            url="https://cdn.e-konomista.pt/uploads/2019/07/simon-migaj-471526-unsplash_1525947999.jpg"
                            author="Debajyoti Dasgupta"
                            date="29 January, 2021"
                            commentsNo="1"
                            title="Top destinations in Europe"
                            shortDescription="Italy is an enticing country. It is such a wonderful and best place that it is almost impossible to define its beauty with the help of a few words. It is a beautiful, serene, spell-binding, alluring and mesmerizing country. Be it a child, young, or an old person everyone is awestruck by its magical disposition. Maybe this is the reason why visiting Italy is a part of the bucket list of so many people. It pre-possesses a rich history, some of the world’s most famous monuments such as the Leani"
                            blog_id="1"
                        />
                    </div>
                    <div className="sidebar">
                        <SingleSide
                            url="https://trabeauli.com/wp-content/uploads/2018/04/Italy.jpg"
                            author="Debajyoti"
                            date="29 January 2021"
                            commentsNo="1"
                            title="Travel Around The World"
                            blog_id="1"
                        />
                        <SingleSide
                            url="https://cdn.e-konomista.pt/uploads/2019/07/simon-migaj-471526-unsplash_1525947999.jpg"
                            author="Debajyoti"
                            date="29 January, 2021"
                            commentsNo="1"
                            title="Top destinations in Europe"
                            blog_id="1"
                        />
                    </div>
                </div>
            </div>
        )
    }
}

class SingleBlog extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="single">
                <h1><a href={ "blog/" + this.props.blog_id }>{ this.props.title }</a></h1>
                <div className="meta">
                    <h4>{ this.props.author }</h4>
                    <h4>|</h4>
                    <h4>{ this.props.date }</h4>
                    <h4>|</h4>
                    <h4>{ this.props.commentsNo } comments</h4>
                </div>
                <img src={ this.props.url } />
                <p>{ this.props.shortDescription }</p>
            </div>
        )
    }
}

class SingleSide extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="single-side">
                <img src={ this.props.url } />
                <h1><a href={ "blog/" + this.props.blog_id }>{ this.props.title }</a></h1>
                <div className="meta">
                    <h4>{ this.props.author }</h4>
                    <h4>|</h4>
                    <h4>{ this.props.date }</h4>
                    <h4>|</h4>
                    <h4>{ this.props.commentsNo } comments</h4>
                </div>
            </div>
        )
    }
}
