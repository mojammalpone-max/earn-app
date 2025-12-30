function show(id) {
  document.getElementById("home").style.display = "none";
  document.getElementById("task").style.display = "none";
  document.getElementById("wallet").style.display = "none";
  document.getElementById("withdraw").style.display = "none";
  document.getElementById(id).style.display = "block";
}

let dailyLimit = 30;
let todayEarn = Number(localStorage.getItem("todayEarn")) || 0;
let balance = Number(localStorage.getItem("balance")) || 0;

function earn() {
  if (todayEarn >= dailyLimit) {
    alert("আজকের earning limit শেষ!");
    return;
  }

  todayEarn += 5;
  balance += 5;

  localStorage.setItem("todayEarn", todayEarn);
  localStorage.setItem("balance", balance);

  updateWallet();
}

function withdraw() {
  if (balance < 300) {
    alert("Minimum withdraw ৳300");
    return;
  }
  alert("Withdraw request sent! Admin manually approve করবে।");
}

function updateWallet() {
  let walletText = document.getElementById("walletText");
  if (walletText) {
    walletText.innerHTML = "Balance: ৳" + balance;
  }
}

document.addEventListener("DOMContentLoaded", updateWallet);
