from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import Comment


# Adds a demo user, you can add other users here if you want
def seed_comments():
    # 41 Seed Data
    comments = [
        {
            "comment": "This is such a banger track!!!!",
            "userId": 11,
            "songId": 41
        },
    ]

    for comment in comments:
        each_comment = Comment(**comment)
        print(each_comment)
        db.session.add(each_comment)
        db.session.commit()
    return comments


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
