import { Box } from "@mui/material";
import AvaratImage from "components/atoms/AvatarImage";
import SmallButton from "components/atoms/SmallButton";
import CustomLink from "components/atoms/CustomLink";
import CustomTypography from "components/atoms/CustomTypography";
import useMemberFollowMutation from "hooks/mutates/members/useMemberFollowMutation";
import useMemberInfoQuery from "hooks/queries/members/useMemberInfoQuery";
import { useEffect, useState } from "react";
import { isFollow } from "utils/check";
import { getStoredMember, getStoredToken } from "utils/get";

interface PropsType {
  avatarSize: number;
  memberId: number | null;
}

const UserProfile = ({ avatarSize, memberId }: PropsType) => {
  // 로그인 여부 확인 token
  const memberToken = getStoredToken();
  const memberInfo = getStoredMember();

  // 팔로우 버튼 보여주기
  const [showFollow, setShowFollow] = useState(true);

  // 보여주는 팔로우 여부
  const [followStatus, setFollowStatus] = useState(false);

  // 해당 프로필이 로그인유저 소유가 아닐 시, 가져온 소유자 프로필
  const [owner, setOwner] = useState<OtherMemberInfo | null>(null);

  // react-query - get member
  // 해당 유저 프로필 get
  const { data: memberData, isSuccess: isSuccessMemberData } =
    useMemberInfoQuery(memberId, memberToken, {
      enabled: !!memberToken && !!memberId,
    });

  // react-query PATCH member follow
  const { mutate: followMutate } = useMemberFollowMutation();

  // 팔로우 상태 변경 함수
  const handleUserFollow = () => {
    if (isFollow(owner) && memberId) {
      followMutate(
        { memberId, accessToken: memberToken },
        {
          onSuccess: () => {
            // 팔로우 된 상태에서 한번 더 누르면 팔로우 취소
            setFollowStatus(false);
          },
        },
      );
    }
    if (!isFollow(owner) && memberId) {
      followMutate(
        { memberId, accessToken: memberToken },
        {
          onSuccess: () => {
            // 팔로우 되어 있지 않으면 팔로우 실행
            setFollowStatus(true);
          },
        },
      );
    }
  };

  useEffect(() => {
    if (memberId === null && memberInfo) {
      // memberId 값이 null면 즉, 자신의 프로필이면 팔로우버튼을 감춤
      setShowFollow(false);
    }
  }, []);

  useEffect(() => {
    if (memberData && isSuccessMemberData) {
      setOwner(memberData.data);
      setFollowStatus(isFollow(memberData.data) ?? false);
    }
  }, [isSuccessMemberData]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {/* memberId 값이 있으면 해당 유저의 user페이지로 이동 */}
      {/* 없으면 자기 자신의 프로필 이므로 my페이지로 이동 */}
      <CustomLink to={memberId ? "../user/" + memberId : "../my"}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AvaratImage
            size={avatarSize}
            src={owner ? owner.image : memberInfo?.image}
          />
          <Box sx={{ m: 1 }}>
            <CustomTypography
              text={owner ? owner.nickname : memberInfo?.nickname ?? "정보없음"}
              variant="body1"
              bold={true}
            />
            <CustomTypography
              text={owner ? owner.userName : memberInfo?.userName ?? "정보없음"}
              variant="body2"
              bold={false}
            />
          </Box>
        </Box>
      </CustomLink>

      {showFollow && (
        <SmallButton
          buttonText={followStatus ? "언팔로우" : "팔로우"}
          handleClickEvent={handleUserFollow}
          outline={followStatus ? false : true}
        />
      )}
    </Box>
  );
};

export default UserProfile;
