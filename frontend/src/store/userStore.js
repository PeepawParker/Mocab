import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  username: null,
  userId: null,
  isAuthenticated: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login(state, action) {
      return {
        ...state,
        username: action.payload.username,
        userId: action.payload.userId,
        isAuthenticated: true,
        error: null,
      };
    },
    loginFail(state, action) {
      return {
        ...state,
        username: null,
        userId: null,
        isAuthenticated: false,
        error: action.payload,
      };
    },
    resetUser() {
      return initialUserState;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
