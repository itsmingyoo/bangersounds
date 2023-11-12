
# Welcome to BangerSounds



BangerSounds is an intuitive music hosting website where users can share their unique remixes and other tunes! This is a full stack web application solely inspired by SoundCloud. Nearly pixel perfect, the audio player is definitely the most intuitive portion of design in which I recreated based off of SoundCloud. Users are able to upload, like, repost, and comment on songs. They also have a customizable profile page to creatively attune to their liking.

# [BangerSounds Live](https://bangersounds.onrender.com)

## - [Database Schema](https://github.com/itsmingyoo/bangersounds/wiki/Database-Schema-and-Backend-Routes)  - [MVP](https://github.com/itsmingyoo/bangersounds/wiki/MVP-Features) - [User Stories](https://github.com/itsmingyoo/bangersounds/wiki/User-Stories) - [Wireframes](https://github.com/itsmingyoo/bangersounds/wiki/Wireframes) -

## Preview
![BangerSounds](https://i.imgur.com/Xh28PYw.gif)
![Library](https://i.imgur.com/12ACv9W.png)
![Download-Song](https://i.imgur.com/9iLHhJR.png)

## Code Snippets

## Image Below is a drag and drop implementation using 'DropZone' package and it also includes having two returns within one form with a transition depending on the state of submitting a song. If a valid song is submitted it will upload the song as it displays you the song details form to fill out it's title, genre, description, etc...
![Drag-and-Drop](https://i.imgur.com/61Eacmc.png)


# Getting Started



Clone this repository: https://github.com/itsmingyoo/bangersounds.git

Create a .env file and insert the following environmental variables:
```
SECRET_KEY=xxxx
DATABASE_URL=sqlite:///dev.db
SCHEMA=xxxx

# AWS user access key
S3_BUCKET=xxxx
S3_KEY=xxxx
S3_SECRET=xxxx
```



Create a .flaskenv file and insert the following environmental variables:

```
FLASK_APP=app

FLASK_ENV=development

FLASK_DEBUG=True
```



From the root directory, run the following command in the terminal:



```
pipenv install -r requirements.txt
```



## Still in the root directory, run the following commands in the terminal:

Enter virtual environment
```
pipenv shell
```
```
#creates migrations folders
flask db init
```
```
flask db migrate
```
After migrating, add this to your migrations file
```
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

from sqlalchemy.dialects import postgresql
from sqlalchemy import Text
# postgresql and Text is for the 'JSON' column of 'playlist_songs' object

if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE playlists SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE songs SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE comments SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE likes SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE reposts SET SCHEMA {SCHEMA};")
```
```
flask db upgrade
```
```
flask seed all
//unseed command for future use
flask seed undo
```
```
flask run
```

Next run this in the terminal

```
cd react-app
```
```
npm install
```
```
npm start
```

Now you're done! You should be able to see the project now and adjust it to your liking.

# Troubleshooting openssl error
Run this command if you have a different node version running and you run into an openssl error
```
npm i react-scripts@latest
```

If your dev.db is installed within the app folder instead of toplevel>instance
```
import os

base_dir = os.path.abspath(os.path.dirname(__file__))
SQLALCHEMY_DATABASE_URI = f'sqlite:///{os.path.join(base_dir, "instance", "dev.db")}'

// If this doesn't work, make sure your packages are up-to-date in the requirements.txt file
```

### Making sure you're on Python3 v3.9.4

Find the version
```
pyenv versions
```

Convert to v3.9.4

```
export PYENV_VERSION=3.9.4
```

## Useful Commands

Create automatic .gitignore with curl
```
curl https://raw.githubusercontent.com/github/gitignore/master/Python.gitignore > .gitignore
```

Exit Virtual Environment
```
deactivate
```

## Useful Sources
Python/React Skeleton Setup
```
https://github.com/appacademy/practice-for-week-19-python-project-skeleton/tree/main
```
