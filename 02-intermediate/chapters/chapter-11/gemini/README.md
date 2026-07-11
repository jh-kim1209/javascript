# Chapter 11: React 커스텀 훅(Custom Hooks) 설계 및 로직 재사용 (React Custom Hooks)

## 📖 핵심 개념
React 컴포넌트 내의 상태 관리와 부수 효과(Effect) 로직을 일반 자바스크립트 함수로 추출하여 다른 컴포넌트에서도 안전하게 재사용할 수 있도록 모듈화한 것을 커스텀 훅(Custom Hook)이라고 합니다.

*   **커스텀 훅과 로직 재사용**:
    *   커스텀 훅은 이름이 `use`로 시작하는 평범한 자바스크립트 함수입니다. 내부에서 React의 기본 훅들(`useState`, `useEffect` 등)을 호출할 수 있어, UI 구성과 무관한 순수 로직 및 상태 흐름을 컴포넌트 외부로 분리하는 데 사용됩니다. (예: `[용어 사전](../../../../GLOSSARY.md#custom-hooks)` 참고)
    *   **Friendly_Tutor의 친절한 비유**: "콘센트에 꽂기만 하면 어떤 가전제품이든 전원을 공급받아 작동하듯이, 공통 로직을 담은 '플러그인 어댑터'를 만들어 원하는 컴포넌트에 꽂아 쓰는 것과 같습니다."
*   **리액트 훅의 규칙(Rules of Hooks)과 오작동**:
    *   **Senior_Practitioner의 실무 팁**: "커스텀 훅을 호출할 때 런타임 분기 제어문(`if`)이나 반복문(`for`), 중첩 함수 내부에서 조건부로 호출해서는 안 됩니다. 렌더링에 따라 훅의 호출 순서가 달라지면 React가 이전에 저장했던 상태를 엉뚱한 훅의 상태로 덮어쓰거나 매칭하지 못해 애플리케이션의 상태가 꼬이고 오작동하는 크리티컬한 버그를 유발합니다."
*   **Hook 연결 리스트(Linked List)와 렌더링 컨텍스트**:
    *   **PhD_Book_Author의 학술 스펙**: "React Fiber 아키텍처는 개별 컴포넌트의 훅 상태 데이터를 Fiber 노드의 `memoizedState` 필드에 단방향 연결 리스트(Single Linked List) 형태로 저장합니다. 렌더링 시 훅이 호출될 때마다 React는 내부 포인터(`workInProgressHook`)를 한 칸씩 이동하며 연결 리스트의 각 노드를 순차적으로 매칭합니다. 따라서 매 렌더링 시 훅이 호출되는 횟수와 절대적인 순서가 동일해야만 이전 렌더링 상태를 정상적으로 복구할 수 있으며, 이 순서가 틀어질 경우 React 런타임 엔진은 예외를 던지거나 엉뚱한 오프셋 메모리를 참조합니다." (참고: `[용어 사전](../../../../GLOSSARY.md#hooks-array-state-model)`)

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `createCustomHookSimulator(initialValue?: any)`:
        - 컴포넌트 내부에서 훅들이 순차적으로 실행되는 흐름을 추적하고 모의(Mocking)하는 시뮬레이터를 생성합니다.
        - 시뮬레이터 객체는 아래와 같은 인터페이스 메서드를 제공해야 합니다:
          - `render(renderFn: () => void): void`: 컴포넌트의 렌더링을 시뮬레이션합니다. 호출 시 내부 훅 인덱스를 0으로 초기화한 뒤 `renderFn`을 실행합니다. 렌더링이 완료된 후 이전 렌더링 시점과 훅의 호출 개수(순서)가 달라졌다면 `"Rules of Hooks Violation"` 메시지를 포함한 에러(`Error`)를 던져 규칙 위반을 감지해야 합니다.
          - `useState<T>(initialState: T): [T, (update: T | ((prev: T) => T)) => void]`: 시뮬레이터 내부에서 호출 가능한 상태 훅입니다. 내부 인덱스 기반 배열에 상태를 누적/매칭하며, 상태 업데이트 함수(Setter)는 해당 인덱스의 상태 값을 갱신(함수형 업데이트 지원)할 수 있어야 합니다. 만약 인자 `initialState`가 제공되지 않는다면 시뮬레이터 생성 시 전달받은 `initialValue`를 기본값으로 사용합니다.
          - `getHookStates(): any[]`: 현재까지 시뮬레이터에 등록되어 저장된 모든 훅의 상태 배열의 복사본을 반환합니다.

## 💡 힌트 및 트러블슈팅
*   시뮬레이터 내부에 상태 배열(`hookStates: any[]`), 현재 렌더링 시의 훅 인덱스 포인터(`currentIndex: number`), 그리고 직전 렌더링 시 실행되었던 총 훅 개수(`expectedHookCount: number | null`)를 두어 관리하세요.
*   `render` 함수 실행 시 `currentIndex`를 0으로 리셋하고 `renderFn()`을 호출하여 내부 훅들이 차례대로 시뮬레이터의 `useState`를 호출하도록 합니다.
*   `renderFn()` 완료 시점의 `currentIndex`와 `expectedHookCount`를 비교하여 다를 경우 규칙 위반 에러를 발생시키고, 정상 완료 시 `expectedHookCount = currentIndex`로 동기화합니다.
