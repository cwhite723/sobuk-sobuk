import { Box, Input } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";
import CommonTitle from "components/common/CommonTitle";
import React from "react";

const SettingPage = () => {
  const [profileImg, setProfileImg] = React.useState<string>("");

  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSetting = () => {
    console.log("계정 정보 수정 완료");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        maxWidth: 500,
        backgroundColor: "primary.main",
        borderRadius: 5,
        border: "1px solid",
        m: { xs: 2, md: 4 },
        p: 2,
      }}
    >
      <CommonTitle value="😊 계정 정보 수정하기" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <CommonAvaratImage size={100} src={profileImg} />
        <Input type="file" onChange={handleChangeImg} />
      </Box>
      <CommonTextField
        type="required"
        id="user-name"
        label="닉네임"
        placeholder="기존 닉네임"
      />
      <CommonTextField
        type="required"
        id="user-introduce"
        label="자기소개"
        placeholder="기존 소개글"
      />
      <CommonBigButton value="수정완료" onClick={handleSetting} />
    </Box>
  );
};

export default SettingPage;
