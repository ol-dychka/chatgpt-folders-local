async function createChatMenu(name, href, close) {
  let selectedFolders = [];

  const addToSelected = (folderId) => {
    selectedFolders.push(folderId);
  };

  const removeFromSelected = (folderId) => {
    selectedFolders = selectedFolders.filter((id) => id !== folderId);
  };

  const chatMenuContainer = document.createElement("div");
  chatMenuContainer.classList.add("menu-container");

  const controls = document.createElement("div");
  controls.classList.add("flex-between");

  const label = document.createElement("p");
  label.classList.add("chat-menu-label");
  label.textContent = `Add chat "${name}" to a folder`;

  const closeButton = document.createElement("button");
  closeButton.classList.add("styled-button");
  closeButton.textContent = "×";

  closeButton.addEventListener("click", close);

  controls.appendChild(label);
  controls.appendChild(closeButton);

  const { folders = [] } = await chrome.storage.local.get("folders");
  const folderListNode = document.createElement("div");
  createFolderList(
    folders,
    addToSelected,
    removeFromSelected,
    folderListNode,
    0
  );

  const addChatButton = document.createElement("button");
  addChatButton.classList.add("styled-button");
  addChatButton.textContent = "Add Chat";

  addChatButton.addEventListener("click", () => {
    console.log(selectedFolders);
    handleAddChat(name, href, selectedFolders);
    close();
  });

  chatMenuContainer.appendChild(controls);
  chatMenuContainer.appendChild(folderListNode);
  chatMenuContainer.appendChild(addChatButton);
  return chatMenuContainer;
}

function createFolderList(
  folders,
  addToSelected,
  removeFromSelected,
  container,
  indent
) {
  folders.forEach((folder) => {
    const folderSelectHeader = document.createElement("div");
    folderSelectHeader.classList.add("folder-select-header");

    const checkbox = document.createElement("input");
    checkbox.classList.add("styled-checkbox");
    checkbox.type = "checkbox";
    checkbox.addEventListener("click", () => {
      if (checkbox.checked) addToSelected(folder.id);
      else removeFromSelected(folder.id);
    });

    const label = document.createElement("p");
    label.classList.add("chat-menu-label");
    label.textContent = folder.name;

    folderSelectHeader.appendChild(checkbox);
    folderSelectHeader.appendChild(label);
    folderSelectHeader.style.marginLeft = `${0.5 * indent}rem`;

    container.appendChild(folderSelectHeader);

    if (folder.children && folder.children.length > 0)
      createFolderList(
        folder.children,
        addToSelected,
        removeFromSelected,
        container,
        indent + 1
      );
  });
  return container;
}

function handleAddChat(name, href, selectedFolders) {
  if (!selectedFolders) return;
  selectedFolders.forEach(async (folderId) => {
    const { [folderId]: folder = [] } = await chrome.storage.local.get([
      folderId,
    ]);
    if (folder.some((chat) => chat.href === href)) return;
    chrome.storage.local.set({ [folderId]: [...folder, { name, href }] });
  });
  updateFolders();
}
