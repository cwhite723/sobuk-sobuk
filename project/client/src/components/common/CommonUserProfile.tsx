import { Box } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonButton from "components/common/CommonButton";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";
import React, { useEffect, useState } from "react";

interface PropsType {
  avatarSize: number;
  userInfo: UserInfo;
}

// 사용 위치에 따라 로그인한 사용자의 정보 or
// 다른 사용자의 정보가 필요하기 때문에 props로 받음

// 더미데이터
const test1Follow = ["test2", "test4"];

const CommonUserProfile: React.FC<PropsType> = (props) => {
  // 팔로우 여부
  const [isFollow, setIsFollow] = useState(false);

  // 팔로우 버튼 보여주기
  const [showFollow, setShowFollow] = useState(true);

  const followUsers = {
    userTo: props.userInfo.userId,
    userFrom: localStorage.getItem("token"),
  };

  // 팔로우 상태 변경 함수
  const handleUserFollow = () => {
    if (followCheck(followUsers.userTo, followUsers.userFrom)) {
      // 팔로우 된 상태에서 한번 더 누르면 팔로우 취소
      test1Follow.splice(test1Follow.indexOf(followUsers.userTo), 1);
      setIsFollow(false);
    } else {
      // 팔로우 되어 있지 않으면 팔로우 실행
      test1Follow.push(followUsers.userTo);
      setIsFollow(true);
    }
  };

  // 팔로우 여부를 확인하는 함수
  const followCheck = (userTo: string, userFrom: string | null) => {
    if (test1Follow.find((element) => element === userTo)) {
      // 팔로우 목록에 있으면
      // test1Follow => userFrom의 팔로우 목록
      return true;
    } else {
      return false;
    }
  };

  // 가장 처음 팔로우 상태를 확인
  useEffect(() => {
    // 프로필 주인이 자신이면 팔로우 버튼 감춤
    if (followUsers.userTo === followUsers.userFrom) {
      setShowFollow(false);
    } else {
      setIsFollow(followCheck(followUsers.userTo, followUsers.userFrom));
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
      <CommonLink to="../user/1">
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CommonAvaratImage
            size={props.avatarSize}
            src={props.userInfo.userImg}
          />
          <Box sx={{ m: 1 }}>
            <CommonTypography
              value={props.userInfo.userName}
              variant="body1"
              bold={true}
            />
            <CommonTypography
              value={props.userInfo.userId}
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
