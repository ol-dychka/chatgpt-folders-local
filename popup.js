// Get the <ul> element with id "itemList"
const itemList = document.getElementById("folderList");

chrome.storage.local.get("folders").then((result) => {
  const folders = result.folders || [];
  folders.forEach((folder) => {
    const li = document.createElement("li");
    li.innerText = folder;
    const ul = document.createElement("ul");

    chrome.storage.local.get([folder]).then((result) => {
      const items = result[folder] || [];
      items.forEach((item) => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href = item;
        a.innerText = item;
        a.target = "_blank";

        li.appendChild(a);
        ul.appendChild(li);
      });
    });
    li.appendChild(ul);
    itemList.appendChild(li);
  });
});
