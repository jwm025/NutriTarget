
const toggleMode = document.querySelector("#mode");
const mainContent = document.querySelector("#mainContent");
const output = document.querySelector("#output");
const settingModal1 = document.querySelector("#setting-modal");
const recallModal = document.querySelector(".recall-modal");
const saveModal = document.querySelector(".saving-modal");
const recallOutput = document.querySelector("#recall-output");

toggleMode.addEventListener("change", () => {
  const selectMode = toggleMode.value;

  if (selectMode === "dark") {
    document.body.classList.add("dark");
    mainContent.classList.add("dark");
    calcForm.classList.add("dark");
    output.classList.add("dark");
    activityError.classList.add("dark");
    settingModal1.classList.add("dark");
    recallModal.classList.add("dark");
    saveModal.classList.add("dark");
    recallOutput.classList.add("dark");
    document.getElementById("chat-window").classList.add("dark");
    document.getElementById("chat-header").classList.add("dark");
  } else {
    document.body.classList.remove("dark");
    mainContent.classList.remove("dark");
    calcForm.classList.remove("dark");
    output.classList.remove("dark");
    activityError.classList.remove("dark");
    settingModal1.classList.remove("dark");
    recallModal.classList.remove("dark");
    saveModal.classList.remove("dark");
    recallOutput.classList.remove("dark");
    document.getElementById("chat-window").classList.remove("dark");
    document.getElementById("chat-header").classList.remove("dark");
  }
});
