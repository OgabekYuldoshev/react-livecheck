import { NOSE } from "./constants";
import { type Landmarks, type LivenessError, LivenessErrorCode } from "./types";

function dist(a: Landmarks[number], b: Landmarks[number]) {
	return Math.hypot(a.x - b.x, a.y - b.y);
}

function ear(eye: Landmarks): number {
	const p0 = eye[0];
	const p1 = eye[1];
	const p2 = eye[2];
	const p3 = eye[3];
	const p4 = eye[4];
	const p5 = eye[5];
	if (
		p0 === undefined ||
		p1 === undefined ||
		p2 === undefined ||
		p3 === undefined ||
		p4 === undefined ||
		p5 === undefined
	)
		return 0;
	const a = dist(p1, p5);
	const b = dist(p2, p4);
	const c = dist(p0, p3);
	if (c === 0) return 0;
	return (a + b) / (2 * c);
}

function isFaceCentered(lm: Landmarks): boolean {
	const nose = lm[NOSE];
	if (!nose) return false;
	const OFFSET = 0.15;
	return Math.abs(nose.x - 0.5) < OFFSET && Math.abs(nose.y - 0.5) < OFFSET;
}

function getMediaErrorCode(err: unknown): LivenessError["code"] {
	if (err instanceof DOMException) {
		if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError")
			return LivenessErrorCode.PERMISSION_DENIED;
		if (err.name === "NotFoundError") return LivenessErrorCode.CAMERA_NOT_FOUND;
		if (err.name === "NotReadableError") return LivenessErrorCode.CAMERA_IN_USE;
		if (err.name === "OverconstrainedError") return LivenessErrorCode.OVERCONSTRAINED;
		if (err.name === "AbortError") return LivenessErrorCode.ABORTED;
	}
	return LivenessErrorCode.UNKNOWN;
}

export { dist, ear, isFaceCentered, getMediaErrorCode };
