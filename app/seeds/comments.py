from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from app.models import Comment
import random


# Adds a demo user, you can add other users here if you want
def seed_comments():
    #Random Comments for Seed Data
    comments = [
        "Nice track!",
        "Really enjoying this song!",
        "Impressive work!",
        "Can't get enough of this!",
        "Such a banger!",
        "Loving the vibes!",
        "Great job on this!",
        "Awesome music!",
        "This song is fire!",
        "Perfect melody!",
        "Keep up the good work!",
        "Fantastic composition!",
        "Bringing the heat!",
        "Incredible song!",
        "Rocking it!",
        "This track is addictive!",
        "Top-notch production!",
        "A masterpiece!",
        "Unbelievable talent!",
        "Groovy beats!"
    ]

    seed_data = []

    for user_id in range(1, 12):  # userId ranges from 1 to 11
        for song_id in range(1, 45):  # songId ranges from 1 to 44
            # Randomly select a comment from the sample_comments list
            comment = random.choice(comments)

            # Create a comment object and add it to seed_data
            seed_data.append({
                "comment": comment,
                "userId": user_id,
                "songId": song_id
            })

    for comment in seed_data:
        each_comment = Comment(**comment)
        print(each_comment)
        db.session.add(each_comment)
        db.session.commit()
    return seed_data


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
