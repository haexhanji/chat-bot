// /api/send-email.js

// 1. Resend 라이브러리를 가져옵니다.
import { Resend } from 'resend';

// 2. Vercel 환경 변수에서 Resend API 키를 읽어와 초기화합니다.
const resend = new Resend(process.env.RESEND_API_KEY);

// 3. 백엔드 함수의 핵심 로직입니다.
export default async (req, res) => {
  // 4. 프런트엔드에서 보낸 POST 요청이 아니면 거부합니다.
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'POST 메서드만 허용됩니다.' });
  }

  try {
    // 5. 프런트엔드에서 보낸 기획안 데이터를 추출합니다.
    const data = req.body;

    // 6. 이메일 내용을 HTML 형식으로 보기 좋게 만듭니다.
    const emailHtml = `
      <h1>새로운 콘텐츠 기획안이 도착했습니다! 📬</h1>
      <div style="font-size: 16px; line-height: 1.6;">
        <p><strong>1. 핵심 아이디어:</strong><br/>${data.idea || '내용 없음'}</p>
        <p><strong>2. 영상 포맷:</strong><br/>${data.format || '내용 없음'}</p>
        <p><strong>3. 타겟 플랫폼:</strong><br/>${data.platform || '내용 없음'}</p>
        <p><strong>4. 타겟 시청자:</strong><br/>${data['target-audience'] || '내용 없음'}</p>
        <p><strong>5. 영상 길이 (예상):</strong><br/>${data.length || '내용 없음'}</p>
        <p><strong>6. 영상의 '느낌/분위기':</strong><br/>${data.vibe || '내용 없음'}</p>
        <p><strong>7. 레퍼런스:</strong><br/>${data.reference || '내용 없음'}</p>
        <p><strong>기타 요청사항:</strong><br/>${data['additional-requests'] || '내용 없음'}</p>
      </div>
    `;

    // 7. Resend를 사용하여 이메일을 발송합니다.
    const { data: sentData, error } = await resend.emails.send({
      from: '콘텐츠 기획 봇 <onboarding@resend.dev>', // ⚠️ 중요: Resend에서 기본으로 제공하는 주소입니다.
      to: ['shaechanjidawn@gmail.com'],                // ⚠️ 중요: 이메일을 받을 실제 주소를 입력하세요!
      subject: `[콘텐츠 기획안] ${data.idea || '새로운 기획안'}`,
      html: emailHtml,
    });

    // 8. 에러가 발생하면 에러 메시지를 반환합니다.
    if (error) {
      console.error({ error });
      return res.status(400).json({ message: '이메일 발송에 실패했습니다.', error });
    }

    // 9. 성공적으로 발송되면 성공 메시지를 반환합니다.
    console.log({ sentData });
    res.status(200).json({ message: '이메일이 성공적으로 발송되었습니다.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버에서 오류가 발생했습니다.', error: error.message });
  }
};
