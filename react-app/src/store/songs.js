//* =====================  types ===========================//
const GET_ALL_SONGS_ACTION = "songs/GET_ALL_SONGS_ACTION";
const GET_SONG_BY_ID_ACTION = "songs/GET_SONG_BY_ID_ACTION";
const POST_NEW_SONG_ACTION = "songs/POST_NEW_SONG_ACTION";
const EDIT_SONG_BY_ID_ACTION = "songs/EDIT_SONG_BY_ID_ACTION";
const DELETE_SONG_BY_ID_ACTION = "songs/DELETE_SONG_BY_ID_ACTION";
const PLAY_CURRENT_USER_SONG_ACTION = "songs/PLAY_CURRENT_USER_SONG_ACTION";
const IS_PLAYING_BOOLEAN_ACTION = "songs/IS_PLAYING_BOOLEAN_ACTION";
// ACTIONS FOR COMMENTS
const GET_ALL_COMMENTS_ACTION = "comments/GET_ALL_COMMENTS_ACTION";
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

// ACTIONS FOR COMMENTS
const getAllComments = (allComments) => {
  return {
    type: GET_ALL_COMMENTS_ACTION,
    allComments,
  };
};

const postComment = (songId, newComment) => {
  return {
    type: POST_COMMENT_ACTION,
    songId,
    newComment,
  };
};

const deleteComment = (comment) => {
  return {
    type: DELETE_COMMENT_ACTION,
    comment,
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
  let updatedSong = await fetch(`/api/songs/${songId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedSongFormData),
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
    comments = comments.json();
    dispatch(getAllComments(comments));
    return comments;
  }
  return comments.errors;
};

export const thunkPostComment = (songId, comment) => async (dispatch) => {
  let comment = await fetch(`/songs/${songId}/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });

  if (comment.ok) {
    comment = comment.json();
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
    comment = comment.json();
    dispatch(deleteComment(comment));
    return comment;
  }
  return comment.errors;
};

//? ================== reducer================================//
let initialState = {
  Songs: {},
  SongDetails: {},
  UserSongs: {},
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
  userComments: {},
  songComments: {},
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
    case POST_COMMENT_ACTION: {
      newState = { ...state };
      newState.comments[action.comment.id] = action.comment;
      newState.userComments[action.comment.id] = action.comment;
      newState.songComments[action.songId] = action.comment;
      return newState;
    }
    case DELETE_COMMENT_ACTION: {
      newState = { ...state };
      newState.comments = { ...newState.comments };
      newState.userComments = { ...newState.userComments };
      newState.songComments = { ...newState.songComments };
      delete newState.comments[action.comment.id];
      delete newState.userComments[action.comment.id];
      delete newState.songComments[action.comment.id];
      return newState;
    }
    default:
      return state;
  }
}
