/**
 * Chapter 01: 가상 DOM 렌더링 조정(Reconciliation) 및 Diffing 알고리즘 설계
 */

export interface ElementNode {
  type: string;
  props: Record<string, any>;
  children: VirtualNode[];
}

export type VirtualNode = ElementNode | string;

export type Patch =
  | { type: 'REPLACE'; oldNode: VirtualNode; newNode: VirtualNode }
  | { type: 'TEXT'; oldText: string; newText: string }
  | { type: 'PROPS'; props: { added: Record<string, any>; removed: string[] } }
  | { type: 'CHILDREN'; patches: ChildPatch[] };

export type ChildPatch =
  | { type: 'REMOVE'; index: number }
  | { type: 'INSERT'; index: number; node: VirtualNode }
  | { type: 'UPDATE'; index: number; patches: Patch[] };

/**
 * Task 1: 두 가상 DOM 노드를 비교하여 변경 사항(Patch) 목록을 계산하여 반환합니다.
 * @param {VirtualNode} oldNode - 이전 가상 노드
 * @param {VirtualNode} newNode - 새로운 가상 노드
 * @returns {Patch[]} 발생한 차이점(Patch)의 배열
 */
export function diffNodes(oldNode: VirtualNode, newNode: VirtualNode): Patch[] {
  // TODO: 텍스트 노드 비교, 노드 타입 변경 비교, Props 비교, key 기반 자식 비교 로직을 완성하십시오.
  return [];
}
