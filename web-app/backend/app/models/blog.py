from app.models.base import Model


class Blog(Model):
    SCHEMA = {
        "blog_id": "blog_id int PRIMARY KEY AUTO_INCREMENT",
        "author_id": "author_id int",
        "created_at": "created_at datetime",
        "title": "title varchar(255)",
        "rating": "rating int",
        "short_description": "short_description varchar(255)",
        "content": "content text",
        "!fk1": "foreign key (`author_id`) references User (`user_id`)"
    }


class Comment(Model):
    SCHEMA = {
        "comment_id": "comment_id int primary key",
        "blog_id": "blog_id int not null",
        "user_id": "user_id int not null",
        "created_at": "created_at datetime default(current_timestamp())",
        "content": "content varchar(255)",
        "!fk1": "foreign key (`blog_id`) references Blog (`blog_id`)",
        "!fk2": "foreign key (`user_id`) references User (`user_id`)"
    }
