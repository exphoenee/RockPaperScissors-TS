export default function nextEnum<T extends number>(
  current: T,
  enumType: any
): T {
  const keys = Object.keys(enumType).filter((k) => isNaN(Number(k)));
  const max = Number(keys[keys.length - 1]);
  const next = current + 1 > max ? enumType[keys[0]] : current + 1;
  return next as T;
}
