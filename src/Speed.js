// Speed is measured in pixels per millisecond

export const REFRESH_RATE = 1000 / 60;
export const PADDLE_MOVE_SPEED = 0.35;

// speed: mesasured in pixels per millsecond
// timeDifference: milliseconds since last render
export function getPixelChange(speed, timeDifference) {
  return speed * timeDifference;
}
