import { Box } from "@mui/material";
import CommonAvaratImage from "components/common/CommonAvatarImage";
import CommonBigButton from "components/common/CommonBigButton";
import CommonButton from "components/common/CommonButton";
import CommonFormHelperText from "components/common/CommonFormHelperText";
import CommonSnackBar from "components/common/CommonSnackBar";
import CommonTextField from "components/common/CommonTextField";
import CommonTypography from "components/common/CommonTypography";
import useCommentDeleteMutation from "hooks/mutates/comments/useCommentDeleteMutation";
import useCommentEditMutation from "hooks/mutates/comments/useCommentEditMutation";
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

const PostCommentItem = ({ commentItem }: PropsType) => {
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

  const { mutate: editMutate } = useCommentEditMutation();

  const { mutate: deleteMutate } = useCommentDeleteMutation();

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
      <CommonSnackBar
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
            <CommonTextField
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
            <CommonFormHelperText text={formState.errors.comment?.message} />

            <CommonBigButton
              buttonText="수정"
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
            <CommonAvaratImage size={35} />
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "row", md: "column" },
                alignItems: { xs: "center", md: "start" },
                mx: 1,
                flexShrink: 0,
              }}
            >
              <CommonTypography
                text={commentItem.nickname}
                variant="body1"
                bold={true}
              />
              <CommonTypography
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
              <CommonTypography
                text={commentItem.content}
                variant="body1"
                bold={true}
              />
            </Box>

            {/* 댓글 수정 삭제 버튼 */}
            {commentItem.myComment && (
              <Box sx={{ display: "flex" }}>
                <CommonButton
                  buttonText="수정"
                  outline={false}
                  handleClickEvent={handleCommentEditForm}
                />
                <CommonButton
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

export default PostCommentItem;
