# 팀 업무 현황 봇

AI 대화 로그 기반으로 팀 업무 현황을 파악하는 내부 도구입니다.

## 파일 구조

```
├── index.html       # 프론트엔드
├── api/
│   └── chat.js      # Vercel 서버리스 함수 (API 키 보관)
└── vercel.json      # Vercel 설정
```

## 배포 방법 (5분)

### 1. GitHub에 올리기
1. github.com → New repository → `team-bot` (private 권장)
2. 이 폴더의 파일 3개를 업로드 (Add file → Upload files)
   - `index.html`
   - `api/chat.js`
   - `vercel.json`

### 2. Vercel에 배포하기
1. vercel.com → Add New Project
2. GitHub 연결 후 `team-bot` 저장소 선택
3. Import 클릭 (설정 변경 없이)

### 3. API 키 환경변수 설정
배포 후 Vercel 대시보드에서:
1. 프로젝트 → Settings → Environment Variables
2. `+ Add` 클릭
3. Name: `ANTHROPIC_API_KEY`
4. Value: `sk-ant-...` (발급받은 API 키)
5. Save → Redeploy

### 4. 팀원 공유
배포 완료 후 생성된 URL (예: `your-team-bot.vercel.app`)을 팀원들에게 공유하면 됩니다.
팀원들은 가입/설치 없이 바로 사용 가능합니다.

## 사용법

1. 왼쪽 패널에 **기획안**, **회의록** 붙여넣기
2. **팀원 추가** 버튼으로 팀원 슬롯 생성
3. 각 팀원이 AI 대화 요약(`지금까지 내가 한 일 정리해줘`)을 붙여넣기
4. 오른쪽 채팅에서 업무 현황 질문

## 비용

Anthropic API는 사용량 기반 선불 과금입니다.
팀 내부 도구 수준 사용 시 월 $3~10 예상.
