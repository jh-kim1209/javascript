# Chapter 11: 네트워크 스트리밍: ReadableStream 수집 및 실시간 chunk 파싱 가공 (Network Streaming & Chunk Parsing)

## 📖 핵심 개념

대용량 데이터를 네트워크를 통해 전송받을 때 전체 데이터가 모두 수신될 때까지 대기하지 않고, 도착하는 바이너리 데이터 조각(Chunk)들을 실시간으로 수집하고 디코딩하여 점진적으로 처리하는 네트워크 스트리밍 제어 기법입니다.

- **네트워크 스트리밍 (Network Streaming)**:
  - 네트워크 응답 바디를 작은 청크 단위로 지속 분할하여 수신하여 가공하는 비동기 데이터 흐름 제어입니다. (자세한 내용은 [용어 사전](../../../../GLOSSARY.md#web-streams-readablestream) 참고)
  - **Friendly_Tutor의 친절한 비유**: "거대한 물탱크에 물이 가득 차기를 오랫동안 기다렸다가 한 번에 쏟아부어 마시는 것(일반적인 Fetch 요청) 대신, 수도꼭지에 호스를 연결하여 흘러나오는 물방울(Chunk)들을 실시간으로 컵(바가지)에 담아 즉시 목을 축이는 방식과 같습니다. 물이 다 올 때까지 목마르게 기다릴 필요 없이 도착하는 즉시 한 모금씩 마실 수 있습니다."
- **TextDecoder와 인코딩 깨짐 예외 처리**:
  - 바이너리 스트림 데이터를 텍스트로 변환할 때, 청크 경계에서 유니코드 문자 바이트가 잘려 인코딩이 깨지는 버그를 방지하고 실시간 가공하는 기술입니다.
  - **Senior_Practitioner의 실무 팁**: "네트워크로부터 전달되는 멀티바이트 문자(예: 한글 UTF-8은 한 문자당 3바이트)의 바이너리 청크는 임의의 경계에서 잘릴 수 있습니다. 예를 들어, 3바이트 중 2바이트만 먼저 도착하고 나머지 1바이트가 다음 청크에 담기면, 단순히 각 청크를 독립적으로 `new TextDecoder().decode(chunk)` 처리할 경우 글자가 물음표(`?`)나 깨진 기호로 출력되는 인코딩 대형 사고가 발생합니다. 이를 완벽히 방지하려면 `TextDecoder` 객체를 하나만 생성한 뒤 `{ stream: true }` 옵션을 전달하여 이전 청크의 불완전한 잔여 바이트 버퍼를 내부적으로 보존하며 디코딩하도록 처리해야 합니다."
- **Streams Standard 규격 및 백프레셔 (Backpressure)**:
  - **PhD_Book_Author의 학술 스펙**: "WHATWG Streams Standard 규격에 명세된 `ReadableStream`은 데이터 생산 속도와 소비 속도가 일치하지 않을 때 시스템 리소스 고갈을 막기 위해 백프레셔(Backpressure, 배압) 메커니즘을 지원합니다. 소비자가 아직 준비되지 않았거나 처리 능력을 초과한 경우, 내부 대기 큐(Queue)의 크기(High Water Mark)에 도달하면 데이터를 송신하는 소스 측에 데이터 전송을 일시 정지하도록 신호(Backpressure)를 보내 흐름을 자율 통제하며 메모리 누수 및 오버플로우를 원천 차단합니다."

## 🧪 실습 미션

- **미션 파일**: `mission.ts`
- **요구 사항**:
  1.  `processReadableStream(stream: ReadableStream<Uint8Array>, chunkCallback: (text: string) => void): Promise<string>`:
      - 전달받은 `ReadableStream`의 `getReader()`를 호출하여 스트림 리더를 획득합니다.
      - 루프를 돌며 리더의 `read()` 비동기 메서드를 호출하여 바이너리 청크(`value`)와 완료 플래그(`done`)를 수신합니다.
      - 단일 `TextDecoder` 인스턴스를 유지하며, 수신되는 각 청크를 `{ stream: true }` 옵션을 통해 디코딩하여 텍스트 데이터가 깨지지 않도록 처리합니다.
      - 매 청크 수집 시 파싱된 텍스트 조각을 `chunkCallback(text)`의 매개변수로 즉각 호출해 실시간 가공을 위임합니다.
      - 스트림이 종료되면 마지막 잔여 바이트를 완벽히 털어내기 위해 `stream: false` 형태로 디코더를 최종 정리한 뒤, 전체 누적되어 완성된 텍스트 문자열을 리턴하며 Promise를 이행합니다.

## 💡 힌트 및 트러블슈팅

- `ReadableStreamDefaultReader` 타입의 `read()` 메서드는 `{ done: boolean, value?: Uint8Array }` 구조의 객체를 반환하는 Promise를 돌려줍니다.
- `TextDecoder`는 생성자에 인코딩 포맷을 기재하지 않으면 기본적으로 `utf-8`로 세팅됩니다. 실시간 스트림 처리를 위해서는 `decoder.decode(value, { stream: true })` 형태로 호출해야 깨진 유니코드 문자가 합쳐져 올바르게 출력됩니다.
- 네트워크 에러 등으로 스트림 중간에 에러가 발생한 경우, 획득한 `reader`의 `releaseLock()`을 호출하여 리더 락을 적절히 해제하고 에러를 상위로 전파(throw)하여 처리의 안전성을 기하십시오.
