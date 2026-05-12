# 강재영 줄넘기 학교

> 파주 운정 No.1 줄넘기 전문 체육관 공식 홈페이지

**🔗 [web-jump-kjy.vercel.app](https://web-jump-kjy.vercel.app/)**

---

## 소개

유치부·초등부·중등부·선수부 단계별 맞춤 줄넘기 교육을 제공하는 강재영 줄넘기 학교의 공식 홈페이지입니다.

---

## 기술 스택

- **HTML5 / CSS3 / Vanilla JS** — 빌드 도구 없는 순수 정적 사이트
- **Google Fonts** — Noto Sans KR
- **Vercel** — 호스팅

---

## 페이지 구성

| 섹션 | 설명 |
|---|---|
| Hero | 이미지 캐러셀 + 슬로건 오버레이 |
| 리뷰 | 네이버 지도 실제 학부모 후기 |
| YouTube | 대표 영상 임베드 |
| 소개 | 학교 소개 및 주요 지표 |
| 특장점 | 강재영 줄넘기 학교만의 5가지 강점 |
| 프로그램 | 유치부·초등부·중등부·선수부 |
| 코치 | 강재영 원장 소개 |
| 오시는 길 | 지도 및 운영 시간 |

---

## 프로젝트 구조

```
web-jump-kjy/
├── index.html          # 메인 페이지
├── style.css           # 전체 스타일
├── main.js             # 캐러셀, 햄버거 메뉴, 스크롤 효과
├── logo.png            # 로고 이미지
├── images/             # 사진 리소스
├── .env.example        # 환경변수 템플릿
├── config.example.js   # JS 설정 템플릿
└── .gitignore
```

---

## 로컬 실행

별도 설치 없이 `index.html`을 브라우저에서 열거나, VS Code Live Server 확장을 사용합니다.

```bash
# Live Server CLI 사용 시
npx serve .
```

---

## 환경변수 설정

API 키 등 민감정보는 `.env`와 `config.js`로 관리합니다 (git에서 제외됨).

```bash
cp .env.example .env
cp config.example.js config.js
# 각 파일에 실제 값 입력
```

---

## 배포

[Vercel](https://vercel.com)에 연결된 저장소로, `master` 브랜치에 푸시하면 자동 배포됩니다.

---

## 연락처

- **전화**: 031-949-8253
- **주소**: 경기도 파주시 동패동 1694-2 교하일번가 빌딩 301호
- **유튜브**: [강재영 줄넘기 학교 채널](https://youtube.com/channel/UCcO8JWeOy2PZnRC-xPUEQ7w)
- **네이버 지도**: [플레이스 바로가기](https://map.naver.com/p/entry/place/38349561)
