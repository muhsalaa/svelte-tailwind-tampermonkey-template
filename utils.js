export const createBanner = (metadata) => {
  const bannerLines = Object.entries(metadata).map(
    ([key, value]) => `// @${key} ${value}`
  );
  const banner = `// ==UserScript==\n${bannerLines.join(
    "\n"
  )}\n// ==/UserScript==`;
  return banner;
};
