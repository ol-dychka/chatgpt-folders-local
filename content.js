// set theme color
setTheme(document.documentElement.className);

// Observe changes in the DOM using MutationObserver
const DomObserver = new MutationObserver(async () => {
  await appendFolders();
  appendButtonsToLinks(); // Call the function on every mutation
});
// Start observing the document body for changes
DomObserver.observe(document.body, {
  childList: true, // Watch for added/removed elements
  subtree: true, // Include all descendants
});

// observe changes in theme (coming from <html> tag)
const themeObserver = new MutationObserver(() => {
  setTheme(document.documentElement.className);
});
themeObserver.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ["class"],
});
