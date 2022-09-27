export function htmlDecode(str: string) {
  let withLineBreaks = str.replace(/<p>/g,"\n\n")
  const doc = new DOMParser().parseFromString(withLineBreaks, "text/html");
  return doc.documentElement.textContent;
}