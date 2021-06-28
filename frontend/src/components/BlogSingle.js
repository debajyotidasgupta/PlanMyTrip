import { Button } from '@material-ui/core'
import React, { Component, useState } from 'react'
import '../styles/Blog.scss'
import axios from 'axios'

export default class BlogSingle extends Component {
    constructor(props) {
        super(props)

        this.state = {
            blog_id: props.match.params.id,
            blog: [],
            blogs: [],
            comments: [],
            userComment: null
        }

        axios.get("/api/blog/" + props.match.params.id).then((res) => {
            this.setState({
                blog: [res.data.blog],
                comments: res.data.comments
            })
            axios.get("/api/blog/").then(res => {
                this.setState({
                    blogs: res.data.blogs,
                })
            })
            console.log(this.state)
        })
    }

    commentHandler = (e) => {
        console.log(e)
        this.setState({
            userComment: e.target.value
        })
    }

    submitHandler = (e) => {

        e.preventDefault()
        let data = {
            blog_id: this.state.blog_id,
            content: this.state.userComment
        }
        console.log(data)


        axios.post('/api/blog/comment', data, { withCredentials: true }).then(res => {
            this.props.history.push({
                pathname: '/blog'
            })
            console.log(data)
        })
    }

    render() {
        let blog_button;
        if (localStorage.getItem('name')) {
            blog_button = <Button
                className="add"
                type="submit"
            >Add New Blog</Button>
        }

        let comment_button;
        if (localStorage.getItem('name')) {
            comment_button = <Button
                className="add"
                onClick={ this.submitHandler }
                type="submit"
            >Add Comment</Button>
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
                        { this.state.blog.map(blog => <SingleBlog
                            url={ blog.url }
                            author={ blog.name }
                            date={ blog.created_at }
                            rating={ blog.rating }
                            title={ blog.title }
                            content={ blog.content }
                            blog_id={ blog.blog_id }
                        />) }
                        <h1 id="commentHead"> Comments </h1>
                        { this.state.comments.map(comment => <Comment
                            name={ comment.name }
                            date={ comment.created_at }
                            comment={ comment.content }
                        />) }

                        <form style={ { marginBottom: '10px', } } >
                            <textarea rows='2' cols='50' onChange={ this.commentHandler } />
                            { comment_button }
                        </form>
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

class Comment extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="single">
                <div className="meta">
                    <h4>{ this.props.name }</h4>
                    <h4>|</h4>
                    <h4>{ this.props.date }</h4>
                </div>
                <p style={ { paddingTop: '0px', margin: '0px' } }>{ this.props.comment }</p>
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
                <h1><a href={ "/" + this.props.blog_id }>{ this.props.title }</a></h1>
                <div className="meta">
                    <h4>{ this.props.author }</h4>
                    <h4>|</h4>
                    <h4>{ this.props.date }</h4>
                    <h4>|</h4>
                    <h4>{ this.props.rating } star</h4>
                </div>
                <img src={ this.props.url } />
                <p>{ this.props.content }</p>
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
                <h1><a href={ "/" + this.props.blog_id }>{ this.props.title }</a></h1>
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

