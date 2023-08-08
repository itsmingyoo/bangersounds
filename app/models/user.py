from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    # Required Columns
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    # Additional Columns - Nullable / Not Unique / Not required for Signup / Meant for Edit Profile Page Modal
    first_name = db.Column(db.String(40), nullable=True)
    last_name = db.Column(db.String(40), nullable=True)
    profile_image = db.Column(db.String(255), nullable=True)
    profile_bio = db.Column(db.String(255), nullable=True)
    profile_city = db.Column(db.String(255), nullable=True)
    profile_country = db.Column(db.String(255), nullable=True)

    # Relationship to Songs
    # Target Relationship = db.r('Model', back_populates="current model")
    songs = db.relationship('Song', back_populates='artist', cascade='all, delete-orphan')

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
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
