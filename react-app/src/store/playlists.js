const GET_ALL_PLAYLISTS_ACTION = "playlists/GET_ALL_PLAYLISTS_ACTION";

const getAllPlaylistsAction = (playlists) => {
  return {
    type: GET_ALL_PLAYLISTS_ACTION,
    playlists,
  };
};

export const thunkGetAllPlaylists = () => async (dispatch) => {
  let playlists = await fetch(`/api/playlist`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Can input more KVP here to grab from headers in the backend
    },
  });
  playlists = await playlists.json();
  dispatch(getAllPlaylistsAction(playlists));
  return playlists;
};

let initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_PLAYLISTS_ACTION: {
      newState = { ...state };
      newState = action.playlists;
      return newState;
    }
    default:
      return state;
  }
}
