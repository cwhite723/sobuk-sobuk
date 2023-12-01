import { Box, Input } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonBigButton from "components/common/CommonBigButton";
import CommonButton from "components/common/CommonButton";
import CommonFormHelperText from "components/common/CommonFormHelperText";
import CommonLink from "components/common/CommonLink";
import CommonSnackBar from "components/common/CommonSnackBar";
import CommonTextField from "components/common/CommonTextField";
import CommonTitle from "components/common/CommonTitle";
import CommonTypography from "components/common/CommonTypography";
import useIdCheckMutation from "hooks/mutates/members/useIdCheckMutation";
import useNicknameCheckMutation from "hooks/mutates/members/useNicknameCheckMutation";
import useSignUpMutation from "hooks/mutates/members/useSignUpMutation";
import useImageMutation from "hooks/mutates/useImageMutation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValue {
  id: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  email: string;
  introduce: string;
  img?: string;
}

const JoinPage = () => {
  const navigate = useNavigate();

  // 회원가입 성공
  const [SuccessSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  // 회원가입 실패
  const [ErrorSnackBarOpen, setErrorSnackBarOpen] = useState(false);
  // 프로필 이미지
  const [profileImg, setProfileImg] = useState("");

  // 아이디 중복확인
  const [idChecked, setIdChecked] = useState(false);
  // 닉네임 중복확인
  const [nicknameChecked, setNicknameChecked] = useState(false);

  // react hook form
  const {
    getValues,
    setValue,
    control,
    handleSubmit,
    formState,
    trigger,
    watch,
  } = useForm<FormValue>({
    defaultValues: {
      id: "",
      password: "",
      passwordCheck: "",
      nickname: "",
      email: "",
      introduce: "",
      img: "",
    },
    mode: "onChange",
  });

  // react-query - POST signup
  const { mutate: signUpMutate, isSuccess: signUpSuccess } =
    useSignUpMutation();

  // react-query - POST id check
  const { mutate: idCheckMutate } = useIdCheckMutation();

  // react-query - POST nickname check
  const { mutate: nicknameCheckMutate } = useNicknameCheckMutation();

  // react-query - POST image 프로필 이미지 필드는 아직 구현안됨
  const { mutate: imageMutate } = useImageMutation();

  // 프로필 이미지 변경 함수
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // 유저에게 보여주기 위한 state
      setProfileImg(URL.createObjectURL(event.target.files[0]));

      // 이미지 url을 얻기위한 요청에 필요한 데이터 형식으로 변경
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      imageMutate(formData, {
        onSuccess: (data) => {
          setValue("img", data);
        },
      });
    }
  };

  // 아이디 중복확인 함수
  const handleIdCheck = async (
    userName: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    const isValid = await trigger("id");
    if (isValid) {
      idCheckMutate(
        { userName },
        {
          onSuccess: () => {
            setIdChecked(true);
          },
          onError: () => {
            setIdChecked(false);
          },
        },
      );
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

  // 회원가입 버튼 함수
  const handleJoin = (data: FormValue) => {
    data.img = profileImg;
    if (idChecked && nicknameChecked) {
      signUpMutate(
        {
          userName: data.id,
          password: data.passwordCheck,
          nickname: data.nickname,
          email: data.email,
          introduction: data.introduce,
        },
        {
          onSuccess: () => {
            setSuccessSnackBarOpen(true);
          },
          onError: () => {
            setErrorSnackBarOpen(true);
          },
        },
      );
    }
  };

  // SnackBar 닫기 함수
  const handleSnackBarClose = () => {
    setSuccessSnackBarOpen(false);
    setErrorSnackBarOpen(false);

    if (signUpSuccess) {
      navigate("../login");
    }
  };

  useEffect(() => {
    if (watch("id")) {
      setIdChecked(false);
    }
  }, [watch("id")]);

  useEffect(() => {
    if (watch("nickname")) {
      setNicknameChecked(false);
    }
  }, [watch("nickname")]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        maxWidth: 500,
        mb: 10,
      }}
    >
      {/* 구경하기 버튼 */}
      <Box sx={{ position: "fixed", top: "30px", right: "30px" }}>
        <CommonLink to="../search">
          <CommonTypography text="🔍구경하기" variant="body1" bold={true} />
        </CommonLink>
      </Box>

      {/* 회원가입 성공 */}
      <CommonSnackBar
        text="회원가입이 완료되었습니다."
        severity="success"
        open={SuccessSnackBarOpen}
        handleSnackBarClose={handleSnackBarClose}
      />

      {/* 회원가입 실패 */}
      <CommonSnackBar
        text="회원가입 중 오류가 발생했습니다."
        severity="success"
        open={ErrorSnackBarOpen}
        handleSnackBarClose={handleSnackBarClose}
      />

      {/* 회원가입 폼 */}
      <form>
        <CommonTitle text="회원가입" />
        {/* 아이디 입력 및 중복확인 */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CommonTextField
            name="id"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^[a-zA-Z0-9]{2,15}$/,
                message: "아이디는 영문과 숫자만 입력가능합니다.(2~15자)",
              },
            }}
            textFieldProps={{
              id: "user-id",
              label: "아이디",
              placeholder: "아이디를 입력하세요.",
            }}
          />
          <CommonButton
            buttonText="중복확인"
            outline={false}
            handleClickEvent={(event) => handleIdCheck(getValues("id"), event)}
          />
        </Box>
        <CommonFormHelperText text={formState.errors.id?.message} />

        {!idChecked && (
          <CommonFormHelperText text="중복된 아이디이거나 중복확인이 되지 않았습니다." />
        )}

        {idChecked && (
          <CommonFormHelperText
            text="아이디 중복확인이 완료되었습니다."
            status="success"
          />
        )}

        {/* 비밀번호 입력 */}
        <CommonTextField
          name="password"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@%^&+-]).{6,15}$/,
              message:
                "비밀번호는 영문과 숫자, 특수문자를 포함해야 합니다.(6~15자)",
            },
          }}
          textFieldProps={{
            type: "password",
            id: "user-password",
            label: "비밀번호",
            placeholder: "비밀번호를 입력하세요",
          }}
        />
        <CommonFormHelperText text={formState.errors.password?.message} />

        {/* 비밀번호 확인 입력 */}
        <CommonTextField
          name="passwordCheck"
          control={control}
          rules={{
            required: true,
            pattern: /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@%^&+-]).{6,15}$/,
            validate: (value) => value === getValues("password"),
          }}
          textFieldProps={{
            type: "password",
            id: "user-password-check",
            label: "비밀번호 확인",
            placeholder: "비밀번호를 입력하세요",
          }}
        />
        {formState.errors.passwordCheck && (
          <CommonFormHelperText text="위와 동일한 비밀번호를 입력해주세요." />
        )}

        {/* 닉네임 입력 및 중복확인 */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <CommonTextField
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
              placeholder: "닉네임을 입력하세요.",
            }}
          />

          <CommonButton
            buttonText="중복확인"
            outline={false}
            handleClickEvent={(event) =>
              handleNicknameCheck(getValues("nickname"), event)
            }
          />
        </Box>
        <CommonFormHelperText text={formState.errors.nickname?.message} />

        {!nicknameChecked && (
          <CommonFormHelperText text="중복된 닉네임이거나 중복확인이 되지 않았습니다." />
        )}

        {nicknameChecked && (
          <CommonFormHelperText
            text="닉네임 중복확인이 완료되었습니다."
            status="success"
          />
        )}

        {/* 이메일 입력 */}
        <CommonTextField
          name="email"
          control={control}
          rules={{
            required: true,
            pattern: {
              value:
                /^[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*@[a-zA-Z0-9]([-_.]?[a-zA-Z0-9])*\.[a-zA-Z]{2,3}$/,
              message: "형식에 맞는 Email을 입력해주세요.",
            },
          }}
          textFieldProps={{
            id: "user-email",
            label: "이메일",
            placeholder: "이메일을 입력하세요.",
          }}
        />
        <CommonFormHelperText text={formState.errors.email?.message} />

        {/* 자기소개 입력 */}
        <CommonTextField
          name="introduce"
          control={control}
          textFieldProps={{
            id: "user-introduce",
            label: "자기소개",
            placeholder: "소개글을 입력하세요.",
          }}
        />

        {/* 프로필 사진 업로드 */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <CommonAvaratImage size={100} src={profileImg} />
          <Input type="file" onChange={handleChangeImg} name="img" />
          {!profileImg && (
            <CommonFormHelperText
              text="프로필 사진을 등록해보세요."
              status="success"
            />
          )}
        </Box>

        {/* 회원가입 버튼 */}
        <CommonBigButton
          buttonText="회원가입"
          handleClickEvent={handleSubmit(handleJoin)}
        />

        {/* 취소 버튼 */}
        <CommonBigButton
          buttonText="취소"
          handleClickEvent={() => navigate("../login")}
          disabled={true}
        />
      </form>
    </Box>
  );
};
export default JoinPage;
