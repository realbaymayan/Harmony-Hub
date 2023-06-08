//KOYU MOD AÇIK MOD
const themeToggle = document.getElementById("theme-toggle");
const contentDiv = document.getElementById("content");

themeToggle.addEventListener("click", function () {
  contentDiv.classList.toggle("light-mode");
});
