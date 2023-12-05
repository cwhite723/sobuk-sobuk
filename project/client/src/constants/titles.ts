// plans 상태에 따른 title 설정
export const titleByPlanStatus = {
  NOT_CREATED_POST: "📚 독서 기록을 작성해주세요",
  READING: "📚 완독까지 이만큼 남았어요",
  OVERDUE: "📚 기간이 지나버린 책들이에요",
  NOT_STARTED: "📚 읽을 예정이에요",
  COMPLETED: "📚 완독 후 독서 기록까지 작성했어요",
};

// 상태값에 따른 버튼 내용
export const cardStatus = {
  completed: "😎완독하고 독서기록 까지 작성했어요!",
  not_created_post: "🎉완독했어요! 독서기록 작성하기",
};
