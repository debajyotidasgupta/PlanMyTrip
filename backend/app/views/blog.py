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
    'url': fields.String(required=True),
})

month_to_name = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'Sepetember',
    10: 'October',
    11: 'November',
    12: 'December'
}

@api.route('/')
class blogs(Resource):
    def get(self):
        resultSet = Query('''
            SELECT b.blog_id, u.name, b.created_at, b.title, b.rating, b.short_description, b.content, b.url
            FROM Blog b, User u 
            ORDER BY rating ASC
        ''', model = Blog)

        all_blogs = resultSet.getAll()
        print(all_blogs)
        
        for i, blog in enumerate(all_blogs):
            cur = blog.__dict__
            all_blogs[i] = cur
            all_blogs[i]['created_at']=f"{cur['created_at'].day} {month_to_name[cur['created_at'].month]}, {cur['created_at'].year}"
       
        if len(all_blogs)==0:
            return {
                "message": "No blog found for now",
                'blogs': []
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
        data['url'] = api.payload['url']

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
        data = Query(f"SELECT * FROM Blog WHERE blog_id = {blog_id}", model=Blog)
        res = Query(f"\
        SELECT c.comment_id, c.created_at, c.content, u.name \
        FROM Comment c, User u \
        WHERE c.user_id = u.user_id and \
        blog_id = {blog_id}", model=Comment)


        comments = [comment.__dict__ for comment in res.getAll()]
        print(comments)

        cur = data.getOne().__dict__
        blog = cur
        blog['created_at'] = f"{cur['created_at'].day} {month_to_name[cur['created_at'].month]}, {cur['created_at'].year}"

        for i in range(len(comments)):
            cur = comments[i]
            comments[i]['created_at'] = f"{cur['created_at'].day} {month_to_name[cur['created_at'].month]}, {cur['created_at'].year}"

        return {
            "message": "Comment fetched successfully",
            "blog":  blog,
            "comments": comments
        }, 200

@api.route('/comment')
class comment(Resource):
    @login_required
    def post(self):
        data = dict()
        data['user_id'] = str(current_user.user_id)
        data['blog_id'] = api.payload["blog_id"]
        data['content'] = api.payload["content"]

        new_comment = Comment(**data)
        
        try:
            new_comment.save()
            return {
                'message': "Comment Added"
            }, 200

        except:
            return {
                'message': "Error in saving comment"
            }, 400