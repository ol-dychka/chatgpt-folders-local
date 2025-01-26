// append "+" buttons to links
function appendButtonsToLinks() {
  const links = document.querySelectorAll("li > div > a"); // Select all link elements
  // Check if button is already appended to avoid infinite loop
  links.forEach((link) => {
    if (!link.querySelector(".custom-button")) {
      const button = document.createElement("button");
      button.innerText = "+";
      button.classList.add("add-chat-button", "inline-button");
      button.classList.add("custom-button");

      button.addEventListener("click", (e) => {
        e.preventDefault();
        attachPopup(
          (close) =>
            createChatMenu(link.firstChild.innerText, link.href, close),
          e
        );
      });

      link.appendChild(button);
    }
  });
}

// append folder menu to the nav bar
// async functions have problams with rapid mutations so flag is used here
let isRunning = false;
async function appendFolders() {
  if (isRunning) return;
  console.log("fld running");

  try {
    isRunning = true;
    const nav = document.querySelector("nav");
    const target = nav.getElementsByTagName("div")[2];

    if (!target.querySelector(".folders")) {
      const folders = await getFolders();
      console.log(folders);
      target.insertBefore(folders, target.firstChild);
    }
  } catch (err) {
    console.log(err);
  } finally {
    isRunning = false;
  }
}
