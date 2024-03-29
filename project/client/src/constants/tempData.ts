// 비로그인 only
// log-in, sign-up

// 로그인 only
// main,
// write, post/:postid, edit/:postid
// my, my-setting, member/:memberid
// create, challenge/:challengeid, update/:challengeid

// all
// search, feed, challenge

// 0. 서버 상태 확인
// 0-A. 서버 연결 성공 시 그대로 요청
// 0-B. 서버 연결 실패 시 api 요청하지 않고 임시 데이터 및 화면 사용

// 서버 연결 실패 시 비로그인 상태로 전체 페이지에 접속 허용
// 대신 서버에 api 요청 보내지 않고 스켈레톤 페이지 보여주기
// 별도로 만들어야 하나? 알아보기
