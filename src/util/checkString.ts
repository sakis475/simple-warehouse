export async function isJson(str: string) {
  try {
    await JSON.parse(str);
  } catch (e) {
    console.log(e);
    return false;
  }
  return true;
}
