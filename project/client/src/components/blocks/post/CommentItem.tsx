import { Box } from "@mui/material";
import AvaratImage from "components/atoms/AvatarImage";
import BigButton from "components/atoms/BigButton";
import SmallButton from "components/atoms/SmallButton";
import HelperText from "components/atoms/HelperText";
import CustomSnackBar from "components/blocks/CustomSnackBar";
import CustomTextField from "components/atoms/CustomTextField";
import CustomTypography from "components/atoms/CustomTypography";
import {
  useCommentEdit,
  useCommentDelete,
} from "hooks/mutates/useCommentMutations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getStoredToken } from "utils/get";

interface PropsType {
  commentItem: CommentResponse;
}

interface FormValue {
  comment: string;
}

const CommentItem = ({ commentItem }: PropsType) => {
  const navigate = useNavigate();

  const memberToken = getStoredToken();

  // 스낵바 상태값
  const [successSnackBarOpen, setSuccessSnackBarOpen] = useState(false);
  // form 표출 상태값
  const [openEditForm, setOpenEditForm] = useState(false);

  const { control, handleSubmit, formState } = useForm<FormValue>({
    defaultValues: {
      comment: commentItem.content,
    },
    mode: "onSubmit",
  });

  const { mutate: editMutate } = useCommentEdit();

  const { mutate: deleteMutate } = useCommentDelete();

  const handleEditComment = (data: FormValue) => {
    editMutate(
      {
        commentId: commentItem.commentId,
        data: { content: data.comment },
        accessToken: memberToken,
      },
      {
        onSuccess: () => {
          setSuccessSnackBarOpen(true);
        },
      },
    );
  };

  const handleDeleteComment = () => {
    deleteMutate(
      {
        commentId: commentItem.commentId,
        accessToken: memberToken,
      },
      {
        onSuccess: () => {
          setSuccessSnackBarOpen(true);
        },
      },
    );
  };

  const handleCommentEditForm = () => {
    setOpenEditForm(true);
  };

  const handleSnackBarClose = () => {
    setSuccessSnackBarOpen(false);
    setOpenEditForm(false);
    navigate(0);
  };

  return (
    <Box>
      <CustomSnackBar
        text="완료되었습니다."
        severity="success"
        open={successSnackBarOpen}
        handleSnackBarClose={handleSnackBarClose}
      />

      {openEditForm ? (
        <form>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              my: 1,
            }}
          >
            <CustomTextField
              name="comment"
              control={control}
              rules={{
                required: { value: true, message: "내용은 꼭 입력해주세요." },
              }}
              textFieldProps={{
                id: "comment",
                label: "댓글 수정",
              }}
            />
            <HelperText text={formState.errors.comment?.message} />

            <BigButton
              text="수정"
              handleClickEvent={handleSubmit(handleEditComment)}
            />
          </Box>
        </form>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "baseline", md: "center" },
            borderBottom: "1px solid",
            p: 2,
            gap: 2,
          }}
        >
          {/* 작성자 profile */}
          <Box
            sx={{ display: "flex", alignItems: "center", mb: { xs: 1, md: 0 } }}
          >
            <AvaratImage size={35} />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                alignItems: { xs: "center", md: "start" },
                mx: 1,
                flexShrink: 0,
              }}
            >
              <CustomTypography
                text={commentItem.nickname}
                variant="body1"
                bold={true}
              />
              <CustomTypography
                text={commentItem.userName}
                variant="body2"
                bold={false}
              />
            </Box>
          </Box>

          {/* 댓글 내용 */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "start", md: "center" },
            }}
          >
            <Box sx={{ p: 2 }}>
              <CustomTypography
                text={commentItem.content}
                variant="body1"
                bold={true}
              />
            </Box>

            {/* 댓글 수정 삭제 버튼 */}
            {commentItem.myComment && (
              <Box sx={{ display: "flex" }}>
                <SmallButton
                  buttonText="수정"
                  outline={false}
                  handleClickEvent={handleCommentEditForm}
                />
                <SmallButton
                  buttonText="삭제"
                  outline={false}
                  handleClickEvent={handleDeleteComment}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CommentItem;
