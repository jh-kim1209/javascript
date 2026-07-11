# Chapter 22: fetch API와 async/await (fetch API and async/await)

## 📖 핵심 개념

fetch API는 브라우저 및 현대 자바스크립트 환경에서 비동기 네트워크 통신을 처리하는 표준 인터페이스이며, async/await는 Promise를 기반으로 동기식 비동기 제어 흐름을 지원하는 강력한 Syntax Sugar입니다.

- **fetch API**:
  - HTTP 요청 전송 및 응답 수신을 비동기적으로 수행하고, Response 객체를 반환하는 모던 브라우저 표준 네트워크 통신 API입니다. (예: [용어 사전](../../../../GLOSSARY.md#fetch-response-ok) 참고)
  - **Friendly_Tutor의 친절한 비유**: "배달 전문 음식점(서버)에 음식 배달 전화(fetch)를 걸고 주문 영수증을 받아 대기실에 머무는 것입니다. 배달 오토바이가 도착하여 음식을 꺼내고 포장을 뜯는 과정(Response JSON 파싱)을 거쳐 실제 음식을 맛있게 먹는 흐름과 유사합니다."
- **async/await**:
  - Promise의 비동기 흐름을 일반적인 동기식(Synchronous) 코드 레이아웃처럼 자연스럽게 절차적으로 읽을 수 있도록 지원하는 제어 구문입니다.
  - **Senior_Practitioner의 실무 팁**: "async 함수 내부에서 `await fetch()`를 호출해 데이터를 가공할 때, `try-catch` 예외 핸들링 블록을 누락하면 안 됩니다. 네트워크 단절이나 API 서버 500 장애, CORS 권한 차단 등의 돌발 악재가 발생했을 때 예외 복구(Recovery) 절차가 없다면 자바스크립트 실행 흐름이 멈춰 화면 일부가 업데이트되지 않거나 빈 화면으로 방치되는 결함으로 연결됩니다. 반드시 모든 await 통신은 try-catch로 감싸고 디폴트 복구 데이터를 제공해야 합니다."
- **async/await의 작동 메커니즘 (Generator & Promise)**:
  - async/await는 완전한 신규 가상 스레드 모델이 아닌, 자바스크립트 엔진의 기존 부품들의 결합 사양입니다.
  - **PhD_Book_Author의 학술 스펙**: "ECMAScript 명세에 의하면, `async/await`는 제어권을 일시 정지하고 양도할 수 있는 **Generator의 이터레이터 메커니즘(yield)**과 **Promise**가 결합하여 런타임에 해독(Evaluation)됩니다. await 키워드에 도달하면 엔진은 해당 함수 실행 맥락(Execution Context)을 보존한 채 메인 스레드 제어권을 즉시 호출 부모에게 양도하고, Promise의 이행이 완료되었을 때 비로소 저장된 컨텍스트를 콜스택으로 로드하여 중단 지점부터 연산을 순차 재개(Resume)합니다."

## 🧪 실습 미션

- **미션 파일**: `mission.js`
- **요구 사항**:
  1.  `fetchUserProfile(userId)`: 지정된 사용자 ID의 프로필 정보를 요청하고 반환하는 비동기 함수를 작성합니다.
      - `fetch` API를 사용하여 `https://api.example.com/users/${userId}` 주소로 GET 요청을 전송합니다.
      - 응답 코드(`response.ok`)가 `true`일 경우, 해당 데이터를 JSON 객체로 파싱하여 반환합니다.
      - 만약 네트워크 에러가 발생하거나 응답 코드가 실패(`response.ok === false`), 혹은 파싱 연산 중 오류가 발생하는 경우 `try-catch`로 에러를 안전하게 회복하여 `null`을 반환해야 합니다.

## 💡 힌트 및 트러블슈팅

- `fetch` 함수는 Promise를 반환하므로 반드시 앞에 `await` 키워드를 사용해야 응답(`Response`) 객체를 획득합니다.
- Response 객체에서 바디 데이터를 꺼낼 때 사용하는 `response.json()` 역시 비동기 작업이므로 반드시 앞에 `await`를 걸어야 파싱된 객체를 얻을 수 있습니다.
- 네트워크의 비정상 예외 처리는 `try { ... } catch (e) { return null; }` 구문을 감싸서 원천 방어합니다.
