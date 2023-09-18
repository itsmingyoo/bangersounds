from app.models import db, User, environment, SCHEMA
from app.models.likes import Like
from sqlalchemy.sql import text
import random
from datetime import datetime, timedelta

def seed_likes():
    seed_data = []  # Initialize an empty list to collect seed data
    user_ids = list(range(1, 28))  # 2nd param not inclusive
    song_ids = list(range(1, 81))  # 2nd param not inclusive

    for uId in user_ids:
        liked_songs = set()  # Set to store liked songs for this user
        for _ in range(20):  # Adjust amount of 'likes' per user
            # Generate a unique song for this user
            sId = random.choice(list(set(song_ids) - liked_songs))
            liked_songs.add(sId)

            # Generate a random date for the like (within a reasonable time frame)
            current_date = datetime.now()
            random_days_ago = random.randint(1, 365)  # Random number of days ago
            like_date = current_date - timedelta(days=random_days_ago)

            # Create a Like instance and add it to the database session
            like = Like(user_id=uId, song_id=sId, created_at=like_date)
            db.session.add(like)

            # Append the data to the seed_data list
            seed_data.append({
                "userId": uId,
                "songId": sId,
                "createdAt": like_date.strftime("%Y-%m-%d %H:%M:%S")
            })

    # Commit the changes to the database
    db.session.commit()

    return seed_data


def undo_likes():
    if environment == "production":
        with db.session() as session:
            session.execute(
                f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;"
            )
            db.session.commit()
    else:
        with db.session() as session:
            session.execute(text("DELETE FROM likes"))
            db.session.commit()


# !!! META DATA TABLE EXAMPLE
# def seed_likes():
#     seed_data = []

#     user_ids = list(range(1, 28))  # 2nd param not inclusive
#     song_ids = list(range(1, 81))  # 2nd param not inclusive

#     for user_id in user_ids:
#         liked_songs = set()  # Set to store liked songs for this user
#         for _ in range(20):  # Adjust amount of 'likes' per user
#             # Generate a unique song for this user
#             song_id = random.choice(list(set(song_ids) - liked_songs))
#             liked_songs.add(song_id)

#             seed_data.append({
#                 "userId": user_id,
#                 "songId": song_id
#             })

#     # Assuming you have a 'likes' table and a database connection 'connection'
#     with db.engine.connect() as connection:
#         for like in seed_data:
#             connection.execute(likes.insert().values(**like))

#     return seed_data

# def undo_likes():
#     if environment == "production":
#         with db.session() as session:
#             session.execute(
#                 f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;"
#             )
#             db.session.commit()
#     else:
#         with db.session() as session:
#             session.execute(text("DELETE FROM likes"))
#             db.session.commit()

    # Commit the changes (if any) to the database.
    # This is outside the 'with' blocks as we don't need to commit separately for each block.
    # db.session.commit()
