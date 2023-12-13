import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  userId: "",
  email: "",
  firstName: "",
  profilePicture: "",
  isAdmin: false,
  isAuth: false,
};

const reducer = (state = initialState, action) => {
  console.log("Reducer - State:", state);
  console.log("Action:", action);
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.payload?.userId,
        email: action.payload?.email,
        firstName: action.payload?.firstName,
        profilePicture: action.payload?.profilePicture,
        isAdmin: action.payload?.isAdmin,
        isAuth: true,
      };

    case "LOGOUT":
      return {
        ...state,
        userId: "",
        email: "",
        firstName: "",
        profilePicture: "",
        isAdmin: false,
        isAuth: false,
      };

    default:
      console.log("hit default");
      return state;
  }
};

const store = configureStore({
  reducer: reducer,
});

export default store;
