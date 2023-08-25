from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

from .likes import likes
from .reposts import reposts



class User(db.Model, UserMixin):
    __tablename__ = "users"
    #
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    # Required Columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Additional Columns - Nullable / Not Unique / Not required for Signup / Meant for Edit Profile Page Modal
    display_name = db.Column(db.String(40), nullable=True)
    first_name = db.Column(db.String(40), nullable=True)
    last_name = db.Column(db.String(40), nullable=True)
    profile_image = db.Column(db.String(255), nullable=True)
    profile_bio = db.Column(db.String(255), nullable=True)
    profile_city = db.Column(db.String(255), nullable=True)
    profile_country = db.Column(db.String(255), nullable=True)
    profile_background = db.Column(db.String(255), nullable=True)

    # Relationship to Songs
    # Target Relationship = db.r('Model', back_populates="current model")
    song_users = db.relationship("Song", backref="users", cascade="all, delete-orphan")

    # Relationship to Comments
    user_comments = db.relationship("Comment", back_populates="comment_user")

    # join table relationships for many-to-many metadata table for likes/reposts
    # Key here is referenced on the other side
    # The relationship referenced here references:
    # 1. the MODEL on the other side (Song side)
    # 2. metadata many-to-many table
    # 3. the variable referencing this variable on the other side (Song Side)
    user_songs_liked = db.relationship("Song", secondary=likes, back_populates="user_likes")
    user_songs_reposted = db.relationship("Song", secondary=reposts, back_populates="user_reposts")



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            # "username": self.username, # same reason here - with security reasons
            # "email": self.email, # removing this for security reasons on user end - almost all the other info are public information for the user
            "displayName": self.display_name,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "profileImage": self.profile_image,
            "profileBio": self.profile_bio,
            "profileCity": self.profile_city,
            "profileCountry": self.profile_country,
            "profileBackground": self.profile_background
            # "comments": [comment.to_dict() for comment in self.user_comments]
            # "songsOwned": [song.to_dict() for song in self.song_users]
            #this should be on the parent side and it will to_dict() all the songs that belong to this user due to the relationship
        }
