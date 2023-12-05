import { postImage } from "apis/images";
import { useMutation } from "react-query";

const useImageMutation = () => {
  return useMutation((imageData: FormData) => postImage(imageData), {
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useImageMutation;
