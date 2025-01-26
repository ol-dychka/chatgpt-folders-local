function createChatOptions(chat, folderId, chatNode, close) {
  const container = document.createElement("div");
  container.classList.add("options-container");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("styled-button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    handleChatDelete(chat, folderId, chatNode);
    close();
  });

  container.appendChild(deleteButton);

  return container;
}

async function handleChatDelete(chat, folderId, chatNode) {
  const { [folderId]: targetFolder = [] } = await chrome.storage.local.get([
    folderId,
  ]);

  await chrome.storage.local.set({
    [folderId]: targetFolder.filter((x) => x.href !== chat.href),
  });

  chatNode.parentNode.removeChild(chatNode);
}
