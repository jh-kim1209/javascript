/**
 * Chapter 07: React 가상 DOM의 실체와 빌드 시스템 이해
 */

export interface VirtualNode {
  type: string;
  props: {
    [key: string]: any;
    children: (VirtualNode | string)[];
  };
}

/**
 * Task 1: 가상 DOM 엘리먼트 생성 함수
 * HTML 태그 종류와 속성 객체, 그리고 가변 인자 자식 요소들을 병합하여 가상 DOM 노드 객체를 반환합니다.
 * @param {string} type - HTML 태그 이름 (예: 'div', 'span')
 * @param {Record<string, any> | null} props - 태그의 속성 객체
 * @param {...any[]} children - 하위 자식 노드들 (가변 인자)
 * @returns {VirtualNode} 생성된 가상 DOM 노드 객체
 */
export function createVirtualElement(
  type: string,
  props: Record<string, any> | null,
  ...children: any[]
): VirtualNode {
  // TODO: props가 null일 때의 기본값 처리, children의 평탄화(Flat) 및 문자열 변환 처리를 구현하세요.
  return {
    type,
    props: {
      children: []
    }
  };
}
