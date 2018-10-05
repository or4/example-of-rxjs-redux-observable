export function getRelativeCoordinates(event: any): { x: number; y: number; } {
  return {
    x: event.clientX,
    y: event.clientY,
  }
}