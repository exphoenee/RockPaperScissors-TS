// This is a generic function that returns the first value of an object
// It's used to get the first value of the enum usedLangs and gameNames
// to set the deafult state

export default function getFirstValue<T extends object>(obj: T): T[keyof T] {
  return obj[Object.keys(obj)[0] as keyof T];
}
