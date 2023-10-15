import { Box } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonButton from "components/common/CommonButton";
import CommonLink from "components/common/CommonLink";
import CommonTypography from "components/common/CommonTypography";
import React from "react";

const FeedPostCardProfile = () => {
  const [isFollow, setIsFollow] = React.useState(true);

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
          <CommonAvaratImage size={50} />
          <Box sx={{ m: 1 }}>
            <CommonTypography
              value="작성자 닉네임"
              variant="body1"
              bold={true}
            />
            <CommonTypography
              value="작성자 아이디"
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

export default FeedPostCardProfile;
