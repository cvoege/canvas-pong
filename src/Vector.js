export function zeroVector() {
  return {
    vx: 0,
    vy: 0,
  };
}

export function getVectorX(vector) {
  return vector.vx;
}

export function getVectorY(vector) {
  return vector.vy;
}

export function getVectorAngle(vector) {
  return Math.atan2(vector.vy, vector.vx);
}

export function getVectorMagnitude(vector) {
  // Ty pythagorus
  return Math.sqrt(vector.vx ** 2 + vector.vy ** 2);
}

export function getDirectionVector(vector) {
  return {
    angle: getVectorAngle(vector),
    magnitude: getVectorMagnitude(vector),
  };
}

export function getVectorFromDirectionVector(directionVector) {
  const vx = Math.cos(directionVector.angle) * directionVector.magnitude;
  const vy = Math.sin(directionVector.angle) * directionVector.magnitude;
  return {
    vx,
    vy,
  };
}

export function reflectOnXAxis(vector) {
  return { ...vector, vy: -vector.vy };
}

export function reflectOnYAxis(vector) {
  return { ...vector, vx: -vector.vx };
}

export function addVectors(vector1, vector2) {
  return {
    vx: vector1.vx + vector2.vx,
    vy: vector1.vy + vector2.vy,
  };
}

export function mulityVectorByScalar(vector, scalar) {
  return {
    vx: vector.vx * scalar,
    vy: vector.vy * scalar,
  };
}
