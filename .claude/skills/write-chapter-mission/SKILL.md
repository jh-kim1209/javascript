---
name: write-chapter-mission
description: Use this skill to author or continue "Claude 버전" chapter missions (mission files under chapter-XX/claude/) for any of the 3 tracks (01-basic, 02-intermediate, 03-advanced) at /Users/jaehkim/projects/javascript. Triggers when the user asks to write, create, resume, or continue a chapter mission in "Claude 버전"/"Claude 버전으로", e.g. "챕터 16 미션 작성해줘", "02-intermediate 챕터 3 이어서 진행해줘", "다음 챕터 마저 만들어줘".
---

# Claude 버전 챕터 미션 작성 스킬

01-basic / 02-intermediate / 03-advanced 3개 트랙 전체에서 각 챕터를 "Claude 버전"으로 작성하는 반복 작업을 표준화한 스킬이다. 목적: 매번 이전 챕터 파일을 다시 읽어 스타일을 유추하는 대신, 고정된 스타일 가이드 문서 하나를 기준점으로 삼아 비용을 아끼고 트랙 간 일관성을 보장한다.

## 0. 필수 참고 문서
- 스타일 가이드 (3개 트랙 공통 + 트랙별 차이점): `/Users/jaehkim/projects/javascript/CLAUDE_MISSION_STYLE_GUIDE.md`
- 프로젝트 공용 규칙: `/Users/jaehkim/projects/javascript/.agents/AGENTS.md`

## 1. 대상 트랙/챕터 판단
사용자가 트랙과 챕터 번호를 지정하지 않았다면, 아래 순서로 `<트랙>/chapters/chapter-XX/claude/` 폴더를 순회하며 3개 파일이 모두 갖춰지지 않은 가장 이른 항목을 다음 대상으로 삼는다: `01-basic`(01~23) → `02-intermediate`(01~15) → `03-advanced`(01~15).

### 01-basic 23챕터 주제 (progress.md의 구버전 8챕터 표기는 무시 — 실제 커리큘럼은 아래 23챕터 체계)
1. 변수의 스코프와 재할당 (let/const/var, TDZ) · 2. 원시 자료형과 템플릿 리터럴 · 3. 동적 타이핑과 형 변환 · 4. 기본 연산자와 null 병합 연산자 · 5. 조건문 분기 · 6. 반복문 제어 · 7. 함수의 기본과 매개변수 · 8. 화살표 함수와 콜백 기초 · 9. 객체 리터럴과 참조 데이터 · 10. 배열 기본 조작과 스프레드 · 11. 배열 순회와 고차 함수 기초 · 12. 배열 누적과 정제 심화 · 13. 복사 패러다임과 불변성 · 14. 실행 컨텍스트와 호이스팅 · 15. 클로저와 상태 은닉 모듈(createStore) · 16. DOM 요소 조회와 스타일 제어 · 17. DOM 동적 생성과 삽입 · 18. 이벤트 리스너와 이벤트 객체 · 19. 이벤트 위임 패턴과 성능 최적화 · 20. ES Modules 모듈화 · 21. 비동기 자바스크립트와 Promise · 22. fetch API와 async/await · 23. 종합 마일스톤 프로젝트(통합 대시보드)

### 02-intermediate 15챕터 주제 (TypeScript & React)
1. TypeScript 환경 구성 · 2. TypeScript 기본 타입 바인딩 · 3. 인터페이스와 타입 별칭 · 4. TypeScript 함수 타이핑 · 5. TypeScript 제네릭 기초 · 6. TypeScript 고급 유틸리티 타입 · 7. React 가상 DOM과 빌드 시스템 · 8. React 컴포넌트 기본 설계 · 9. useState와 불변성 업데이트 · 10. useEffect 생명주기와 Cleanup · 11. React 커스텀 훅 설계 · 12. Context API와 리렌더링 최적화 · 13. Zustand 기반 전역 상태 관리 · 14. React Testing Library 컴포넌트 단위 테스트 · 15. [종합] 영화 검색 대시보드 구축

### 03-advanced 15챕터 주제 (프론트엔드 아키텍처 & 성능)
1. 가상 DOM Reconciliation 및 Diffing 알고리즘 설계 · 2. 가상 DOM 렌더러 직접 빌드 · 3. 커스텀 상태 엔진 직접 구현 · 4. React 성능 최적화 및 메모이제이션 튜닝 · 5. 가상 스크롤(Virtual List) 구현 · 6. Web Workers 기반 스레드 병렬 처리 · 7. Next.js App Router Server/Client 경계 설계 · 8. React Server Components(RSC) Payload 분석 · 9. SSR/SSG 빌드 메커니즘 · 10. Hydration 동작 원리 및 Mismatch 디버깅 · 11. ReadableStream 수집 및 실시간 청크 파싱 · 12. AI LLM API 연동 및 스트리밍 화면 렌더링 · 13. Docker 개발용 컨테이너 빌드(설정 파일형, 예외 규칙 적용) · 14. GitHub Actions CI/CD 파이프라인(설정 파일형, 예외 규칙 적용) · 15. [종합] 실시간 AI 대시보드 Vercel/Docker 최종 배포

## 2. 실행 절차
1. TaskList를 확인해 해당 트랙+챕터 태스크가 없으면 생성하고 `in_progress`로 표시한다 (태스크 subject에 트랙명을 포함시킬 것, 예: "02-intermediate Chapter 03 미션 작성").
2. 원본 폴더(`chapter-XX/` 바로 아래)에 파일이 있는지 확인한다 — 있다면 절대 수정 금지, 참고용으로만 다룬다. `gemini/` 폴더는 존재해도 무시한다.
3. 아래 형태로 서브에이전트(`general-purpose` 타입 — `fork`는 대화가 길어질수록 비용이 커지므로 쓰지 않는다)에게 위임한다. 프롬프트에는 예시 파일을 다시 읽으라고 하지 말고, **스타일 가이드 문서 경로만** 참고하라고 지시한다:
   - 목표 경로: `<트랙>/chapters/chapter-XX/claude/`
   - "먼저 `/Users/jaehkim/projects/javascript/CLAUDE_MISSION_STYLE_GUIDE.md`를 읽고, 해당 트랙(01-basic/02-intermediate/03-advanced) 섹션의 파일 형식·기술 스택을 정확히 따를 것" 명시
   - 트랙, 챕터 번호, 주제(위 목록에서 해당 항목)
   - 원본 파일 존재 시 수정 금지, `gemini/` 폴더 무시 안내
   - 검증 명령(트랙별로 스타일 가이드 2절 참고), fail은 정상/에러는 안 됨 (단, 03-advanced 설정 파일형 챕터는 스타일 가이드의 예외 규칙 적용)
   - 완료 후 간결한 보고 형식 (파일 경로, 줄 수, 검증 결과, 원본/`gemini/` 미접촉 확인)
4. 완료 알림을 받으면:
   - `find <트랙>/chapters/chapter-XX -type f`로 실제 파일 존재 확인
   - 스타일 가이드의 "플레이스홀더 함정" 체크리스트에 걸리는 태스크가 없는지 재확인 (설정 파일형 챕터는 해당 없음)
   - 문제 있으면 직접 Edit로 수정 (다시 서브에이전트를 띄우지 않고 간단한 건 직접 고침 — 01-basic Chapter 14 사례 참고)
   - TaskUpdate로 `completed` 처리
5. 사용자가 "이어서/계속" 진행을 명시하지 않는 한, 한 챕터 완료 후 다음 챕터로 자동 진행하지 않고 결과만 보고한다.

## 3. 하지 말 것
- fork 서브에이전트로 스타일 참고를 위해 기존 챕터 파일을 다시 읽게 하지 말 것 (비용 낭비 — 스타일 가이드 문서로 대체됨).
- 원본 챕터 파일(`chapter-XX/` 바로 아래) 수정 금지.
- `claude/`가 아닌 다른 경로에 파일을 만들지 말 것.
- `chapter-XX/gemini/` 폴더는 Antigravity가 별도로 생성한 버전이다. **절대 읽지도, 참고하지도, 수정하지도 말 것.** 이 폴더가 존재하거나, 그 생성 과정에서 원본 파일이 사라진 챕터가 있어도 정상 상황이니 복구를 시도하지 말 것. 서브에이전트 프롬프트에도 이 지침을 포함시킬 것.
- 03-advanced의 Docker/CI 챕터에 억지로 `mission.js`+Jest 형식을 강요하지 말 것 (스타일 가이드 2절 예외 규칙 참고).
