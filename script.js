// ===== NAVIGATION =====
function show(id) {
  document.getElementById("home").style.display = "none";
  document.getElementById("task").style.display = "none";
  document.getElementById("wallet").style.display = "none";
  document.getElementById("withdraw").style.display = "none";
  document.getElementById(id).style.display = "block";
}

// ===== SETTINGS =====
const earnPerAd = 1;        // প্রতি Ad = ৳1
const dailyLimit = 101;    // Daily limit
const minWithdraw = 1000;  // Minimum withdraw
const maxWithdraw = 2500;  // Max per withdraw

// ===== STORAGE =====
let todayEarn = Number(localStorage.getItem("todayEarn")) || 0;
let balance = Number(localStorage.getItem("balance")) || 0;

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  updateWallet();

  const btn = document.getElementById("earnBtn");
  if (btn) btn.onclick = earn;
});

// ===== EARN (SMARTLINK OPEN + REWARD) =====
function earn() {
  if (todayEarn + earnPerAd > dailyLimit) {
    alert("আজকের ডেইলি লিমিট শেষ!");
    return;
  }

  // 🎯 আপনার Smartlink (Adsterra) URL
  const adLink = "https://www.effectivegatecpm.com/quh0jxz32?key=cb9ff7d552cf0f98b6a20593c2d9b2c2";

  // 🚀 নতুন ট্যাবে Ad open
  window.open(adLink, "_blank");

  // ⏱️ Delay দিয়ে Earn Add
  setTimeout(() => {
    todayEarn += earnPerAd;
    balance += earnPerAd;

    localStorage.setItem("todayEarn", todayEarn);
    localStorage.setItem("balance", balance);

    updateWallet();
    alert("✅ Ad দেখানো হয়েছে! ৳1 যোগ হয়েছে");
  }, 4000);  // 4 seconds delay
}

// ===== WITHDRAW =====
const BOT_TOKEN = "8562951849:AAFxWHbHtVrESTydp6MVejuEGECIDbyiZds";
const ADMIN_ID = "7279123256";

function withdraw() {
  const day = new Date().getDay(); // Monday = 1
  const method = document.getElementById("method").value;

  if (day !== 1) {
    alert("Withdraw শুধু সোমবার করা যাবে");
    return;
  }

  if (balance < minWithdraw) {
    alert("Minimum withdraw ৳" + minWithdraw);
    return;
  }

  if (!method) {
    alert("Payment method select করুন");
    return;
  }

  const amount = Math.min(balance, maxWithdraw);
  sendWithdrawToAdmin(amount, method);

  alert(
    "📤 Withdraw request sent!\n" +
      "Amount: ৳" + amount + "\n" +
      "Method: " + method + "\n" +
      "Admin approve করবে!"
  );
}

function sendWithdrawToAdmin(amount, method) {
  const text =
    "📤 New Withdraw Request\n\n" +
    "💰 Amount: ৳" + amount + "\n" +
    "💳 Method: " + method + "\n" +
    "📅 Day: Monday";

  const url =
    "https://api.telegram.org/bot" +
    BOT_TOKEN +
    "/sendMessage?chat_id=" +
    ADMIN_ID +
    "&text=" +
    encodeURIComponent(text);

  fetch(url);
}

// ===== WALLET UI =====
function updateWallet() {
  const w = document.getElementById("walletText");
  if (w) {
    w.innerHTML =
      "Balance: ৳" + balance.toFixed(2) +
      "<br>Today Earned: ৳" + todayEarn.toFixed(2);
  }
}
