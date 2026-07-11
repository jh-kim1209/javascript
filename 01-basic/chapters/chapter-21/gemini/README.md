# Chapter 21: 비동기 자바스크립트와 Promise (Asynchronous JavaScript and Promise)

## 📖 핵심 개념

비동기 자바스크립트는 싱글 스레드 환경에서 UI 블로킹 없이 작업을 실행하며, Promise 객체를 통해 비동기 처리의 수명 주기 상태를 제어하는 프로그래밍 모델입니다.

- **비동기 프로그래밍 (Asynchronous)**:
  - 특정 작업의 실행이 완료될 때까지 기다리지 않고, 다음 라인의 코드를 즉시 실행하는 프로그램 실행 모델입니다. (예: [용어 사전](../../../../GLOSSARY.md#asynchronous) 참고)
  - **Friendly_Tutor의 친절한 비유**: "카페에 가서 아메리카노 한 잔을 시킨 상황을 떠올려 보세요. 커피가 나오는 데 5분이 걸린다고 해서 계산대 앞에 부동자세로 서서 5분을 기다리지 않죠? 진동벨(Promise)을 받아 대기석에서 편하게 책을 읽다가, 벨이 울릴 때(Fulfilled) 커피를 받아 가는 비선점형 방식과 같습니다."
- **Promise 상태 (Pending / Fulfilled / Rejected)**:
  - 비동기 처리가 진행됨에 따라 변화하는 프로미스 객체의 3가지 표준 상태(대기, 이행, 거부)입니다. (예: [용어 사전](../../../../GLOSSARY.md#promise-states) 참고)
  - **Senior_Practitioner의 실무 팁**: "Promise 작업이 실패하여 `Rejected` 상태가 되었을 때, 이에 대한 `.catch()` 예외 처리나 체이닝 핸들러를 누락한 채 방치하면 `UnhandledPromiseRejection` 경고가 발생합니다. 브라우저 환경에서는 콘솔 경고만 남기지만, Node.js 환경(v15 이상)에서는 이를 치명적인 에러로 간주하여 프로세스 자체를 강제 종료(Crash)시킵니다. 따라서 서버와 클라이언트를 오가는 실무 자바스크립트 코드에서는 모든 Promise 연산 끝에 반드시 예외 회복(catch) 코드를 강제하는 것이 안전합니다."
- **이벤트 루프와 마이크로태스크 큐 (Event Loop & Microtask Queue)**:
  - 비동기 작업의 콜백이 적재되고 실행되는 큐의 종류와 우선순위는 HTML Living Standard 명세에 정의되어 있습니다.
  - **PhD_Book_Author의 학술 스펙**: "HTML 명세서의 이벤트 루프(Event Loop) 알고리즘에 의하면, 비동기 작업 대기열은 크게 `Microtask Queue`(Promise, MutationObserver)와 `Macrotask Queue/Task Queue`(setTimeout, setInterval)로 이격 관리됩니다. 자바스크립트 실행기는 호출 스택(Call Stack)이 비는 즉시 **마이크로태스크 큐를 최우선 순위로 탐색하여 중간에 추가된 마이크로태스크까지 큐가 완전히 바닥날 때까지 실행한 뒤에야** 비로소 매크로태스크 큐에서 단 하나의 콜백만 꺼내 실행합니다."

## 🧪 실습 미션

- **미션 파일**: `mission.js`
- **요구 사항**:
  1.  `delayFetch(data, ms)`: 특정 시간이 지난 후 데이터를 반환하는 Promise 객체를 반환합니다.
      - `ms` 밀리초 후에 입력받은 `data` 값을 결과로 이행(`resolve`)하는 Promise를 생성하고 반환해야 합니다.
      - 만약 `ms` 매개변수가 숫자가 아니거나, 0보다 작은 음수일 경우 `new Error("Invalid delay time")`를 발생시켜 즉시 거부(`reject`)하는 Promise를 반환합니다.

## 💡 힌트 및 트러블슈팅

- `new Promise((resolve, reject) => { ... })` 생성자를 생성하여 비동기 흐름을 제어합니다.
- 지연 시간을 구현할 때는 브라우저 표준 Web API인 `setTimeout(callback, ms)`을 사용합니다.
- 예외 상황 검증 시 `typeof ms !== 'number'` 및 `ms < 0` 조건을 확인하여 즉시 `reject(new Error(...))`를 수행하고 `return` 처리하여 흐름을 끊으십시오.
