// append "+" buttons to conversation "options" that appear on the side
function appendButtonsToLinks() {
  // Select all conversation options elements
  const conversationSideOptions = document.querySelectorAll("div > aside > a");
  // Check if button is already appended to avoid infinite loop
  conversationSideOptions.forEach((option) => {
    if (!option.querySelector(".custom-button")) {
      const button = document.createElement("button");
      button.innerText = "+";
      button.classList.add("add-chat-button", "inline-button");
      button.classList.add("custom-button");

      // get "a" element which is a link element containing href
      // and div with conversation name

      button.addEventListener("click", (e) => {
        e.preventDefault();
        attachPopup(
          (close) =>
            createChatMenu(
              option.firstChild.firstChild.textContent,
              option.href,
              close
            ),
          e
        );
      });

      // console.log(option);
      option.appendChild(button);
    }
  });
}

// append folder menu to the nav bar
// async functions have problams with rapid mutations so flag is used here
let isRunning = false;
async function appendFolders() {
  if (isRunning) return;
  // console.log("fld running");

  try {
    isRunning = true;
    const nav = document.querySelector("nav");
    const target = nav;
    // const target = nav.getElementsByTagName("div")[2];

    if (!target.querySelector(".folders")) {
      const folders = await getFolders();
      // console.log(folders);
      target.insertBefore(folders, target.firstChild);
    }
  } catch (err) {
    // console.log(err);
  } finally {
    isRunning = false;
  }
}
