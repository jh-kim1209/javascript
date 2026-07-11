/**
 * Chapter 02: 가상 DOM 렌더러 직접 빌드
 */

export interface ElementNode {
  type: string;
  props: Record<string, any>;
  children: VirtualNode[];
}

export type VirtualNode = ElementNode | string;

/**
 * Task 1: 가상 DOM 노드를 실제 브라우저 DOM 노드로 변환하여 컨테이너에 마운트합니다.
 * @param {VirtualNode} vnode - 가상 노드 객체 또는 텍스트
 * @param {HTMLElement} container - 마운트될 실제 DOM 부모 엘리먼트
 * @returns {Node} 생성된 실제 DOM 노드 (Element 또는 Text 노드)
 */
export function mount(vnode: VirtualNode, container: HTMLElement): Node {
  // TODO: 가상 노드의 타입에 따라 실제 DOM 노드(Text 또는 Element)를 생성하고 props 및 이벤트를 바인딩하여 마운트하십시오.
  return document.createTextNode("");
}
