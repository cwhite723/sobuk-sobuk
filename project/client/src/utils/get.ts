import { useSelector } from "react-redux";
import { RootState } from "store/store";

export const getStoredToken = (): string | null => {
  return useSelector((state: RootState) => state.auth.token);
};

export const getStoredMember = (): MemberInfo | null => {
  const storedMember = useSelector((state: RootState) => state.auth.member);
  return storedMember === null ? null : JSON.parse(storedMember);
};
