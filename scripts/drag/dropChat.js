async function dropChat(e, destinationFolderId, destinationChat) {
  e.preventDefault();

  const sourceFolderId = e.dataTransfer.getData("sourceFolderId");
  const draggedChatName = e.dataTransfer.getData("chatName");
  const draggedChatHref = e.dataTransfer.getData("chatHref");
  const draggedChat = {
    href: draggedChatHref,
    name: draggedChatName,
  };

  if (sourceFolderId === destinationFolderId) {
    await dropChatInSameFolder(sourceFolderId, draggedChat, destinationChat);
  } else {
    await dropChatInDifferentFolder(
      sourceFolderId,
      destinationFolderId,
      draggedChat,
      destinationChat
    );
  }
}

async function dropChatInDifferentFolder(
  sourceFolderId,
  destinationFolderId,
  draggedChat,
  destinationChat
) {
  let { [destinationFolderId]: destinationFolder = [] } =
    await chrome.storage.local.get([destinationFolderId]);

  // duplicate
  if (destinationFolder.some((chat) => chat.href === draggedChat.href)) return;

  let { [sourceFolderId]: sourceFolder = [] } = await chrome.storage.local.get([
    sourceFolderId,
  ]);

  let draggedIndex = sourceFolder.findIndex(
    (chat) => chat.href === draggedChat.href
  );
  sourceFolder.splice(draggedIndex, 1);

  let destinationIndex = destinationFolder.findIndex(
    (chat) => chat.href === destinationChat?.href
  );
  if (destinationIndex < 0) destinationIndex = destinationFolder.length;
  destinationFolder.splice(destinationIndex, 0, draggedChat);

  chrome.storage.local.set({
    [sourceFolderId]: sourceFolder,
  });
  chrome.storage.local.set({
    [destinationFolderId]: destinationFolder,
  });
}

async function dropChatInSameFolder(folderId, draggedChat, destinationChat) {
  let { [folderId]: folder = [] } = await chrome.storage.local.get([folderId]);

  let draggedIndex = folder.findIndex((chat) => chat.href === draggedChat.href);
  folder.splice(draggedIndex, 1);

  let destinationIndex = folder.findIndex(
    (chat) => chat.href === destinationChat?.href
  );
  if (destinationIndex < 0) destinationIndex = folder.length;
  console.log(destinationIndex);
  folder.splice(destinationIndex, 0, draggedChat);

  chrome.storage.local.set({
    [folderId]: folder,
  });
}
