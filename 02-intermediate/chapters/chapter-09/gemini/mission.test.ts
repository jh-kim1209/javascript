import { updateStateHelper } from "./mission";

describe("Chapter 09: useState를 이용한 반응형 상태 제어와 불변성 검증", () => {
  test("Task 1: 'add' 액션 발생 시 원본을 훼손하지 않고 요소를 추가한 새 배열을 반환해야 합니다.", () => {
    const original = ["React", "Vue"];
    const result = updateStateHelper(original, { type: "add", payload: "Svelte" });

    expect(result).toEqual(["React", "Vue", "Svelte"]);
    expect(result).not.toBe(original);
    expect(original.length).toBe(2);
  });

  test("Task 1: 'remove' 액션 발생 시 원본을 훼손하지 않고 해당 요소를 제거한 새 배열을 반환해야 합니다.", () => {
    const original = ["React", "Vue", "Svelte"];
    const result = updateStateHelper(original, { type: "remove", payload: "Vue" });

    expect(result).toEqual(["React", "Svelte"]);
    expect(result).not.toBe(original);
    expect(original.length).toBe(3);
  });

  test("Task 1: 존재하지 않는 요소를 'remove' 할 때도 원본 참조 주소와는 다른 복사본 배열을 반환해야 합니다.", () => {
    const original = ["React", "Svelte"];
    const result = updateStateHelper(original, { type: "remove", payload: "Angular" });

    expect(result).toEqual(["React", "Svelte"]);
    expect(result).not.toBe(original);
  });
});
