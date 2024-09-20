import { postImage } from "apis/images";
import { useMutation } from "react-query";

// 이미지 등록
export const useImage = () => {
  return useMutation((imageData: FormData) => postImage(imageData), {
    onError: (error) => {
      console.log(error);
    },
  });
};
