/**
 * Chapter 19: 이벤트 위임 패턴과 성능 최적화
 */

/**
 * Task 1: 이벤트 위임 패턴을 이용한 할 일 삭제 기능 설정
 * listId를 가진 요소를 찾아 클릭 이벤트를 등록하고, 클릭된 요소가 button.delete-btn일 때
 * 부모 li 요소의 data-id 속성값과 텍스트 내용을 추출하여 deleteCallback에 전달합니다.
 * @param {string} listId - 할 일 목록 요소(ul/ol)의 ID
 * @param {Function} deleteCallback - 삭제 버튼 클릭 시 실행할 콜백 함수 (id, text 전달)
 */
export function setupTodoDelegation(listId, deleteCallback) {
  // TODO: listId 요소를 찾아서 클릭 이벤트 위임을 구현하고 deleteCallback을 실행하세요.
}
