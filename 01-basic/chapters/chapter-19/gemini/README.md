# Chapter 19: 이벤트 위임 패턴과 성능 최적화 (Event Delegation and Performance Optimization)

## 📖 핵심 개념

이벤트 위임은 자식 요소 각각에 이벤트 리스너를 바인딩하지 않고, 부모 요소에 단 하나의 리스너를 설정하여 이벤트 버블링을 통해 자식 요소의 이벤트를 감지하고 일괄 처리하는 디자인 패턴입니다.

- **이벤트 위임 (Event Delegation)**:
  - 자식 엘리먼트 하나하나에 이벤트 리스너를 붙이지 않고, 부모 엘리먼트에 단 하나의 리스너를 달아 이벤트 버블링으로 돔 위로 올라오는 자식의 이벤트를 캡처하여 일괄 처리하는 설계 패턴입니다. (예: [용어 사전](../../../../GLOSSARY.md#event-delegation) 참고)
  - **Friendly_Tutor의 친절한 비유**: "아파트 각 세대 대문 앞에 택배 기사님이 일일이 찾아가 배달하지 않고, 아파트 입구 경비실에서 모든 배달 택배를 일괄 대리 수령하여 알맞은 입주민에게 안전하게 분배하는 것과 같습니다."
- **setupTodoDelegation**:
  - `setupTodoDelegation` 함수는 지정된 컨테이너 요소 내부에서 발생한 클릭 이벤트를 캡처하고, 실제 클릭된 타깃이 삭제 버튼인 경우에만 해당 할 일의 식별자와 데이터를 추출하여 처리합니다.
  - **Senior_Practitioner의 실무 팁**: "만약 1,000개의 목록 아이템마다 각각 `addEventListener`로 클릭 리스너를 생성해 붙인다면, 브라우저 메모리 점유율이 과다해져 렌더링 성능이 급격히 저하됩니다. 또한 새로운 항목을 화면에 동적으로 추가할 때마다 리스너를 일일이 재바인딩해 주어야 하므로 코드가 누더기가 되거나, 제거된 요소의 리스너가 메모리에 남아 가비지 컬렉터(Garbage Collector)에 수집되지 않는 메모리 누수(Memory Leak) 버그를 유발합니다."
- **이벤트 전파 단계와 타깃**:
  - 이벤트 전파(Event Propagation)는 3단계(Capturing -> Target -> Bubbling) 명세를 따릅니다.
  - **PhD_Book_Author의 학술 스펙**: "HTML Living Standard 명세에 의하면, 브라우저가 이벤트를 디스패치할 때 DOM 트리의 루트에서 타깃 요소까지 내려가는 캡처링 단계, 타깃에 도달하는 타깃 단계, 그리고 타깃에서 루트로 다시 거슬러 올라가는 버블링 단계를 거칩니다. 이때 `Event.target`은 이벤트가 실제로 처음 유발된 가장 깊숙한 진원지(Event Originator) 요소를 참조하고, `Event.currentTarget`은 현재 이벤트 리스너가 실제로 바인딩되어 실행 중인 요소(부모 컨테이너)를 참조합니다."

## 🧪 실습 미션

- **미션 파일**: `mission.js`
- **요구 사항**:
  1.  `setupTodoDelegation(listId, deleteCallback)`: 이벤트 위임 패턴을 사용해 할 일 목록 삭제 버튼 클릭을 처리하는 단 하나의 리스너를 바인딩합니다.
      - `listId`를 가진 컨테이너 요소를 DOM에서 찾습니다. 존재하지 않는 경우 즉시 함수를 종료합니다.
      - 컨테이너 요소에 클릭 이벤트 리스너를 바인딩합니다.
      - 클릭된 대상(`event.target`)이 `button.delete-btn` 클래스를 갖고 있는지 확인합니다.
      - 타깃이 삭제 버튼인 경우, 해당 버튼과 가장 인접한 부모 `li` 요소를 찾습니다.
      - 부모 `li` 요소의 `data-id` 속성값(id)과 `li` 요소 내의 첫 번째 텍스트 노드 내용(text)을 추출하여 `deleteCallback(id, text)`을 실행합니다.

## 💡 힌트 및 트러블슈팅

- `event.target.matches('button.delete-btn')`을 이용해 클릭된 대상이 삭제 버튼인지 정확히 판별할 수 있습니다.
- 부모 `li` 요소를 찾을 때는 `event.target.closest('li')` API를 사용하면 구조가 중첩되어도 안정적으로 타깃 li를 탐색할 수 있습니다.
- `li` 요소의 첫 번째 자식 노드 텍스트를 추출할 때는 `li.firstChild.textContent.trim()`을 사용해 자식 노드 중 삭제 버튼 텍스트가 섞여 들어오지 않도록 분리하십시오.
