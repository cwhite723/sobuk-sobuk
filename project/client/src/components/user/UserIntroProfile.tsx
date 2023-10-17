import { Box } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonButton from "components/common/CommonButton";
import CommonTypography from "components/common/CommonTypography";
import React from "react";

interface PropsType {
  isOwner: boolean;
}

const UserIntroProfile: React.FC<PropsType> = (props) => {
  const [isFollow, setIsFollow] = React.useState(true);

  const handleUserFollow = () => {
    setIsFollow(!isFollow);
  };

  // 유저 프로필 section
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "primary.main",
        borderRadius: 5,
        border: "1px solid",
        p: 2,
      }}
    >
      {/* 유저 정보 및 팔로우 버튼 */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* 유저 정보 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <CommonAvaratImage size={100} />
          <Box sx={{ m: 1 }}>
            <CommonTypography value="윤정" variant="h6" bold={true} />
            <CommonTypography
              value="팔로잉 0 팔로워 0"
              variant="body2"
              bold={false}
            />
          </Box>
        </Box>

        {/* 팔로우 버튼 */}
        {props.isOwner ? (
          ""
        ) : (
          <CommonButton
            value="팔로우"
            onClick={handleUserFollow}
            outline={isFollow ? false : true}
          />
        )}
      </Box>

      {/* 자기소개 영역 */}
      <Box
        sx={{
          mt: 2,
          backgroundColor: "background.default",
          borderRadius: 5,
          p: 2,
        }}
      >
        <CommonTypography
          value="소개글이 없습니다😥"
          variant="body1"
          bold={true}
        />
      </Box>
    </Box>
  );
};

export default UserIntroProfile;
