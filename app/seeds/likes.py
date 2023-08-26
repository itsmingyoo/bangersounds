from app.models import db, environment, SCHEMA
from sqlalchemy.sql import text
from app.models.likes import likes
import random

def seed_likes():
    seed_data = []

    user_ids = list(range(1, 28))  # 2nd param not inclusive
    song_ids = list(range(1, 81))  # 2nd param not inclusive

    for user_id in user_ids:
        liked_songs = set()  # Set to store liked songs for this user
        for _ in range(20):  # Adjust amount of 'likes' per user
            # Generate a unique song for this user
            song_id = random.choice(list(set(song_ids) - liked_songs))
            liked_songs.add(song_id)

            seed_data.append({
                "userId": user_id,
                "songId": song_id
            })

    # Assuming you have a 'likes' table and a database connection 'connection'
    with db.engine.connect() as connection:
        for like in seed_data:
            connection.execute(likes.insert().values(**like))

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

    # Commit the changes (if any) to the database.
    # This is outside the 'with' blocks as we don't need to commit separately for each block.
    # db.session.commit()
