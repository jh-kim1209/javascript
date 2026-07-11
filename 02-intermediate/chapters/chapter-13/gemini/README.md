# Chapter 13: Zustand 라이브러리를 이용한 Flux 아키텍처 전역 상태 관리 (Zustand State Management)

## 📖 핵심 개념
Zustand는 가볍고 직관적인 클로저 기반의 상태 관리 라이브러리로, 단방향 데이터 흐름을 기반으로 하는 Flux 아키텍처를 따르며 React 컴포넌트에 전역 상태를 안전하게 결합시킵니다.

*   **Flux 아키텍처와 Zustand**:
    *   중앙 집중식 단일 스토어(Store)를 구축하고, 상태를 직접 변경하는 대신 명시적인 업데이트 함수(Actions)를 호출하여 상태를 예측 가능하게 변경합니다. (예: `[용어 사전](../../../../GLOSSARY.md#zustand-store)` 참고)
    *   **Friendly_Tutor의 친절한 비유**: "인형뽑기 방에서 무작정 상자 전체를 뒤집어 엎는 대신, 내가 원하는 인형(특정 상태)만 집게(셀렉터)로 정확하게 찝어 올리고, 중앙 물류센터(스토어)는 상품을 안전하게 포장하여 배송해 주는 것과 같습니다."
*   **셀렉터 바인딩 누락으로 인한 불필요한 리렌더링**:
    *   **Senior_Practitioner의 실무 팁**: "Zustand의 `useStore()` 훅을 사용할 때 셀렉터 함수 없이 전체 스토어 상태를 `const store = useStore()`처럼 그대로 가져오는 실수를 주의하십시오. 이렇게 사용하면 컴포넌트가 사용하지도 않는 스토어 내의 무관한 다른 상태 값이 바뀔 때마다, 컴포넌트 전체가 매번 강제 리렌더링을 겪으며 화면이 버벅이게 됩니다. 성능을 보호하기 위해 반드시 `const count = useStore(state => state.count)` 형태로 필요한 상태만 선별하여(Selector binding) 구독해야 합니다." (예: `[용어 사전](../../../../GLOSSARY.md#zustand-store)` 참고)
*   **useSyncExternalStore와 클로저 기반 스토어**:
    *   **PhD_Book_Author의 학술 스펙**: "Zustand의 코어는 React 프레임워크 바깥에 존재하는 순수 자바스크립트 클로저(Closure) 형태의 외부 상태 저장소(External Store)입니다. React 컴포넌트는 React 18에 도입된 `useSyncExternalStore` 훅을 매개체로 삼아 스토어에 이벤트 리스너를 구독(`subscribe`)합니다. 스토어가 업데이트되면 `Object.is` 비교를 수행해 선택된 상태가 변경되었을 때만 컴포넌트에 스케줄링 리렌더링을 요청합니다. 이 방식을 통해 React의 Concurrent 렌더링 모드에서도 상태 비동기 불일치(Tearing) 현상 없이 일관된 상태 동기화를 보장합니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `createMiniZustandStore<T extends object>(initialState: T)`:
        - Zustand 스토어의 핵심 메커니즘을 시뮬레이션하는 스토어 인스턴스를 반환합니다.
        - 스토어 인스턴스는 아래와 같은 인터페이스를 만족해야 합니다:
          - `getState(): T`: 현재 스토어의 상태 전체를 반환합니다.
          - `setState(nextStateOrUpdater: Partial<T> | ((state: T) => Partial<T>)): void`: 스토어 상태를 부분 갱신(Shallow merge)합니다. 객체 리터럴 혹은 이전 상태를 인자로 받아 부분 객체를 반환하는 함수 형태를 모두 수용해야 합니다. 상태가 변경되면 등록된 모든 순수 리스너 및 셀렉터 기반 리스너들을 검사하여 알림을 보냅니다.
          - `subscribe(listener: () => void): () => void`: 스토어 상태가 변경되었을 때 실행할 리스너를 등록하고, 구독을 해제(Unsubscribe)할 수 있는 클린업 함수를 반환합니다.
          - `useStore<U>(selector: (state: T) => U, onRender: () => void): U`: 셀렉터 기반 훅을 시뮬레이션합니다. 렌더링 시점에 해당하는 셀렉터 및 `onRender` 콜백을 구독합니다. `setState`로 상태 변경 발생 시, 셀렉터가 반환한 값의 변화(`===` 일치 연산자 비교)가 감지된 경우에만 `onRender` 콜백을 트리거하여 선택적 리렌더링을 수행합니다.
          - `clearSubscriptions(): void`: 등록된 모든 구독 및 셀렉터 정보를 초기화합니다.

## 💡 힌트 및 트러블슈팅
*   스토어 내부에 현재 `state` 객체와 `listeners: Set<() => void>`, 그리고 셀렉터 구독 정보(`subscriptions: Set<{ selector, lastSelectedValue, onRender }>`)를 유지하여 관리하세요.
*   `setState`를 실행할 때 함수형 업데이트 여부를 판별하여 상태를 변경하고, 변경된 상태를 기준으로 개별 `subscriptions`에 저장된 `lastSelectedValue`와 새롭게 평가된 값이 다를 경우에만 `onRender()`를 트리거하여 업데이트 성능 한계를 예방하도록 설계하세요.
