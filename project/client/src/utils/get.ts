import useMemberStore from "store/store";

export const getStoredToken = (): string | null => {
  return useMemberStore((state) => state.token);
};

export const getStoredMember = (): MemberInfo | null => {
  const member = useMemberStore((state) => state.member);
  return member ?? member;
};
