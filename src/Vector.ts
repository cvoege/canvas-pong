export interface Vector {
  vx: number;
  vy: number;
}

export interface DirectionVector {
  angle: number;
  magnitude: number;
}

export function zeroVector(): Vector {
  return {
    vx: 0,
    vy: 0,
  };
}

export function getVectorX(vector: Vector): number {
  return vector.vx;
}

export function getVectorY(vector: Vector): number {
  return vector.vy;
}

export function getVectorAngle(vector: Vector): number {
  return Math.atan2(vector.vy, vector.vx);
}

export function getVectorMagnitude(vector: Vector): number {
  // Ty pythagorus
  return Math.sqrt(vector.vx ** 2 + vector.vy ** 2);
}

export function getDirectionVector(vector: Vector): DirectionVector {
  return {
    angle: getVectorAngle(vector),
    magnitude: getVectorMagnitude(vector),
  };
}

export function getVectorFromDirectionVector(
  directionVector: DirectionVector,
): Vector {
  const vx = Math.cos(directionVector.angle) * directionVector.magnitude;
  const vy = Math.sin(directionVector.angle) * directionVector.magnitude;
  return {
    vx,
    vy,
  };
}

export function reflectOnXAxis(vector: Vector): Vector {
  return { ...vector, vy: -vector.vy };
}

export function reflectOnYAxis(vector: Vector): Vector {
  return { ...vector, vx: -vector.vx };
}

export function addVectors(vector1: Vector, vector2: Vector): Vector {
  return {
    vx: vector1.vx + vector2.vx,
    vy: vector1.vy + vector2.vy,
  };
}

export function mulityVectorByScalar(vector: Vector, scalar: number): Vector {
  return {
    vx: vector.vx * scalar,
    vy: vector.vy * scalar,
  };
}
