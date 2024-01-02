import { Box, Input } from "@mui/material";
import AvaratImage from "components/atoms/AvatarImage";
import BigButton from "components/atoms/BigButton";
import SmallButton from "components/atoms/SmallButton";
import HelperText from "components/atoms/HelperText";
import CustomSnackBar from "components/blocks/CustomSnackBar";
import CustomTextField from "components/atoms/CustomTextField";
import useMemberDeleteMutation from "hooks/mutates/members/useMemberDeleteMutation";
import useMemberPatchMutation from "hooks/mutates/members/useMemberPatchMutation";
import useNicknameCheckMutation from "hooks/mutates/members/useNicknameCheckMutation";
import useImageMutation from "hooks/mutates/useImageMutation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getStoredMember, getStoredToken } from "utils/get";
import CustomTypography from "components/atoms/CustomTypography";

interface FormValue {
  nickname: string;
  introduction: string;
  image?: string;
}

const Setting = () => {
  const navigate = useNavigate();

  // 스낵바 상태값
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);

  // 로그인한 유저의 프로필 이미지
  const [profileImg, setProfileImg] = useState("");

  // 닉네임 중복확인
  const [nicknameChecked, setNicknameChecked] = useState(true);

  // store 토큰 값 가져오기
  const memberToken = getStoredToken();
  // store 값 가져오기
  const memberInfo = getStoredMember();

  // react hook form
  const {
    control,
    handleSubmit,
    formState,
    trigger,
    watch,
    getValues,
    setValue,
  } = useForm<FormValue>({
    defaultValues: {
      nickname: memberInfo?.nickname ?? "",
      introduction: memberInfo?.introduction ?? "",
      image: "",
    },
    mode: "onSubmit",
  });

  // react-query - POST nickname check
  const { mutate: nicknameCheckMutate } = useNicknameCheckMutation();

  // react-query DELETE member
  const { mutate: memberDeleteMutate } = useMemberDeleteMutation();

  // react-query PATCH member
  const { mutate: memberPatchMutate } = useMemberPatchMutation();

  // react-query - POST image
  const { mutate: imageMutate } = useImageMutation();

  // 로그인한 유저의 프로필 이미지 변경 함수
  // 아직 member 쪽은 필드 없음
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setProfileImg(URL.createObjectURL(event.target.files[0]));

      // 이미지 url을 얻기위한 요청에 필요한 데이터 형식으로 변경
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      imageMutate(formData, {
        onSuccess: (data) => {
          setValue("image", data.data);
        },
      });
    }
  };

  // 닉네임 중복확인 함수
  const handleNicknameCheck = async (
    nickname: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    const isValid = await trigger("nickname");
    if (isValid) {
      nicknameCheckMutate(
        { nickname },
        {
          onSuccess: () => {
            setNicknameChecked(true);
          },
          onError: () => {
            setNicknameChecked(false);
          },
        },
      );
    }
  };

  // 정보 수정 완료 버튼 함수
  const handleSetting = (data: FormValue) => {
    if (nicknameChecked) {
      memberPatchMutate(
        {
          data,
          token: memberToken,
        },
        {
          onSuccess: () => {
            setSuccessSnackBarOpen(true);
          },
        },
      );
    }
  };

  // 회원탈퇴 버튼 함수
  const handleDropOut = () => {
    memberDeleteMutate(memberToken, {
      onSuccess: () => {
        navigate("../login");
      },
    });
  };

  const handleSnackBarClose = () => {
    setSuccessSnackBarOpen(false);
    navigate(0);
  };

  useEffect(() => {
    if (watch("nickname") !== memberInfo?.nickname) {
      setNicknameChecked(false);
    }
  }, [watch("nickname")]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "primary.main",
        borderRadius: 5,
        boxShadow: "0px 0px 5px rgba(0,0,0,0.5)",
        m: { xs: 4, md: 6 },
        p: 4,
      }}
    >
      {/* snackbar */}
      <CustomSnackBar
        text="정보수정이 완료되었습니다."
        severity="success"
        open={successSnackBarOpen}
        handleSnackBarClose={handleSnackBarClose}
      />

      <CustomTypography text="😊 계정 정보 수정하기" variant="h5" bold={true} />

      {/* 프로필 수정 폼 */}
      {/* 프로필 이미지 업데이트 */}
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <AvaratImage size={100} src={profileImg} />
          <Input type="file" onChange={handleChangeImg} />
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CustomTextField
            name="nickname"
            control={control}
            rules={{
              required: true,
              minLength: {
                value: 2,
                message: "닉네임은 2자 이상 입력해주세요.",
              },
              maxLength: {
                value: 10,
                message: "닉네임은 10자가 넘지 않게 입력해주세요.",
              },
            }}
            textFieldProps={{
              id: "user-name",
              label: "닉네임",
            }}
          />

          <SmallButton
            buttonText="중복확인"
            outline={false}
            handleClickEvent={(event) =>
              handleNicknameCheck(getValues("nickname"), event)
            }
          />
        </Box>
        <HelperText text={formState.errors.nickname?.message} />

        {!nicknameChecked && (
          <HelperText text="중복된 닉네임이거나 중복확인이 되지 않았습니다." />
        )}

        {nicknameChecked && (
          <HelperText
            text="닉네임 중복확인이 완료되었습니다."
            status="success"
          />
        )}

        <CustomTextField
          name="introduction"
          control={control}
          textFieldProps={{
            id: "user-introduction",
            label: "자기소개",
          }}
        />

        <BigButton
          text="수정완료"
          handleClickEvent={handleSubmit(handleSetting)}
        />
        <BigButton text="회원탈퇴" handleClickEvent={handleDropOut} />
      </form>
    </Box>
  );
};

export default Setting;
