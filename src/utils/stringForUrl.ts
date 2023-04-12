export function stringForUrl(text: string) {
  return text.trim().toLowerCase().replace(/\s+/g, "-");
}
