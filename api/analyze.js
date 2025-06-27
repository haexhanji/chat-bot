// 파일 경로: /api/analyze.js

// 이 함수는 Vercel에서 서버리스 함수로 자동 인식되어 실행됩니다.
export default async function handler(request, response) {
  
  // 1. 프론트엔드에서 보낸 데이터(폼 내용)를 받습니다.
  const formData = request.body;

  // 2. Vercel에 저장해둔 비밀 API 키를 불러옵니다.
  const API_KEY = process.env.GEMINI_API_KEY;

  // 3. Gemini AI에게 보낼 명령서(프롬프트)를 작성합니다.
  // 사용자가 입력한 데이터를 바탕으로, 우리가 정의한 규칙에 따라 기획안을 만들도록 지시합니다.
  const prompt = `
    당신은 전문 영상 콘텐츠 기획자입니다. 다음 사용자의 입력을 바탕으로, 아래의 "출력 형식"에 맞춰 상세하고 창의적인 영상 콘텐츠 기획안을 작성해주세요. 사용자의 원래 의도를 존중하되, 더 나은 아이디어를 더해 내용을 풍성하게 만들어주세요. 모든 결과는 마크다운 형식으로 보기 좋게 정리해주세요.

    ### 사용자가 입력한 정보:
    - **핵심 아이디어:** ${formData.idea}
    - **영상 포맷:** ${formData.format}
    - **타겟 플랫폼:** ${formData.platform}
    - **타겟 시청자:** ${formData.targetAudience}
    - **영상 길이:** ${formData.length}
    - **영상의 느낌/분위기:** ${formData.vibe}
    - **레퍼런스:** ${formData.reference}
    - **기타 요청사항:** ${formData.additionalRequests}

    ---

    ### 출력 형식:

    # 생성된 AI 콘텐츠 분석 & 기획안

    ## 1) 영상 정보

    ### 1. 영상 종류
    (사용자가 선택한 '영상 포맷'과 '핵심 아이디어'를 바탕으로 영상의 명확한 장르와 종류를 정의해주세요. 예: 감성적인 로파이 R&B 뮤직비디오)

    ### 2. 영상 목적
    (사용자의 '타겟 플랫폼'과 '타겟 시청자' 정보를 분석하여, 이 영상이 달성하고자 하는 구체적인 목표를 2~3가지 제시해주세요. 예: 1. 타겟 시청자의 감성 자극 및 음원 홍보, 2. 유튜브 채널의 브랜딩 강화)

    ### 3. 아이디어 및 기획 방향
    (사용자의 '핵심 아이디어'를 더욱 풍성하게 만들 구체적인 연출 방안과 스토리라인을 제안해주세요. 아래 내용을 포함한 표를 반드시 만들어주세요.)

    | 씬(Scene) | 연출 방안 (장소, 시간, 조명, 구도 등) | 기대 효과 |
    |---|---|---|
    | 인트로 | (예: 흑백 화면, LP판이 턴테이블에 올라가는 장면부터 시작) | (예: 아날로그 감성을 자극하며 시청자의 호기심 유발) |
    | 전개 | (예: 주인공이 밤거리를 걷는 모습을 다양한 앵글의 핸드헬드로 촬영) | (예: 자연스럽고 솔직한 분위기를 연출하여 몰입감 증대) |
    | 절정(클라이맥스) | (예: 공원 벤치에 앉아 가로등 불빛 아래에서 클로즈업) | (예: 곡의 감정이 최고조에 이르는 부분과 시각적 임팩트를 일치시킴) |
    | 아웃트로 | (예: 점차 멀어지는 주인공의 뒷모습, 페이드 아웃) | (예: 긴 여운을 남기며 음원을 다시 듣고 싶게 만듦) |
    
    ## 2) 영상 스타일

    ### 1. 영상 톤/스타일 제안
    (사용자가 선택한 '느낌/분위기'와 '영상 포맷'을 조합하여, 영상의 전체적인 톤과 스타일을 구체화해주세요. 아래 키워드 표를 반드시 포함해주세요.)

    **'${formData.vibe}' 느낌의 '${formData.format}' 콘텐츠를 위한 핵심 키워드 제안**

    | 키워드 | 설명 및 활용 방안 |
    |---|---|
    | (예: 흑백) | (예: 색 정보를 제거하여 인물의 감정과 분위기에 집중시킴) |
    | (예: 핸드헬드) | (예: 흔들리는 화면으로 현장감과 자연스러움을 더함) |
    | (10개 키워드) | ... |

    ### 2. 레퍼런스 영상 분석
    (당신은 URL을 직접 방문할 수 없으므로, 제공된 '레퍼런스' 텍스트(${formData.reference})의 제목, 채널명, 설명 등을 기반으로 영상의 스타일을 '추론'하여 분석해주세요. 아래 분석 표와 키워드를 반드시 포함해주세요.)

    **레퍼런스 기반 스타일 분석**
    | 분석 요소 | 특징 및 우리 영상에 적용할 점 |
    |---|---|
    | 예상 촬영/구성 | (예: 롱테이크와 클로즈업 위주의 촬영. 우리 영상의 절정 부분에 적용) |
    | 예상 색감/조명 | (예: 전반적으로 채도가 낮고, 콘트라스트가 강함. 흑백 톤과 잘 어울림) |
    | 예상 편집/리듬 | (예: 음악의 비트에 맞춰 화면을 전환. 감정선 변화에 따라 리듬 조절) |
    | 예상 사운드/BGM | (예: 내레이션 없이 음악에 집중. 공간의 소음을 살려 현장감 부여) |

    **레퍼런스 핵심 키워드 (30개)**
    (추론한 내용을 바탕으로, 레퍼런스와 관련된 키워드를 30개 나열해주세요. 예: city pop, lofi, night walk, cinematic, emotional, indie...)

    ## 3) 기타 요청사항
    - ${formData.additionalRequests || '입력된 내용 없음'}
  `;

  try {
    // 4. Gemini API 서버로 요청을 보냅니다.
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    // Gemini API로부터 받은 응답이 정상이 아니면 에러를 발생시킵니다.
    if (!geminiResponse.ok) {
      throw new Error(`Gemini API responded with status: ${geminiResponse.status}`);
    }

    // 5. 성공적으로 받은 응답(JSON)에서 텍스트 부분만 추출합니다.
    const geminiData = await geminiResponse.json();
    const generatedText = geminiData.candidates[0].content.parts[0].text;

    // 6. 추출한 텍스트를 프론트엔드로 다시 보내줍니다.
    response.status(200).json({ analysis: generatedText });

  } catch (error) {
    // 7. 과정 중에 에러가 발생하면, 에러 메시지를 프론트엔드로 보냅니다.
    console.error('Gemini API 호출 중 오류 발생:', error);
    response.status(500).json({ message: 'AI 기획안 생성 중 오류가 발생했습니다.' });
  }
}
