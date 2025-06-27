// 파일 경로: /api/analyze.js
// 이 파일은 Vercel에서 서버리스 함수로 자동 인식됩니다.

export default function handler(request, response) {

  // 이 함수는 프론트엔드로부터 요청을 받으면
  // 간단한 성공 메시지를 다시 보내주는 역할만 합니다.
  response.status(200).json({
    message: '안녕하세요! Vercel 백엔드 함수로부터의 응답입니다. 연결에 성공했습니다!',
  });
}
