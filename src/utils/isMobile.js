// Simple runtime check used to skip heavy cursor/particle effects on touch devices.
export default function isMobile() {
  if (typeof window === "undefined") return false;
  const coarsePointer = window.matchMedia?.("(pointer: coarse)").matches;
  const narrowViewport = window.innerWidth < 768;
  return Boolean(coarsePointer || narrowViewport);
}
