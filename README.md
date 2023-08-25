
# Database Schema and Backend Routes

## Database Schema

![BangerSounds-Flask-Schema](https://i.imgur.com/gImNYG7.png)

## Backend Routes

### Users

`GET /api/users/`

-   Returns the information for all users

`GET /api/users/:id`

-   Returns the information for one user

### Sessions

`GET /api/auth/`

-   Returns the information for the logged in user

`POST /api/auth/signup`

-   Signs a new user up

`POST /api/auth/login`

-   Logs in a user

`DELETE /api/auth/`

-   Logs out a user

### Songs

`GET /api/discover or /api/home`

-  Discover new songs

`GET /api/profile/`

-   Returns the user's songs, liked songs, and playlists

`GET /api/profile/songs`

-   Returns the all the songs that belongs to the user

`POST /api/new/`

-   Creates a new song

`PUT /api/profile/songs/:songId`

-   Creates a new song

`DELETE /api/profile/songs/:songId`

- Deletes a song

### Comments

`GET /api/songs/:songId`

-   View all comments of a song

`POST /api/songs/:songId`

-   Creates a new comment

`DELETE /api/songs/:songId`

-   Deletes a comment
