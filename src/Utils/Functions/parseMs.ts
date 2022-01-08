/**
 * Convert milliseconds to a data Object that belongs to you.
 * @param ms Milliseconds convert to Object.
 * @returns Object data
 */
export function parseMs(ms: number) {
  return {
    days: Math.trunc(ms / 86400000),
    hours: Math.trunc(ms / 3600000) % 24,
    minutes: Math.trunc(ms / 60000) % 60,
    seconds: Math.trunc(ms / 1000) % 60,
    milliseconds: Math.trunc(ms) % 1000,
    microseconds: Math.trunc(ms * 1000) % 1000,
    nanoseconds: Math.trunc(ms * 1e6) % 1000,
  };
}
parseMs(86400000);
