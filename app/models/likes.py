from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = "likes"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))
    )

    song_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("songs.id"))
    )

    created_at = db.Column("date", db.DateTime, default=db.func.now())

    user = db.relationship("User", back_populates="liked_songs")
    song = db.relationship("Song", back_populates="liked_by_users")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user.to_dict()['id'],
            "createdAt": self.created_at
        }





# Many-to-Many Relationship between Users & Songs
# likes = db.Table(
#     "likes",
#     db.Model.metadata,
#     # column name 'userId, FK => add prefix => table name
#     db.Column(
#         "userId", db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True
#     ),
#     db.Column(
#         "songId", db.ForeignKey(add_prefix_for_prod("songs.id")), primary_key=True
#     ),
#     db.Column("date", db.DateTime, default=db.func.now()),
# )

# For Production SCHEMA
# if environment == "production":
#     likes.schema = SCHEMA

# Remember to create your "join table" relationships between User model and Song model
# Example from Group Project
# join table relationship
# user = db.relationship("User", secondary=favorites, back_populates="products")
