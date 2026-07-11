# Chapter 10: useEffect 생명주기와 부수 효과 제어 (useEffect and Side Effects)

## 📖 핵심 개념
React 컴포넌트 내부에서 발생하는 외부 시스템과의 연동(부수 효과, Side Effects)은 `useEffect` 훅을 통해 컴포넌트 생명주기와 결합하여 동기화 및 생명주기를 제어합니다.

*   **의존성 배열과 부수 효과**:
    *   `useEffect`는 컴포넌트 렌더링 이후 외부 API 호출, 이벤트 구독 등의 비동기 작업이나 부수 효과를 안전하게 수행할 수 있는 영역을 제공하며, 의존성 배열(Dependency Array)의 변화에 따라 실행 타이밍을 조절합니다. (예: `[용어 사전](../../../../GLOSSARY.md#useeffect-dependency-array)` 참고)
    *   **Friendly_Tutor의 친절한 비유**: "마트에 들어갈 때 알람벨을 켜두고(Effect), 쇼핑이 끝나 마트를 나갈 때는 반드시 알람을 끄는(Cleanup) 것과 같습니다. 나갈 때 끄지 않으면 마트 밖에 나와서도 알람이 계속 울려 곤란해집니다."
*   **Cleanup 함수 누락과 메모리 누수(Memory Leak)**:
    *   **Senior_Practitioner의 실무 팁**: "`useEffect` 내부에서 등록한 글로벌 이벤트 리스너(`addEventListener`)나 타이머(`setInterval`)에 대해 cleanup(정리) 반환 함수를 생략하는 치명적인 실수를 방지해야 합니다. Cleanup을 생략하면 컴포넌트가 마운트/언마운트될 때마다 메모리상에 이벤트 핸들러가 계속 중복 누적되어 브라우저가 느려지다가 결국 크래시(Memory Leak)를 일으킵니다."
*   **React Fiber 아키텍처와 Hook 배치**:
    *   **PhD_Book_Author의 학술 스펙**: "React Fiber 아키텍처는 가상 DOM 트리 노드에 연결 리스트(Linked List) 형태로 Hook 객체들을 순차적으로 보관합니다. `useEffect`가 실행되면 React는 Effect 객체를 생성하여 Fiber의 `updateQueue`에 배치하며, 렌더링 파이프라인의 커밋(Commit) 단계 이후 브라우저가 화면을 그리는 페인트(Paint) 작업 완료 후 비동기적으로 이펙트를 호출합니다. 이때 이전 렌더링 시 보관한 의존성 배열 값들과 현재 값을 얕은 비교(`Object.is`)하여 변경이 감지된 경우에만 이전 이펙트의 cleanup을 선행 호출한 뒤 새로운 이펙트를 트리거합니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `simulateEffect(depArray: any[], effectFn: () => (() => void) | void): void`:
        - 의존성 배열 `depArray` 값들의 변화(이전 의존성 배열과의 `Object.is` 얕은 비교)를 감지하여 `effectFn`을 조건부 실행하는 엔진 시뮬레이터 함수입니다.
        - 첫 번째 실행(마운트) 시에는 무조건 `effectFn`을 실행해야 합니다.
        - 의존성 배열 값 중 하나라도 변경(`Object.is` 결과가 `false`)되었을 경우, 기존에 반환된 cleanup 함수(만약 존재한다면)를 먼저 실행한 뒤 `effectFn`을 다시 실행해야 합니다.
        - 의존성 배열의 값들이 이전과 완전히 동일하다면, `effectFn`의 실행과 cleanup 실행 모두를 건너뛰어야(Skip) 합니다.
    2.  시뮬레이션 검증 및 리셋을 돕기 위해 아래의 보조 함수를 구현하고 제공해야 합니다.
        - `resetSimulator(): void` (이전 의존성 배열 정보, 누적 실행 횟수 등을 모두 초기화)
        - `getSimulatorStats(): { effectCount: number; cleanupCount: number }` (이펙트 및 클린업이 각각 몇 번 호출되었는지 통계 반환)
        - `triggerUnmount(): void` (컴포넌트 언마운트를 모사하여, 보관 중인 cleanup 함수가 있다면 이를 호출하고 상태 정리)

## 💡 힌트 및 트러블슈팅
*   모듈 수준의 전역 변수(또는 simulator 내부 스코프 변수)를 사용하여 이전 의존성 배열(`prevDeps`), 등록된 클린업 함수(`cleanupFn`), 그리고 실행 통계 데이터를 관리하세요. 의존성 배열 비교 루프 내에서 `Object.is()`를 적용해 변경점을 정밀하게 확인해야 합니다.
