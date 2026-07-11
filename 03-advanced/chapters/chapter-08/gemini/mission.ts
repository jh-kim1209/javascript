/**
 * Chapter 08: React Server Components (RSC) 렌더링 동작 원리 및 Payload 분석
 */

export interface ParsedRscNode {
  id: string;
  type: "client-reference" | "server-element";
  nameOrTag: string;
  props: Record<string, any>;
  children?: (ParsedRscNode | string)[];
}

/**
 * Task 1: RSC Payload 파서 유틸리티 구현
 * RSC Payload 문자열을 줄 단위 파싱하여 클라이언트 컴포넌트 정보, 서버 돔 노드 데이터, Props 관계를 트리 형태로 해독하는 파서 유틸리티를 구현합니다.
 * @param payload - 줄 단위 직렬화된 RSC Payload 문자열
 * @returns ParsedRscNode[] - 최상위 루트 노드(들)의 트리 구조 목록
 */
export function parseRscPayload(payload: string): ParsedRscNode[] {
  // TODO: 줄 단위로 데이터를 파싱하여 Map에 ID 별로 적재합니다.
  // 각 노드를 순회하며 자식 노드 배열 중 문자열 ID가 Map에 존재하는 경우 해당 노드로 재귀 치환하여 트리를 빌드합니다.
  // 순환 참조 발생 시 "Circular reference detected" 예외를 던지도록 설계하십시오.
  // 잘못된 행 형식을 만나면 "Invalid RSC line format", 잘못된 JSON 파싱 시 "Invalid JSON" 예외를 던지십시오.
  throw new Error("Not implemented");
}
