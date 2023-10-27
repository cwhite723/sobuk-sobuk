import { Box } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonButton from "components/common/CommonButton";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";
import React from "react";

interface PropsType {
  userName: string;
  userId: string;
  userAvatar?: string;
  avatarSize: number;
}

const CommonUserProfile: React.FC<PropsType> = (props) => {
  // 팔로우 여부
  const [isFollow, setIsFollow] = React.useState(true);

  // 팔로우 상태 변경 함수
  const handleUserFollow = () => {
    setIsFollow(!isFollow);
  };
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
          <CommonAvaratImage size={props.avatarSize} src={props.userAvatar} />
          <Box sx={{ m: 1 }}>
            <CommonTypography
              value={props.userName}
              variant="body1"
              bold={true}
            />
            <CommonTypography
              value={props.userId}
              variant="body2"
              bold={false}
            />
          </Box>
        </Box>
      </CommonLink>
      <CommonButton
        value="팔로우"
        onClick={handleUserFollow}
        outline={isFollow ? false : true}
      />
    </Box>
  );
};

export default CommonUserProfile;
