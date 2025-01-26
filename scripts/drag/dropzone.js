function createDropzone(handleDrop) {
  const dropzone = document.createElement("div");
  dropzone.classList.add("dropzone");

  dropzone.addEventListener(
    "drop",
    (e) => {
      handleDrop(e);
      e.target.classList.remove("dragover");
    },
    false
  );

  dropzone.addEventListener("dragover", (e) => e.preventDefault(), false);

  dropzone.addEventListener("dragenter", (e) =>
    e.target.classList.add("dragover")
  );

  dropzone.addEventListener("dragleave", (e) =>
    e.target.classList.remove("dragover")
  );

  return dropzone;
}
