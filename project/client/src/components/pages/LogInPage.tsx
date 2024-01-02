import { Box } from "@mui/material";
import BigButton from "components/atoms/BigButton";
import CustomTextField from "components/atoms/CustomTextField";
import CustomLink from "components/atoms/CustomLink";
import CustomTypography from "components/atoms/CustomTypography";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import CustomSnackBar from "components/blocks/CustomSnackBar";
import HelperText from "components/atoms/HelperText";
import useMyPageQuery from "hooks/queries/members/useMyPageQuery";
import useLogInMutation from "hooks/mutates/members/useLogInMutation";
import { getStoredToken } from "utils/get";
import useMemberStore from "store/store";

interface FormValue {
  userName: string;
  password: string;
}

const LogInPage = () => {
  const { setMember, setToken } = useMemberStore();
  const memberToken = getStoredToken();

  // 스낵바 상태값
  const [errorSnackBarOpen, setErrorSnackBarOpen] = useState(false);

  // react hook form
  const { control, handleSubmit, formState, reset } = useForm<FormValue>({
    defaultValues: {
      userName: "",
      password: "",
    },
    // mode를 설정하여 해당 mode에 검증 로직이 동작하도록 함
    mode: "onSubmit",
  });

  // react-query - post log-in
  const { mutate: logInMutate, isSuccess: isLogInSuccess } = useLogInMutation();

  // react-query - get myInfo
  const { data: myPage, isSuccess: isMyPageSuccess } = useMyPageQuery(
    memberToken,
    {
      enabled: !!memberToken,
    },
  );

  // 로그인 동작 함수
  const handleLogIn = (formData: FormValue) => {
    logInMutate(
      { ...formData },
      {
        onError: () => {
          setErrorSnackBarOpen(true);
        },
      },
    );
  };

  const handleSnackBarClose = () => {
    setErrorSnackBarOpen(false);
    reset();
  };

  // 카카오 로그인 버튼 함수
  const handleKakaoLogIn = () => {
    console.log("kakao login");
  };

  // 구글 로그인 버튼 함수
  const handleGoogleLogIn = () => {
    console.log("google login");
  };

  useEffect(() => {
    // get myInfo 성공시
    if (isLogInSuccess && isMyPageSuccess && myPage) {
      setMember(myPage.data);
    }
  }, [isLogInSuccess, isMyPageSuccess]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        maxWidth: 500,
      }}
    >
      {/* 구경하기 버튼 */}
      <Box sx={{ position: "fixed", top: "30px", right: "30px" }}>
        <CustomLink to="../search">
          <CustomTypography text="🔍구경하기" variant="body1" bold={true} />
        </CustomLink>
      </Box>

      {/* 로그인 실패 */}
      <CustomSnackBar
        text="아이디 또는 비밀번호가 틀립니다."
        severity="error"
        open={errorSnackBarOpen}
        handleSnackBarClose={handleSnackBarClose}
      />

      {/* 로그인 폼 */}
      <form>
        <CustomTypography variant="h5" text="로그인" bold={true} />
        {/* 아이디 입력 */}
        <CustomTextField
          name="userName"
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9]{2,15}$/,
              message: "아이디는 영문과 숫자만 입력가능합니다.(2~15자)",
            },
          }}
          textFieldProps={{
            id: "user-name",
            label: "아이디",
            placeholder: "아이디를 입력하세요.",
          }}
        />
        <HelperText text={formState.errors.userName?.message} />

        {/* 비밀번호 입력 */}
        <CustomTextField
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
        <HelperText text={formState.errors.password?.message} />

        <BigButton text="로그인" handleClickEvent={handleSubmit(handleLogIn)} />
      </form>

      {/* 회원가입, 아이디/비밀번호 찾기 */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          borderBottom: "1px solid",
          paddingBottom: "25px",
        }}
      >
        <CustomLink to="../sign-up">
          <CustomTypography text="👋회원가입" variant="body2" bold={false} />
        </CustomLink>
        <CustomLink to="#">
          <CustomTypography
            text="🔍아이디/비밀번호찾기"
            variant="body2"
            bold={false}
          />
        </CustomLink>
      </Box>

      {/* 소셜 로그인 */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <BigButton text="카카오로 로그인" handleClickEvent={handleKakaoLogIn} />
        <BigButton text="구글로 로그인" handleClickEvent={handleGoogleLogIn} />
      </Box>
    </Box>
  );
};

export default LogInPage;
