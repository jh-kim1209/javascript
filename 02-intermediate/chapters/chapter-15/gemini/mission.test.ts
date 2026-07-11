/**
 * @jest-environment jsdom
 */
import { initMovieDashboard } from "./mission";

describe("Chapter 15: [중급 종합 프로젝트] 영화 검색 대시보드 구축 검증", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement("div");
    container.id = "app-root";
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  test("Task 1: 초기화 시 검색창과 버튼이 노출되고 결과 목록은 비어있어야 합니다.", () => {
    initMovieDashboard("app-root", jest.fn());

    const input = document.getElementById("movie-search-input") as HTMLInputElement;
    const button = document.getElementById("movie-search-button");
    const list = document.getElementById("movie-list");

    expect(input).not.toBeNull();
    expect(button).not.toBeNull();
    expect(list).not.toBeNull();
    expect(list?.children.length).toBe(0);
  });

  test("Task 1: 검색 수행 중에는 로딩 메시지가 보이고 다른 결과/에러 영역은 감춰져야 합니다.", () => {
    const searchCallback = jest.fn(() => new Promise(() => {})); // Never resolves to keep it loading

    initMovieDashboard("app-root", searchCallback);

    const input = document.getElementById("movie-search-input") as HTMLInputElement;
    const button = document.getElementById("movie-search-button") as HTMLButtonElement;

    input.value = "Avatar";
    button.click();

    expect(searchCallback).toHaveBeenCalledWith("Avatar");
    expect(document.getElementById("movie-loading")).not.toBeNull();
    expect(document.getElementById("movie-list")).toBeNull();
    expect(document.getElementById("movie-error")).toBeNull();
  });

  test("Task 1: 검색 결과 수신 시 목록을 정상적으로 출력해야 합니다.", async () => {
    const movies = ["Inception", "Interstellar"];
    const searchCallback = jest.fn(() => Promise.resolve(movies));

    initMovieDashboard("app-root", searchCallback);

    const input = document.getElementById("movie-search-input") as HTMLInputElement;
    const button = document.getElementById("movie-search-button") as HTMLButtonElement;

    input.value = "Nolan";
    button.click();

    // Flush microtasks
    await new Promise(process.nextTick);

    const list = document.getElementById("movie-list");
    expect(list).not.toBeNull();
    expect(list?.children.length).toBe(2);
    expect(list?.children[0].textContent).toBe("Inception");
    expect(list?.children[1].textContent).toBe("Interstellar");
    expect(document.getElementById("movie-loading")).toBeNull();
    expect(document.getElementById("movie-error")).toBeNull();
  });

  test("Task 1: API 검색 실패 시 에러 영역에 에러 메시지를 표시해야 합니다.", async () => {
    const searchCallback = jest.fn(() => Promise.reject(new Error("Network Failure")));

    initMovieDashboard("app-root", searchCallback);

    const input = document.getElementById("movie-search-input") as HTMLInputElement;
    const button = document.getElementById("movie-search-button") as HTMLButtonElement;

    input.value = "ErrorTrigger";
    button.click();

    await new Promise(process.nextTick);

    const errorEl = document.getElementById("movie-error");
    expect(errorEl).not.toBeNull();
    expect(errorEl?.textContent).toBe("Network Failure");
    expect(document.getElementById("movie-loading")).toBeNull();
    expect(document.getElementById("movie-list")).toBeNull();
  });
});
