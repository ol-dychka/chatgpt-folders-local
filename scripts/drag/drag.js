let isFolderDropping = false;
let isChatDropping = false;

async function handleDropToFolder(e, folderId, destinationChat) {
  const type = e.dataTransfer.getData("type");
  if (type === "chat") {
    if (isChatDropping) return;
    isChatDropping = true;

    await dropChat(e, folderId, destinationChat);

    isChatDropping = false;
  } else if (type === "folder") {
    if (isFolderDropping) return;
    isFolderDropping = true;

    await dropFolderToFolder(e, folderId);

    isFolderDropping = false;
  }
  await updateFolders();
}

async function handleDropFolder(e, destinationFolderId) {
  const type = e.dataTransfer.getData("type");
  if (type === "folder") {
    if (isFolderDropping) return;
    isFolderDropping = true;

    await dropFolder(e, destinationFolderId);

    isFolderDropping = false;
  }
  await updateFolders();
}

async function handleDropChat(e, folderId, chat) {
  const type = e.dataTransfer.getData("type");
  if (type === "chat") {
    if (isChatDropping) return;
    isChatDropping = true;

    await dropChat(e, folderId, chat);

    isChatDropping = false;
  }
  await updateFolders();
}

async function handleDropOutside(e) {
  const type = e.dataTransfer.getData("type");
  if (type === "folder") {
    if (isFolderDropping) return;
    isFolderDropping = true;

    await dropFolderOutside(e);

    isFolderDropping = false;
  }
  await updateFolders();
}

function handleDragFolder(e, folderId) {
  e.dataTransfer.setData("type", "folder");
  e.dataTransfer.setData("draggedFolderId", folderId);
}

function handleDragChat(e, chat, folder) {
  e.dataTransfer.setData("type", "chat");
  e.dataTransfer.setData("chatName", chat.name);
  e.dataTransfer.setData("chatHref", chat.href);
  e.dataTransfer.setData("sourceFolderId", folder.id);
}
