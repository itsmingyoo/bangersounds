from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

# Many-to-Many Relationship between Users & Songs
reposts = db.Table(
    "reposts",
    db.Model.metadata,
    # column name 'userId, FK => add prefix => table name
    db.Column(
        "userId", db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True
    ),
    db.Column(
        "songId", db.ForeignKey(add_prefix_for_prod("songs.id")), primary_key=True
    ),
    db.Column('date', db.DateTime, default=db.func.now())
)

# For Production SCHEMA
if environment == "production":
    reposts.schema = SCHEMA

# Remember to create your "join table" relationships between User model and Song model
# Example from Group Project
# join table relationship
# user = db.relationship("User", secondary=favorites, back_populates="products")
