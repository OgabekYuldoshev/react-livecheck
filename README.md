# react-livecheck

React hook for **person liveness detection** — verify that a user is a real live person via blink detection (MediaPipe Face Mesh). Build your own UI; the hook handles camera, face detection, and pass/fail state.

## Installation

```bash
pnpm add react-livecheck
```

**Requirements**

- **React 19** and peer dependency `react`
- **HTTPS** in production (or `localhost`). Camera access requires a secure context; `getUserMedia` is blocked on plain HTTP.
- **Modern browser** with `navigator.mediaDevices` and support for MediaPipe (Chrome, Firefox, Safari, Edge). Some corporate networks may block the default CDN; use a custom `locateFile` or self-host model files if needed.
- Use **one `useLiveness` instance per page** (one camera stream). Multiple instances may conflict.

## Usage

```tsx
import { useLiveness, LivenessErrorCode } from "react-livecheck";

function LivenessScreen() {
  const {
    videoRef,
    blinkCount,
    passed,
    error,
    isReady,
    isFaceDetected,
    faceBoundingBox,
    retry,
  } = useLiveness({
    requiredBlinks: 2,
    onSuccess: () => console.log("Liveness passed!"),
    onError: (err) => console.error(err.code, err.message),
    faceDetectionTimeout: 30_000,
  });

  if (error) {
    return (
      <div>
        <p>{error.message}</p>
        {error.code === LivenessErrorCode.PERMISSION_DENIED && (
          <p>Please allow camera access.</p>
        )}
        <button type="button" onClick={retry}>Try again</button>
      </div>
    );
  }

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {!isReady && <p>Starting camera…</p>}
      <video ref={videoRef} autoPlay playsInline muted />
      {faceBoundingBox && (
        <div
          style={{
            position: "absolute",
            left: `${faceBoundingBox.x * 100}%`,
            top: `${faceBoundingBox.y * 100}%`,
            width: `${faceBoundingBox.width * 100}%`,
            height: `${faceBoundingBox.height * 100}%`,
            border: "2px solid lime",
            pointerEvents: "none",
          }}
        />
      )}
      {isReady && !isFaceDetected && <p>Position your face in the frame.</p>}
      <p>Blinks: {blinkCount} {passed && "— Passed!"}</p>
    </div>
  );
}
```

## API

### `useLiveness(options?)`

**Options**

| Option | Type | Default | Description |
|--------|------|--------|-------------|
| `requiredBlinks` | `number` | `2` | Number of blinks required to pass. |
| `onSuccess` | `() => void` | — | Called once when liveness passes. |
| `onError` | `(error: LivenessError) => void` | — | Called when an error occurs. |
| `locateFile` | `(file: string) => string` | jsDelivr CDN | URL for MediaPipe model files. |
| `camera` | `{ width?, height?, facingMode? }` | `640×480`, `user` | Camera constraints. |
| `faceMesh` | `{ maxNumFaces?, minDetectionConfidence?, minTrackingConfidence? }` | — | FaceMesh model options. |
| `faceDetectionTimeout` | `number` | `0` (off) | Timeout in ms before `FACE_NOT_DETECTED` if no face is seen. |

**Return**

| Property | Type | Description |
|----------|------|-------------|
| `videoRef` | `RefObject<HTMLVideoElement \| null>` | Attach to a `<video>` element. |
| `blinkCount` | `number` | Current number of detected blinks. |
| `passed` | `boolean` | `true` when required blinks are reached. |
| `error` | `LivenessError \| null` | Current error (code + message). |
| `isReady` | `boolean` | Camera has started. |
| `isFaceDetected` | `boolean` | A face is currently in frame. |
| `faceBoundingBox` | `FaceBoundingBox \| null` | Normalized face box (0–1) for overlay; `null` when no face. |
| `retry` | `() => void` | Clear error and restart (e.g. after permission grant). |

### Error codes (`LivenessErrorCode`)

| Code | Meaning |
|------|--------|
| `ABORTED` | Camera request was aborted (e.g. user navigated away). |
| `CAMERA_IN_USE` | Camera is in use by another app or tab (`NotReadableError`). |
| `CAMERA_NOT_FOUND` | No camera device found. |
| `FACE_NOT_DETECTED` | No face seen within `faceDetectionTimeout`. |
| `MODEL_LOAD_FAILED` | MediaPipe model failed to load (network, CDN, or WASM). |
| `MULTIPLE_FACES` | More than one face in frame; process stops, use `retry()` to try again. |
| `NOT_ALLOWED` | Camera not supported (e.g. non-HTTPS, no `mediaDevices`, insecure context). |
| `OVERCONSTRAINED` | Requested camera constraints (e.g. resolution, `facingMode`) not supported. |
| `PERMISSION_DENIED` | User denied camera access. |
| `PLAY_FAILED` | Video failed to play (e.g. autoplay policy; user may need to tap "Start"). |
| `UNKNOWN` | Other errors. |

On `MULTIPLE_FACES`, `FACE_NOT_DETECTED`, `MODEL_LOAD_FAILED`, or `PLAY_FAILED` the process stops; call `retry()` to restart.

## Publishing

- Run `pnpm run build` before publishing (or rely on `prepublishOnly`).
- Package ships only `dist/` and `README.md` (`files` in `package.json`).
- React is a peer dependency; consumers must install it.

## License

MIT
