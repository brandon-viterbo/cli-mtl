export function removeWhiteSpace(str) {
  return str.replace(/\s/g, "");
}

export function deepCloneSet(originalSet) {
  return new Set(JSON.parse(JSON.stringify([...originalSet])));
}
