# 📖 자바스크립트 핵심 기술 용어 사전 (JavaScript Glossary)

이 용어 사전은 자바스크립트 학습 과정에서 등장하는 필수적이고 중요한 핵심 기술 용어들을 ECMAScript 및 HTML Living Standard 명세(Specification) 기준으로 기술적으로 엄밀하게 정리한 문서입니다. 피상적인 비유에 의존하지 않고 실제 엔진의 동작 메커니즘을 토대로 작성되었으므로 디버깅 및 아키텍처 설계 시 신뢰할 수 있는 참조서로 활용하세요.

---

## 🗂️ 용어 색인 (Index)

- [가상 DOM (Virtual DOM)](#virtual-dom)
- [구조 분해 할당 (Destructuring Assignment)](#destructuring-assignment)
- [단락 평가 (Short-circuit Evaluation)](#short-circuit-evaluation)
- [동적 타이핑 (Dynamic Typing)](#dynamic-typing)
- [렉시컬 스코프 (Lexical Scope)](#lexical-scope)
- [불변성 (Immutability)](#immutability)
- [블록 스코프 vs 함수 스코프 (Block vs Function Scope)](#block-vs-function-scope)
- [비동기 프로그래밍 (Asynchronous)](#asynchronous)
- [스프레드 연산자 (Spread Operator)](#spread-operator)
- [얕은 복사 vs 깊은 복사 (Shallow vs Deep Copy)](#shallow-vs-deep-copy)
- [이벤트 버블링 (Event Bubbling)](#event-bubbling)
- [이벤트 위임 (Event Delegation)](#event-delegation)
- [이벤트 루프 (Event Loop)](#event-loop)
- [임시 사각지대 (Temporal Dead Zone - TDZ)](#temporal-dead-zone---tdz)
- [클로저 (Closure)](#closure)
- [호이스팅 (Hoisting)](#hoisting)
- [ES Modules (ESM)](#es-modules)
- [NaN (Not a Number)](#nan)
- [Nullish Coalescing (??)](#nullish-coalescing)
- [Promise 상태 (Pending / Fulfilled / Rejected)](#promise-states)
- [웹 워커 (Web Worker)](#web-worker)
- [서버 컴포넌트와 클라이언트 컴포넌트 (Server and Client Components)](#server-client-components)
- [리액트 서버 컴포넌트 페이로드 (RSC Payload)](#rsc-payload)
- [렌더링 전략 (SSR vs SSG vs ISR)](#rendering-strategies)
- [하이드레이션 (Hydration)](#hydration)
- [DOM 요소 선택 (querySelector / getElementById)](#dom-selection)
- [classList API](#classlist-api)
- [DOM 노드 생성과 삽입 (createElement / appendChild / insertBefore)](#dom-node-creation)
- [innerHTML vs textContent (XSS 안전성)](#innerhtml-vs-textcontent)
- [이벤트 객체 (Event Object)](#event-object)
- [Named Export vs Default Export](#named-vs-default-export)
- [Promise 생성자와 executor 함수](#promise-executor)
- [Promise 체이닝과 Promise.all](#promise-chaining-and-all)
- [async/await와 에러 처리](#async-await-error-handling)
- [fetch API와 응답 상태 확인 (response.ok)](#fetch-response-ok)
- [배열 고차함수 (Array Higher-Order Functions)](#array-higher-order-functions)
- [TypeScript strict 모드 (Strict Mode)](#typescript-strict-mode)
- [타입 좁히기 (Type Narrowing)](#type-narrowing)
- [unknown 타입](#unknown-type)
- [never 타입](#never-type)
- [void 타입](#void-type)
- [interface 선언 병합 (Declaration Merging)](#declaration-merging)
- [유니온 타입과 교차 타입 (Union & Intersection Types)](#union-intersection-types)
- [함수 오버로딩 (Function Overloading)](#function-overloading)
- [readonly 제어자](#readonly-modifier)
- [제네릭 (Generics)](#generics)
- [제네릭 제약조건 (Generic Constraints)](#generic-constraints)
- [TypeScript 유틸리티 타입 (Partial/Pick/Omit/Record)](#utility-types)
- [JSX와 React.createElement 컴파일](#jsx-compilation)
- [Props와 컴포넌트 인터페이스](#component-props)
- [컴포넌트 합성 (Composition)](#component-composition)
- [useState와 상태 훅](#usestate-hook)
- [useEffect 의존성 배열](#useeffect-dependency-array)
- [useEffect Cleanup 함수](#useeffect-cleanup)
- [Context API와 Provider](#context-api)
- [Context 값 메모이제이션과 리렌더링 전파](#context-value-memoization)
- [Zustand와 외부 스토어 상태관리](#zustand-store)
- [React Testing Library 쿼리 우선순위](#rtl-query-priority)
- [경쟁 상태(Race Condition)와 최신 요청 가드](#race-condition-guard)
- [재조정 알고리즘과 Diffing 휴리스틱 (Reconciliation Diffing Heuristics)](#reconciliation-diffing-heuristics)
- [훅의 배열 기반 클로저 상태 모델 (Hooks as an Array of Closure State)](#hooks-array-state-model)
- [React.memo와 얕은 비교 (React.memo & Shallow Prop Comparison)](#react-memo-shallow-comparison)
- [useMemo와 useCallback (값과 함수의 메모이제이션)](#usememo-usecallback)
- [가상 스크롤 (Virtual Scrolling / List Virtualization)](#virtual-scrolling)
- [웹 스트림 API와 ReadableStream (Web Streams API & ReadableStream)](#web-streams-readablestream)
- [서버 전송 이벤트와 스트리밍 UI 렌더링 (Server-Sent Events & Streaming UI)](#sse-streaming)
- [Docker 멀티스테이지 빌드와 레이어 캐싱 (Docker Multi-stage Build & Layer Caching)](#docker-layer-caching)
- [GitHub Actions CI/CD 파이프라인 (GitHub Actions CI/CD Pipeline)](#github-actions-cicd)
- [배포 전 검증: 환경 변수/헬스체크/아티팩트 무결성 (Pre-deployment Verification)](#pre-deployment-verification)

---

## 🔍 상세 용어 설명

<a name="virtual-dom"></a>

### 1. 가상 DOM (Virtual DOM)

- **정의**: 실제 브라우저의 DOM 트리를 자바스크립트 객체 형태로 모방하여 표현한 **애플리케이션 레이어의 추상화 패턴**입니다. (브라우저나 ECMAScript 표준 API가 아닙니다.)
- **동작 방식**:
  - 상태가 변경되면 새로운 가상 DOM을 생성하고, 이전 가상 DOM과 비교(Diffing)하여 변경 사항을 감지한 뒤, 변경된 부분만 실제 DOM에 일괄 반영(Patching/Reconciliation)합니다.
- **⚠️ 오개념 바로잡기 (성능에 대한 오해)**:
  - 가상 DOM은 수동으로 작성한 최적의 직접 DOM 조작보다 **느립니다.** (두 트리를 유지하는 메모리 비용 및 비교 알고리즘 연산 비용이 추가로 발생하기 때문).
  - 본질적 가치는 절대적인 속도 향상이 아니라, **선언적(Declarative)으로 화면을 그릴 수 있게 해주는 개발자 경험(DX)**과, 수동 최적화 없이도 **대부분의 상황에서 평균 이상의 성능을 보장(Double Buffering 효과)**해 주는 것에 있습니다.
  - _참고_: 최근에는 가상 DOM을 사용하지 않고 컴파일 타임에 세밀한 반응형 업데이트 코드를 생성하는 프레임워크(Svelte, SolidJS 등)도 널리 사용됩니다.

---

<a name="destructuring-assignment"></a>

### 2. 구조 분해 할당 (Destructuring Assignment)

- **정의**: 배열이나 객체의 속성을 해체하여 그 값을 개별 변수에 직접 담을 수 있게 하는 자바스크립트 표현식입니다.
- **코드 예시**:
  ```javascript
  // 객체 분해
  const user = { name: 'Alice', age: 25 };
  const { name, age } = user; // name = "Alice", age = 25

  // 배열 분해
  const colors = ['red', 'blue'];
  const [firstColor, secondColor] = colors; // firstColor = "red"
  ```

---

<a name="short-circuit-evaluation"></a>

### 3. 단락 평가 (Short-circuit Evaluation)

- **정의**: 논리 연산자(`&&`, `||`) 연산 시, 앞선 피연산자의 결과만으로 식의 최종 결과가 이미 확정된 경우 뒤쪽 피연산자의 평가를 생략하는 동작입니다.
- **코드 예시**:
  ```javascript
  // && 연산자는 첫 Falsy를 만나면 즉시 멈추고 그 값을 반환
  const user = null;
  const userName = user && user.name; // user가 null이므로 user.name을 읽지 않고 null 반환 (에러 예방)

  // || 연산자는 첫 Truthy를 만나면 즉시 멈추고 그 값을 반환
  const displayName = userName || '손님'; // userName이 Falsy이므로 "손님" 반환
  ```

---

<a name="dynamic-typing"></a>

### 4. 동적 타이핑 (Dynamic Typing)

- **정의**: 변수 선언 시 자료형을 고정 선언하지 않고, 프로그램 실행 중에 할당되는 값의 타입에 따라 변수의 타입이 유연하게 결정되는 특성입니다.
- **주의**: 예상치 못한 암묵적 형 변환으로 버그가 발생할 수 있으므로, 명시적 형 변환(`Number()`, `String()`)을 활용해 제어하는 것이 좋습니다.

---

<a name="lexical-scope"></a>

### 5. 렉시컬 스코프 (Lexical Scope)

- **정의**: 코드가 작성된 물리적 구조(정적 텍스트 구조)에 의해 식별자 결합(Binding)이 결정되는 스코프 규칙입니다.
- **명세 동작 메커니즘**:
  - 자바스크립트 엔진은 코드를 평가(Evaluation)할 때 실행 컨텍스트(Execution Context)를 생성하며, 여기에 **렉시컬 환경(Lexical Environment)**을 바인딩합니다.
  - `Lexical Environment`는 식별자와 값을 기록하는 **환경 레코드(Environment Record)**와, 상위 스코프를 참조하는 **외부 렉시컬 환경 참조(Outer Lexical Environment Reference)**로 구성되어 스코프 체인을 형성합니다.
  - 이는 런타임의 호출 방식(Dynamic)에 영향을 받지 않고 오직 **작성 당시의 정적 중첩 구조**에 의해서만 결정됩니다.

---

<a name="immutability"></a>

### 6. 불변성 (Immutability)

- **정의**: 객체나 배열 같은 참조 타입의 원본 메모리 상태를 수정(Mutation)하지 않고 보존하는 성질입니다.
- **구현**: 새로운 상태로 변경할 때 원본을 직접 수정하지 않고 스프레드 연산자(`...`) 등을 사용해 복사본을 생성해 가공합니다. 프론트엔드 상태 추적 및 성능 판단의 기초가 됩니다.

---

<a name="block-vs-function-scope"></a>

### 7. 블록 스코프 vs 함수 스코프 (Block vs Function Scope)

- **블록 스코프 (`let`, `const`)**: 중괄호 `{}` 블록 내부에서 선언된 변수는 해당 블록 외부에서 접근할 수 없습니다.
- **함수 스코프 (`var`)**: 함수 정의 블록 내에서 선언된 변수만 격리되며, 일반 `if`나 `for` 블록 내부에서 선언된 변수는 블록 외부에서도 호출 가능해 버그를 유발하기 쉽습니다.

---

<a name="asynchronous"></a>

### 8. 비동기 프로그래밍 (Asynchronous)

- **정의**: 특정 작업의 실행이 완료될 때까지 기다리지 않고, 다음 라인의 코드를 즉시 실행하는 프로그램 실행 모델입니다.
- **용도**: 네트워크 요청(API Fetch), 파일 입출력, 타이머 등 시간이 걸리는 연산을 수행할 때 메인 실행 흐름(UI 스레드)을 멈추지(Blocking) 않기 위해 활용합니다.

---

<a name="spread-operator"></a>

### 9. 스프레드 연산자 (Spread Operator)

- **정의**: 객체나 배열의 개별 요소들을 하나씩 풀어내어 복사하거나 합치기 위해 사용하는 세 개의 점(`...`) 기호입니다.
- **코드 예시**:
  ```javascript
  const arr1 = [1, 2];
  const arr2 = [...arr1, 3, 4]; // [1, 2, 3, 4]

  const obj1 = { a: 1 };
  const obj2 = { ...obj1, b: 2 }; // { a: 1, b: 2 }
  ```

---

<a name="shallow-vs-deep-copy"></a>

### 10. 얕은 복사 vs 깊은 복사 (Shallow vs Deep Copy)

- **메커니즘 차이**:
  - **원시 값 (Primitive)**: 메모리 저장 영역에 실제 값이 저장되며, 복사 시 독립된 새 값이 할당되므로 복사 개념이 자명합니다.
  - **참조 값 (Reference)**: 메모리 주소(참조값)를 가리키므로 복사 방식에 따라 내부 참조의 공유 여부가 결정됩니다.
- **얕은 복사 (Shallow Copy)**:
  - 객체의 1단계 프로퍼티만 새 객체로 복사하고, 중첩된 객체(참조값)는 동일한 메모리 주소를 공유하게 복사합니다 (`...` 스프레드 연산자, `Object.assign()`).
- **깊은 복사 (Deep Copy)**:
  - 객체의 중첩 구조 전체를 순회하며 모든 참조의 연결을 완전히 차단한 새 인스턴스를 생성하는 방식입니다.
- **⚠️ structuredClone() 표준 API의 치명적 한계**:
  - HTML 명세의 _Structured Serialize/Deserialize_ 알고리즘을 사용하므로 다음과 같은 치명적 제약이 있습니다.
    1.  **함수/메서드 복사 불가**: 객체 내부에 함수가 있으면 즉시 `DataCloneError` 예외가 발생합니다.
    2.  **프로토타입 유실**: 클래스 인스턴스를 전달하면, 복사본은 프로토타입 체인이 끊긴 일반 플레인 객체(`Object.prototype`)가 됩니다.
    3.  **특수 디스크립터 제거**: `get`/`set` 접근자 프로퍼티는 복사 과정에서 단순히 값을 읽어 일반 데이터 프로퍼티로 변환됩니다.
    4.  **복사 불가능 객체**: DOM 노드, `Error` 객체, `Function` 등은 복사할 수 없습니다.
  - _대안_: 클래스 인스턴스나 함수가 포함된 복잡한 객체는 커스텀 복제 메서드(`clone()`)를 클래스 내에 직접 구현하거나, `lodash/clonedeep` 같은 라이브러리를 활용해야 합니다.

---

<a name="event-bubbling"></a>

### 11. 이벤트 버블링 (Event Bubbling)

- **정의**: 자식 엘리먼트에서 발생한 브라우저 이벤트가 상위 부모 엘리먼트들을 타고 올라가면서 최상위 조상 노드까지 순차적으로 전파되는 현상입니다.
- **중요**: 이 현상을 차단하고 싶을 때는 `event.stopPropagation()`을 호출합니다.

---

<a name="event-delegation"></a>

### 12. 이벤트 위임 (Event Delegation)

- **정의**: 자식 엘리먼트 하나하나에 이벤트 리스너를 붙이지 않고, 부모 엘리먼트에 단 하나의 리스너를 달아 **이벤트 버블링**으로 돔 위로 올라오는 자식의 이벤트를 캡처하여 일괄 처리하는 설계 패턴입니다.
- **이점**: 메모리 사용량을 크게 절약하고, 동적으로 자식 요소가 추가되더라도 이벤트를 바인딩할 필요가 없어 코드가 견고해집니다.

---

<a name="event-loop"></a>

### 13. 이벤트 루프 (Event Loop)

- **정의**: 브라우저나 Node.js 환경에서 자바스크립트의 단일 스레드 실행 환경을 유지하면서도, 비동기 작업의 콜백들을 관리하고 순차적으로 실행해 주는 **호스트 환경의 스케줄링 메커니즘**입니다. (HTML Living Standard 명세 기준)
- **명세 동작 메커니즘 (태스크의 철저한 격리)**:
  - 이벤트 루프는 대기열을 크게 두 종류로 나누어 관리합니다.
    1.  **마이크로태스크 큐 (Microtask Queue)**: `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver` 콜백이 적재됩니다.
    2.  **매크로태스크 큐 (Macrotask Queue / Task Queue)**: `setTimeout`, `setInterval`, `setImmediate`, I/O, UI 렌더링 이벤트 콜백이 적재됩니다.
  - **실행 루프 알고리즘**:
    1.  **Call Stack 확인**: 현재 실행 중인 Execution Context Stack이 완전히 빌 때까지 대기합니다.
    2.  **Microtask Queue 전체 우선 처리**: 마이크로태스크 큐에 있는 모든 작업을 **하나도 남김없이(중간에 추가된 마이크로태스크까지 포함하여) 큐가 완전히 빌 때까지** 전부 Call Stack으로 가져가 실행합니다.
    3.  **Rendering Pipeline**: 필요한 경우 브라우저가 화면을 갱신(Render Tree 갱신 및 페인트)합니다.
    4.  **Macrotask Queue 처리**: 매크로태스크 큐에서 **가장 오래된 단 하나의 태스크만** 꺼내서 실행한 뒤, 다시 1단계(Microtask Queue 검사)로 돌아갑니다.

---

<a name="temporal-dead-zone---tdz"></a>

### 14. 임시 사각지대 (Temporal Dead Zone - TDZ)

- **정의**: 변수 선언(정의) 라인 이전까지의 코드 영역을 뜻합니다.
- **핵심**: `let`과 `const`로 선언된 변수는 선언 라인에 도달하기 전까지 TDZ 영역에 있게 되며, 이 시점에 변수를 참조하려고 시도하면 `ReferenceError`를 발생시켜 초기화되지 않은 변수 참조 버그를 방지합니다.

---

<a name="closure"></a>

### 15. 클로저 (Closure)

- **정의**: 함수가 선언(정의)될 당시의 주변 환경인 **렉시컬 스코프**를 기억하여, 함수가 원래 생성된 스코프 영역 외부에서 호출되어 작동할 때도 그 은닉된 스코프 변수에 자유롭게 접근할 수 있는 특성입니다.
- **코드 예시**:
  ```javascript
  function createCounter() {
    let count = 0; // 은닉 변수
    return function () {
      count++; // 외부로 반환되어 호출될 때도 count에 접근 가능
      return count;
    };
  }
  const counter = createCounter();
  counter(); // 1
  counter(); // 2
  ```

---

<a name="hoisting"></a>

### 16. 호이스팅 (Hoisting)

- **정의**: 실행 컨텍스트 생성 시, 코드를 실행하기 전 단계(평가/인스턴스화 단계)에서 스코프 내의 선언들을 환경 레코드(Environment Record)에 미리 등록하는 엔진의 동작 특성입니다. **(실제 코드가 물리적으로 이동하지 않습니다.)**
- **명세 동작 메커니즘**:
  - **평가 단계(Evaluation Phase)**: 엔진은 스코프 전체를 스캔하여 모든 선언문(변수, 함수)을 찾아내어 식별자를 환경 레코드에 등록합니다.
  - **초기화의 차이**:
    1.  **함수 선언문 (`function`)**: 식별자 등록과 동시에 함수 객체를 생성하여 바인딩을 완료하므로 선언 전 호출이 가능합니다.
    2.  **`var` 변수**: 식별자 등록 시 자동으로 `undefined`로 초기화합니다.
    3.  **`let`, `const` 변수**: 식별자 등록은 수행하지만, **초기화(Initialization)는 건너뜁니다.** 실제 코드 실행 흐름이 해당 변수 선언문에 도달할 때 비로소 초기화가 이루어집니다.
  - **임시 사각지대(TDZ)**: 변수가 등록만 되고 아직 초기화되지 않은 상태에서 접근을 시도하면 명세에 의해 `ReferenceError`가 발생합니다. (호이스팅이 발생했기 때문에 상위 변수를 참조하지 못하고 에러를 발생시키는 것입니다.)

---

<a name="es-modules"></a>

### 17. ES Modules (ESM)

- **정의**: ECMAScript 표준 모듈 시스템으로, `import` 및 `export` 문법을 사용해 파일 단위로 독자적인 스코프를 유지하고 외부 파일과 코드를 연동합니다.
- **이점**: 파일 단위 모듈 설계가 가능하며, 최상위 블록의 독자적인 스코프가 보장되어 전역 변수 오염을 예방합니다.

---

<a name="nan"></a>

### 18. NaN (Not a Number)

- **정의**: 자바스크립트가 비정상적인 수치 연산을 수행했을 때 결과값으로 리턴하는 특별한 '숫자형 자료형'의 값입니다 (예: `Number("abc")`).
- **주의**: `NaN === NaN` 비교는 자바스크립트 명세상 `false`를 리턴하므로, 반드시 `isNaN(value)` 또는 `Number.isNaN(value)` 함수를 이용하여 데이터의 정상성을 검증해야 합니다.

---

<a name="nullish-coalescing"></a>

### 19. Nullish Coalescing (??)

- **정의**: 왼쪽 피연산자가 `null` 또는 `undefined`일 때만 오른쪽 피연산자를 반환하고, 그 외의 Falsy 값(`0`, `""`, `false`)인 경우 왼쪽 피연산자를 그대로 반환하는 논리 연산자입니다.
- **코드 예시**:
  ```javascript
  const count = 0;
  const val1 = count || 10; // || 연산자는 0을 Falsy로 보아 10을 반환
  const val2 = count ?? 10; // ?? 연산자는 0을 유효값으로 판단하여 0을 반환
  ```

---

<a name="promise-states"></a>

### 20. Promise 상태 (Pending / Fulfilled / Rejected)

- **정의**: 비동기 처리가 동작하는 동안 변화하는 프로미스 객체의 3가지 표준 수명 주기 상태입니다.
  - **Pending (대기)**: 비동기 작업이 아직 완료되지 않았거나 시작 전인 상태.
  - **Fulfilled (이행)**: 비동기 작업이 성공적으로 완수되어 결과값(`resolve`)을 전달받은 상태.
  - **Rejected (거부)**: 네트워크 차단, 런타임 에러 등으로 비동기 처리가 실패하여 에러 객체(`reject`)를 수신한 상태.

---

<a name="web-worker"></a>

### 21. 웹 워커 (Web Worker)

- **정의**: 브라우저의 메인 스레드와 별개로 백그라운드 스레드에서 스크립트를 실행할 수 있게 해주는 HTML 표준 API입니다.
- **동작 방식**:
  - 메인 스레드와 워커 스레드는 서로 독립된 실행 환경(글로벌 스코프)을 가지며, `postMessage`와 `onmessage` 이벤트를 이용한 메시지 전달 방식으로만 데이터를 주고받습니다. 데이터는 구조화된 복제(Structured Clone) 알고리즘을 통해 복사되어 전달됩니다.
- **제약**:
  - 워커 스레드는 UI에 직접 영향을 주는 DOM API(`window`, `document` 등)에 직접 접근할 수 없습니다.

---

<a name="server-client-components"></a>

### 22. 서버 컴포넌트와 클라이언트 컴포넌트 (Server and Client Components)

- **정의**: Next.js App Router 아키텍처에서 컴포넌트가 실행되고 렌더링되는 물리적 위치(서버 또는 브라우저)에 따른 리액트 컴포넌트 분류 방식입니다.
- **서버 컴포넌트 (RSC)**:
  - 서버에서만 실행되며 클라이언트 자바스크립트 번들에 포함되지 않습니다. 서버 자원(DB, 파일 시스템)에 직접 접근할 수 있으나, 브라우저 훅(useState, useEffect)이나 이벤트 리스너를 사용할 수 없습니다.
- **클라이언트 컴포넌트**:
  - 브라우저에서 하이드레이션 및 인터랙션을 수행하며, 'use client' 지시어를 파일 최상단에 명시하여 경계를 선언합니다.

---

<a name="rsc-payload"></a>

### 23. 리액트 서버 컴포넌트 페이로드 (RSC Payload)

- **정의**: 서버 컴포넌트를 브라우저가 해석할 수 있는 형태의 경량 텍스트 포맷으로 직렬화한 데이터 포맷입니다.
- **구성**:
  - 가상 DOM 트리 구조, 서버 컴포넌트가 렌더링한 HTML 요소 정보, 클라이언트 컴포넌트의 JS 번들 참조 주소(Client Reference), 서버로부터 전달받은 Props 데이터 등을 포함합니다. 브라우저는 이를 스트리밍 방식으로 수신하여 기존 클라이언트 상태를 유지한 채 화면을 갱신합니다.

---

<a name="rendering-strategies"></a>

### 24. 렌더링 전략 (SSR vs SSG vs ISR)

- **정의**: 웹 페이지의 HTML을 언제, 어떻게 생성할지 결정하는 아키텍처 전략입니다.
  - **SSR (Server-Side Rendering)**: 요청이 들어올 때마다 서버에서 실시간으로 HTML을 동적 생성하여 응답합니다.
  - **SSG (Static Site Generation)**: 빌드 타임에 HTML 페이지를 미리 정적으로 생성해 둡니다. CDN 캐싱이 가능해 TTFB가 매우 빠릅니다.
  - **ISR (Incremental Static Regeneration)**: SSG의 장점을 유지하되, 정해진 주기마다 백그라운드에서 정적 페이지를 동적으로 재생성하여 업데이트합니다.

---

<a name="hydration"></a>

### 25. 하이드레이션 (Hydration)

- **정의**: 서버 측에서 미리 렌더링된 정적 HTML 구조 위에, 브라우저가 React 런타임을 로드하고 가상 DOM을 구축하여 이벤트 리스너를 바인딩함으로써 인터랙티브한 상태로 결합하는 과정입니다.
- **주의 (Mismatch)**:
  - 서버에서 생성한 HTML 마크업과 클라이언트 React가 최초로 렌더링한 가상 DOM 트리 구조가 다를 경우 `Hydration Mismatch` 에러가 발생하며, React는 경고와 함께 돔 구조를 파괴하고 다시 그리기 때문에 성능이 저하됩니다.

---

<a name="dom-selection"></a>

### 26. DOM 요소 선택 (querySelector / getElementById)

- **정의**: 자바스크립트로 문서 트리(Document Tree)에서 특정 노드(들)를 찾아 참조를 얻어오는 DOM API 메서드군입니다.
- **주요 메서드 차이**:
  - `getElementById(id)`: `id` 속성값으로 단일 요소를 찾습니다. 문서 전체(`document`)에서만 호출 가능하며, CSS 선택자 파싱 과정이 없어 다른 메서드보다 빠릅니다.
  - `querySelector(selector)`: CSS 선택자 문법을 그대로 사용해 조건에 맞는 **첫 번째** 요소 하나만 반환합니다. 일치하는 요소가 없으면 `null`을 반환합니다.
  - `querySelectorAll(selector)`: 조건에 맞는 **모든** 요소를 정적(Static) `NodeList`로 반환합니다. 이 NodeList는 이후 DOM이 변경되어도 자동 갱신되지 않습니다.
- **중요**: `document`뿐 아니라 임의의 요소 노드에서도 `querySelector`/`querySelectorAll`을 호출할 수 있으며, 이 경우 해당 요소의 하위 트리 범위로 검색이 제한됩니다.

---

<a name="classlist-api"></a>

### 27. classList API

- **정의**: 요소의 `class` 속성을 문자열로 직접 다루는 대신, 개별 클래스 토큰 단위로 안전하게 추가/제거/확인할 수 있게 해주는 `DOMTokenList` 기반 API입니다.
- **주요 메서드**:
  - `element.classList.add(className)`: 클래스를 추가합니다 (이미 있으면 중복 추가되지 않음).
  - `element.classList.remove(className)`: 클래스를 제거합니다.
  - `element.classList.toggle(className)`: 클래스가 있으면 제거, 없으면 추가하며, **토글 후 해당 클래스가 존재하는지 여부(boolean)를 반환**합니다.
  - `element.classList.contains(className)`: 해당 클래스 포함 여부를 boolean으로 반환합니다.
- **이점**: 문자열 `className` 속성을 직접 조작(`element.className = '...'`)할 때 발생하는 공백 처리 실수나 다른 클래스 덮어쓰기 문제를 방지합니다.

---

<a name="dom-node-creation"></a>

### 28. DOM 노드 생성과 삽입 (createElement / appendChild / insertBefore)

- **정의**: 자바스크립트 코드로 새로운 DOM 노드를 만들어 문서 트리에 동적으로 끼워 넣는 일련의 API입니다.
- **생성**: `document.createElement(tagName)`은 아직 어떤 문서 트리에도 속하지 않은 새 요소 노드를 메모리 상에 생성합니다 (이 시점에는 화면에 그려지지 않습니다).
- **삽입 메서드 차이**:
  - `parent.appendChild(node)`: `node`를 `parent`의 **마지막 자식**으로 추가합니다.
  - `parent.insertBefore(newNode, referenceNode)`: `newNode`를 `parent`의 자식인 `referenceNode` **바로 앞**에 삽입합니다. `referenceNode`가 `null`이면 `appendChild`와 동일하게 마지막에 추가됩니다.
- **주의**: 이미 문서 트리에 속한 노드를 다시 `appendChild`/`insertBefore`로 삽입하면 기존 위치에서 노드가 **제거된 뒤 이동**합니다 (복제되지 않음).

---

<a name="innerhtml-vs-textcontent"></a>

### 29. innerHTML vs textContent (XSS 안전성)

- **정의**: 두 프로퍼티 모두 요소의 내용을 읽거나 쓸 수 있지만, 값을 **해석하는 방식**이 근본적으로 다릅니다.
- **`innerHTML`**: 대입된 문자열을 **HTML 마크업으로 파싱**하여 실제 자식 노드 트리를 구성합니다. `<script>` 태그 자체는 실행되지 않지만, `<img src=x onerror="...">`처럼 이벤트 핸들러 속성이 포함된 태그는 브라우저가 파싱하는 즉시 해당 스크립트가 실행될 수 있습니다.
- **`textContent`**: 대입된 문자열을 **순수 텍스트 그대로** 취급하여 단일 텍스트 노드로 삽입합니다. 문자열에 `<`, `>` 같은 문자가 있어도 태그로 해석하지 않고 리터럴 문자 그대로 화면에 표시합니다.
- **⚠️ 보안 원칙**: 사용자가 입력했거나 외부에서 받아온 **신뢰할 수 없는 문자열**을 화면에 표시할 때는 반드시 `textContent`를 사용해야 XSS(Cross-Site Scripting) 공격을 원천 차단할 수 있습니다. `innerHTML`은 개발자가 직접 작성한 **고정된(trusted) 마크업**을 삽입할 때만 제한적으로 사용해야 합니다.

---

<a name="event-object"></a>

### 30. 이벤트 객체 (Event Object)

- **정의**: 이벤트가 발생하면 브라우저가 자동으로 생성하여 리스너 콜백 함수의 첫 번째 인자로 전달하는 객체로, 해당 이벤트에 대한 모든 정보를 담고 있습니다.
- **주요 프로퍼티/메서드**:
  - `event.target`: 이벤트가 **실제로 발생한(최초 발원지)** DOM 요소를 가리킵니다. 버블링 중에도 이 값은 바뀌지 않습니다.
  - `event.currentTarget`: 이벤트 리스너가 **현재 연결되어 있는** 요소를 가리킵니다. 이벤트 위임에서 `target`과 `currentTarget`이 다를 수 있습니다.
  - `event.preventDefault()`: 해당 이벤트의 브라우저 기본 동작(폼 제출, 링크 이동 등)을 취소합니다.
  - `event.stopPropagation()`: 이벤트가 상위 요소로 전파(버블링)되는 것을 막습니다.

---

<a name="named-vs-default-export"></a>

### 31. Named Export vs Default Export

- **정의**: ESM에서 값을 내보내는 두 가지 방식입니다. `export const/function/class`로 선언하는 **Named Export**는 한 모듈에서 여러 개를 내보낼 수 있고, `import`하는 쪽은 반드시 `{ 이름 }` 구문으로 동일한 식별자를 지정해야 합니다. `export default`는 **모듈당 단 한 번만** 선언할 수 있으며, `import`하는 쪽은 원하는 임의의 이름으로 자유롭게 받을 수 있습니다.
- **주의**: 두 방식은 한 모듈에서 함께 사용할 수 있지만(`export default foo; export { bar };`), `export default`를 같은 모듈에 두 번 이상 선언하면 `SyntaxError`가 발생합니다.

---

<a name="promise-executor"></a>

### 32. Promise 생성자와 executor 함수

- **정의**: `new Promise(executor)`에서 `executor`는 Promise 인스턴스가 생성되는 즉시 **동기적으로 실행**되는 콜백 함수이며, 인자로 `resolve`와 `reject` 두 함수를 전달받습니다.
- **명세 동작**: `resolve(value)`를 호출하면 상태가 Pending → Fulfilled로, `reject(reason)`을 호출하면 Pending → Rejected로 전환됩니다. Promise의 상태 전환은 **한 번 확정되면 되돌릴 수 없으며(불변)**, 이후 `resolve`/`reject`를 다시 호출해도 무시됩니다. ([Promise 상태](#promise-states) 참고)

---

<a name="promise-chaining-and-all"></a>

### 33. Promise 체이닝과 Promise.all

- **Promise 체이닝**: `.then()`은 항상 **새로운 Promise**를 반환하므로 여러 `.then()`을 연속으로 이어 붙여(체이닝) 비동기 작업을 순차적으로 처리할 수 있습니다. 앞 단계의 콜백이 반환한 값은 자동으로 다음 `.then()`의 인자로 전달됩니다. 콜백이 반환한 값이 또 다른 Promise라면, 체인은 그 Promise가 처리될 때까지 자동으로 대기합니다.
- **`Promise.all(iterable)`**: 여러 Promise를 동시에(병렬로) 실행하고, **모두 이행(Fulfilled)되었을 때** 결과값들을 원래 순서를 유지한 배열로 반환합니다.
- **⚠️ Fail-Fast 특성**: 배열 내 단 하나의 Promise라도 거부(Rejected)되면, 나머지 Promise의 완료 여부와 무관하게 `Promise.all` 전체가 즉시 그 사유로 거부됩니다.

---

<a name="async-await-error-handling"></a>

### 34. async/await와 에러 처리

- **정의**: `async` 함수는 항상 Promise를 반환하는 함수입니다. 함수 내부에서 `await` 키워드를 사용하면 오른쪽 Promise가 처리(settle)될 때까지 해당 함수의 실행을 일시 중단(suspend)하고, 처리된 값을 마치 동기 코드처럼 이어받아 사용할 수 있습니다.
- **에러 처리**: `await`한 Promise가 거부(Rejected)되면 해당 지점에서 예외(exception)가 **던져진 것처럼** 동작합니다. 따라서 `try...catch` 구문으로 감싸면 동기 코드의 에러 처리와 동일한 방식으로 비동기 에러를 처리할 수 있습니다 (`.catch()` 체이닝 없이도 처리 가능).

---

<a name="fetch-response-ok"></a>

### 35. fetch API와 응답 상태 확인 (response.ok)

- **정의**: `fetch(url)`은 네트워크 요청을 보내고 Promise를 반환하지만, **HTTP 상태 코드가 4xx/5xx인 응답을 받아도 이 Promise는 거부(reject)되지 않습니다.** 오직 네트워크 자체가 끊기거나 요청이 성립하지 않는 경우(CORS 차단, DNS 실패 등)에만 거부됩니다.
- **필수 검사**: 따라서 응답 객체의 `response.ok`(상태 코드가 200~299 범위인지 나타내는 boolean) 또는 `response.status`를 직접 확인하여, 실패한 응답일 경우 개발자가 직접 에러를 `throw`해야 합니다. 이를 누락하면 404/500 에러 응답의 본문을 정상 데이터처럼 처리해버리는 버그가 발생합니다.

---

<a name="array-higher-order-functions"></a>

### 36. 배열 고차함수 (Array Higher-Order Functions)

- **정의**: 함수를 인자로 전달받아 배열의 각 요소에 적용하는 배열 메서드로, 명령형 반복문(`for`) 없이 선언적으로 데이터를 변환·필터링·축약할 수 있습니다.
- **대표 메서드**:
  - `map(callback)`: 각 요소를 변환한 결과로 이루어진 **같은 길이의 새 배열**을 반환합니다.
  - `filter(callback)`: 콜백이 truthy를 반환하는 요소만 남긴 새 배열을 반환합니다.
  - `reduce(callback, initialValue)`: 배열 전체를 순회하며 누적값(accumulator) 하나로 축약합니다.
- **공통 특징**: 세 메서드 모두 원본 배열을 변경하지 않고 **새로운 값을 반환**합니다 ([불변성](#immutability) 참고).

---

<a name="typescript-strict-mode"></a>

### 37. TypeScript strict 모드 (Strict Mode)

- **정의**: `tsconfig.json`의 `"strict": true` 옵션 하나로 활성화되는 타입 검사 규칙 묶음이며, `strictNullChecks`, `noImplicitAny`, `strictFunctionTypes` 등 여러 하위 플래그를 한꺼번에 켭니다.
- **실무적 가치**: strict 모드가 꺼져 있으면 `null`/`undefined` 관련 런타임 예외(`Cannot read properties of undefined`)를 컴파일러가 잡아주지 못합니다. `strictNullChecks`를 켜면 모든 타입이 기본적으로 `null`/`undefined`를 포함하지 않는다고 가정하며, 값이 없을 수 있다면 반드시 `string | undefined`처럼 유니온으로 명시해야 합니다. `noImplicitAny`는 매개변수나 변수의 타입을 추론할 수 없을 때 자동으로 `any`를 부여하지 않고 컴파일 에러를 발생시켜, 타입 정보가 소리 없이 사라지는 것을 막습니다.

---

<a name="type-narrowing"></a>

### 38. 타입 좁히기 (Type Narrowing)

- **정의**: 유니온 타입이나 `unknown`처럼 여러 타입을 가질 수 있는 값을, 조건문(`typeof`, `instanceof`, `Array.isArray`, `in`, 사용자 정의 타입 가드 등)을 통해 특정 코드 블록 안에서 더 구체적인 타입으로 좁히는 정적 분석 과정입니다.
- **동작 메커니즘**: 이 과정은 TypeScript 컴파일러의 제어 흐름 분석(Control Flow Analysis)에 의해 수행되며, 런타임에는 아무 영향을 주지 않습니다(타입 정보는 컴파일 시점에 소거됨). 오직 컴파일러/에디터가 이후 코드에서 어떤 프로퍼티·메서드 접근이 안전한지 정적으로 판단하는 데만 사용됩니다.

---

<a name="unknown-type"></a>

### 39. unknown 타입

- **정의**: `any`처럼 모든 값을 담을 수 있는 최상위 타입이지만, `any`와 달리 [타입 좁히기](#type-narrowing) 없이는 프로퍼티 접근, 함수 호출, 연산자 사용이 전부 금지됩니다.
- **`any`와의 차이**: `any`는 타입 검사를 완전히 우회(포기)하는 반면, `unknown`은 "타입을 아직 모른다"는 사실을 유지한 채 컴파일러의 안전장치를 계속 강제합니다. 외부 입력(`JSON.parse` 결과, API 응답 등)의 타입에는 `any`보다 `unknown`을 쓰는 것이 안전합니다.

---

<a name="never-type"></a>

### 40. never 타입

- **정의**: 절대 발생할 수 없는 값의 타입입니다. 항상 예외를 던지는 함수나 무한 루프만 도는 함수의 반환 타입, 그리고 유니온을 다루는 분기문에서 모든 case를 처리하고 남은 값이 없을 때의 타입으로 나타납니다.
- **활용 (Exhaustiveness Checking)**: 유니온 타입을 다루는 `switch`/`if-else` 체인의 `default` 분기에서 변수를 `never` 타입에 대입해두면, 나중에 유니온에 새 멤버가 추가됐는데 분기 처리를 빠뜨렸을 경우 그 대입문에서 컴파일 에러가 발생해 처리 누락을 컴파일 타임에 잡아낼 수 있습니다.

---

<a name="void-type"></a>

### 41. void 타입

- **정의**: 함수가 의미 있는 값을 반환하지 않음을 나타내는 반환 타입 전용 표기입니다. `undefined`와 달리 "반환값에 신경 쓰지 않겠다"는 의도를 표현하는 용도로 쓰입니다.
- **콜백 타입에서의 특수 규칙**: 매개변수 타입으로 `(item: T) => void`를 선언하면, 실제로는 값을 반환하는 함수를 넘겨도 컴파일 에러가 나지 않습니다(반환값을 무시하겠다는 의미). 이 때문에 `void`는 반환 타입 위치에서 `undefined`보다 느슨하게 동작합니다.

---

<a name="declaration-merging"></a>

### 42. interface 선언 병합 (Declaration Merging)

- **정의**: 동일한 이름으로 `interface`를 여러 번 선언하면, TypeScript는 이를 중복 선언 에러로 취급하지 않고 하나의 `interface`로 자동 병합(merge)해 모든 프로퍼티를 합친 타입을 만듭니다.
- **`type`과의 차이**: `type` 별칭은 같은 스코프에서 동일한 이름으로 두 번 선언하면 에러가 나지만, `interface`는 병합이 언어 차원에서 허용된 기능입니다. 주로 외부 라이브러리 타입을 확장(모듈 보강, Module Augmentation)할 때 활용됩니다.

---

<a name="union-intersection-types"></a>

### 43. 유니온 타입과 교차 타입 (Union & Intersection Types)

- **유니온 (`A | B`)**: 값이 `A` 또는 `B` 중 하나일 수 있음을 나타내며, [타입 좁히기](#type-narrowing) 없이는 두 타입에 공통으로 존재하는 프로퍼티·메서드만 접근할 수 있습니다.
- **교차 (`A & B`)**: 두 타입의 조건을 모두 만족해야 하는 새 타입을 만듭니다. 객체 타입끼리 교차하면 두 타입의 필드를 모두 가진 객체 타입이 됩니다.
- **`interface` vs `type` 선택 기준**: 객체 형태를 정의하고 이후 [선언 병합](#declaration-merging) 가능성이 있다면 `interface`를, 유니온·교차·튜플·프리미티브 별칭처럼 병합이 필요 없는 임의의 타입 조합을 표현하려면 `type`을 사용하는 것이 일반적인 관례입니다.

---

<a name="function-overloading"></a>

### 44. 함수 오버로딩 (Function Overloading)

- **정의**: 하나의 함수 이름에 대해 서로 다른 매개변수·반환 타입 조합의 "오버로드 시그니처"를 여러 개 선언하고, 그 아래에 실제 동작을 구현하는 "구현 시그니처" 하나를 두는 기법입니다.
- **동작 메커니즘**: 호출하는 쪽에서는 오버로드 시그니처들만 보이며, 구현 시그니처는 호출자에게 노출되지 않고 내부 구현에서만 사용됩니다. 구현 시그니처의 매개변수·반환 타입은 반드시 모든 오버로드 시그니처를 포괄할 수 있을 만큼 넓어야 합니다.

---

<a name="readonly-modifier"></a>

### 45. readonly 제어자

- **정의**: 배열, 튜플, 객체 프로퍼티에 붙여 해당 값이 선언 이후 재할당되거나 변형(mutate)될 수 없음을 컴파일 타임에 강제하는 제어자입니다.
- **특징**: `readonly number[]`는 `push`, `pop`, `sort` 같은 변형 메서드 호출 자체를 컴파일 에러로 막지만, 이는 어디까지나 정적 타입 검사이며 런타임에 값을 실제로 얼리는 `Object.freeze`와는 다릅니다(컴파일된 JS 코드에서는 일반 배열과 동일하게 동작).

---

<a name="generics"></a>

### 46. 제네릭 (Generics)

- **정의**: 함수·인터페이스·타입 별칭을 작성할 때 구체적인 타입을 미리 고정하지 않고, 호출 시점에 전달되는 실제 타입으로 자리를 채우는 타입 매개변수(`<T>`) 기법입니다.
- **가치**: `any`를 쓰면 타입 정보가 사라져 입력과 출력의 관계를 표현할 수 없지만, 제네릭은 "입력으로 받은 타입을 그대로 출력한다"처럼 입력-출력 타입 사이의 관계를 유지한 채 재사용 가능한 코드를 작성할 수 있게 해줍니다.

---

<a name="generic-constraints"></a>

### 47. 제네릭 제약조건 (Generic Constraints)

- **정의**: `extends` 키워드를 사용해 제네릭 타입 매개변수가 가질 수 있는 타입의 범위를 특정 구조(shape)를 만족하는 타입으로 한정하는 것입니다.
- **예시**: `<T extends { id: number }>`는 `T` 자리에 들어올 수 있는 타입이 최소한 `id: number` 프로퍼티를 가지고 있어야 함을 강제하며, 이 덕분에 함수 본문에서 `value.id`처럼 프로퍼티에 안전하게 접근할 수 있습니다. `keyof T`와 결합하면(`<K extends keyof T>`) "T가 실제로 가진 프로퍼티 키 중 하나"로 범위를 좁힐 수도 있습니다.

---

<a name="utility-types"></a>

### 48. TypeScript 유틸리티 타입 (Partial/Pick/Omit/Record)

- **정의**: 기존 타입을 변형해 새로운 타입을 만들어내는, TypeScript 표준 라이브러리(`lib.es5.d.ts` 등)에 내장된 제네릭 타입들입니다. 매핑된 타입(Mapped Types)과 조건부 타입을 기반으로 구현되어 있습니다.
- **`Partial<T>`**: `T`의 모든 프로퍼티를 선택적(`?`)으로 바꿉니다. 객체의 일부 필드만 갱신하는 patch/update 함수의 매개변수 타입으로 흔히 사용됩니다.
- **`Pick<T, K>`**: `T`가 가진 프로퍼티 중 `K`(문자열 리터럴 유니온)에 해당하는 것만 골라 새 타입을 만듭니다. `K`는 반드시 `keyof T`의 부분집합이어야 합니다.
- **`Omit<T, K>`**: `T`에서 `K`에 해당하는 프로퍼티를 제외한 나머지로 새 타입을 만듭니다. 내부적으로 `Pick<T, Exclude<keyof T, K>>`로 정의되어 있습니다.
- **`Record<K, V>`**: 키 타입이 `K`이고 값 타입이 `V`인 객체(딕셔너리/룩업 테이블) 타입을 만듭니다. 배열을 특정 키 기준으로 그룹화한 결과의 타입을 표현할 때 유용합니다.
- **⚠️ 주의**: 이 타입들은 모두 **컴파일 타임 정적 검사**에만 관여합니다. 런타임에 객체의 실제 프로퍼티를 제거하거나 선택하는 동작은 `delete`, 구조 분해 할당, 스프레드 연산자 같은 실제 JS 코드로 직접 구현해야 합니다 — 타입만 `Pick`/`Omit`으로 좁혀놓고 런타임 값은 원본 그대로 반환하면 타입 검사는 통과하지만 실제 객체에는 불필요한 필드가 남아있게 됩니다.

---

<a name="jsx-compilation"></a>

### 49. JSX와 React.createElement 컴파일

- **정의**: JSX(`<div>...</div>` 형태의 문법)는 ECMAScript 표준 문법이 아니며, 브라우저가 직접 실행할 수 없습니다. TypeScript(또는 Babel) 컴파일러가 `tsconfig.json`의 `jsx` 옵션(예: `"react-jsx"`)에 따라 이를 순수 자바스크립트 함수 호출로 변환(트랜스파일)한 뒤에야 실행됩니다.
- **변환 결과**: `"react-jsx"` 런타임에서는 `<Greeting name="Kim" />`가 `jsx(Greeting, { name: "Kim" })` 호출로 변환됩니다(구 런타임에서는 `React.createElement(Greeting, { name: "Kim" })`). 이 호출은 실제 DOM 노드가 아니라, 컴포넌트 타입과 props를 기술하는 **일반 자바스크립트 객체(React Element)** 를 반환합니다.
- **DOM 반영 과정**: React Element(가상 DOM 노드, [가상 DOM](#virtual-dom) 참고) → 리컨실리에이션(Reconciliation) → 실제 DOM 커밋(Commit)의 3단계를 거쳐야 브라우저 화면에 나타납니다. 즉 JSX 문법 자체는 DOM과 직접적인 관련이 없고, 어디까지나 "React Element를 만드는 함수 호출"의 문법 설탕(syntactic sugar)일 뿐입니다.

---

<a name="component-props"></a>

### 50. Props와 컴포넌트 인터페이스

- **정의**: 부모 컴포넌트가 자식 컴포넌트에게 전달하는 읽기 전용(read-only) 입력 데이터입니다. 함수형 컴포넌트에서는 첫 번째 매개변수로 전달되는 단일 객체이며, TypeScript에서는 `interface`나 `type`으로 그 형태를 명시적으로 선언합니다.
- **단방향 데이터 흐름**: Props는 부모 → 자식 방향으로만 전달되며, 자식 컴포넌트는 자신에게 전달된 props 객체를 직접 변형(mutate)해서는 안 됩니다. 이는 리액트의 **단방향 데이터 흐름(One-way Data Flow)** 원칙의 핵심입니다.
- **children prop**: `React.ReactNode` 타입으로 선언되는 특수한 props로, 컴포넌트 태그 사이(`<Card>이 부분</Card>`)에 위치한 JSX를 전달받습니다. [컴포넌트 합성](#component-composition)의 기반이 됩니다.

---

<a name="component-composition"></a>

### 51. 컴포넌트 합성 (Composition)

- **정의**: 크고 복잡한 컴포넌트를 상속(inheritance)이 아니라, 작고 재사용 가능한 컴포넌트들을 조합(compose)해서 만드는 리액트의 설계 원칙입니다. 리액트 공식 문서는 클래스 상속보다 합성을 명시적으로 권장합니다.
- **구현 방식**: 특정 위치에 임의의 JSX를 끼워 넣을 수 있게 해주는 `children` prop(또는 명명된 여러 개의 슬롯 prop)을 통해 구현됩니다. 예를 들어 `<Card title="제목"><Button /></Card>`에서 `Card`는 `Button`이 무엇인지 전혀 알 필요 없이, 자신에게 주어진 `children`을 렌더링 위치에 배치하기만 하면 됩니다.
- **가치**: 하위 컴포넌트(`Button`, `Card` 등)를 독립적으로 개발·테스트한 뒤, 상위 컴포넌트에서 이들을 조립하기만 하면 되므로 관심사가 분리되고 재사용성이 높아집니다.

---

<a name="usestate-hook"></a>

### 52. useState와 상태 훅

- **정의**: 함수형 컴포넌트가 렌더링 사이에 값을 기억(persist)하고, 그 값이 바뀔 때 리렌더링을 트리거할 수 있게 해주는 리액트 훅(Hook)입니다. `const [state, setState] = useState(초기값)` 형태로 사용하며, `setState` 호출은 즉시 반영되지 않고 다음 렌더링에서 새 값을 반영하도록 예약(schedule)하는 비동기적 동작입니다.
- **불변성 업데이트 규칙**: `setState`에 전달하는 새 값은 반드시 이전 값과 **다른 참조(reference)** 를 가진 새 객체/배열이어야 합니다. React는 `Object.is` 비교로 이전 상태와 새 상태의 참조가 같은지만 얕게 검사하므로, 배열에 `push`를 하거나 객체 프로퍼티를 직접 대입하는 식으로 원본을 변형(mutate)하면 참조가 그대로라 리렌더링이 트리거되지 않을 수 있습니다 ([불변성](#immutability) 참고). 스프레드 연산자(`{ ...prev, field: value }`, `[...prev, item]`)로 항상 새 객체/배열을 만들어 반환해야 합니다.
- **함수형 업데이트**: `setState(prev => 새값)`처럼 이전 상태를 인자로 받는 콜백 형태를 사용하면, 같은 렌더링 사이클 안에서 여러 번 상태를 갱신하거나 클로저에 갇힌 오래된(stale) 상태 값을 참조하는 버그를 피할 수 있습니다.

---

<a name="useeffect-dependency-array"></a>

### 53. useEffect 의존성 배열

- **정의**: `useEffect(효과함수, 의존성배열)`의 두 번째 인자로, 이 배열에 담긴 값들 중 하나라도 이전 렌더링과 달라졌을 때만 효과 함수를 다시 실행하도록 React에 지시하는 배열입니다.
- **세 가지 형태와 차이**:
  - 배열을 아예 생략하면, 컴포넌트가 리렌더링될 **때마다** 효과 함수가 실행됩니다.
  - 빈 배열(`[]`)을 넘기면, 컴포넌트가 처음 마운트(mount)될 때 **단 한 번만** 실행됩니다.
  - 특정 값을 담은 배열(`[userId]`)을 넘기면, `userId`가 이전 렌더링 값과 다를 때만 실행됩니다.
- **⚠️ 흔한 실수**: 효과 함수 본문에서 참조하는 모든 외부 값(props, state)을 의존성 배열에 빠짐없이 포함해야 합니다. 의존성을 누락하면 효과 함수가 클로저에 갇힌 오래된 값을 계속 참조하는 stale closure 버그가 발생합니다.

---

<a name="useeffect-cleanup"></a>

### 54. useEffect Cleanup 함수

- **정의**: `useEffect`의 효과 함수가 반환하는 함수로, 컴포넌트가 언마운트(unmount)되기 직전, 또는 의존성이 바뀌어 효과 함수가 **재실행되기 직전**에 호출되어 이전 effect가 만든 부수 효과(구독, 타이머, 이벤트 리스너 등)를 정리합니다.
- **실행 시점**: `useEffect(() => { const id = setInterval(tick, 1000); return () => clearInterval(id); }, [])`처럼 등록과 해제가 항상 쌍을 이루어야 메모리 누수나 좀비 타이머/리스너를 방지할 수 있습니다.
- **⚠️ 흔한 실수**: `addEventListener`에 넘긴 함수와 `removeEventListener`에 넘기는 함수가 **동일한 참조**여야 실제로 해제됩니다. 매번 새로운 익명 함수를 만들어 등록/해제에 각각 다른 참조를 넘기면, `removeEventListener`가 호출되어도 실제로는 아무 리스너도 해제되지 않는 버그가 발생합니다.

---

<a name="custom-hooks"></a>

### 55. 커스텀 훅 (Custom Hooks)

- **정의**: 이름이 `use`로 시작하는 평범한 자바스크립트 함수로, 여러 컴포넌트에 반복되는 "상태 + 그 상태를 다루는 로직"을 하나로 추출해 재사용할 수 있게 해줍니다. 내부에서 `useState`, `useEffect` 등 다른 훅을 자유롭게 호출할 수 있지만, 훅의 규칙(최상위에서만 호출, 조건문/반복문 내부에서 호출 금지)은 그대로 적용됩니다.
- **관심사의 분리**: 커스텀 훅을 사용하면 컴포넌트는 "무엇을 화면에 그릴지(UI)"에만 집중하고, "상태를 어떻게 관리할지(로직)"는 훅이 담당하도록 역할을 나눌 수 있습니다.
- **함수형 업데이트와 지연 초기화**: 커스텀 훅 안에서 상태를 갱신할 때도 `setState(prev => 새값)` 형태의 함수형 업데이트를 사용해야 연속 호출이 정확히 누적되며, 초기값 계산 비용이 크다면 `useState(() => 초기값계산())`처럼 지연 초기화를 사용해 최초 마운트 시 한 번만 계산되도록 해야 합니다.

---

<a name="context-api"></a>

### 56. Context API와 Provider

- **정의**: `createContext`로 만든 Context 객체는 트리 상위의 `<Context.Provider value={...}>`가 공급한 값을, 그 아래 어디서든 `useContext(Context)`로 구독할 수 있게 해줍니다. props를 컴포넌트 단계마다 일일이 전달하는 prop drilling 없이 값을 전파할 수 있는 것이 핵심 가치입니다.
- **Provider 가드 훅 패턴**: `useContext`로 읽은 값이 `undefined`라면(= Provider로 감싸지 않은 곳에서 훅을 호출한 것) 즉시 명확한 에러를 던지는 `useXxx` 형태의 래퍼 훅을 만들어 두면, "Provider 없이 훅만 가져다 쓰는" 실수를 런타임에서 바로 발견할 수 있습니다.

---

<a name="context-value-memoization"></a>

### 57. Context 값 메모이제이션과 리렌더링 전파

- **정의**: `Provider`의 `value`로 넘기는 객체/함수가 렌더링마다 새로운 참조로 생성되면, 그 안의 실제 데이터가 바뀌지 않았어도 Object.is 비교에서 "달라졌다"고 판단되어 이 Context를 구독하는 모든 컴포넌트가 리렌더링됩니다. `useMemo(() => ({ ...값 }), [의존값들])`와 `useCallback`으로 value의 참조를 안정시켜야 이런 낭비를 막을 수 있습니다.
- **React.memo와의 관계**: `React.memo`는 "부모가 리렌더링됐지만 이 컴포넌트에 전달된 props는 이전과 동일할 때"의 리렌더링만 건너뛰게 해줍니다. 컴포넌트가 `useContext`로 구독 중인 Context의 값이 바뀌면, `memo`로 감싸져 있어도 그 리렌더링은 막히지 않고 "punch through"됩니다. 따라서 Context 기반 상태에서 리렌더링을 줄이려면 (1) Provider의 value 메모이제이션과 (2) 소비 컴포넌트의 memo, 두 가지를 함께 고려해야 합니다.

---

<a name="zustand-store"></a>

### 58. Zustand와 외부 스토어 상태관리

- **정의**: Zustand는 `create<T>()((set, get) => ({ ...상태, ...액션 }))` 형태로 상태와 액션을 하나의 스토어로 묶는 경량 전역 상태 관리 라이브러리입니다. `set`은 `useState`의 세터처럼 부분 객체 또는 이전 상태를 인자로 받는 함수를 병합(merge)합니다.
- **Provider가 필요 없는 모듈 싱글턴**: Context API와 달리 Zustand 스토어는 트리를 `Provider`로 감쌀 필요가 없는 모듈 레벨 싱글턴입니다. 컴포넌트 안에서는 `useStore(selector)`로, 컴포넌트 바깥(일반 함수, 이벤트 리스너 등)에서는 `store.getState()`/`store.setState()`/`store.subscribe(listener)`로 동일한 상태를 읽고 쓰고 구독할 수 있습니다.
- **selector를 통한 부분 구독**: `useStore(state => state.count)`처럼 selector 함수를 넘기면 그 반환값만 구독하여, 스토어의 다른 필드가 바뀌어도 이 selector의 결과가 그대로면 리렌더링되지 않습니다. selector 없이 스토어 전체를 구독하면 이 최적화를 포기하는 것과 같습니다.

---

<a name="rtl-query-priority"></a>

### 59. React Testing Library 쿼리 우선순위

- **정의**: React Testing Library(RTL)는 컴포넌트의 내부 state나 구현 세부사항이 아니라, 사용자가 화면에서 인지할 수 있는 라벨/역할(role)/텍스트를 기준으로 요소를 찾도록(query) 유도합니다. `getByLabelText`, `getByRole`이 `getByTestId`보다 권장되는 이유는, 전자가 실제 사용자(스크린 리더 사용자 포함)가 요소를 인지하는 방식과 더 가깝기 때문입니다.
- **`getBy*` vs `queryBy*` vs `findBy*`**: `getBy*`는 요소를 찾지 못하면 즉시 예외를 던지므로 "요소가 반드시 있어야 함"을 검증할 때, `queryBy*`는 찾지 못하면 `null`을 반환하므로 "요소가 없어야 함"을 검증할 때, `findBy*`는 Promise를 반환하며 요소가 나타날 때까지 재시도하므로 비동기적으로 나타나는 요소를 기다릴 때 사용합니다.
- **`fireEvent`**: `fireEvent.change`/`fireEvent.click` 등은 실제 DOM 이벤트를 발생시켜, 컴포넌트에 연결된 `onChange`/`onClick` 핸들러를 실제로 트리거합니다.

---

<a name="race-condition-guard"></a>

### 60. 경쟁 상태(Race Condition)와 최신 요청 가드

- **정의**: 비동기 요청을 연달아 여러 번 보냈을 때, 먼저 보낸 요청의 응답이 나중에 보낸 요청의 응답보다 "늦게" 도착하는 상황을 말합니다. 이때 응답이 도착한 순서 그대로 상태를 덮어쓰면, 화면에는 가장 최근 입력과 무관한 오래된 결과가 표시되는 버그가 발생합니다.
- **해결 패턴**: 요청을 보낼 때마다 고유한 식별자(예: `useRef`로 관리하는 증가하는 카운터)를 함께 기록해두고, 응답이 도착했을 때 "이 응답의 식별자가 여전히 가장 최근에 보낸 요청의 식별자와 같은지"를 확인한 뒤에만 상태에 반영합니다. 같지 않다면(더 최신 요청이 이미 시작되었다면) 그 응답은 조용히 무시합니다.
- **useEffect Cleanup과의 관계**: 요청이 컴포넌트의 props/상태 변화에 의해 트리거되는 경우, `useEffect`의 정리(cleanup) 함수 안에서 "이전 effect가 시작한 요청은 더 이상 유효하지 않음"을 표시하는 플래그를 설정하는 것도 동일한 문제를 푸는 흔한 방법입니다 ([useEffect Cleanup 함수](#useeffect-cleanup) 참고).

---

<a name="reconciliation-diffing-heuristics"></a>

### 61. 재조정 알고리즘과 Diffing 휴리스틱 (Reconciliation Diffing Heuristics)

- **정의**: 두 트리를 완전 탐색으로 비교하면 O(n³) 비용이 들어 실용적이지 않습니다. React를 비롯한 대부분의 가상 DOM 구현체는 정확도를 일부 포기하는 대신 대부분의 실제 UI 갱신 패턴에서 충분히 빠른 O(n) 비교를 가능하게 하는 실용적인 휴리스틱(heuristic) 규칙을 채택합니다.
- **두 가지 핵심 휴리스틱**:
  1.  **같은 레벨(형제 노드)끼리만 비교한다**: 어떤 노드가 트리의 다른 레벨로 옮겨가면, 비교 알고리즘은 이를 "이동"으로 인식하지 못하고 항상 "삭제 후 재생성"으로 처리합니다.
  2.  **타입이 다른 두 엘리먼트는 하위 트리 전체를 다시 만든다**: `<div>`가 `<span>`으로 바뀌면, 두 태그의 자식이 우연히 비슷하더라도 diff 알고리즘은 내부를 들여다보지 않고 REPLACE(교체)로 처리합니다.
- **key의 역할**: 리스트 렌더링에서 각 항목에 안정적인 key를 부여하면, 인덱스 기반 비교의 한계(배열 맨 앞에 항목이 하나 삽입되면 그 뒤 모든 항목이 "값이 바뀐 것"으로 잘못 판정되는 문제)를 피하고, 실제로 이동/추가/삭제된 항목만 정확히 식별할 수 있습니다 ([가상 DOM](#virtual-dom) 참고).

---

<a name="hooks-array-state-model"></a>

### 62. 훅의 배열 기반 클로저 상태 모델 (Hooks as an Array of Closure State)

- **정의**: React는 컴포넌트(정확히는 Fiber) 하나당 훅 호출 결과들을 순서가 있는 자료구조(개념적으로는 배열, 실제 구현은 linked list에 가까움)에 저장합니다. `useState`, `useEffect` 등 각 훅 호출은 "몇 번째로 호출되었는가(호출 순서, index)"에 따라 자신의 슬롯을 찾아갑니다.
- **훅의 규칙(Rules of Hooks)과의 관계**: 조건문이나 반복문 안에서 훅을 호출하면 렌더링마다 호출 횟수나 순서가 달라질 수 있고, 그러면 두 번째 `useState` 호출이 렌더링에 따라 다른 슬롯(원래는 세 번째 훅의 값)을 가리키게 되는 심각한 버그가 생깁니다. "훅은 항상 컴포넌트 최상위에서, 항상 같은 순서로 호출해야 한다"는 규칙은 취향이 아니라 이 배열 인덱스 기반 저장 방식이 강제하는 필연적인 제약입니다.
- **클로저와의 관계**: 슬롯 배열 자체는 컴포넌트 인스턴스(Fiber)에 종속되어 렌더링 함수 호출 바깥에 존재하지만, 렌더링 함수 안에서 매번 새로 만들어지는 `setState` 같은 함수들은 클로저를 통해 "몇 번째 슬롯을 갱신해야 하는지"를 기억합니다 ([클로저](#closure) 참고).

---

<a name="react-memo-shallow-comparison"></a>

### 63. React.memo와 얕은 비교 (React.memo & Shallow Prop Comparison)

- **정의**: `React.memo(Component)`로 컴포넌트를 감싸면, 부모가 리렌더링되어도 새로 전달된 props가 이전 props와 얕은 비교(각 키를 `Object.is`로 비교) 결과 모두 동일할 때는 해당 컴포넌트의 리렌더링(함수 재실행) 자체를 건너뜁니다.
- **⚠️ 흔한 함정**: 얕은 비교이므로 객체/배열/함수 타입의 prop은 내용이 같아도 참조가 다르면 "달라졌다"고 판정됩니다. 부모 컴포넌트가 렌더링될 때마다 인라인으로 새 객체(`{ a: 1 }`)나 새 함수(`() => {...}`)를 만들어 prop으로 넘기면, `React.memo`로 감싸도 사실상 매번 리렌더링됩니다. 이 문제를 막으려면 부모 쪽에서 [useMemo와 useCallback](#usememo-usecallback)으로 참조를 안정시켜야 합니다.
- **리스트 렌더링에서의 활용**: 리스트의 각 항목에 서로 다른 콜백을 주고 싶다고 매번 `() => onSelect(item.id)`처럼 인라인 함수를 새로 만들면 memo가 무력화됩니다. 대신 자식 컴포넌트가 자신의 식별자(id/label)를 인자로 받아 부모의 안정적인 단일 콜백을 직접 호출하는 형태로 설계하면, 부모는 리스트 크기와 무관하게 단 하나의 안정적인 함수 참조만 전달하면 됩니다.

---

<a name="usememo-usecallback"></a>

### 64. useMemo와 useCallback (값과 함수의 메모이제이션)

- **정의**: 둘 다 "의존성 배열이 바뀌지 않는 한 이전 결과를 재사용한다"는 동일한 원리를 따르는 훅입니다. `useMemo(() => 계산(), [deps])`는 계산 결과 값을 캐싱하고, `useCallback(fn, [deps])`는 함수 자체의 참조를 캐싱합니다. 실제로 `useCallback(fn, deps)`는 `useMemo(() => fn, deps)`의 문법적 축약형과 동작이 같습니다.
- **두 가지 쓰임새**: (1) 계산 비용이 큰 값을 매 렌더링마다 다시 계산하지 않도록 캐싱하는 성능 최적화 목적, (2) 객체/배열/함수 타입의 값을 자식에게 props로 넘길 때 참조를 안정시켜 [React.memo](#react-memo-shallow-comparison)가 실제로 효과를 보게 만드는 목적. 실무에서는 후자의 목적으로 쓰이는 경우가 더 흔합니다.
- **⚠️ 흔한 함정**: 의존성 배열은 "값"이 아니라 "참조"를 기준으로 비교됩니다. 배열/객체 리터럴을 의존성으로 넣으면(`useMemo(() => ..., [{ id }])`) 매 렌더링마다 새 리터럴이 생성되어 항상 재계산되므로 캐싱 효과가 전혀 없습니다. 원시값(primitive)이거나, 상위에서 이미 안정화된 참조만 의존성 배열에 넣어야 의도한 대로 캐싱됩니다.

---

<a name="virtual-scrolling"></a>

### 65. 가상 스크롤 (Virtual Scrolling / List Virtualization)

- **정의**: 리스트의 전체 아이템 중, 스크롤 컨테이너(뷰포트)에 실제로 보이는 범위(+ 여유분인 overscan)에 해당하는 아이템만 DOM 노드로 그리고 나머지는 좌표 계산만으로 존재를 흉내 내는 렌더링 최적화 기법입니다. 수만 개 이상의 항목을 가진 리스트에서도 DOM 노드 개수를 일정하게 유지해 레이아웃/페인트 비용을 크게 줄입니다.
- **핵심 계산**: `scrollTop`(스크롤 위치)과 각 아이템의 높이를 바탕으로 "지금 그려야 할 인덱스 구간"을 구하고, 그리지 않은 앞/뒤 구간은 실제 아이템 대신 빈 여백(spacer) 요소로 채워 스크롤바의 전체 높이와 위치가 실제 전체 리스트를 그린 것과 동일하게 유지되도록 합니다.
- **고정 높이 vs 가변 높이**: 모든 아이템의 높이가 같다면 `인덱스 × 높이`로 위치를 즉시 계산할 수 있지만, 아이템마다 높이가 다르면(채팅 메시지, 카드 등) 각 아이템 높이를 앞에서부터 누적한 오프셋(prefix sum)을 기준으로 위치를 찾아야 합니다.
- **[가상 DOM](#virtual-dom)과의 차이**: 가상 DOM은 "실제 DOM과 비교해 변경분만 반영"하는 재조정(reconciliation) 기법이고, 가상 스크롤은 "보이지 않는 항목은 애초에 DOM으로 만들지 않는" 렌더링 범위 자체를 줄이는 기법입니다. 둘은 서로 다른 문제를 해결하며 함께 사용될 수 있습니다.

---

<a name="web-streams-readablestream"></a>

### 66. 웹 스트림 API와 ReadableStream (Web Streams API & ReadableStream)

- **정의**: `ReadableStream`은 데이터를 한 번에 전부 메모리에 올리지 않고, 도착하는 대로 작은 조각(청크)을 순차적으로 소비할 수 있게 해주는 HTML Living Standard의 표준 API입니다. `fetch`의 응답 본문(`response.body`)이 대표적인 `ReadableStream`이며, 대용량 다운로드나 실시간 데이터(스트리밍 LLM 응답 등)를 다룰 때 전체 데이터를 기다리지 않고 처리를 시작할 수 있게 해줍니다.
- **소비 패턴**: `stream.getReader()`로 reader를 얻은 뒤, `await reader.read()`를 반복 호출합니다. 각 호출은 `{ done, value }`를 반환하며, `done`이 `true`가 될 때까지 `value`에 담긴 청크를 순서대로 처리해야 합니다. 이는 배열을 한 번에 순회하는 것과 달리, 각 청크가 언제 도착할지 알 수 없는 비동기 소비 패턴입니다.
- **⚠️ 청크 경계 함정**: 스트림이 보내는 청크의 크기와 개수는 네트워크 상황에 따라 달라지며, "의미 있는 단위(한 줄, 한 메시지)"와 "물리적 청크"가 반드시 일치하지 않습니다. 하나의 논리적 메시지가 여러 청크로 쪼개지거나, 여러 메시지가 한 청크에 담겨 올 수 있으므로, 스트리밍 파서는 항상 버퍼에 도착한 데이터를 누적하고 완성된 단위만 골라내는 방식으로 설계해야 합니다.

---

<a name="sse-streaming"></a>

### 67. 서버 전송 이벤트와 스트리밍 UI 렌더링 (Server-Sent Events & Streaming UI)

- **정의**: SSE(Server-Sent Events)는 서버가 하나의 HTTP 연결을 유지한 채 `data: ...`로 시작하는 텍스트 이벤트를 순차적으로 계속 전송하는 프로토콜로, ChatGPT류의 LLM API가 토큰(delta) 단위로 응답을 스트리밍할 때 널리 사용됩니다. 클라이언트는 [ReadableStream](#web-streams-readablestream)으로 이 이벤트들을 조각조각 받아, 도착하는 대로 화면에 이어붙여 그립니다.
- **정상 종료와 비정상 종료의 구분**: 실무 스트리밍 클라이언트는 스트림이 끝나는 두 가지 경우를 구분해서 처리해야 합니다. (1) 서버가 명시적으로 완료 신호(예: `data: [DONE]`)를 보낸 뒤 연결이 끊기는 "정상 종료"와, (2) 완료 신호 없이 네트워크 문제 등으로 연결이 갑자기 끊기는 "비정상 종료(연결 끊김)"입니다. 후자를 정상 종료로 착각하면 응답이 잘렸는데도 사용자에게 완성된 답변인 것처럼 보여주는 버그가 생깁니다.
- **에러 이벤트의 별도 처리**: 스트림 도중 서버가 에러를 나타내는 이벤트(예: `data: {"error": "..."}`)를 보낼 수 있습니다. 이는 HTTP 상태 코드로 표현되는 요청 자체의 실패(예: 404, 500)와는 다른 층위의 에러로, 이미 시작된 스트림 안에서 발생하므로 별도로 파싱하고 감지해 사용자에게 알려야 합니다.

---

<a name="docker-layer-caching"></a>

### 68. Docker 멀티스테이지 빌드와 레이어 캐싱 (Docker Multi-stage Build & Layer Caching)

- **정의**: Docker 이미지는 Dockerfile의 각 지시어(`FROM`, `COPY`, `RUN` 등)마다 하나씩 쌓이는 읽기 전용 레이어로 구성됩니다. 이전 빌드와 비교해 특정 레이어의 입력(예: `COPY`하는 파일의 내용, `RUN` 명령 문자열)이 바뀌지 않았다면, Docker는 그 레이어를 다시 실행하지 않고 캐시된 결과를 그대로 재사용합니다.
- **레이어 순서와 캐싱 최적화**: 자주 바뀌지 않는 것(의존성 목록인 `package.json`/`package-lock.json`)을 자주 바뀌는 것(소스 코드 전체)보다 먼저 `COPY`해야, 소스 코드만 수정했을 때 의존성 설치(`RUN npm ci`) 레이어가 캐시에서 재사용되어 빌드 시간이 크게 줄어듭니다. 순서를 반대로 해 `COPY . .`을 먼저 하면, 파일 하나만 바꿔도 그 이후의 모든 레이어(의존성 설치 포함)가 캐시 무효화되어 매번 처음부터 다시 실행됩니다.
- **개발용 vs 프로덕션용 이미지**: 개발용 컨테이너는 소스 코드를 이미지 안에 굽는(bake) 대신 bind mount로 호스트 파일 시스템을 실시간 반영해 핫 리로드를 지원하는 것이 목적이고, 프로덕션 이미지는 필요한 파일만 최소한으로 담아 이미지 크기와 공격 표면(attack surface)을 줄이는 것이 목적입니다. 이 두 목적이 서로 다르기 때문에 실무에서는 멀티스테이지 빌드(`FROM ... AS base`, `FROM base AS dev`, `FROM base AS prod`처럼 여러 단계로 나누는 것)로 이미지를 분리하는 경우가 많습니다.

---

<a name="github-actions-cicd"></a>

### 69. GitHub Actions CI/CD 파이프라인 (GitHub Actions CI/CD Pipeline)

- **정의**: GitHub Actions는 저장소 이벤트(`push`, `pull_request` 등)를 트리거로 삼아, YAML로 정의한 워크플로우(workflow)를 GitHub가 제공하는 러너(runner) 가상 머신 위에서 자동 실행하는 CI/CD(지속적 통합/지속적 배포, Continuous Integration/Continuous Deployment) 도구입니다. 워크플로우는 하나 이상의 잡(job)으로 구성되고, 각 잡은 순서대로 실행되는 스텝(step)들의 목록입니다.
- **잡의 병렬성과 `needs` 의존관계**: 기본적으로 하나의 워크플로우 안 여러 잡은 병렬로 실행됩니다. 한 잡이 다른 잡의 성공을 전제로 해야 한다면(예: 테스트를 통과해야 빌드를 시작) `needs` 키로 명시적인 의존관계를 선언해 순차 실행을 강제해야 합니다. 이를 생략하면 테스트가 실패하는 동안에도 빌드/배포가 그대로 진행되는 사고로 이어집니다.
- **캐싱과 결정적 설치**: `actions/setup-node`의 `cache` 옵션과 `npm ci`(`package-lock.json`에 고정된 버전 그대로 설치하고, `npm install`과 달리 lock 파일을 갱신하지 않음)를 함께 쓰는 것이 CI 환경의 표준 패턴입니다. 로컬 개발용 `npm install`과 CI용 `npm ci`를 구분하지 못하면, CI에서만 재현되지 않는 의존성 버전 불일치 버그를 만날 수 있습니다.

---

<a name="pre-deployment-verification"></a>

### 70. 배포 전 검증: 환경 변수/헬스체크/아티팩트 무결성 (Pre-deployment Verification: Env Vars, Health Checks & Artifact Integrity)

- **정의**: 실제 배포(Vercel에 올리기, 컨테이너 오케스트레이터에 이미지를 배포하기)는 되돌리기 번거로운 작업이므로, 배포 파이프라인은 배포를 실행하기 직전에 여러 순수한 검증 단계를 거칩니다. 대표적으로 (1) 런타임에 필요한 환경 변수가 모두 채워져 있는지, (2) 방금 띄운 인스턴스가 실제로 요청을 처리할 준비가 되었는지(헬스체크), (3) 배포하려는 빌드 산출물이 빌드 시점에 만든 것과 정확히 일치하는지(아티팩트 무결성)를 검증합니다.
- **필수(critical) vs 비필수(non-critical) 헬스체크**: 헬스체크 항목이 하나라도 실패했다고 무조건 배포를 막으면 지나치게 보수적일 수 있습니다. 실무에서는 항목마다 "실패 시 배포를 막아야 하는 필수 항목"과 "실패해도 일단 배포는 진행하되 알림만 보내는 비필수 항목"을 구분합니다.
- **아티팩트 무결성과 체크섬**: 빌드 서버에서 만든 파일 목록과 각 파일의 체크섬(checksum)을 매니페스트(manifest)로 기록해 두고, 실제로 배포되는 파일들과 대조합니다. 파일이 빠졌거나(missing), 매니페스트에 없는 파일이 섞여 들어갔거나(unexpected), 내용이 달라졌는데 이름만 같은 경우(mismatched checksum)를 구분해 감지하면, "빌드는 성공했지만 실제로 배포된 건 다른 코드"라는 사고를 예방할 수 있습니다.


