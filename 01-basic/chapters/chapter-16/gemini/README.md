# Chapter 16: DOM 요소 조회와 스타일 제어 (DOM Selection and Style Control)

## 📖 핵심 개념

자바스크립트를 이용해 웹 페이지의 HTML 요소를 탐색하여 선택하는 방법과, 인라인 스타일 변경 대신 CSS 클래스를 조작하여 스타일을 동적으로 변경하는 실무 제어 기법을 학습합니다.

- **DOM 요소 조회 (DOM Selection)**:
  - `document.getElementById` 또는 `document.querySelector` 등을 사용해 DOM 트리 내의 특정 노드를 식별하고 선택하는 메커니즘입니다 ([용어 사전](../../../../GLOSSARY.md) 참고).
  - **Friendly_Tutor의 친절한 비유**: "수많은 주택이 늘어선 마을(DOM)에서 특정 주소지(ID 또는 선택자)를 찾아 우편함을 열어보는 것과 같습니다."
- **classList 제어 (classList.toggle)**:
  - 선택한 요소의 클래스 목록(`DOMTokenList`)을 확인하여 특정 클래스를 추가, 제거 혹은 토글하는 인터페이스입니다 ([용어 사전](../../../../GLOSSARY.md) 참고).
  - **Senior_Practitioner의 실무 팁**: "자바스크립트에서 `element.style.color = 'red'`처럼 인라인 스타일을 직접 하드코딩하여 수정하면, CSS 파일의 가독성이 급격히 떨어지고 재사용이 어렵게 만듭니다. 또한 높은 CSS 명시도로 인해 다른 스타일 룰이 적용되지 않는 버그가 발생합니다. 실무에서는 미리 선언된 CSS 클래스를 `classList` 메서드로 추가/제거 및 토글하는 방식을 사용해 스타일과 로직을 분리하는 것이 표준입니다."
- **DOMTokenList 명세**:
  - 브라우저가 HTML의 `class` 속성을 관리하기 위해 제공하는 표준 인터페이스의 내부 규격입니다.
  - **PhD_Book_Author의 학술 스펙**: "HTML Living Standard 명세에 따르면, `Element.classList`는 요소의 `class` 속성을 공백 기준으로 파싱해 나타내는 읽기 전용의 `DOMTokenList` 객체를 반환합니다. `classList.toggle` 메서드는 해당 목록 내에 지정된 토큰(클래스명)이 존재하면 제거하고 `false`를 반환하며, 존재하지 않으면 추가하고 `true`를 반환하는 내부 알고리즘을 수행하여, 개발자가 DOM 문자열을 수동으로 재구성(String Manipulation)하지 않고 안전하게 클래스를 제어할 수 있도록 보장합니다."

## 🧪 실습 미션

- **미션 파일**: `mission.js`
- **요구 사항**:
  1.  `toggleHighlight(elementId)`: 전달받은 ID를 갖는 요소를 조회하여 `'highlight'` 클래스를 토글합니다.
      - `elementId`를 사용하여 해당 DOM 요소를 안전하게 조회합니다.
      - 조회한 요소가 존재하지 않을 경우 `false`를 반환합니다.
      - 요소가 존재한다면 `'highlight'` 클래스를 토글하고, 클래스가 최종적으로 추가되었으면 `true`, 제거되었으면 `false`를 반환합니다.

## 💡 힌트 및 트러블슈팅

- `document.getElementById(elementId)`를 사용하면 특정 ID를 가진 요소를 빠르게 탐색할 수 있습니다.
- `classList.toggle(className)` 메서드는 실행 후 클래스가 추가되면 `true`를, 제거되면 `false`를 반환하는 표준 동작이 명세에 내장되어 있습니다. 이 특성을 이용하면 코드를 더욱 단순하게 작성할 수 있습니다.
