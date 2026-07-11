# Chapter 13: 복사 패러다임과 불변성 (Copying Paradigms and Immutability)

## 📖 핵심 개념

자바스크립트에서 데이터의 불변성(Immutability)을 지키며 객체를 안전하게 조작하기 위해 활용되는 **얕은 복사(Shallow Copy)**와 **깊은 복사(Deep Copy)**의 메커니즘 차이를 완벽히 학습합니다.

- **얕은 복사 vs 깊은 복사**:
  - 1단계 프로퍼티만 주소 참조를 복사할 것인지, 객체의 깊은 내부 중첩 구조까지 완전히 새로 생성할 것인지에 대한 설계 차이입니다. (예: [용어 사전](../../../../GLOSSARY.md#shallow-vs-deep-copy) 참고)
  - **Friendly_Tutor의 친절한 비유**: "얕은 복사는 외부 웹페이지 파일만 그대로 복사하고 페이지 안의 웹 이미지 주소는 원본 링크를 그대로 걸어두는 것과 같습니다. 원본 웹 이미지 주소의 파일이 바뀌면 내 페이지의 이미지도 바뀝니다. 반면 깊은 복사는 페이지 안의 모든 서브 이미지 파일까지 내 서버로 내려받아 완전히 별개의 디렉토리 구조로 만들어 완벽하게 독립하는 것과 같습니다."
- **structuredClone API 제약과 실무 대안**:
  - 내장 `structuredClone()` API가 지닌 한계와 예외 상황, 그리고 실무적인 처리 대안입니다.
  * **Senior_Practitioner의 실무 팁**: "`structuredClone()`은 브라우저 내장 API로서 과거 `JSON.parse(JSON.stringify(obj))`의 단점(정규식, Map/Set, Date 복사 누락)을 극대화하여 보완한 도구입니다. 하지만 객체 내부에 **함수(Method)나 클래스 인스턴스, DOM 객체** 등이 존재하면 `DataCloneError`를 발생시키며 작동이 멈추는 명확한 제약이 있습니다. 이 때문에 실무에서 복잡한 애플리케이션 상태나 리듀서 내부에서 상태 데이터를 복제할 때는 `structuredClone`에 의존하기보다, 커스텀 복제 헬퍼 함수를 구축하거나 검증된 `lodash.cloneDeep` 라이브러리를 안전하게 도입하여 예기치 못한 애플리케이션 충돌(Crash)을 방지해야 합니다."
- **Structured Clone 알고리즘 명세**:
  - HTML 규격 내 구조화 직렬화 알고리즘의 동작 기저와 프로토타입 소실 스펙입니다.
  - **PhD_Book_Author의 학술 스펙**: "HTML Living Standard 명세의 **Structured Serialize/Deserialize 알고리즘**은 객체의 순환 참조(Circular Reference)를 감지하고 보존하며 ArrayBuffer, Map, Set 등의 객체 타입을 기본적으로 재생성해 냅니다. 그러나 이 메커니즘은 변형 과정에서 타겟 객체의 프로토타입 링크(`[[Prototype]]`)를 무시하고 항상 `Object.prototype`을 부모로 두는 일반 객체로 복원합니다. 또한 객체의 접근자 디스크립터(getter/setter)나 속성 플래그(writable, enumerable 등)가 유실되는 부작용이 있으므로, 완전한 인프라스트럭처 레벨의 객체 복제가 필요할 때는 단순 직렬화가 아닌 메타 프로그래밍(`Reflect` API) 기반의 복제 메커니즘을 설계해야 합니다."

## 🧪 실습 미션

- **미션 파일**: `mission.js`
- **요구 사항**:
  1.  `deepCloneObject(obj)`: 전달받은 객체 `obj`를 깊은 복사(Deep Copy)한 완전히 분리된 새로운 복사본을 반환합니다.
      - 내장 `structuredClone` API를 최우선으로 시도합니다.
      - 만약 `structuredClone`이 지원되지 않거나, 함수 등의 요소로 인해 에러(`DataCloneError`)를 발생시키는 경우, 폴백(Fallback) 동작으로 재귀 함수를 이용해 깊은 복사를 수행하여 반환해야 합니다. (이때 함수는 주소 참조를 복사해도 무방합니다.)
      - 입력이 원시값(Primitive)이거나 null인 경우 입력 그대로 반환합니다.

## 💡 힌트 및 트러블슈팅

- `try-catch` 블록으로 `structuredClone` 호출부를 감싸고, 예외가 발생할 경우에 한해 재귀적으로 객체의 키를 순회하며 딥카피를 수행하도록 폴백 로직을 작성합니다.
- 폴백 로직에서는 `Array.isArray(obj)` 여부를 판단하여 배열과 일반 객체를 분리해 처리하고, 중첩된 객체 또한 `deepCloneObject`를 재귀적으로 호출해야 합니다.
