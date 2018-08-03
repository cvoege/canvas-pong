export function getVectorX(angle, magnitude) {
  return Math.cos(angle) * magnitude;
}

export function getVectorY(angle, magnitude) {
  return Math.sin(angle) * magnitude;
}

export function getVectorAngle(x, y) {
  return Math.atan2(y, x);
}

export function getVectorMagnitude(x, y) {
  // Ty pythagorus
  return Math.sqrt(x ** 2 + y ** 2);
}
