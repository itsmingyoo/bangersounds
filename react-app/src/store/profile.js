//* =====================  types ===========================//
// Example Action
// const GET_ALL_SONGS_ACTION = "songs/GET_ALL_SONGS_ACTION";

//*  ===================end of types ===================//

//? =====================  actions ===========================//

//?  ======================= end of actions ===================//

//*  =====================  thunks ===========================//

//*  ======================= end of thunks ===================//

//? ================== reducer================================//
let initialState = { UserSongs: {}, UserLikes: {}, UserReposts: {} };
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    default:
      return state;
  }
}
