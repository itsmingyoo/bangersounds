#aws test

# from .db import (
#     db,
#     environment,
#     SCHEMA,
#     add_prefix_for_prod,
# )
# class NewSong(db.Model):
#     __tablename__ = "newsongs"

#     if environment == "production":
#         __table_args__ = {"schema": SCHEMA}

#     # Required Columns
#     id = db.Column(db.Integer, primary_key=True)
#     song = db.Column(db.String(255))

#     def to_dict(self):
#         return {
#             "song": self.song
#         }
