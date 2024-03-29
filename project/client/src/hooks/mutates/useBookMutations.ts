import { postBook, postBookmark } from "apis/books";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

// 북마크 mutation
export const useBookmark = () => {
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

// 도서 등록 mutation
export const useBookSubmit = () => {
  const queryClient = useQueryClient();

  return useMutation((data: BookData) => postBook(data), {
    onSuccess: () => {
      return queryClient.invalidateQueries(
        queryKeys.BOOKS_BY_BOOK_PARAMS({
          page: 1,
          size: 10,
          sortType: "publicationDate",
        }),
      );
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
