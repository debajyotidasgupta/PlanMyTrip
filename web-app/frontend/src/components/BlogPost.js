import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import '../styles/Blog.scss'

export class BlogPost extends Component {
    render() {
        return (
            <div className="blogPost">
                <div className="form">
                    <h1>Create New Blog</h1>
                    <form action="http://localhost:5000/blogPost" method="POST">
                        <div>
                            <input id="user_id" name="user_id" value={ localStorage.getItem('user_id') } hidden></input>
                            <input id="author" name="author" placeholder={ localStorage.getItem('name') } value={ localStorage.getItem('name') } disabled></input>
                            <input id="Title" placeholder="Title"></input>
                        </div>

                        <textarea
                            rows='2'
                            cols='150'
                            placeholder="Short description should be within 1000 words ....."
                        ></textarea>

                        <textarea
                            rows='10'
                            cols='150'
                            placeholder="Content should be within 10000 words ....."
                        ></textarea>

                        <Button className="submit" type="submit">Post Blog</Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default BlogPost
