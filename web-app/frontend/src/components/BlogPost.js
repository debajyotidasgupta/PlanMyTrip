import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import '../styles/Blog.scss'
import axios from 'axios'

export class BlogPost extends Component {

    constructor(props) {
        super(props)

        this.state = {
            title: null,
            short_description: null,
            content: null,
            url: null
        }
    }

    titleChange = (e) => {
        this.setState({
            ...this.state,
            title: e.target.value
        })
    }

    shortChange = (e) => {
        this.setState({
            ...this.state,
            short_description: e.target.value
        })
    }

    longChange = (e) => {
        this.setState({
            ...this.state,
            content: e.target.value
        })
    }

    urlChange = (e) => {
        this.setState({
            ...this.state,
            url: e.target.value
        })
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        const data = {
            title: this.state.title,
            short_description: this.state.short_description,
            content: this.state.content,
            url: this.state.url
        }

        axios.post('/api/blog/blogPost', data, { withCredentials: true }).then(res => {
            this.props.history.push({
                pathname: '/blog'
            })
        })
    }

    render() {
        return (
            <div className="blogPost">
                <div className="form">
                    <h1>Create New Blog</h1>
                    <form method="POST" onSubmit={ this.onSubmitHandler }>
                        <div>
                            <input id="author" name="author" placeholder={ localStorage.getItem('name') } value={ localStorage.getItem('name') } disabled></input>
                            <input id="title" placeholder="Title" onChange={ this.titleChange }></input>
                            <input id="url" placeholder="Url" onChange={ this.urlChange } placeholder="https://google.com"></input>
                        </div>

                        <textarea
                            rows='2'
                            cols='150'
                            id="short_description"
                            name="short_description"
                            placeholder="Short description should be within 1000 words ....."
                            onChange={ this.shortChange }
                        ></textarea>

                        <textarea
                            rows='10'
                            cols='150'
                            id="content"
                            name="content"
                            placeholder="Content should be within 10000 words ....."
                            onChange={ this.longChange }
                        ></textarea>

                        <Button className="submit" type="submit">Post Blog</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default BlogPost
