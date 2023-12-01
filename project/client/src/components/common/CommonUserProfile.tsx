import { Box } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonButton from "components/common/CommonButton";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";
import useMemberFollowMutation from "hooks/mutates/members/useMemberFollowMutation";
import { useEffect, useState } from "react";
import { isFollow } from "utils/check";
import { getStoredToken } from "utils/get";

interface PropsType {
  avatarSize: number;
  memberInfo: MemberInfo | OtherMemberInfo;
  memberId: number | null;
}

// 사용 위치에 따라 로그인한 사용자의 정보 or
// 다른 사용자의 정보가 필요하기 때문에 props로 받음

const CommonUserProfile = ({ avatarSize, memberInfo, memberId }: PropsType) => {
  // 로그인 여부 확인 token
  const memberToken = getStoredToken();

  // 팔로우 여부
  const [followStatus, setFollowStatus] = useState(
    isFollow(memberInfo as OtherMemberInfo),
  );
  // 팔로우 버튼 보여주기
  const [showFollow, setShowFollow] = useState(true);

  // react-query PATCH member follow
  const { mutate: followMutate } = useMemberFollowMutation();

  // 팔로우 상태 변경 함수
  const handleUserFollow = () => {
    if (isFollow(memberInfo as OtherMemberInfo) && memberId) {
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
    if (!isFollow(memberInfo as OtherMemberInfo) && memberId) {
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
    if (memberId === null) {
      // memberId 값이 null면 즉, 자신의 프로필이면 팔로우버튼을 감춤
      setShowFollow(false);
    }
  }, []);

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
      <CommonLink to={memberId ? "../user/" + memberId : "../my"}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CommonAvaratImage size={avatarSize} src={memberInfo.image} />
          <Box sx={{ m: 1 }}>
            <CommonTypography
              text={memberInfo.nickname}
              variant="body1"
              bold={true}
            />
            <CommonTypography
              text={memberInfo.userName}
              variant="body2"
              bold={false}
            />
          </Box>
        </Box>
      </CommonLink>
      {showFollow && (
        <CommonButton
          buttonText={followStatus ? "언팔로우" : "팔로우"}
          handleClickEvent={handleUserFollow}
          outline={followStatus ? false : true}
        />
      )}
    </Box>
  );
};

export default CommonUserProfile;
