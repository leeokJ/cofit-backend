# cofit-backend 프로젝트 README

## 프로젝트 개요
Node.js와 Firebase를 백엔드로 사용하여 ‘코핏(Cofit)’ 애플리케이션을 지원하는 RESTful API 서버입니다.

## 주요 디렉토리 및 역할

- **src/DAO**: 데이터 접근 객체(Data Access Object) 계층
  - `BaseDAO.js`: 공통 DAO 로직
  - 엔티티별 DAO 구현체 (예: `UserDAO.js`, `DrinkDAO.js` 등)

- **src/config**: 환경 설정
  - `env.js`: 환경 변수 로드
  - `firebase.js`: Firebase 초기화 및 설정

- **src/models**: 데이터 모델 클래스
  - Firebase 컬렉션 구조에 대응하는 모델 정의 (예: `User.js`, `DrinkLog.js` 등)

- **src/services**: 비즈니스 로직 계층
  - DAO를 호출하여 요청 처리를 수행 (예: `UserService.js`, `CoffeeDetailService.js` 등)

- **src/controllers**: 요청 핸들러
  - 서비스 계층 호출 및 HTTP 응답 생성 (예: `usersController.js`, `drinkController.js` 등)

- **src/routes**: 라우터 정의
  - 엔드포인트별 Express 라우트 설정 (예: `users.js`, `drinks.js` 등)

- **src/middlewares**: 공통 미들웨어
  - `errorHandler.js`: 에러 처리 핸들러

- **src/index.js**: 애플리케이션 진입점
  - Express 앱 및 미들웨어, 라우트 등록 후 서버 실행

## 구현 완료 기능

- Firebase와 연동된 DAO 계층을 통해 CRUD 연산 지원
- 서비스 → 컨트롤러 → 라우터로 이어지는 명확한 계층분리 아키텍처
- 환경 변수 및 Firebase 설정 파일 분리
- 기본 에러 처리 미들웨어 구현

## 아직 수행되지 않은 작업

- **CRUD 테스트**: DAO 계층 및 서비스·컨트롤러 통합에 대한 Create, Read, Update, Delete 기능 테스트 코드 작성 및 실행 필요
- **API 테스트**: Thunder 클라이언트를 사용한 REST API 엔드포인트 검증 테스트 미실행

## 설치 및 실행 방법

1. 저장소 클론
   ```bash
   git clone https://github.com/leeokJ/cofit-backend.git
   cd cofit-backend
   ```
2. 의존성 설치
   ```bash
   npm install
   ```
3. 환경 변수 설정
   `.env.example` 파일을 참조하여 `.env` 파일 생성
4. 애플리케이션 실행
   ```bash
   node migrate.js   # 마이그레이션(필요 시)
   node src/index.js
   ```

---
이 README는 현재까지의 구현 현황을 요약한 문서이며, Flutter에서 전달된 데이터 처리 (JSON 형태), Flutter에서 Firestore 읽기 및 계산 결과 반환, Flutter와 연동 테스트가 필요하다 내용을 포함합니다.
