# Chapter 14: Jest와 React Testing Library를 이용한 컴포넌트 단위 테스트 (Component Testing with Jest and RTL)

## 📖 핵심 개념
React Testing Library(RTL)는 컴포넌트의 내부 구현 디테일 대신, 실제 사용자가 애플리케이션을 사용하는 관점(인터랙션 및 DOM 결과물)에서 컴포넌트를 테스트하도록 권장하는 도구입니다.

*   **컴포넌트 단위 테스트와 사용자 인터랙션**:
    *   RTL은 실제 브라우저의 DOM 구조와 유사하게 만들어진 가상 DOM(JSDOM 등) 환경 위에서 이벤트를 발생시키고 렌더링 결과를 단언(Assertion) 검증합니다. (예: `[용어 사전](../../../../GLOSSARY.md#virtual-dom)` 참고)
    *   **Friendly_Tutor의 친절한 비유**: "가상 인형(모의 DOM 컴포넌트)을 조립한 뒤, 손가락으로 직접 눈/코(특정 버튼이나 입력란)를 꾹 누르고(클릭) 실제로 알람이 제대로 울리는지 귀로 들어(Handler 호출) 검사하는 것과 같습니다."
*   **비동기 데이터 렌더링 쿼리 사용 실수**:
    *   **Senior_Practitioner의 실무 팁**: "네트워크 API 요청 후 렌더링되는 요소나 지연 렌더링되는 UI를 테스트할 때, `getByRole`이나 `getByText` 같은 동기식 쿼리를 즉시 실행해 조회하는 실수를 피하십시오. 지연되는 엘리먼트를 동기식 쿼리로 조회하면 DOM에 아직 그려지지 않아 즉시 에러가 던져지고 테스트가 깨집니다. 비동기 데이터를 다룰 때는 반드시 `findBy...` 계열 쿼리를 사용하거나 `waitFor` 가드로 감싸 요소가 나타날 때까지 대기(Timeout) 스케줄링을 걸어 주어야 합니다." (예: `[용어 사전](../../../../GLOSSARY.md#rtl-query-priority)` 참고)
*   **DOM 쿼리 우선순위와 가상 이벤트 루프**:
    *   **PhD_Book_Author의 학술 스펙**: "RTL은 접근성(Accessibility) 표준을 준수하여 쿼리 우선순위(Query Priorities)를 엄격히 지정합니다. 가장 권장되는 `getByRole`은 스크린 리더가 DOM 트리를 스캔할 때 사용하는 무접근성 트리(Accessibility Tree)를 모방하여 조회합니다. 또한 `fireEvent` 또는 `userEvent`를 통해 가상 이벤트를 전송할 때 JSDOM은 내부적으로 브라우저의 UI 이벤트 사양을 충족하는 `dispatchEvent` API를 호출하고 마이크로태스크 큐(Microtask Queue)와 이벤트 루프를 동기적으로 흘려 보내 리스너를 실행시킵니다. 따라서 비동기 업데이트 완료를 단언하기 위해서는 테스트 환경의 이벤트 루프가 틱(Tick)을 모두 소화할 수 있도록 프로미스 체인을 플러시(Flush)해야 합니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `mockClickAndVerify(element: HTMLElement, handler: jest.Mock): void`:
        - 가상 DOM 환경(JSDOM)에서 특정 HTML 엘리먼트에 마우스 클릭 이벤트를 강제로 발생시키고, 연결된 핸들러가 올바르게 실행되었는지 Jest 단언으로 검증하는 헬퍼 함수입니다.
        - 매개변수로 전달받은 `element`에 `MouseEvent("click", { bubbles: true })`를 직접 디스패치(Dispatch)하여 브라우저 버블링 이벤트를 시뮬레이션해야 합니다.
        - Jest의 전역 `expect` 단언문을 활용해 `handler` 모의 함수가 최소 1회 이상 정상 호출되었는지 여부를 확인하는 코드를 포함해야 합니다.

## 💡 힌트 및 트러블슈팅
*   HTML5 표준 `MouseEvent` 생성자를 사용하여 `'click'` 이벤트를 생성하고 `element.dispatchEvent(event)`를 실행하세요.
*   Jest 전역 단언인 `expect(handler).toHaveBeenCalled()`를 사용하여 모킹된 함수가 이벤트의 결과로 트리거되었음을 검증해야 합니다. 이 테스트는 JSDOM 환경(`@jest-environment jsdom`)에서 올바르게 구동됩니다.
