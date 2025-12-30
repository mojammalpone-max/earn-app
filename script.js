// ===== BASIC NAVIGATION =====
function show(id) {
  document.getElementById("home").style.display = "none";
  document.getElementById("task").style.display = "none";
  document.getElementById("wallet").style.display = "none";
  document.getElementById("withdraw").style.display = "none";
  document.getElementById(id).style.display = "block";
}

// ===== SETTINGS =====
let earnPerAd = 1;        // প্রতি Ad = ৳1
let dailyLimit = 101;    // Daily limit
let minWithdraw = 1000;  // Minimum withdraw
let maxWithdraw = 2500;  // Max per withdraw

// ===== STORAGE =====
let todayEarn = Number(localStorage.getItem("todayEarn")) || 0;
let balance = Number(localStorage.getItem("balance")) || 0;

// ===== INIT =====
document.addEventListener("DOMContentLoaded", function () {
  updateWallet();

  let btn = document.getElementById("earnBtn");
  if (btn) {
    btn.addEventListener("click", earn);
  }
});

// ===== EARN (OPEN AD EXTERNALLY) =====
function earn() {
  if (todayEarn + earnPerAd > dailyLimit) {
    alert("আজকের ডেইলি লিমিট শেষ!");
    return;
  }

  // 🔗 Adsterra Direct Link (Safe for Telegram)
  let adLink =
    "https://www.highperformanceformat.com/10047f29be68e855786a28d864276a67/";

  window.open(adLink, "_blank");

  // ⏱️ Earn after short delay
  setTimeout(() => {
    todayEarn += earnPerAd;
    balance += earnPerAd;

    localStorage.setItem("todayEarn", todayEarn);
    localStorage.setItem("balance", balance);

    updateWallet();
    alert("✅ Ad viewed! ৳1 যোগ হয়েছে");
  }, 3000);
}

// ===== WITHDRAW =====
const BOT_TOKEN = "8562951849:AAFxWHbHtVrESTydp6MVejuEGECIDbyiZds";
const ADMIN_ID = "7279123256";

function withdraw() {
  let today = new Date().getDay(); // Monday = 1
  let method = document.getElementById("method").value;

  if (today !== 1) {
    alert("Withdraw শুধু সোমবার করা যাবে");
    return;
  }

  if (balance < minWithdraw) {
    alert("Minimum withdraw ৳" + minWithdraw);
    return;
  }

  if (method === "") {
    alert("Payment method select করুন");
    return;
  }

  let amount = Math.min(balance, maxWithdraw);
  sendWithdrawToAdmin(amount, method);

  alert(
    "Withdraw request sent!\n" +
      "Amount: ৳" + amount +
      "\nMethod: " + method +
      "\nAdmin approve করবে।"
  );
}

// ===== SEND MESSAGE TO ADMIN
