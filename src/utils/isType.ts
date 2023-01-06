export default function isType<T>(obj: any, type: T): obj is T {
  const keys = Object.keys(type);
  for (const key of keys) {
    if (obj[key] === undefined) {
      return false;
    }
  }
  return true;
}
