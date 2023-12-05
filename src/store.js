import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  userId: "",
  isAuth: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userId: action.payload?.userId,
        username: action.payload?.username,
        isAuth: true,
      };

    case "LOGOUT":
      return {
        ...state,
        userId: "",
        username: "",
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