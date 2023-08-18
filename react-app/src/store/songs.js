//* =====================  types ===========================//
const GET_ALL_SONGS_ACTION = "songs/GET_ALL_SONGS_ACTION";
const GET_SONG_BY_ID_ACTION = "songs/GET_SONG_BY_ID_ACTION";
const POST_NEW_SONG_ACTION = "songs/POST_NEW_SONG_ACTION";
const EDIT_SONG_BY_ID_ACTION = "songs/EDIT_SONG_BY_ID_ACTION";
const DELETE_SONG_BY_ID_ACTION = "songs/DELETE_SONG_BY_ID_ACTION";
const PLAY_CURRENT_USER_SONG_ACTION = "songs/PLAY_CURRENT_USER_SONG_ACTION";
const IS_PLAYING_BOOLEAN_ACTION = "songs/IS_PLAYING_BOOLEAN_ACTION";
const SET_PREV_SONG_ACTION = "songs/SET_PREV_SONG_ACTION";
// ACTIONS FOR COMMENTS
const GET_ALL_COMMENTS_ACTION = "comments/GET_ALL_COMMENTS_ACTION";
const GET_USER_COMMENTS_ACTION = "comments/GET_USER_COMMENTS_ACTION";
const GET_SONG_COMMENTS_ACTION = "comments/GET_SONG_COMMENTS_ACTION";
const POST_COMMENT_ACTION = "comments/POST_COMMENT_ACTION";
const DELETE_COMMENT_ACTION = "comments/DELETE_COMMENT_ACTION";
//? =====================  actions ===========================//

const getAllSongAction = (allSongs) => {
  return {
    type: GET_ALL_SONGS_ACTION,
    allSongs,
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
    // console.log("error: Song not okay");
    return;
  }
};

export const thunkEditSongById = (songId, updatedSongFormData) => async (dispatch) => {
  console.log("thunk", updatedSongFormData);
  let updatedSong = await fetch(`/api/songs/${songId}`, {
    method: "PUT",
    // headers: {
    //   "Content-Type": "application/json",
    // },
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
    // console.log(`YOU ARE WORKING WITH THIS ===`, comments);
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
    // console.log("thunk", comments);
    // console.log(`YOU ARE WORKING WITH THIS ===`, comments);
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
  // console.log("before thunk", commentData);
  let comment = await fetch(`/api/songs/${songId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });
  // console.log("after thunk, outside if block", comment);
  if (comment.ok) {
    comment = await comment.json();
    // console.log("in if block", comment);
    dispatch(postComment(songId, comment));
    return comment;
  }
  // console.log("end", comment.errors);
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
      profileImage: "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
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
    thumbnail: "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/11.jpg",
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
      profileImage: "https://i1.sndcdn.com/artworks-R5fUpysnmuGuxcMv-5ojqxQ-t500x500.png",
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
    thumbnail: "https://soundbangersimagesbucket.s3.us-west-1.amazonaws.com/thumbnails-to-seed/11.jpg",
  },
  isPlaying: false,
  comments: {},
};
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_SONGS_ACTION: {
      newState = { ...state };
      newState.Songs = { ...action.allSongs.Songs };
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
    // COMMENTS COMMENTS COMMENT //
    // -- COMMENTS SECTION -- //
    // COMMENTS COMMENTS COMMENT //
    case GET_ALL_COMMENTS_ACTION: {
      newState = { ...state };
      newState.comments = { ...action.allComments };
      return newState;
    }
    case GET_USER_COMMENTS_ACTION: {
      newState = { ...state };
      // console.log("reducer", action.userComments);
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
    default:
      return state;
  }
}
