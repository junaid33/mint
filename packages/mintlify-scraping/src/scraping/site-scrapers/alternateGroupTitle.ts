export default function alternateGroupTitle(firstLink: cheerio.Cheerio, pages) {
  // Only assign titles to nested navigation menus outside a section.
  // Others should not have a title so we can merge them into one section.
  if (pages.length > 0) {
    return firstLink?.text();
  }
  return "";
}
