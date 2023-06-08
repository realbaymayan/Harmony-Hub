//ARKADAŞ AKTİVİTESİ
const myDiv = document.getElementById("friends-activity");
const hideButton = document.getElementById("friends-activity-button");

hideButton.onclick = function () {
  if (myDiv.classList.contains("show")) {
    myDiv.classList.remove("show");
    myDiv.classList.add("hide");

    setTimeout(() => {
      myDiv.style.width = "0";
      myDiv.classList.remove("hide");
    }, 500); // Delay width reset to match the transition duration
  } else {
    myDiv.style.width = "350px";
    myDiv.classList.add("show");
  }
};
