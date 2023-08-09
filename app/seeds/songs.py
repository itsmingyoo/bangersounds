from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_songs():
    songs = [
        {
            "title": "Aporia",
            "genre": "Dance & EDM",
            "song_url": "https://soundcloud.com/inextremis/aporia",
            "description": "After the release of 'Back Home' by Akari, we knew we needed to host more releases from this italian duo. They're back with this powerful track called Aporia",
            "private": False,
            "caption": "First Test Song",
            "artistId": 1,
            "preview_imageURL": "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
        },
        {
            "title": "Phora - Feel",
            "genre": "R&B",
            "song_url": "https://open.spotify.com/track/2Cmashi3O9I8my5NnbQgqe?si=449ff523510e4789",
            "description": "Love is Hell",
            "private": False,
            "caption": "Optional Field",
            "artistId": 2,
            "preview_imageURL": "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
        },
        {
            "title": "$uicideboy$ - Unlucky Me",
            "genre": "HIP HOP",
            "song_url": "https://open.spotify.com/track/6zmOzxSclGHqbmgkjYdBdl?si=89484076bb014bba",
            "description": "It's a vibe",
            "private": False,
            "caption": "OPTIONAL FIELD AGAIN",
            "artistId": 3,
            "preview_imageURL": "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
        },
        {
            "title": "Esmi - Because",
            "genre": "RAP",
            "song_url": "https://open.spotify.com/track/5HOKg7EC5IdLxzLoWA5q9B?si=0fff9aba59844139",
            "description": "Amazing song even though I don't understand",
            "private": False,
            "caption": "This is a caption field",
            "artistId": 1,
            "preview_imageURL": "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
        },
        {
            "title": "Coogie - Alone (Feat. LeeHi)",
            "genre": "Korean-Pop",
            "song_url": "https://open.spotify.com/track/2SSbQoEqPHu6qAgi3pFobY?si=73bae767497c46d1",
            "description": "My type of jam",
            "private": False,
            "caption": "Caption this",
            "artistId": 2,
            "preview_imageURL": "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
        },
        {
            "title": "$uicideboy$ - Kill Yourself (Part III)",
            "genre": "RAP",
            "song_url": "https://open.spotify.com/track/0kEZlJh4mK1QRfb3CT5LPk?si=983a310d1c1647c1",
            "description": "Flow",
            "private": False,
            "caption": "No caption, you caption",
            "artistId": 3,
            "preview_imageURL": "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
        }
        # {
        #     "title": ,
        #     "genre": ,
        #     "song_url": ,
        #     "description": ,
        #     "private": ,
        #     "caption": ,
        #     "artistId": ,
        #     "preview_imageURL": "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
        # },
        # {
        #     "title": ,
        #     "genre": ,
        #     "song_url": ,
        #     "description": ,
        #     "private": ,
        #     "caption": ,
        #     "artistId": ,
        #     "preview_imageURL": "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
        # },
        # {
        #     "title": ,
        #     "genre": ,
        #     "song_url": ,
        #     "description": ,
        #     "private": ,
        #     "caption": ,
        #     "artistId": ,
        #     "preview_imageURL": "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
        # },
        # {
        #     "title": ,
        #     "genre": ,
        #     "song_url": ,
        #     "description": ,
        #     "private": ,
        #     "caption": ,
        #     "artistId": ,
        #     "preview_imageURL": "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
        # },
        # {
        #     "title": ,
        #     "genre": ,
        #     "song_url": ,
        #     "description": ,
        #     "private": ,
        #     "caption": ,
        #     "artistId": ,
        #     "preview_imageURL": "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png"
        # },
    ]


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
