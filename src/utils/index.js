export function deepCopy(obj) {
  try {
    if (obj !== undefined) {
      const res = JSON.parse(JSON.stringify(obj));
      return res;
    }
    return {};
  } catch (e) {
    console.error(e);
    return {};
  }
}
