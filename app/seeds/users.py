from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username="Demo",
        email="demo@aa.io",
        password="password",
        first_name="Demo",
        last_name="FiftyNine",
        display_name='Enter your display name here',
        profile_image="https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
        profile_bio="This is a demo account for demo users",
        profile_city="",
        profile_country="",
    )
    marnie = User(
        username="marnie",
        email="marnie@aa.io",
        password="password",
        first_name="Marnie",
        last_name="Simpson",
        display_name='Enter your display name here',
        profile_image="https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
        profile_bio="Fill in your bio",
        profile_city="",
        profile_country="",
    )
    bobbie = User(
        username="bobbie",
        email="bobbie@aa.io",
        password="password",
        first_name="Bobbie",
        last_name="Chocomaria",
        display_name='Enter your display name here',
        profile_image="https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
        profile_bio="Fill something here for your bio",
        profile_city="",
        profile_country="",
    )
    barnie = User(
        username="barnie",
        email="barnie@aa.io",
        password="password",
        first_name="Barnie",
        last_name="Samsung",
        display_name='Enter your display name here',
        profile_image="https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
        profile_bio="Fill in your bio here",
        profile_city="",
        profile_country="",
    )
    minh = User(
        username="minh",
        email="minh@aa.io",
        password="password",
        first_name="BangerSounds",
        last_name="CEO",
        display_name='Enter your display name here',
        profile_image="https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
        profile_bio="Im gaming right now brb",
        profile_city="",
        profile_country="",
    )
    chris = User(
        username="chris",
        email="chris@aa.io",
        password="password",
        first_name="Chris",
        last_name="Thornburg",
        display_name='Enter your display name here',
        profile_image="https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
        profile_bio="Rick roll og",
        profile_city="",
        profile_country="",
    )
    jenny = User(
        username="jenny",
        email="jenny@aa.io",
        password="password",
        first_name="Jenny",
        last_name="Lee",
        display_name='Enter your display name here',
        profile_image="https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
        profile_bio="I like to go for marathonicaltacular runs",
        profile_city="",
        profile_country="",
    )
    casey = User(
        username="casey",
        email="casey@aa.io",
        password="password",
        first_name="Casey",
        last_name="O'neil",
        display_name='Enter your display name here',
        profile_image="https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
        profile_bio="Just some random grid user",
        profile_city="",
        profile_country="",
    )
    seabass = User(
        username="seabass",
        email="seabass@aa.io",
        password="password",
        first_name="Seabass",
        last_name="Stovall",
        display_name='Enter your display name here',
        profile_image="https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
        profile_bio="Bottoms up!!!!",
        profile_city="",
        profile_country="",
    )
    nate = User(
        username="nate",
        email="nate@aa.io",
        password="password",
        first_name="Nate",
        last_name="B",
        display_name='Enter your display name here',
        profile_image="https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
        profile_bio="I like going on dates.",
        profile_city="",
        profile_country="",
    )
    james = User(
        username="james",
        email="james@aa.io",
        password="password",
        first_name="James",
        last_name="NotTheAsianOne",
        display_name='Enter your display name here',
        profile_image="https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
        profile_bio="I used to be depressed, I still am, but I used to be too.",
        profile_city="",
        profile_country="",
    )

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.add(barnie)
    db.session.add(minh)
    db.session.add(chris)
    db.session.add(jenny)
    db.session.add(casey)
    db.session.add(seabass)
    db.session.add(nate)
    db.session.add(james)
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
