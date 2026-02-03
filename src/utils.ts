import { NOSE } from "./constants";
import type { Landmarks } from "./types";

function dist(a: Landmarks[number], b: Landmarks[number]) {
	return Math.hypot(a.x - b.x, a.y - b.y);
}

function ear(eye: Landmarks): number {
	const a = dist(eye[1], eye[5]);
	const b = dist(eye[2], eye[4]);
	const c = dist(eye[0], eye[3]);
	if (c === 0) return 0;
	return (a + b) / (2 * c);
}

function isFaceCentered(lm: Landmarks): boolean {
	const nose = lm[NOSE];
	if (!nose) return false;
	const OFFSET = 0.15;
	return Math.abs(nose.x - 0.5) < OFFSET && Math.abs(nose.y - 0.5) < OFFSET;
}

export { dist, ear, isFaceCentered };
