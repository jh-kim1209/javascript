# Chapter 12: React Context API를 통한 상태 전파 및 리렌더링 최적화 한계 (React Context and Optimization Limits)

## 📖 핵심 개념
React의 Context API는 컴포넌트 트리 상에서 명시적인 Props 전달(Props Drilling) 없이도 하위 트리의 모든 컴포넌트에 전역적인 상태 값을 공유하고 전파할 수 있게 해줍니다.

*   **Context API와 상태 전파**:
    *   `Provider`에 주입된 `value`가 변경되면, 해당 컨텍스트를 구독(Consume)하고 있는 모든 하위 컴포넌트들은 상위 컴포넌트가 메모이제이션(`React.memo`)되어 있더라도 무조건 강제로 리렌더링을 겪으며 상태를 갱신합니다. (예: `[용어 사전](../../../../GLOSSARY.md#context-value-memoization)` 참고)
    *   **Friendly_Tutor의 친절한 비유**: "온 학교 교실에 울려 퍼지는 '전교생 확성기 방송 송출기'와 같습니다. 3층 특정 교실의 한 학생에게만 알림을 주고 싶은데, 방송을 틀면 전교실의 모든 학생이 고개를 들어 주의를 환기(리렌더링)해야 하는 비효율이 발생합니다."
*   **인라인 객체 생성으로 인한 리렌더링 성능 결함**:
    *   **Senior_Practitioner의 실무 팁**: "`Provider`에 전달할 value 값을 `<MyContext.Provider value={{ state, dispatch }}>`처럼 렌더링 시점에 인라인 객체로 생성해 전달하는 실수를 경계해야 합니다. 이렇게 작성하면 객체의 속성 값들이 이전과 완전히 동일할지라도, 부모가 렌더링될 때마다 새로운 객체 참조가 생성(`Object.is(oldVal, newVal) === false`)됩니다. 결국 이 컨텍스트를 구독하는 모든 하위 컴포넌트들이 불필요하게 매번 전수 리렌더링되는 심각한 성능 부하를 초래합니다. 반드시 `useMemo`를 사용해 객체 참조를 고정해야 합니다." (예: `[용어 사전](../../../../GLOSSARY.md#context-value-memoization)` 참고)
*   **Context.Provider [[Update]] 전파와 트리 비교 메커니즘**:
    *   **PhD_Book_Author의 학술 스펙**: "React Fiber 조정기(Reconciler)는 `Context.Provider`가 새로운 값을 받으면 내부 `updateQueue`를 검사하고, 이전 값과 새 값을 `Object.is`로 엄격하게 비교합니다. 일치하지 않는 경우, 해당 Provider의 하위 자식 노드를 순회하며 `useContext` 또는 `Context.Consumer`를 사용하는 모든 Fiber를 찾고 이들에게 강제로 `ForceUpdate` 플래그를 할당합니다. 이 과정은 리액트의 기본 렌더링 차단 스케줄링 과정에서 우회 불가한 동기식 순회 연산이므로, 거대한 트리에서 상태 트래픽이 잦을 경우 렌더 파이프라인 병목의 주원인이 됩니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `simulateContextNotification(listeners: ContextListener[], oldVal: any, newVal: any): boolean`:
        - 컨텍스트 업데이트를 감지하여 하위 구독자 컴포넌트(Listeners)들의 렌더링을 트리거하는 시뮬레이터 함수입니다.
        - 이전 값 `oldVal`과 새 값 `newVal`을 `Object.is()` 알고리즘을 이용해 엄격하게 얕은 비교를 수행합니다.
        - 두 참조가 다를 경우(`false`), 등록된 모든 리스너(`listeners` 배열)의 `onRender()` 콜백을 호출하여 렌더링 전파를 모의하고 `true`를 반환합니다.
        - 두 참조가 동일할 경우(`true`), 변경 사항이 전파되지 않도록 차단하고 `onRender()`를 호출하지 않은 채 `false`를 반환합니다.
    2.  `ContextListener` 인터페이스 규격:
        - `id`: 리스너 컴포넌트의 고유 식별자 (string)
        - `onRender`: 리렌더링이 발생했을 때 호출되어야 하는 모의 렌더 콜백 함수 (() => void)

## 💡 힌트 및 트러블슈팅
*   자바스크립트의 `Object.is(oldVal, newVal)`를 직접 활용하여 엄격 비교를 처리하세요.
*   인라인 객체 `value={{ a: 1 }}`는 구조적으로 같더라도 참조가 달라 `Object.is()` 결과가 `false`가 됩니다. 실습을 통해 메모이제이션의 유무가 업데이트 전파 차단에 어떤 영향을 미치는지 확인하세요.
