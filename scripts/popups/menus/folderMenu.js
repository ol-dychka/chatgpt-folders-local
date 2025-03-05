function createFolderMenu(close) {
  const folderMenuContainer = document.createElement("div");
  folderMenuContainer.classList.add("menu-container");

  const controls = document.createElement("div");
  controls.classList.add("flex-between");

  const label = document.createElement("p");
  label.classList.add("folder-menu-label");
  label.textContent = "Create a New Folder";

  const closeButton = document.createElement("button");
  closeButton.classList.add("styled-button");
  closeButton.textContent = "×";

  closeButton.addEventListener("click", close);

  controls.appendChild(label);
  controls.appendChild(closeButton);

  const inputs = document.createElement("div");
  inputs.classList.add("flex-between", "folder-menu-inputs");

  const nameInput = document.createElement("input");
  nameInput.classList.add("styled-input");

  const colorInput = document.createElement("input");
  colorInput.type = "color";
  colorInput.value = generateHexCode();

  inputs.appendChild(nameInput);
  inputs.appendChild(colorInput);

  const addFolderButton = document.createElement("button");
  addFolderButton.classList.add("styled-button");
  addFolderButton.textContent = "Add Folder";

  addFolderButton.addEventListener("click", () => {
    handleAddFolder(nameInput.value, colorInput.value);
    close();
  });

  folderMenuContainer.appendChild(controls);
  folderMenuContainer.appendChild(inputs);
  folderMenuContainer.appendChild(addFolderButton);

  return folderMenuContainer;
}

async function handleAddFolder(name, color) {
  if (/\S/.test(name)) {
    // string is not empty and not just whitespace
    const { folders = [] } = await chrome.storage.local.get("folders");
    const id = generateUniqueId();

    folders.push({ id: id.toString(), name, color, open: true });
    chrome.storage.local.set({ folders: folders });
    await updateFolders();
  }
}

function generateHexCode() {
  const res =
    "#" + ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0");
  // console.log(res);
  return res;
}

function generateUniqueId() {
  return "id-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9);
}
