import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  useMediaQuery,
} from "@mui/material";
import BookImage from "components/atoms/BookImage";
import HelperText from "components/atoms/HelperText";
import CustomTextField from "components/atoms/CustomTextField";
import useBookSubmitMutation from "hooks/mutates/books/useBookSubmitMutation";
import useImageMutation from "hooks/mutates/useImageMutation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import theme from "styles/theme";
import { getStringDate } from "utils/format";

interface PropsType {
  isOpen: boolean;
  setNewBook: React.Dispatch<React.SetStateAction<number | null>>;
  handleDialogClose: () => void;
}

interface FormValue {
  title: string;
  author: string;
  publisher: string;
  publicationDate: string;
  imageUrl?: string;
  isUserInput: true;
}

const SubmitDialog = ({ isOpen, setNewBook, handleDialogClose }: PropsType) => {
  // 화면 크기가 md보다 작아지면 Dialog를 fullscreen으로 띄움
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // 책 이미지
  const [bookImg, setBookImg] = useState("");

  // react hook form
  const { setValue, control, handleSubmit, reset, formState } =
    useForm<FormValue>({
      defaultValues: {
        title: "",
        author: "",
        publisher: "",
        publicationDate: getStringDate(new Date()),
        imageUrl: "",
      },
      mode: "onSubmit",
    });

  // react-query - POST image
  const { mutate: imageMutate } = useImageMutation();

  // 이미지 변경 함수
  const handleChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      // 유저에게 보여주기 위한 state
      setBookImg(URL.createObjectURL(event.target.files[0]));

      // 이미지 url을 얻기위한 요청에 필요한 데이터 형식으로 변경
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      imageMutate(formData, {
        onSuccess: (data) => {
          setValue("imageUrl", data.data);
        },
      });
    }
  };

  // react-query - post book
  const { mutate: bookSubmitMutate } = useBookSubmitMutation();

  const handleDialogData = (data: FormValue) => {
    console.log(data);
    bookSubmitMutate(
      {
        ...data,
        isUserInput: true,
      },
      {
        onSuccess: (data) => {
          if (data) {
            // 도서 등록 성공
            reset();
            setNewBook(data.data);
            handleDialogClose();
          }
        },
      },
    );
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleDialogClose}
      fullScreen={fullScreen}
      sx={{ minWidth: "300px" }}
    >
      {/* 제목 */}
      <DialogTitle>📕 책 추가하기</DialogTitle>

      {/* 컨텐트 */}
      <form>
        <DialogContent>
          <DialogContentText sx={{ color: "text.primary" }}>
            도서 검색으로 나오지 않는 책을 직접 등록해보세요!
          </DialogContentText>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CustomTextField
              name="title"
              control={control}
              rules={{
                required: { value: true, message: "제목은 필수 입력값입니다." },
              }}
              textFieldProps={{
                id: "title",
                label: "제목",
                placeholder: "제목을 입력하세요",
              }}
            />
            <HelperText text={formState.errors.title?.message} />

            <CustomTextField
              name="author"
              control={control}
              rules={{
                required: { value: true, message: "작가는 필수 입력값입니다." },
              }}
              textFieldProps={{
                id: "book-writer",
                label: "작가",
                placeholder: "작가를 입력하세요",
              }}
            />
            <HelperText text={formState.errors.author?.message} />

            <CustomTextField
              name="publisher"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "출판사는 필수 입력값입니다.",
                },
              }}
              textFieldProps={{
                id: "book-publish",
                label: "출판사",
                placeholder: "출판사를 입력하세요",
              }}
            />
            <HelperText text={formState.errors.publisher?.message} />

            <CustomTextField
              name="publicationDate"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "출간일은 필수 입력값입니다.",
                },
              }}
              textFieldProps={{
                id: "book-publication-date",
                label: "출간일",
                placeholder: "출간일을 입력하세요",
                type: "date",
              }}
            />
            <HelperText text={formState.errors.publicationDate?.message} />
          </Box>

          {/* 사진 업로드 */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <BookImage width={50} height={80} src={bookImg} />
            <Input type="file" onChange={handleChangeImg} name="imageUrl" />
            {!bookImg && (
              <HelperText text="도서 사진을 등록해보세요." status="success" />
            )}
          </Box>
        </DialogContent>
      </form>

      {/* 하단 버튼 */}
      <DialogActions>
        <Button onClick={handleDialogClose}>취소</Button>
        <Button onClick={handleSubmit(handleDialogData)}>완료</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubmitDialog;
