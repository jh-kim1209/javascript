# Chapter 08: React 컴포넌트 Props 및 State 타이핑 (Props and State Typing)

## 📖 핵심 개념
React 컴포넌트 개발 시 Props와 State의 타입을 정확히 명시하는 것은 런타임 에러를 방지하고 컴포넌트 간 인터페이스를 명확히 하는 핵심 과정입니다.

*   **Props 타입 정의와 자식 컴포넌트 전달**:
    *   부모 컴포넌트가 자식 컴포넌트에게 데이터를 전달할 때 Props의 구조적 타입을 사전에 약속합니다. (예: `[용어 사전](../../../../GLOSSARY.md#component-props)` 참고)
    *   **Friendly_Tutor의 친절한 비유**: "전자 회로 기판의 규격에 맞는 핀(Props)을 구멍에 정확히 꽂아야만 전원(데이터)이 정상적으로 공급되는 것과 같습니다."
*   **any 타입 오남용과 런타임 장애**:
    *   **Senior_Practitioner의 실무 팁**: "컴포넌트의 Props 타입을 `any`로 대충 지정해 놓으면, 부모 컴포넌트가 필수 속성을 누락하여 넘겼을 때 자식 컴포넌트 내부 렌더링 도중 `Cannot read properties of null`과 같은 null pointer crash를 내는 흔한 장애가 발생합니다. 정적 타입 검사를 통해 필수 Props가 올바르게 주입되었는지 반드시 컴파일 타임에 검증해야 합니다."
*   **React.FC 제네릭 타이핑과 ReactNode vs ReactElement**:
    *   **PhD_Book_Author의 학술 스펙**: "`React.FC<P>`는 제네릭 파라미터 `P`를 전달받아 Props의 구조를 제어하는 함수형 컴포넌트의 인터페이스입니다. 이때 컴포넌트가 반환하는 타입이자 렌더링의 결과인 `ReactElement`는 가상 DOM 노드를 나타내는 단일 객체인 반면, `ReactNode`는 컴포넌트 반환뿐 아니라 일반 문자열, 숫자, null, 배열 등 React가 렌더링 가능한 모든 노드의 유니온 타입을 명세하고 있어 범위가 더 넓습니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `renderComponent<P>(component: FunctionComponent<P>, props: any): string`:
        - 컴포넌트 함수와 속성 객체 `props`를 받아 렌더링 결과로 생성된 모의 HTML 문자열을 반환합니다.
        - `component`는 `requiredProps` 배열 속성을 가질 수 있으며, 전달된 `props`에 해당 필수 속성이 누락되었거나 `null/undefined`이면 에러(`Missing required prop: [propName]`)를 던져야 합니다.
        - `component`는 `defaultProps` 객체 속성을 가질 수 있으며, 전달된 `props`에 해당 속성이 없는 경우 `defaultProps`의 값을 기본값으로 병합해야 합니다.

## 💡 힌트 및 트러블슈팅
*   `Object.assign`이나 스프레드 연산자(`...`)로 `defaultProps`와 `props`를 병합하세요. 그 후 `requiredProps` 배열의 요소들이 병합된 객체에 존재하는지(`undefined` 또는 `null`이 아닌지) 순회하며 체크한 뒤 component를 호출하여 렌더링 결과를 문자열로 받아 반환합니다.
