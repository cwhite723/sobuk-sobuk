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
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialState;
    },
  },
});

const { actions, reducer } = userSlice;

export const { login, logout } = actions;

export default reducer;
