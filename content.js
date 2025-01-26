// Observe changes in the DOM using MutationObserver
const observer = new MutationObserver(async () => {
  await appendFolders();
  appendButtonsToLinks(); // Call the function on every mutation
});
// Start observing the document body for changes
observer.observe(document.body, {
  childList: true, // Watch for added/removed elements
  subtree: true, // Include all descendants
});
