/**
 * Chapter 05: React 성능 최적화: 대용량 리스트 렌더링 최적화: 가상 스크롤 구현
 */

/**
 * Task 1: 스크롤 위치 및 뷰포트 기하학 정보를 바탕으로 렌더링 영역 및 오프셋을 계산합니다.
 * @param {number} scrollTop - 현재 컨테이너의 스크롤 위치 (px)
 * @param {number} containerHeight - 스크롤 뷰포트 컨테이너의 물리적 높이 (px)
 * @param {number} itemHeight - 각 리스트 아이템의 고정 높이 (px)
 * @param {number} totalCount - 리스트 전체 아이템 수
 * @returns {{ startIndex: number; endIndex: number; offsetTop: number }} 렌더링할 범위 및 상단 오프셋 객체
 */
export function getVisibleRange(
  scrollTop: number,
  containerHeight: number,
  itemHeight: number,
  totalCount: number
): { startIndex: number; endIndex: number; offsetTop: number } {
  // TODO: 스크롤 높이에 맞춰 화면에 표출되어야 하는 가상 리스트 노드의 시작/끝 인덱스 및 상단 여백을 계산하여 출력하십시오.
  return {
    startIndex: 0,
    endIndex: 0,
    offsetTop: 0
  };
}
