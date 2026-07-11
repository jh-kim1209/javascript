# Chapter 17: DOM 동적 생성과 삽입 (DOM Dynamic Creation and Insertion)

## 📖 핵심 개념

자바스크립트 엔진 메모리 상에 동적으로 HTML 요소를 생성하고, XSS 보안 취약점을 방지하며 안전하게 DOM 트리에 노드를 삽입하는 메커니즘을 학습합니다.

- **DOM 동적 생성 (createElement)**:
  - `document.createElement`를 통해 메모리 상에 새로운 HTML 요소를 인스턴스화하고 조작하는 메커니즘입니다 ([용어 사전](../../../../GLOSSARY.md) 참고).
  - **Friendly_Tutor의 친절한 비유**: "빈 방에 들여놓을 새로운 가구(노드)를 카탈로그에서 골라 공장(메모리)에서 직접 조립해 준비하는 과정과 같습니다."
- **innerHTML과 XSS 보안 위협**:
  - HTML 마크업 문자열을 해석하여 노드를 동적 생성하는 편리한 프로퍼티이지만, 악의적인 스크립트 실행 취약점을 유발할 수 있습니다.
  - **Senior_Practitioner의 실무 팁**: "사용자가 입력한 검색어, 댓글 등의 텍스트를 `element.innerHTML = userInput`과 같이 직접 결합하여 렌더링하면, 사용자가 `<script>stealCookie()</script>`나 `<img src=x onerror=hack()>` 같은 악의적인 코드를 심었을 때 그대로 실행되는 **XSS(Cross-Site Scripting, 교차 사이트 스크립팅)** 취약성 장애가 발생합니다. 이는 사용자 세션 탈취 및 개인정보 유출로 직결되므로, 단순히 텍스트만 렌더링할 때는 반드시 **`textContent`**나 **`innerText`** 속성을 사용하여 특수문자를 이스케이프(Escape) 처리해야 안전합니다."
- **Node.appendChild vs Node.insertBefore**:
  - 생성한 요소를 실제 DOM 트리의 부모 자식 관계로 편입시켜 화면에 렌더링되도록 삽입하는 두 표준 API입니다.
  - **PhD_Book_Author의 학술 스펙**: "DOM Standard 명세상, `Node.appendChild(newChild)`는 새로운 노드를 지정한 부모 노드의 자식 노드 리스트 끝에 추가하며, `Node.insertBefore(newChild, referenceChild)`는 부모 노드 내에서 `referenceChild` 노드의 바로 앞에 `newChild`를 삽입합니다. 만약 추가하려는 `newChild`가 이미 DOM 트리에 존재하는 문서 내의 노드라면, 새로운 위치로 이동(Relocate)하기 전 기존 위치에서 자동으로 제거(Remove)하는 브라우저 엔진의 DOM 트리 재정렬 알고리즘이 내장되어 있습니다."

## 🧪 실습 미션

- **미션 파일**: `mission.js`
- **요구 사항**:
  1.  `createListItem(text, containerId)`: 새로운 `<li>` 요소를 동적으로 생성하여 텍스트를 채우고, 지정한 ID를 가진 컨테이너 요소(`<ul>` 또는 `<ol>`)의 자식으로 추가한 뒤 생성된 요소를 반환합니다.
      - `document.createElement('li')`를 사용하여 새로운 `<li>` 엘리먼트를 생성합니다.
      - XSS(교차 사이트 스크립팅) 공격 방지를 위해 생성된 `<li>` 요소의 **`textContent`** 속성에 매개변수 `text` 값을 안전하게 할당합니다.
      - `containerId`를 사용하여 해당 DOM 컨테이너 요소를 조회합니다.
      - 컨테이너 요소를 찾지 못했다면 삽입을 수행하지 않고 `null`을 반환합니다.
      - 컨테이너 요소를 성공적으로 찾았다면, 해당 컨테이너의 맨 마지막 자식 요소로 생성한 `<li>`를 삽입하고 해당 `<li>` 객체를 반환합니다.

## 💡 힌트 및 트러블슈팅

- 생성한 노드는 메모리 속 객체 형태로만 존재하므로, `appendChild()`를 통해 실제 DOM 트리에 명시적으로 추가해야 비로소 브라우저 렌더링 파이프라인을 타고 화면에 그려집니다.
- 보안 요건에 부합하도록 하기 위해 사용자가 제공한 원시 문자열은 `innerHTML` 대신 항상 `textContent` 속성을 통해 대입하여 악성 스크립트 실행(XSS) 위협을 예방하십시오.
