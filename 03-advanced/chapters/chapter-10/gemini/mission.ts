/**
 * Chapter 10: Hydration 동작 원리와 최적화 및 런타임 Hydration Mismatch 디버깅
 */

export interface VirtualNode {
  tag: string;
  props: Record<string, any>;
  children: (VirtualNode | string)[];
}

export interface MismatchLog {
  type: "TAG_MISMATCH" | "ATTR_MISMATCH" | "TEXT_MISMATCH" | "CHILD_COUNT_MISMATCH";
  path: string;
  server: string;
  client: string;
}

/**
 * Task 1: Hydration Mismatch 디버깅 엔진 구현
 * 서버에서 전달된 HTML 태그 구조와 클라이언트 가상 돔 노드를 재귀적으로 대조하여 불일치를 적출합니다.
 * @param serverHtml - 서버 측에서 생성된 HTML 문자열
 * @param clientDom - 브라우저 측 리액트 가상 돔(VirtualNode) 루트 노드
 * @returns MismatchLog[] - 탐지된 불일치 목록
 */
export function detectHydrationMismatch(
  serverHtml: string,
  clientDom: VirtualNode
): MismatchLog[] {
  // TODO: HTML 문자열을 VirtualNode와 동일한 형태의 서버 DOM 트리 구조로 파싱하는 헬퍼 함수를 구현하십시오.
  // 서버 DOM 트리와 clientDom 트리를 루트 노드부터 재귀적으로 탐색하여 다음 불일치 사항을 체크하십시오:
  // 1) 태그 불일치 (TAG_MISMATCH)
  // 2) 속성 불일치 (ATTR_MISMATCH) - class는 className으로 변환하여 매핑 체크
  // 3) 자식 노드 개수 불일치 (CHILD_COUNT_MISMATCH)
  // 4) 텍스트 내용 불일치 (TEXT_MISMATCH)
  throw new Error("Not implemented");
}
