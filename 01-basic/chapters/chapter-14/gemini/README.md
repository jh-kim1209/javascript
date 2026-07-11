# Chapter 14: 호이스팅과 실행 컨텍스트 (Hoisting and Execution Context)

## 📖 핵심 개념

자바스크립트 엔진이 코드를 실행하기 전 선언문을 스캔하고 환경을 구성하는 실행 컨텍스트의 동작 방식과, 이로 인해 발생하는 호이스팅 및 임시 사각지대(TDZ)의 특성을 이해합니다.

- **호이스팅 (Hoisting)**:
  - 실행 컨텍스트 생성 시 스코프 내의 식별자 선언들을 환경 레코드에 미리 등록하는 엔진의 특성입니다 ([용어 사전](../../../../GLOSSARY.md#hoisting) 참고).
  - **Friendly_Tutor의 친절한 비유**: "호텔 객실을 미리 예약(선언)해 두었지만 아직 프런트 데스크에서 체크인 카드(초기화)를 받지 못해 객실 문을 열 수 없는 상태와 같습니다."
- **임시 사각지대 (Temporal Dead Zone - TDZ)**:
  - `let`과 `const`로 선언된 변수가 선언 라인에 도달하여 초기화가 이루어지기 전까지 참조할 수 없는 코드 영역입니다 ([용어 사전](../../../../GLOSSARY.md#temporal-dead-zone---tdz) 참고).
  - **Senior_Practitioner의 실무 팁**: "`var` 변수는 선언 전에 참조하면 에러 없이 `undefined`를 반환하여 버그 추적을 어렵게 만들거나 전역 객체를 오염시킬 위험이 큽니다. 반면 `let`과 `const`는 TDZ 규칙 덕분에 초기화되지 않은 변수를 참조할 시 즉시 `ReferenceError`를 발생시켜 실무에서 이러한 결함을 런타임 이전에 예방해 줍니다."
- **실행 컨텍스트 (Execution Context)**:
  - 자바스크립트 코드가 실행되는 환경을 정의하고 관리하는 추상적인 개념입니다.
  - **PhD_Book_Author의 학술 스펙**: "ECMAScript 명세상 실행 컨텍스트(Execution Context)는 평가 단계(Evaluation Phase)에서 환경 레코드(Environment Record)에 식별자를 기록(Instantiation)합니다. 이때 `var`로 선언된 변수는 환경 레코드에 생성(CreateMutableBinding)되는 동시에 `undefined`로 초기화(InitializeBinding)되지만, `let`과 `const` 변수는 생성만 될 뿐 초기화 단계를 거치지 않아 바인딩을 참조하려고 시도할 때 `ReferenceError`를 던지는 TDZ가 발생합니다."

## 🧪 실습 미션

- **미션 파일**: `mission.js`
- **요구 사항**:
  1.  `testHoistingBehavior()`: var 변수와 let 변수를 선언 전에 접근할 때 발생하는 예외 상황을 try-catch로 포착해 검증하는 함수를 작성합니다.
      - 함수 내부에 `var tempVar = 'var value';`와 `let tempLet = 'let value';`를 하단에 선언합니다.
      - 선언부 상단에서 `tempVar`에 접근을 시도하여 그 값을 `varVal` 변수에 담습니다 (호이스팅 및 `undefined` 자동 초기화 확인).
      - 선언부 상단에서 `tempLet`에 접근을 시도하여 발생하는 예외를 `catch`하고, 해당 에러 객체의 `name` 값을 `letError` 변수에 담습니다 (TDZ 및 `ReferenceError` 발생 확인).
      - 최종적으로 `{ varVal: undefined, letError: 'ReferenceError' }` 형태의 객체를 반환합니다.

## 💡 힌트 및 트러블슈팅

- 변수 선언문보다 물리적으로 위에 있는 라인에서 해당 식별자에 접근해야 의도한 호이스팅 및 TDZ 예외 상황이 발생합니다.
- `try-catch` 블록으로 개별 변수 접근을 독립적으로 감싸 한 쪽에서 에러가 발생해도 함수 전체의 실행이 중단되지 않고 다음 검증으로 넘어가도록 하십시오.
