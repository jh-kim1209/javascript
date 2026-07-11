# Chapter 02: 가상 DOM 렌더러 직접 빌드

## 📖 핵심 개념
가상 DOM 객체(VirtualNode)를 분석하여 실제 브라우저의 DOM API를 호출하고 화면에 마운트(Mount) 및 업데이트하는 가상 DOM 렌더링 엔진입니다.

*   **가상 DOM (Virtual DOM)**:
    *   실제 DOM 노드의 구조를 선언적으로 모방하는 가벼운 자바스크립트 객체 표상입니다. (자세한 내용은 [용어 사전](../../../../GLOSSARY.md#virtual-dom) 참고)
    *   **Friendly_Tutor의 친절한 비유**: "3D CAD 설계 도면(VNode)을 정밀하게 읽어와서, 공장의 조립 라인(브라우저 DOM API)을 가동하여 실제 집(HTML 엘리먼트)을 건설하는 것과 같습니다."
*   **W3C DOM Core API**:
    *   `document.createElement`, `document.createTextNode`, `appendChild`, `addEventListener` 등 브라우저가 노드를 다루기 위해 표준으로 제공하는 저수준 명세 API입니다.
    *   **Senior_Practitioner의 실무 팁**: "상태가 바뀔 때마다 기존 DOM 전체를 `container.innerHTML = ''`로 날려버리고 새로 그리는 방식을 사용하면, 렌더링은 되지만 화면 내 입력 필드의 인풋 포커스가 풀리고 스크롤 바가 갑자기 맨 위로 튕기며 화면이 번쩍거리는 최악의 사용자 경험(UX) 하자가 발생합니다. 이를 막기 위해 DOM 노드를 직접 생성 및 조작하여 계층 구조를 보존해야 합니다."
*   **브라우저 렌더링 파이프라인과 리플로우(Reflow)**:
    *   DOM 트리 변경 시 브라우저가 화면 요소의 크기와 기하학적 배치를 다시 계산(Layout)하고 화면에 픽셀을 뿌리는(Paint) 과정입니다.
    *   **PhD_Book_Author의 학술 스펙**: "DOM 노드를 동적으로 추가하거나 속성을 변경하면 브라우저는 레이아웃 트리를 갱신하여 리플로우(Reflow)와 리페인트(Repaint) 과정을 거칩니다. 이 과정은 CPU 및 GPU 연산 비용이 매우 높기 때문에, 여러 번 나누어 개별 엘리먼트를 직접 돔에 꽂기보다는 메모리 상에 서브트리를 완전히 구축한 다음 `appendChild`로 단 한 번의 단일 리플로우만 발생시키도록 조작 단위를 최적화해야 합니다."

## 🧪 실습 미션
*   **미션 파일**: `mission.ts`
*   **요구 사항**:
    1.  `mount(vnode: VirtualNode, container: HTMLElement): Node`: 가상 노드 객체를 실제 DOM 노드로 정교하게 변환하여 컨테이너에 마운트하고 생성된 실제 DOM 노드를 반환하십시오.
        - `vnode`가 단순 문자열(텍스트)인 경우 `document.createTextNode`를 이용하여 텍스트 노드를 생성해야 합니다.
        - `vnode`가 엘리먼트 객체인 경우 해당 태그 타입(`type`)의 엘리먼트를 생성하고, 모든 속성(`props`) 및 이벤트 리스너(예: `onClick`, `onInput`)를 바인딩하며, 자식 가상 노드 리스트를 재귀적으로 마운트해야 합니다.

## 💡 힌트 및 트러블슈팅
*   이벤트 리스너를 식별하기 위해 `onClick`, `onChange` 등 `on`으로 시작하는 prop 키는 문자열을 잘라 소문자(예: `click`, `change`) 이벤트로 처리하여 `addEventListener`로 등록합니다.
*   클래스 속성은 `className`으로 전달될 수 있으므로, `className`을 실제 DOM 엘리먼트의 `className`에 적절히 대입하도록 분기 처리하십시오.
