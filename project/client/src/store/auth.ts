import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateType {
  token: string | null;
  // 실제로는 memberInfo 객체를 가지고 있지만 직렬화한 값만 저장이 가능하므로 string으로 지정
  member: string;
  loading: boolean;
}

const initialState: InitialStateType = {
  token: "Bearer aldkjghaihdg",
  member: JSON.stringify({
    memberId: 0,
    userName: "",
    password: "",
    nickname: "",
    email: "",
    introduction: "",
    // userImg: "",
  }),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      // 토큰을 저장해용
      // 쿠키에다가 저장해야함
      state.token = action.payload;
    },
    setMember: (state, action: PayloadAction<MemberInfo>) => {
      // 유저 프로필을 저장해용
      // storage에 객체는 저장불가, 꺼내올때도 JSON.parse 해야함
      state.member = JSON.stringify(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    logout: (state) => {
      // 세션이랑 쿠키를 비워서 로그아웃처리
      state.token = initialState.token;
      state.member = initialState.member;
    },
  },
});

const { actions, reducer } = authSlice;

export const { setToken, setMember, setLoading, logout } = actions;

export default reducer;
