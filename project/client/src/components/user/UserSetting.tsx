import { Box, Input } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonBigButton from "components/common/CommonBigButton";
import CommonTextField from "components/common/CommonTextField";
import CommonTitle from "components/common/CommonTitle";
import React from "react";

const UserSetting = () => {
  // 로그인한 유저의 프로필 이미지
  const [profileImg, setProfileImg] = React.useState<string>("");

  // 로그인한 유저의 프로필 이미지 변경 함수
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImg(URL.createObjectURL(event.target.files[0]));
    }
  };

  // 정보 수정 완료 버튼 함수
  const handleSetting = () => {
    console.log("계정 정보 수정 완료");
  };

  // 회원탈퇴 버튼 함수
  const handleDropOut = () => {
    console.log("회원탈퇴");
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "primary.main",
          borderRadius: 5,
          border: "1px solid",
          m: { xs: 2, md: 4 },
          p: 2,
        }}
      >
        <CommonTitle value="😊 계정 정보 수정하기" />

        {/* 프로필 이미지 업데이트 */}
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

        {/* 프로필 수정 폼 */}
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
        <CommonBigButton value="회원탈퇴" onClick={handleDropOut} />
      </Box>
    </Box>
  );
};

export default UserSetting;
