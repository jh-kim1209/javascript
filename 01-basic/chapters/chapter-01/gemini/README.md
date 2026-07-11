# Chapter 01: 변수와 스코프 (Variables and Scope)

## 📖 핵심 개념
자바스크립트에서 값을 저장하는 변수의 선언 방식과 해당 변수가 유효성을 가지는 물리적 범위를 이해합니다.

*   **블록 스코프 vs 함수 스코프**:
    *   블록 스코프는 중괄호 `{}` 내부에서만 변수가 유효하도록 제한하는 범위 규칙입니다. (예: [용어 사전](../../../../GLOSSARY.md#block-vs-function-scope) 참고)
    *   **Friendly_Tutor의 친절한 비유**: "var 변수는 방 전체를 공유하는 개방형 거실 같지만, let과 const 변수는 자물쇠가 달린 개인 서랍장이나 안전 금고와 같습니다. 각 방(블록)을 닫으면 밖에서는 안을 들여다볼 수 없죠."
*   **let, const, var**:
    *   var는 함수 레벨 스코프를 가지며 호이스팅 시 undefined로 초기화됩니다. let과 const는 블록 레벨 스코프를 가지며, 초기화 전 접근 시 TDZ(임시 사각지대)에 의해 ReferenceError를 발생시킵니다.
    *   **Senior_Practitioner의 실무 팁**: "과거 var 변수의 블록 레벨 격리 부재로 인해 for 루프 내 비동기 콜백이나 이벤트 리스너에서 루프 변수 값이 누출 및 상위 스코프 변수가 오염되어 의도치 않은 상위 루프의 최종 값만 출력되는 실무 장애 사례가 빈번했습니다. 새로운 코드에서는 반드시 let과 const를 사용해 이러한 오염을 원천 차단하십시오."
*   **실행 컨텍스트와 환경 레코드**:
    *   **PhD_Book_Author의 학술 스펙**: "ECMAScript 명세에 따르면, 실행 컨텍스트(Execution Context)가 생성될 때 식별자 정보는 환경 레코드(Environment Record)에 바인딩됩니다. var 변수는 인스턴스화 단계에서 식별자 등록과 동시에 undefined로 초기화되지만, let과 const는 식별자는 등록(호이스팅)되되 선언 위치에 도달할 때까지 초기화 단계를 건너뜁니다. 이 초기화되지 않은 상태의 메모리 참조 기간을 임시 사각지대(TDZ)라고 부르며, 명세상 ReferenceError를 유도하도록 설계되어 있습니다. ([용어 사전](../../../../GLOSSARY.md#hoisting) 및 [임시 사각지대](../../../../GLOSSARY.md#temporal-dead-zone---tdz) 참고)"

## 🧪 실습 미션
*   **미션 파일**: `mission.js`
*   **요구 사항**:
    1.  `testScope()`: 블록 내외 let 변수의 스코프 격리 동작 결과 어레이 반환
        - 외부 블록에서 선언한 `value = 'outer'`와 내부 블록에서 선언한 `value = 'inner'`가 서로 격리되어 오염되지 않음을 검증합니다.
        - 두 값을 배열 `['outer', 'inner']` 형태로 반환합니다.
    2.  `testConstReassignment()`: const 변수의 재할당 시도 시 발생하는 TypeError 예외 처리
        - const 변수에 재할당을 시도할 때 발생하는 에러를 catch하여 `'reassignment_error'`를 반환하고, 예외가 없으면 `'success'`를 반환합니다.

## 💡 힌트 및 트러블슈팅
*   `testConstReassignment`에서 `const` 변수에 값을 직접 재할당하는 코드는 구문 에러가 아닌 런타임 에러(`TypeError: Assignment to constant variable.`)를 발생시킵니다. 따라서 이 재할당 코드를 try 블록 내부에 작성하고 catch문에서 에러를 잡아 `'reassignment_error'`를 반환하도록 유도하십시오.
