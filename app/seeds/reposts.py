from app.models import db, User, environment, SCHEMA
from app.models.reposts import Repost
from sqlalchemy.sql import text
import random
from datetime import datetime, timedelta


def seed_reposts():
    seed_data = []  # Initialize an empty list to collect seed data
    user_ids = list(range(1, 28))  # 2nd param not inclusive
    song_ids = list(range(1, 81))  # 2nd param not inclusive

    for uId in user_ids:
        reposted_songs = set()  # Set to store reposted songs for this user
        for _ in range(20):  # Adjust amount of 'likes' per user
            # Generate a unique song for this user
            sId = random.choice(list(set(song_ids) - reposted_songs))
            reposted_songs.add(sId)

            # Generate a random date for the like (within a reasonable time frame)
            current_date = datetime.now()
            random_days_ago = random.randint(1, 365)  # Random number of days ago
            repost_date = current_date - timedelta(days=random_days_ago)

            # Create a Like instance and add it to the database session
            repost = Repost(user_id=uId, song_id=sId, created_at=repost_date)
            db.session.add(repost)

            # Append the data to the seed_data list
            seed_data.append({
                "userId": uId,
                "songId": sId,
                "createdAt": repost_date.strftime("%Y-%m-%d %H:%M:%S")
            })

    # Commit the changes to the database
    db.session.commit()

    return seed_data  # Return the collected seed data as a list

def undo_reposts():
    if environment == "production":
        with db.session() as session:
            session.execute(
                f"TRUNCATE table {SCHEMA}.reposts RESTART IDENTITY CASCADE;"
            )
            db.session.commit()
    else:
        with db.session() as session:
            session.execute(text("DELETE FROM reposts"))
            db.session.commit()


# !!! META DATA TABLE M2M
# def seed_reposts():
#     seed_data = []

#     user_ids = list(range(1, 28))  # List of user IDs from 1 to 11
#     song_ids = list(range(1, 81))  # List of song IDs from 1 to 45

#     for user_id in user_ids:
#         reposted_songs = set()  # Set to store liked songs for this user
#         for _ in range(20):  # Assuming you want 10 likes per user
#             # Generate a unique song for this user - This random number generator is given a 'set' to choose from which is a list with a range of 1-45 (look at var song_ids being passed in) then it takes out the choices that have already been chosen from the list to be randomized from - everytime we generate a new song id we add it to the reposted_songs so it will have a selective selection of choices to choose from.
#             song_id = random.choice(list(set(song_ids) - reposted_songs))
#             reposted_songs.add(song_id)

#             seed_data.append({
#                 "userId": user_id,
#                 "songId": song_id
#             })

#     # Assuming you have a 'reposts' table and a database connection 'connection'
#     with db.engine.connect() as connection:
#         for repost in seed_data:
#             connection.execute(reposts.insert().values(**repost))

#     return seed_data


# def undo_reposts():
#     if environment == "production":
#         with db.session() as session:
#             session.execute(
#                 f"TRUNCATE table {SCHEMA}.reposts RESTART IDENTITY CASCADE;"
#             )
#             db.session.commit()
#     else:
#         with db.session() as session:
#             session.execute(text("DELETE FROM reposts"))
#             db.session.commit()

    # Commit the changes (if any) to the database.
    # This is outside the 'with' blocks as we don't need to commit separately for each block.
    # db.session.commit()

    # PSA for above comment: we're not using this outside in this project like we did for Edgy because we want to commit each time we truncate/delete within the 'with' keyword which is when a connection is open. this is the proper way of doing it. probably have to refactor this part in the Edgy project
