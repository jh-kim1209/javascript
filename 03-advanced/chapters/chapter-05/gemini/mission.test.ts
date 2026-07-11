import { getVisibleRange } from "./mission";

describe("Chapter 05: React 성능 최적화: 대용량 리스트 가상 스크롤 검증", () => {
  
  test("Task 1: 스크롤이 가장 상단(scrollTop = 0)에 위치할 때 화면에 보이는 첫 번째 인덱스 범위와 offsetTop을 계산한다", () => {
    // containerHeight: 200, itemHeight: 50, totalCount: 100
    // visibleCount = ceil(200 / 50) = 4
    // startIndex = 0
    // endIndex = min(99, 0 + 4) = 4
    // offsetTop = 0
    const range = getVisibleRange(0, 200, 50, 100);

    expect(range).toEqual({
      startIndex: 0,
      endIndex: 4,
      offsetTop: 0
    });
  });

  test("Task 2: 중간 스크롤 시 뷰포트를 벗어난 아이템 수에 따라 startIndex와 offsetTop을 동적으로 계산한다", () => {
    // scrollTop: 120, containerHeight: 200, itemHeight: 50, totalCount: 100
    // startIndex = floor(120 / 50) = 2
    // visibleCount = ceil(200 / 50) = 4
    // endIndex = min(99, 2 + 4) = 6
    // offsetTop = 2 * 50 = 100
    const range = getVisibleRange(120, 200, 50, 100);

    expect(range).toEqual({
      startIndex: 2,
      endIndex: 6,
      offsetTop: 100
    });
  });

  test("Task 3: 소수점 스크롤(예: 75px)이 발생하여도 정확한 범위와 오프셋을 연산해 낸다", () => {
    // scrollTop: 75, containerHeight: 150, itemHeight: 40, totalCount: 50
    // startIndex = floor(75 / 40) = 1
    // visibleCount = ceil(150 / 40) = 4
    // endIndex = min(49, 1 + 4) = 5
    // offsetTop = 1 * 40 = 40
    const range = getVisibleRange(75, 150, 40, 50);

    expect(range).toEqual({
      startIndex: 1,
      endIndex: 5,
      offsetTop: 40
    });
  });

  test("Task 4: 총 아이템 개수가 0개일 때의 엣지 케이스를 안전하게 처리한다", () => {
    const range = getVisibleRange(100, 200, 50, 0);

    expect(range).toEqual({
      startIndex: 0,
      endIndex: 0,
      offsetTop: 0
    });
  });

  test("Task 5: 스크롤이 리스트 가장 마지막에 도달했을 때 인덱스를 전체 개수를 초과하지 않도록 보정한다", () => {
    // scrollTop: 950 (총 높이: 50 * 20 = 1000)
    // startIndex = floor(950 / 50) = 19
    // visibleCount = ceil(200 / 50) = 4
    // endIndex = min(19, 19 + 4) = 19 (totalCount: 20 이므로 max index는 19)
    const range = getVisibleRange(950, 200, 50, 20);

    expect(range).toEqual({
      startIndex: 19,
      endIndex: 19,
      offsetTop: 950
    });
  });
});
