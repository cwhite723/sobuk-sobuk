import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserInfo = {
  token: "",
  userName: "",
  userId: "",
  userIntroduction: "",
  userImg: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: {
    value: initialState,
  },
  reducers: {
    login: (state, action: PayloadAction<UserInfo>) => {
      localStorage.setItem("token", action.payload.token);
      state.value = action.payload;
    },
    logout: (state) => {
      localStorage.clear();
      state.value = initialState;
    },
  },
});

const { actions, reducer } = userSlice;

export const { login, logout } = actions;

export default reducer;
