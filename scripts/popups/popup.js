// accepts a function that creates a node and event
async function attachPopup(createPopup, e) {
  const popup = await createPopup(close);
  popup.style.position = "fixed";

  if (e.clientY < window.innerHeight / 2) popup.style.top = `${e.clientY}px`;
  else popup.style.bottom = `${window.innerHeight - e.clientY}px`;

  popup.style.left = `${e.clientX}px`;

  // click outside popup
  const outsideClickListener = (e) => {
    if (!popup.contains(e.target)) {
      console.log(e.clientY);
      close();
    }
  };

  function close() {
    document.body.removeChild(popup);
    document.body.removeEventListener("click", outsideClickListener, true);
  }

  document.body.addEventListener("click", outsideClickListener, true);

  document.body.appendChild(popup);
}
