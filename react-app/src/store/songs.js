//* =====================  types ===========================//
const GET_ALL_SONGS_ACTION = "song/GET_ALL_SONGS_ACTION";

//*  ===================end of types ===================//

//? =====================  actions ===========================//

const getAllSongAction = (allSongs) => {
  return {
    type: GET_ALL_SONGS_ACTION,
    allSongs,
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
    default:
      return state;
  }
}
