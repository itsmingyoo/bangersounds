//* =====================  types ===========================//
// ACTIONS FOR THUNKS
const GET_ALL_SONGS_ACTION = "songs/GET_ALL_SONGS_ACTION";
const GET_LANDING_SONGS_ACTION = "songs/GET_LANDING_SONGS_ACTION";
const GET_SONG_BY_ID_ACTION = "songs/GET_SONG_BY_ID_ACTION";
const POST_NEW_SONG_ACTION = "songs/POST_NEW_SONG_ACTION";
const EDIT_SONG_BY_ID_ACTION = "songs/EDIT_SONG_BY_ID_ACTION";
const DELETE_SONG_BY_ID_ACTION = "songs/DELETE_SONG_BY_ID_ACTION";
const PLAY_CURRENT_USER_SONG_ACTION = "songs/PLAY_CURRENT_USER_SONG_ACTION";

// ACTIONS FOR AUDIO PLAYER
const IS_PLAYING_BOOLEAN_ACTION = "songs/IS_PLAYING_BOOLEAN_ACTION";
const SET_PREV_SONG_ACTION = "songs/SET_PREV_SONG_ACTION";

// ACTIONS FOR COMMENTS
const GET_ALL_COMMENTS_ACTION = "comments/GET_ALL_COMMENTS_ACTION";
const GET_USER_COMMENTS_ACTION = "comments/GET_USER_COMMENTS_ACTION";
const GET_SONG_COMMENTS_ACTION = "comments/GET_SONG_COMMENTS_ACTION";
const POST_COMMENT_ACTION = "comments/POST_COMMENT_ACTION";
const DELETE_COMMENT_ACTION = "comments/DELETE_COMMENT_ACTION";

// ACTIONS FOR LIKES AND REPOSTS
// const TOGGLE_LIKE_ACTION = "likes/TOGGLE_LIKE_ACTION";
const POST_LIKE_ACTION = "likes/POST_LIKE_ACTION";
const DELETE_LIKE_ACTION = "likes/DELETE_LIKE_ACTION";

const TOGGLE_REPOST_ACTION = "reposts/TOGGLE_REPOST_ACTION";

//? =====================  actions ===========================//

const getAllSongAction = (allSongs) => {
  return {
    type: GET_ALL_SONGS_ACTION,
    allSongs,
  };
};

const getLandingSongsAction = (landingSongs) => {
  return {
    type: GET_LANDING_SONGS_ACTION,
    landingSongs,
  };
};

const getSongByIdAction = (song) => {
  return {
    type: GET_SONG_BY_ID_ACTION,
    song,
  };
};

const postNewSongAction = (newSong) => {
  return {
    type: POST_NEW_SONG_ACTION,
    newSong,
  };
};

const editSongByIdAction = (updatedSong) => {
  return {
    type: EDIT_SONG_BY_ID_ACTION,
    updatedSong,
  };
};

const deleteSongByIdAction = (songId, res) => {
  return {
    type: DELETE_SONG_BY_ID_ACTION,
    songId,
    res,
  };
};

export const playUserSongAction = (song) => {
  return {
    type: PLAY_CURRENT_USER_SONG_ACTION,
    song,
  };
};

export const setPlayingState = (boolean) => {
  return {
    type: IS_PLAYING_BOOLEAN_ACTION,
    boolean,
  };
};

export const setPrevSongAction = (song) => {
  return {
    type: SET_PREV_SONG_ACTION,
    song,
  };
};

//*** ACTIONS FOR COMMENTS
const getAllComments = (allComments) => {
  return {
    type: GET_ALL_COMMENTS_ACTION,
    allComments,
  };
};

const getUserComments = (userComments) => {
  return {
    type: GET_USER_COMMENTS_ACTION,
    userComments,
  };
};

const getSongComments = (songComments) => {
  return {
    type: GET_SONG_COMMENTS_ACTION,
    songComments,
  };
};

const postComment = (songId, newComment) => {
  return {
    type: POST_COMMENT_ACTION,
    songId,
    newComment,
  };
};

const deleteComment = (commentId) => {
  return {
    type: DELETE_COMMENT_ACTION,
    commentId,
  };
};

//!!! ACTIONS FOR LIKES AND COMMENTS !!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// const toggleLike = (songId, user, res) => {
//   return {
//     type: TOGGLE_LIKE_ACTION,
//     songId,
//     user,
//     res, // 0 or 1 : 1 then create, 0 delete
//   };
// };

const postLike = (songId, res) => {
  return {
    type: POST_LIKE_ACTION,
    songId,
    res,
  };
};

const deleteLike = (songId, userId) => {
  return {
    type: DELETE_LIKE_ACTION,
    songId,
    userId,
  };
};

const toggleRepost = (songId, user, isRepost, res) => {
  return {
    type: TOGGLE_REPOST_ACTION,
    songId,
    user,
    isRepost,
    res,
  };
};

//*  ===================== song thunks ===========================//

export const thunkGetAllSongs = () => async (dispatch) => {
  let songs = await fetch(`/api/songs/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Can input more KVP here to grab from headers in the backend
    },
  });
  songs = await songs.json();
  dispatch(getAllSongAction(songs));
  return songs;
};

export const thunkGetLandingPageSongs = () => async (dispatch) => {
  let landingSongs = await fetch(`/api/songs/landingpage`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Can input more KVP here to grab from headers in the backend
    },
  });
  landingSongs = await landingSongs.json();
  dispatch(getLandingSongsAction(landingSongs));
  return landingSongs;
};

export const thunkGetSongById = (songId) => async (dispatch) => {
  let song = await fetch(`/api/songs/${songId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Can input more KVP here to grab from headers in the backend
    },
  });
  song = await song.json();
  dispatch(getSongByIdAction(song));
  return song;
};

export const thunkPostNewSong = (songFormData) => async (dispatch) => {
  let newSong = await fetch(`/api/songs/new`, {
    method: "POST",
    body: songFormData,
  });
  if (newSong) {
    newSong = await newSong.json();
    dispatch(postNewSongAction(newSong));
    return newSong;
  } else {
    return;
  }
};

export const thunkEditSongById =
  (songId, updatedSongFormData) => async (dispatch) => {
    let updatedSong = await fetch(`/api/songs/${songId}`, {
      method: "PUT",
      body: updatedSongFormData,
    });
    updatedSong = await updatedSong.json();
    dispatch(editSongByIdAction(updatedSong));
    return updatedSong;
  };

export const thunkDeleteUserSong = (songId) => async (dispatch) => {
  let deleted = await fetch(`/api/songs/${songId}`, {
    method: "DELETE",
  });
  if (deleted.ok) {
    deleted = await deleted.json();
    dispatch(deleteSongByIdAction(songId, deleted));
    return deleted;
  }
  return deleted.errors;
};

//!  ===================== comments thunks ===========================//
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! //

export const thunkGetAllComments = () => async (dispatch) => {
  let comments = await fetch(`/api/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Can input more KVP here to grab from headers in the backend
    },
  });
  if (comments.ok) {
    comments = await comments.json();

    dispatch(getAllComments(comments));
    return comments;
  }
  return comments.errors;
};

export const thunkGetUserComments = () => async (dispatch) => {
  let comments = await fetch(`/api/comments/user-comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Can input more KVP here to grab from headers in the backend
    },
  });
  if (comments.ok) {
    comments = await comments.json();

    dispatch(getUserComments(comments));
    return comments;
  }
  return comments.errors;
};

export const thunkGetSongComments = (songId) => async (dispatch) => {
  let songComments = await dispatch(`/api/songs/${songId}/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (songComments.ok) {
    songComments = await songComments.json();
    dispatch(getSongComments(songComments));
    return songComments;
  }
  return songComments.errors;
};

export const thunkPostComment = (songId, commentData) => async (dispatch) => {
  let comment = await fetch(`/api/songs/${songId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (comment.ok) {
    comment = await comment.json();

    dispatch(postComment(songId, comment));
    return comment;
  }

  return comment.errors;
};

export const thunkDeleteComment = (songId, commentId) => async (dispatch) => {
  let comment = await fetch(`/api/songs/${songId}/${commentId}`, {
    method: "DELETE",
  });
  if (comment.ok) {
    comment = await comment.json();
    dispatch(deleteComment(commentId));
    return comment;
  }
  return comment.errors;
};

//**=================== LIKES AND REPOSTS THUNKS =======================/
//**********************************************************************/
//**********************************************************************/
export const thunkToggleLike = (songId, user) => async (dispatch) => {
  try {
    let res = await fetch(`/api/songs/${songId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    res = await res.json();
    console.log("RESPONSE FROM THUNK", res);
    if (res.likeInfo) {
      console.log("POSTING A LIKE THUNK");
      dispatch(postLike(songId, res.likeInfo));
      return;
    } else {
      console.log("DELETING A LIKE THUNK");
      dispatch(deleteLike(songId, user.id));
      return;
    }
    return res;
  } catch (e) {
    console.log(e);
  }
};
export const thunkToggleRepost =
  (songId, user, isRepost) => async (dispatch) => {
    try {
      if (isRepost) {
        let repostedSong = await fetch(`/api/songs/${songId}/repost`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            songId,
          },
        });
        repostedSong = await repostedSong.json();
        dispatch(toggleRepost(songId, user, isRepost, repostedSong));
        return repostedSong;
      } else {
        let repostedSong = await fetch(`/api/songs/${songId}/repost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            songId,
          },
        });
        repostedSong = await repostedSong.json();
        console.log(repostedSong);
        dispatch(toggleRepost(songId, user, isRepost, repostedSong));
        return repostedSong;
      }
    } catch (e) {
      console.log("error");
      return e;
    }
  };

//? ================== reducer================================//
let initialState = {
  Songs: {},
  SongDetails: {},
  UserSongs: {},
  PreviousSong: {
    artistId: 1,
    artistInfo: {
      displayName: "Enter your display name here",
      email: "demo@aa.io",
      firstName: "Demo",
      id: 1,
      lastName: "FiftyNine",
      profileBio: "This is a demo account for demo users",
      profileCity: "",
      profileCountry: "",
      profileImage:
        "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
      username: "Demo",
    },
    caption: "Bangers All Around",
    description: "Default Description From BangerSounds",
    genre: "Dance & EDM",
    id: 1,
    private: false,
    songURL:
      "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Adventure+Club+x+Said+the+Sky+-+Already+Know+(Feat.+Caly+Bevier).mp3",
    title: "Adventure Club x Said the Sky - Already Know (Feat. Caly Bevier)",
    thumbnail:
      "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/11.jpg",
  },
  CurrentlyPlaying: {
    artistId: 1,
    artistInfo: {
      displayName: "Enter your display name here",
      email: "demo@aa.io",
      firstName: "Demo",
      id: 1,
      lastName: "FiftyNine",
      profileBio: "This is a demo account for demo users",
      profileCity: "",
      profileCountry: "",
      profileImage:
        "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
      username: "Demo",
    },
    caption: "Bangers All Around",
    description: "Default Description From BangerSounds",
    genre: "Dance & EDM",
    id: 1,
    private: false,
    songURL:
      "https://soundbangersbucket.s3.us-west-1.amazonaws.com/songs-to-seed/Adventure+Club+x+Said+the+Sky+-+Already+Know+(Feat.+Caly+Bevier).mp3",
    title: "Adventure Club x Said the Sky - Already Know (Feat. Caly Bevier)",
    thumbnail:
      "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/11.jpg",
  },
  isPlaying: false,
  comments: {},
};
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // SONGS SONGS SONGS SONGS SONGS SONGS SONGS SONGS   //
    // ----------------- SONGS SECTION ----------------- //
    // SONGS SONGS SONGS SONGS SONGS SONGS SONGS SONGS   //
    case GET_ALL_SONGS_ACTION: {
      newState = { ...state };
      newState.Songs = { ...newState.Songs, ...action.allSongs.Songs };
      return newState;
    }
    case GET_LANDING_SONGS_ACTION: {
      newState = { ...state };
      newState.Songs = { ...action.landingSongs.Songs };
      return newState;
    }
    case GET_SONG_BY_ID_ACTION: {
      newState = { ...state };
      newState.SongDetails = action.song;
      return newState;
    }
    case POST_NEW_SONG_ACTION: {
      newState = { ...state };
      newState.Songs[action.newSong.id] = action.newSong;
      return newState;
    }
    case EDIT_SONG_BY_ID_ACTION: {
      newState = { ...state };
      newState.Songs[action.updatedSong.id] = { ...action.updatedSong };
      return newState;
    }
    case DELETE_SONG_BY_ID_ACTION: {
      newState = { ...state };
      newState.Songs = { ...newState.Songs };
      delete newState.Songs[action.songId];
      return newState;
    }
    case PLAY_CURRENT_USER_SONG_ACTION: {
      newState = { ...state };
      newState.CurrentlyPlaying = {};
      newState.CurrentlyPlaying = { ...action.song };
      return newState;
    }
    case SET_PREV_SONG_ACTION: {
      newState = { ...state };
      newState.PreviousSong = { ...action.song };
      return newState;
    }
    case IS_PLAYING_BOOLEAN_ACTION: {
      newState = { ...state };
      newState.isPlaying = action.boolean;
      return newState;
    }
    // COMMENTS COMMENTS COMMENT COMMENTS COMMENT COMMENT   //
    // ----------------- COMMENTS SECTION ----------------- //
    // COMMENTS COMMENTS COMMENT COMMENTS COMMENT COMMENT   //
    case GET_ALL_COMMENTS_ACTION: {
      newState = { ...state };
      newState.comments = { ...action.allComments };
      return newState;
    }
    case GET_USER_COMMENTS_ACTION: {
      newState = { ...state };
      newState.userComments = {};
      newState.userComments = { ...action.userComments };
      return newState;
    }
    case GET_SONG_COMMENTS_ACTION: {
      newState = { ...state };
      newState.songComments = { ...action.songComments };
      return newState;
    }
    case POST_COMMENT_ACTION: {
      newState = { ...state };
      newState.comments[action.newComment.id] = action.newComment;
      return newState;
    }
    case DELETE_COMMENT_ACTION: {
      newState = { ...state };
      newState.comments = { ...newState.comments };
      delete newState.comments[action.commentId];
      return newState;
    }
    // LIKES AND REPOSTS LIKES AND REPOSTS LIKES AND REPOSTS //
    // ------------- LIKES AND REPOSTS SECTION ------------- //
    // LIKES AND REPOSTS LIKES AND REPOSTS LIKES AND REPOSTS //
    // case TOGGLE_LIKE_ACTION: {
    //   newState = { ...state };
    //   if (action.isLiked) delete newState.Songs[action.songId].likes[action.user.id];
    //   else {
    //     console.log("this is the else statement reducer", action.res);
    //     newState.Songs[action.songId].likes[action.user.id] = action.res.like;
    //   }
    //   return newState;
    // }

    case POST_LIKE_ACTION: {
      newState = { ...state };
      newState.Songs[action.songId].likes[action.res.userId] = action.res;
      return newState;
    }
    case DELETE_LIKE_ACTION: {
      newState = { ...state };
      delete newState.Songs[action.songId].likes[action.userId];
      return newState;
    }
    case TOGGLE_REPOST_ACTION: {
      newState = { ...state };
      if (action.isRepost)
        delete newState.Songs[action.songId].reposts[action.user.id];
      else
        newState.Songs[action.songId].reposts[action.user.id] =
          action.res.repost;
      return newState;
    }

    default:
      return state;
  }
}
