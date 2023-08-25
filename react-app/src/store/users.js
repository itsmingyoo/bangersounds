//* =====================  types ===========================//
const GET_ALL_USERS_ACTION = "users/GET_ALL_USERS_ACTION";
//? =====================  actions ===========================//
const getAllUsersAction = (users) => {
  return {
    type: GET_ALL_USERS_ACTION,
    users,
  };
};
//*  =====================  thunks ===========================//
export const thunkGetAllUsers = () => async (dispatch) => {
  try {
    let users = await fetch(`/api/users/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (users.ok) {
      users = await users.json();
      dispatch(getAllUsersAction(users));
      return users;
    }
  } catch (e) {
    return e;
  }
};
//? ================== reducer================================//
let initialState = { users: {} };
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_USERS_ACTION: {
      newState = { ...state };
      console.log("state", state);
      console.log("state", newState);
      newState.users = { ...action.users };
      return newState;
    }
    default:
      return state;
  }
}
