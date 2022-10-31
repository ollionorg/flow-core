export default function isValidHttpUrl(stringurl: string) {
  let url;

  try {
    url = new URL(stringurl);
  } catch (_) {
    return false;
  }
  return url.protocol === "http:" || url.protocol === "https:";
}
