
from flask import request
from flask_restplus import Namespace, Resource, fields
from flask_login import login_required, current_user
from app.models.base import Query
from app.models.blog import Blog, Comment

api = Namespace("blog", description="User Blogs")

userBlog = api.model('Blog', {
    'title': fields.String(required=True),
    'short_description': fields.String(required=True),
    'content': fields.String(required=True),
})

@api.route('/')
class blogs(Resource):
    def get(self):
        resultSet = Query('SELLECT * FROM Blog ORDER BY rating ASC', model = Blog)
        all_blogs = resultSet.getAll()

        if len(all_blogs)!=0:
            return {
                "message": "No blog found for now"
            }, 201
        else:
            return {
                "message": "Blogs found successfully",
                'blogs': all_blogs
            }, 200
    
@api.route('/blogPost')
class blogPost(Resource):
    # @api.expect(userBlog, validate=True)
    @login_required
    def post(self):   
        user = current_user
        data = dict()

        data['author_id'] = str(user.user_id)
        data['title'] = api.payload['title']
        data['short_description'] = api.payload['short_description']
        data['content'] = api.payload['content']

        new_blog = Blog(**data)
        print(new_blog)
        
        try:
            new_blog.save()        

            return {
                "message": 'Blog created Successfully'
            }, 200
        except:
            return {
                "message": 'Blog creation Error'
            }, 400
            

@api.route('/<int:blog_id>')
class showBlog(Resource):
    def get(self, blog_id):
        data = Query(f"SELECT * FROM Blog WHERE blog_id = {blog_id}", model=Comment)
        res = Query(f"SELECT * FROM Comment WHERE blog_id = {blog_id}", model=Comment)

        return {
            "message": "Comment fetched successfully",
            "blog":  data.getOne(),
            "comment": res.getAll()
        }, 200