import { diffNodes, VirtualNode } from "./mission";

describe("Chapter 01: 가상 DOM 렌더링 조정(Reconciliation) 및 Diffing 알고리즘 검증", () => {
  
  test("Task 1: 두 텍스트 노드 비교 시 내용이 다르면 TEXT 패치를 생성한다", () => {
    const oldNode = "안녕하세요";
    const newNode = "반갑습니다";
    
    const patches = diffNodes(oldNode, newNode);
    expect(patches).toEqual([
      { type: "TEXT", oldText: "안녕하세요", newText: "반갑습니다" }
    ]);
  });

  test("Task 2: 노드 타입(태그)이 다르면 REPLACE 패치를 생성한다", () => {
    const oldNode = { type: "div", props: {}, children: [] };
    const newNode = { type: "span", props: {}, children: [] };

    const patches = diffNodes(oldNode, newNode);
    expect(patches).toEqual([
      { type: "REPLACE", oldNode, newNode }
    ]);
  });

  test("Task 3: 속성(Props) 변경 사항(추가, 변경, 제거)을 감지하여 PROPS 패치를 생성한다", () => {
    const oldNode = {
      type: "div",
      props: { id: "container", className: "old-class", style: "color: red" },
      children: []
    };
    const newNode = {
      type: "div",
      props: { id: "container", className: "new-class", title: "hover me" },
      children: []
    };

    const patches = diffNodes(oldNode, newNode);
    expect(patches).toEqual([
      {
        type: "PROPS",
        props: {
          added: { className: "new-class", title: "hover me" },
          removed: ["style"]
        }
      }
    ]);
  });

  test("Task 4: key가 부여된 자식 노드 리스트를 효율적으로 비교하여 최소한의 업데이트 패치를 생성한다", () => {
    const oldNode = {
      type: "ul",
      props: {},
      children: [
        { type: "li", props: { key: "item1" }, children: ["사과"] },
        { type: "li", props: { key: "item2" }, children: ["바나나"] }
      ]
    };
    
    const newNode = {
      type: "ul",
      props: {},
      children: [
        { type: "li", props: { key: "item2" }, children: ["맛있는 바나나"] },
        { type: "li", props: { key: "item1" }, children: ["사과"] },
        { type: "li", props: { key: "item3" }, children: ["체리"] }
      ]
    };

    const patches = diffNodes(oldNode, newNode);
    
    // item2가 변경되었고, item3가 추가됨
    expect(patches).toContainEqual(
      expect.objectContaining({
        type: "CHILDREN",
        patches: expect.arrayContaining([
          {
            type: "UPDATE",
            index: 1, // 'item2'는 이전 배열의 index 1에 위치함
            patches: [
              {
                type: "CHILDREN",
                patches: [
                  { type: "UPDATE", index: 0, patches: [{ type: "TEXT", oldText: "바나나", newText: "맛있는 바나나" }] }
                ]
              }
            ]
          },
          {
            type: "INSERT",
            index: 2, // 'item3'는 새 배열의 index 2에 삽입됨
            node: { type: "li", props: { key: "item3" }, children: ["체리"] }
          }
        ])
      })
    );
  });
});
