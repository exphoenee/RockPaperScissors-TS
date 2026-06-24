export default function checkStrIsInEnum(
  str: string,
  enumObj: { [key: string]: string }
): string {
  const values = Object.values(enumObj);
  if (!values.includes(str)) {
    throw new Error(`"${str}" is not a valid enum value`);
  }
  return str;
}
