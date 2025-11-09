// this function takes theme as an argument and adjust chat, button and text colors

function setTheme(themeClass) {
  const theme = themeClass.split(" ")[0];
  if (theme === "dark") {
    document.documentElement.style.setProperty("--hover-color", "#212121");
    document.documentElement.style.setProperty("--text-color", "#ececec");
    document.documentElement.style.setProperty(
      "--text-inactive-color",
      "#b4b4b4"
    );
    document.documentElement.style.setProperty("--bg-color", "#212121");
    document.documentElement.style.setProperty("--input-color", "#2f2f2f");
  } else {
    document.documentElement.style.setProperty("--hover-color", "#ececec");
    document.documentElement.style.setProperty("--text-color", "#000000");
    document.documentElement.style.setProperty(
      "--text-inactive-color",
      "#5d5d5d"
    );
    document.documentElement.style.setProperty("--bg-color", "#ffffff");
    document.documentElement.style.setProperty("--input-color", "#f4f4f4");
  }
}
