//* =====================  types ===========================//
const GET_ALL_SONGS_ACTION = "songs/GET_ALL_SONGS_ACTION";
const GET_SONG_BY_ID_ACTION = "songs/GET_SONG_BY_ID_ACTION";
const POST_NEW_SONG_ACTION = "songs/POST_NEW_SONG_ACTION";
//*  ===================end of types ===================//

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

//?  ======================= end of actions ===================//

//*  =====================  thunks ===========================//

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
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(songFormData),
  });
  newSong = await newSong.json();
  dispatch(postNewSongAction(newSong));
  return newSong;
};
//*  ======================= end of thunks ===================//

//? ================== reducer================================//
let initialState = { Songs: {}, SongDetails: {} };
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
    default:
      return state;
  }
}
