import { Button } from '@material-ui/core'
import React, { Component, useState } from 'react'
import '../styles/Blog.scss'
import axios from 'axios'

export default class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            blogs: []
        }
    }

    componentDidMount() {
        axios.get('/api/blog/').then(res => {
            console.log(res)
            this.setState({
                blogs: res.data.blogs
            })
        })
    }



    render() {
        let blog_button;
        if (localStorage.getItem('name')) {
            blog_button = <Button
                className="add"
                href={ "/blogPost?user_id=" + localStorage.getItem('user_id') }
            >Add New Blog</Button>
        }
        
        return (
            <div className="main">
                <div className='head'>
                    <h1>Blogs</h1>
                    <h3>Read About World Around You</h3>
                    { blog_button }

                </div>

                <div className="content">
                    <div className="blogs">
                        { this.state.blogs.map(blog =>
                            <SingleBlog
                                url={ blog.url }
                                author={ blog.name }
                                date={ blog.created_at }
                                rating={ blog.rating }
                                title={ blog.title }
                                shortDescription={ blog.short_description }
                                blog_id={ blog.blog_id }
                            />
                        ) }
                    </div>
                    <div className="sidebar">
                        { this.state.blogs.map(blog =>
                            <SingleSide
                                url={ blog.url }
                                author={ blog.name }
                                date={ blog.created_at }
                                rating={ blog.rating }
                                title={ blog.title }
                                blog_id={ blog.blog_id }
                            />
                        ) }
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
                <h1><a href={ "blogSingle/" + this.props.blog_id }>{ this.props.title }</a></h1>
                <div className="meta">
                    <h4>{ this.props.author }</h4>
                    <h4>|</h4>
                    <h4>{ this.props.date }</h4>
                    <h4>|</h4>
                    <h4>{ this.props.rating } star</h4>
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
                <h1><a href={ "blogSingle/" + this.props.blog_id }>{ this.props.title }</a></h1>
                <div className="meta">
                    <h4>{ this.props.author }</h4>
                    <h4>|</h4>
                    <h4>{ this.props.date }</h4>
                    <h4>|</h4>
                    <h4>{ this.props.rating } star</h4>
                </div>
            </div>
        )
    }
}
