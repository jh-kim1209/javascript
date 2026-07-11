# Chapter 07: React 가상 DOM의 실체와 빌드 시스템 이해 (Virtual DOM and Build System)

## 📖 핵심 개념
React의 JSX 문법은 브라우저가 직접 해석할 수 없는 확장 문법입니다. 빌드 도구는 이를 일반 JavaScript 객체를 생성하는 함수 호출로 컴파일하며, 이 객체들의 트리가 바로 가상 DOM입니다.

*   **JSX와 가상 DOM**:
    *   JSX로 작성된 코드는 빌드 시점에 JavaScript 객체 트리(Virtual DOM)로 자동 변환되어 메모리상에서 관리됩니다. (예: `[용어 사전](../../../../GLOSSARY.md#virtual-dom)` 참고)
    *   **Friendly_Tutor의 친절한 비유**: "도면(JSX)을 보고 목수가 조립하고 가공하기 쉬운 가구 부품 조립 리스트(가상 노드 객체)로 자동 재포장하는 과정과 같습니다."
*   **Vite와 JSX 트랜스파일링**:
    *   현대적인 React 빌드 환경에서는 Vite(esbuild 기반)나 Babel 컴파일러가 JSX 코드를 `React.createElement(...)` 또는 `jsx(...)` 함수 호출 코드로 변환(Transpile)합니다.
    *   **Senior_Practitioner의 실무 팁**: "JSX가 내부적으로 함수 호출로 치환되는 구조를 모르면, JSX를 사용하는 파일 스코프 내에 필요한 React 바인딩이나 jsx-runtime이 누락되어 런타임에 `ReferenceError`를 내며 서비스가 폭발하게 됩니다. 빌드 타겟과 번들러 설정을 명확히 파악하고 있어야 이러한 트랜스파일링 에러를 예방할 수 있습니다."
*   **React.createElement 명세**:
    *   **PhD_Book_Author의 학술 스펙**: "React.createElement(type, props, ...children) 함수는 전달받은 인자를 파싱하여 불변 객체인 `ReactElement` 구조로 재구성합니다. 실제 React에서는 중첩 배열을 깊게 평탄화하거나 원시값을 문자열로 강제 변환하지 않고 단순히 rest 인자를 모으기만 하지만, **이 미션에서 구현할 단순화 모델**에서는 `props` 객체를 얕은 복사하고 가변 인자 `children`을 `props.children` 배열로 깊게 평탄화(Flat)하여 가상 DOM 노드 트리를 구축하는 방식으로 모사(Simulation)합니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `createVirtualElement(type: string, props: object | null, ...children: any[]): VirtualNode`:
        - HTML 태그 종류인 `type`과 속성 객체 `props`를 받아 가상 DOM 노드를 반환합니다.
        - `props`가 `null`인 경우 빈 객체(`{}`)로 취급하여 처리합니다.
        - 가변 인자로 전달받은 `children`은 `props.children` 배열 속성에 추가되어야 합니다.
        - `children` 내부의 배열 구조는 평탄화(Flat)하여 1차원 배열로 병합되어야 합니다.
        - 자식 노드가 객체(VirtualNode)가 아닌 경우, 문자열로 변환하여 저장해야 합니다.

## 💡 힌트 및 트러블슈팅
*   자식 노드들을 처리할 때 `Array.prototype.flat()`과 `Array.prototype.map()`을 조합하여 객체 타입이 아닌 원시값 자식들을 `String(child)` 형태로 변환하세요. 원본 `props` 객체를 오염시키지 않도록 새 객체로 복사하여 `children`을 삽입해야 합니다.
