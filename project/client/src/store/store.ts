import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

const STORAGE_KEY = "member";

interface MemberState {
  member: MemberInfo | null;
  token: string | null;
}

interface MemberAction {
  setMember: (member: MemberInfo) => void;
  setToken: (token: string) => void;
  clearAll: () => void;
}

const initialState: MemberState = {
  member: null,
  token: null,
};

const useMemberStore = create(
  immer(
    persist<MemberState & MemberAction>(
      (set) => ({
        ...initialState,
        setMember: (member: MemberInfo) => {
          set({ member });
        },
        setToken: (token: string) => {
          set({ token });
        },
        clearAll: () => {
          set(initialState);
        },
      }),
      {
        name: STORAGE_KEY,
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
  ),
);

export default useMemberStore;
