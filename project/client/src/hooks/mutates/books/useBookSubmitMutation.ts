import { postBook } from "apis/books";
import { queryKeys } from "constants/queryKeys";
import { useMutation, useQueryClient } from "react-query";

const useBookSubmitMutation = () => {
  const queryClient = useQueryClient();

  return useMutation((data: BookData) => postBook(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(
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

export default useBookSubmitMutation;
