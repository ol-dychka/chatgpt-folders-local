function createFolderOptions(folder, folderNameNode, optionsButton, close) {
  const container = document.createElement("div");
  container.classList.add("options-container");

  const editNameButton = document.createElement("button");
  editNameButton.classList.add("styled-button");
  editNameButton.innerText = "Name";
  editNameButton.addEventListener("click", () => {
    handleEditFolderName(folder.id, optionsButton, folderNameNode);
    close();
  });

  const editColorButton = document.createElement("button");
  editColorButton.classList.add("styled-button");
  editColorButton.innerText = "Color";
  editColorButton.addEventListener("click", () => {
    handleEditFolderColor(folder.id, optionsButton, folderNameNode);
    close();
  });

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("styled-button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => {
    handleDeleteFolder(folder.id);
    close();
  });

  container.appendChild(editNameButton);
  container.appendChild(editColorButton);
  container.appendChild(deleteButton);

  return container;
}

async function handleDeleteFolder(id) {
  let { folders = [] } = await chrome.storage.local.get("folders");

  folders = removeFolderFromFolders(folders, id);
  chrome.storage.local.set({ folders: folders });
  chrome.storage.local.remove([id]);

  await updateFolders();
}

async function handleEditFolderColor(folderId, optionsButton, folderNameNode) {
  optionsButton.disabled = true;

  let { folders = [] } = await chrome.storage.local.get("folders");
  let folder = getFolderFromFolders(folders, folderId);

  const input = document.createElement("input");
  input.type = "color";
  input.value = folder.color;

  const saveButton = document.createElement("button");
  saveButton.classList.add("inline-colored-text-button");
  saveButton.textContent = "Save";

  folderNameNode.innerText = null;
  folderNameNode.appendChild(input);
  folderNameNode.appendChild(saveButton);

  saveButton.addEventListener("click", () => {
    folder.color = input.value;
    folders = replaceFolderInFolders(folders, folder.id, folder);
    chrome.storage.local.set({ folders: folders });

    updateFolders();
  });
}

async function handleEditFolderName(folderId, optionsButton, folderNameNode) {
  optionsButton.disabled = true;

  let { folders = [] } = await chrome.storage.local.get("folders");
  let folder = getFolderFromFolders(folders, folderId);

  const input = document.createElement("input");
  input.classList.add("styled-inline-input");
  input.value = folder.name;

  const saveButton = document.createElement("button");
  saveButton.classList.add("inline-colored-text-button");
  saveButton.textContent = "Save";

  folderNameNode.innerText = null;
  folderNameNode.appendChild(input);
  folderNameNode.appendChild(saveButton);

  saveButton.addEventListener("click", () => {
    folder.name = input.value;
    folders = replaceFolderInFolders(folders, folder.id, folder);
    chrome.storage.local.set({ folders: folders });

    updateFolders();
  });
}
