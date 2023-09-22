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
    "Groovy beats!",
    "The drop is insane!",
    "Chill vibes, love it!",
    "Your vocals are on point!",
    "The guitar work is impressive!",
    "This is my new anthem!",
    "You've got a unique style!",
    "These lyrics hit deep!",
    "The beat is so catchy!",
    "Your music takes me to another world!",
    "I can't stop dancing to this!",
    "You've nailed the EDM vibes!",
    "The orchestration is stunning!",
    "This jazz fusion is smooth as silk!",
    "Metalhead approved! 🤘",
    "Your rap flow is tight!",
    "The energy in this track is unreal!",
    "Your voice is like honey!",
    "This acoustic arrangement is heartwarming!",
    "The reggae influence is pure joy!",
    "Your electronic soundscapes are mind-blowing!",
    "This indie folk sound is a breath of fresh air!",
    "The funkiness is off the charts!",
    "Your classical composition is breathtaking!",
    "The world needs more of your music!",
    "The country twang is perfect!",
    "Your synth work is on fire!",
    "This Latin groove is irresistible!",
    "Your instrumental solos are insane!",
    "The rhythm section is so tight!",
    "This song has serious soul!",
    "Your harmonies give me goosebumps!",
    "The production quality is top-tier!",
    "This track is an instant classic!",
    "You've got serious talent!",
    "The hooks in this are killer!",
    "Your genre-blending is genius!",
    "This song has serious replay value!",
    "You've got a true ear for melody!",
    "The dynamics in this are impressive!",
    "This beat is making me move!",
    "Your songwriting is on another level!",
    "The world needs more of your sound!",
    "You've created a masterpiece here!"
]

    seed_data = []

    for user_id in range(1, 28):  # 2nd param not inclusive
        for song_id in range(1, 81):  # 2nd param not inclusive
    # for user_id in range(1, 3):  # 2nd param not inclusive
    #     for song_id in range(1, 3):  # 2nd param not inclusive
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
