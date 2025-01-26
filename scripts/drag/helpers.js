function getFolderFromFolders(folders, targetFolderId) {
  for (let folder of folders) {
    if (folder.id === targetFolderId) return folder;

    if (folder.children && folder.children.length > 0) {
      const result = getFolderFromFolders(folder.children, targetFolderId);
      if (result) return result;
    }
  }
  return null;
}

function removeFolderFromFolders(folders, targetFolderId) {
  return folders.filter((folder) => {
    if (folder.id === targetFolderId) return false;

    if (folder.children && folder.children.length > 0) {
      folder.children = removeFolderFromFolders(
        folder.children,
        targetFolderId
      );
    }

    return true;
  });
}

function addFolderToFolders(folders, destinationFolderId, newFolder) {
  folders.forEach((folder) => {
    if (folder.id === destinationFolderId) {
      if (!folder.children) folder.children = [];
      folder.children.push(newFolder);
    }

    if (folder.children && folder.children.length > 0) {
      addFolderToFolders(folder.children, destinationFolderId, newFolder);
    }
  });

  return folders;
}

function getParentFromFolders(folders, targetFolderId, parent = null) {
  for (let folder of folders) {
    if (folder.id === targetFolderId) return parent;

    if (folder.children && folder.children.length > 0) {
      const result = getParentFromFolders(
        folder.children,
        targetFolderId,
        folder
      );
      if (result) return result;
    }
  }

  return null;
}

function replaceFolderInFolders(folders, targetFolderId, newFolder) {
  return folders.map((folder) => {
    if (folder.id === targetFolderId) return newFolder;

    if (folder.children && folder.children.length > 0) {
      folder.children = replaceFolderInFolders(
        folder.children,
        targetFolderId,
        newFolder
      );
    }

    return folder;
  });
}

function getChildIdsFromFolders(folders, targetId) {
  for (let folder of folders) {
    if (folder.children && folder.children.length > 0) {
      if (folder.id === targetId) return collectChildIds(folder.children);

      const result = getChildIdsFromFolders(folder.children, targetId);
      if (result) return result;
    }
  }
  return [];
}

function collectChildIds(children) {
  let ids = [];

  for (let child of children) {
    ids.push(child.id);

    if (child.children && child.children.length > 0) {
      ids = ids.concat(collectChildIds(child.children));
    }
  }
  return ids;
}
