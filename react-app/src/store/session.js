// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

// ACTIONS FOR EDIT USER
// const EDIT_USER_ACTION = "user/EDIT_USER_ACTION";

// ** ACTION FOR EDIT USER */
// const editUserAction = (user, formData) => {
//   return {
//     type: EDIT_USER_ACTION,
//     user,
//     formData,
//   };
// };

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const login = (email, password) => async (dispatch) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

export const logout = () => async (dispatch) => {
  const response = await fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};

export const signUp = (username, email, password, first_name, last_name) => async (dispatch) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
      first_name,
      last_name,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ["An error occurred. Please try again."];
  }
};

//!!=================== EDIT USER THUNK =======================/
//*************************************************************/
//*************************************************************/
// export const thunkEditUser = (user, formData) => async (dispatch) => {
//   let update = await fetch(`/profile/${user.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(formData),
//   });
//   update = await update.json();
//   return update;
// };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: action.payload };
    case REMOVE_USER:
      return { user: null };
    // EDIT USER INFORMATION
    // case EDIT_USER_ACTION: {
    //   return { user: action.formData };
    // }
    default:
      return state;
  }
}
