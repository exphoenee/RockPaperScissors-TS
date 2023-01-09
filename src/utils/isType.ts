export default function isType<T>(obj: any, type: T): obj is T {
  if (typeof obj !== "object") {
    return false;
  }
  const keys = Object.keys(type as object);
  for (const key of keys) {
    if (obj[key] === undefined) {
      return false;
    }
  }
  return true;
}
