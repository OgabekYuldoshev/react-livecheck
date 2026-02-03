# react-livecheck

React hook for **person liveness detection** — verify that a user is a real live person via blink detection (MediaPipe Face Mesh). Build your own UI; the hook handles camera, face detection, and pass/fail state.

## Installation

```bash
pnpm add react-livecheck
```

Requires **React 19** and peer dependency `react`. MediaPipe model files load from jsDelivr CDN by default; an internet connection is required unless you provide a custom `locateFile`.

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
    <div>
      {!isReady && <p>Starting camera…</p>}
      <video ref={videoRef} autoPlay playsInline muted />
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
| `retry` | `() => void` | Clear error and restart (e.g. after permission grant). |

### Error codes (`LivenessErrorCode`)

- `CAMERA_NOT_FOUND` — No camera device.
- `PERMISSION_DENIED` — User denied camera access.
- `NOT_ALLOWED` — Environment doesn’t support camera (e.g. non-HTTPS, no `mediaDevices`).
- `MODEL_LOAD_FAILED` — MediaPipe model failed to load.
- `FACE_NOT_DETECTED` — No face seen within `faceDetectionTimeout`.
- `MULTIPLE_FACES` — More than one face in frame.
- `UNKNOWN` — Other errors.

## License

ISC
