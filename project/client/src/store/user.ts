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
    editUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.value = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

export const { login, logout, editUserInfo } = actions;

export default reducer;
