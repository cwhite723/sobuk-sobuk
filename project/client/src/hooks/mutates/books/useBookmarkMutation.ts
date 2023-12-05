import { postBookmark } from "apis/books";
import { useMutation } from "react-query";

const useBookmarkMutation = () => {
  return useMutation(
    ({ bookId, accessToken }: { bookId: number; accessToken: string | null }) =>
      postBookmark({ bookId, accessToken }),
    {
      onSuccess: () => {
        console.log("북마크 성공");
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
};

export default useBookmarkMutation;
