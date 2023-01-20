export default function checkStrIsInEnum(
  str: string,
  enumObj: { [key: string]: string }
): string {
  const values = Object.values(enumObj);
  return values.includes(str) ? str : values[0];
}
