import { Box } from "@mui/material";
import { patchMemberFollow } from "apis/members";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonButton from "components/common/CommonButton";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";
import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "store/store";

interface PropsType {
  avatarSize: number;
  memberInfo: MemberInfo | OtherMemberInfo;
  memberId: number | null;
}

// 사용 위치에 따라 로그인한 사용자의 정보 or
// 다른 사용자의 정보가 필요하기 때문에 props로 받음

const CommonUserProfile = (props: PropsType) => {
  // 로그인 여부 확인 token
  const memberToken = useSelector((state: RootState) => state.auth.token);
  // 팔로우 여부
  const [isFollow, setIsFollow] = useState(false);
  // 팔로우 버튼 보여주기
  const [showFollow, setShowFollow] = useState(true);
  // profile 주인
  const memberId = props.memberId;

  // react-query PATCH member follow
  const { mutate } = useMutation(patchMemberFollow, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // 팔로우 상태 변경 함수
  const handleUserFollow = () => {
    if (followCheck(props.memberInfo as OtherMemberInfo) && memberId) {
      mutate({ memberId, accessToken: memberToken });
      // 팔로우 된 상태에서 한번 더 누르면 팔로우 취소
      setIsFollow(false);
    } else {
      // 팔로우 되어 있지 않으면 팔로우 실행
      setIsFollow(true);
    }
  };

  // 팔로우 여부를 확인하는 함수
  const followCheck = (otherMemberInfo: OtherMemberInfo) => {
    if (otherMemberInfo.following) {
      // 팔로우 상태면
      return true;
    } else {
      // 팔로우 상태가 아니면
      return false;
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
          <CommonAvaratImage
            size={props.avatarSize}
            src={props.memberInfo.image}
          />
          <Box sx={{ m: 1 }}>
            <CommonTypography
              value={props.memberInfo.nickname}
              variant="body1"
              bold={true}
            />
            <CommonTypography
              value={props.memberInfo.userName}
              variant="body2"
              bold={false}
            />
          </Box>
        </Box>
      </CommonLink>
      {showFollow && (
        <CommonButton
          value={isFollow ? "언팔로우" : "팔로우"}
          onClick={handleUserFollow}
          outline={isFollow ? false : true}
        />
      )}
    </Box>
  );
};

export default CommonUserProfile;
