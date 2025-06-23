# 🔍 GitHub Finder

![GitHub Finder](https://img.shields.io/badge/GitHub-Finder-667eea?style=flat-square&logo=github&logoColor=white)
![Version](https://img.shields.io/badge/version-2.0.0-764ba2?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-f093fb?style=flat-square)

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=flat-square&logo=javascript&logoColor=%23F7DF1E)
![GitHub API](https://img.shields.io/badge/GitHub%20API-181717?style=flat-square&logo=github&logoColor=white)

<img width="1323" alt="Github Finder" src="https://github.com/user-attachments/assets/407807cb-4e66-49bc-8b30-74d29562653c" />

> 🚀 **아름답고 현대적인 GitHub 사용자 검색 웹 애플리케이션**
GitHub API를 활용하여 사용자 프로필, 저장소 정보, 그리고 기여도 그래프를 실시간으로 조회할 수 있는 반응형 웹 애플리케이션입니다.

## ✨ 주요 기능

🎯 **핵심 기능**

- [![GitHub User Search](https://img.shields.io/badge/GitHub-User%20Search-success?style=flat-square&logo=github)](https://github.com) GitHub 사용자 실시간 검색
- [![Profile Display](https://img.shields.io/badge/Profile-Display-blue?style=flat-square&logo=user)](https://github.com) 상세한 사용자 프로필 정보 표시
- [![Repository List](https://img.shields.io/badge/Repository-List-orange?style=flat-square&logo=git)](https://github.com) 최신 저장소 목록 (최대 5개)
- [![Contribution Graph](https://img.shields.io/badge/Contribution-Graph-green?style=flat-square&logo=github)](https://github.com) GitHub 기여도 잔디밭 시각화

🎨 **디자인 특징**

- [![Glassmorphism](https://img.shields.io/badge/Design-Glassmorphism-purple?style=flat-square)](https://github.com) 글래스모피즘 디자인
- [![Gradient Background](https://img.shields.io/badge/Background-Gradient-pink?style=flat-square)](https://github.com) 아름다운 그라데이션 배경
- [![Floating Animation](https://img.shields.io/badge/Animation-Floating%20Shapes-cyan?style=flat-square)](https://github.com) 떠다니는 도형 애니메이션
- [![Responsive Design](https://img.shields.io/badge/Design-Responsive-red?style=flat-square&logo=css3)](https://github.com) 완전 반응형 디자인

## 🛠️ 기술 스택

| 기술                                                                                                            | 버전 | 목적                   |
| --------------------------------------------------------------------------------------------------------------- | ---- | ---------------------- |
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)                       | 5    | 마크업 구조            |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)                          | 3    | 스타일링 및 애니메이션 |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)        | ES6+ | 동적 기능 구현         |
| ![GitHub API](https://img.shields.io/badge/GitHub%20API-181717?style=flat&logo=github&logoColor=white)          | v3   | 데이터 소스            |
| ![Font Awesome](https://img.shields.io/badge/Font%20Awesome-339AF0?style=flat&logo=fontawesome&logoColor=white) | 6.0  | 아이콘                 |

## 🚀 시작하기

### 📋 필요 조건

![Browser Support](https://img.shields.io/badge/Browser-Modern%20Browsers-brightgreen?style=flat-square&logo=googlechrome)
![Internet Required](https://img.shields.io/badge/Internet-Required-orange?style=flat-square&logo=wifi)

- 모던 웹 브라우저 (Chrome, Firefox, Safari, Edge)
- 인터넷 연결 (GitHub API 호출을 위해)

### 📦 설치 및 실행

1. **저장소 클론**

   ```bash
   git clone https://github.com/ChatHongPT/goorm_03.git
   cd github-finder
   ```

2. **파일 구조 확인**

   ```
   github-finder/
   ├── index.html      # 메인 HTML 파일
   ├── style.css       # 스타일시트
   ├── app.js          # JavaScript 로직
   └── README.md       # 문서
   ```

3. **웹 서버 실행**

   ```bash
   # Python 3 사용 시
   python -m http.server 8000

   # Python 2 사용 시
   python -m SimpleHTTPServer 8000

   # Node.js 사용 시
   npx serve .
   ```

4. **브라우저에서 열기**
   - `html/index.html` 파일을 직접 더블클릭해서 열거나,
   - 또는 웹서버 실행 후 아래 주소로 접속
   ```
   http://localhost:8000/html/index.html
   ```

## 📖 사용 방법

### 🔍 기본 사용법

1. **사용자 검색**

   - 검색창에 GitHub 사용자명 입력
   - "검색" 버튼 클릭 또는 Enter 키 누르기

2. **결과 확인**
   - 사용자 프로필 정보 확인
   - 최신 저장소 목록 탐색
   - 기여도 그래프 확인

### 🎯 주요 화면 구성

| 섹션          | 설명                 | 포함 정보                     |
| ------------- | -------------------- | ----------------------------- |
| 🏠 **헤더**   | 앱 제목 및 검색 영역 | 검색창, 검색 버튼             |
| 👤 **프로필** | 사용자 기본 정보     | 아바타, 이름, 통계, 상세 정보 |
| 📁 **저장소** | 최신 저장소 목록     | 저장소명, 스타, 포크, 워처 수 |
| 🌱 **잔디밭** | 기여도 시각화        | 1년간 커밋 활동 그래프        |

## 🎨 디자인 시스템

### 🎭 색상 팔레트

![Primary](https://img.shields.io/badge/Primary-667eea-667eea?style=flat-square)
![Secondary](https://img.shields.io/badge/Secondary-764ba2-764ba2?style=flat-square)
![Accent](https://img.shields.io/badge/Accent-f093fb-f093fb?style=flat-square)
![Success](https://img.shields.io/badge/Success-10b981-10b981?style=flat-square)
![Warning](https://img.shields.io/badge/Warning-f59e0b-f59e0b?style=flat-square)
![Error](https://img.shields.io/badge/Error-ef4444-ef4444?style=flat-square)

### 🎬 애니메이션

- **부드러운 전환**: 모든 인터랙션에 0.3s ease 적용
- **호버 효과**: 카드 및 버튼 3D 변환
- **로딩 애니메이션**: 스피너와 부드러운 페이드인
- **배경 애니메이션**: 떠다니는 도형 20초 순환

## 📱 반응형 디자인

| 화면 크기       | 해상도        | 주요 변경사항            |
| --------------- | ------------- | ------------------------ |
| 📱 **모바일**   | < 480px       | 세로 레이아웃, 작은 폰트 |
| 📲 **태블릿**   | 481px - 768px | 중간 크기 조정           |
| 💻 **데스크톱** | > 768px       | 가로 레이아웃, 풀 기능   |

## 🔧 커스터마이징

### 🎨 테마 수정

```css
/* css/style.css에서 색상 변수 수정 */
:root {
  --primary-gradient: linear-gradient(135deg, #667eea, #764ba2);
  --background-gradient: linear-gradient(
    135deg,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  );
  --card-background: rgba(255, 255, 255, 0.95);
}
```

### ⚙️ API 설정

```javascript
// js/app.js에서 API 엔드포인트 수정
class GitHubAPI {
  constructor() {
    this.baseURL = "https://api.github.com";
    // 추가 설정...
  }
}
```

## 🤝 기여하기

![Contributors Welcome](https://img.shields.io/badge/Contributors-Welcome-brightgreen?style=for-the-badge&logo=github)

1. **포크** 이 저장소를 포크합니다
2. **브랜치 생성** (`git checkout -b feature/amazing-feature`)
3. **변경사항 커밋** (`git commit -m 'Add amazing feature'`)
4. **브랜치 푸시** (`git push origin feature/amazing-feature`)
5. **Pull Request 생성**

### 📝 기여 가이드라인

- 코드 스타일 일관성 유지
- 상세한 커밋 메시지 작성
- 새로운 기능에 대한 문서 추가
- 크로스 브라우저 호환성 확인

---

## 🛠 GitHub Actions

![Deploy to GitHub Pages](https://github.com/ChatHongPT/goorm_03/actions/workflows/gh-pages.yml/badge.svg?branch=main)

```yaml
# .github/workflows/main.yml

name: 📦 Build and Deploy

on:
  push:
    branches:
      - main

jobs:
  build-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Build Project
        run: echo "No build needed for static site."

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

---
