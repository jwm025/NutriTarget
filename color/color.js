const toggleMode = document.querySelector("#mode");
const mainContent = document.querySelector("#mainContent");
const output = document.querySelector("#output");
const settingModal1 = document.querySelector("#setting-modal");

toggleMode.addEventListener("change", () => {
  const selectMode = toggleMode.value;

  if (selectMode === "dark") {
    document.body.classList.add("dark");
    mainContent.classList.add("dark");
    calcForm.classList.add("dark");
    output.classList.add("dark");
    activityError.classList.add("dark");
    settingModal1.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
    mainContent.classList.remove("dark");
    calcForm.classList.remove("dark");
    output.classList.remove("dark");
    activityError.classList.remove("dark");
    settingModal1.classList.remove("dark");
  }
});
