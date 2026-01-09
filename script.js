// ===== NAVIGATION =====
function show(id) {
  ["home", "task", "wallet", "withdraw"].forEach(sec => {
    const el = document.getElementById(sec);
    if (el) el.style.display = "none";
  });
  const active = document.getElementById(id);
  if (active) active.style.display = "block";
}

// ===== SETTINGS =====
const earnPerAd = 1;
const dailyLimit = 50;
const minWithdraw = 1000;
const maxWithdraw = 2500;

// ===== STORAGE =====
let todayEarn = Number(localStorage.getItem("todayEarn")) || 0;
let balance = Number(localStorage.getItem("balance")) || 0;

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  updateWallet();
  const btn = document.getElementById("earnBtn");
  if (btn) btn.addEventListener("click", earn);
});

// ===== EARN =====
function earn() {
  if (todayEarn >= dailyLimit) {
    alert("❌ আজকের লিমিট শেষ");
    return;
  }

  const adLink = "https://www.effectivegatecpm.com/quh0jxz32?key=cb9ff7d552cf0f98b6a20593c2d9b2c2";
  window.open(adLink, "_blank");

  setTimeout(() => {
    todayEarn += earnPerAd;
    balance += earnPerAd;

    localStorage.setItem("todayEarn", todayEarn);
    localStorage.setItem("balance", balance);

    updateWallet();
    alert("✅ ৳1 যোগ হয়েছে");
  }, 4000);
}

// ===== WITHDRAW (NO BOT TOKEN HERE) =====
function withdraw() {
  if (balance < minWithdraw) {
    alert("Minimum withdraw ৳" + minWithdraw);
    return;
  }

  const amount = Math.min(balance, maxWithdraw);
  alert(
    "📤 Withdraw Request Sent\n" +
    "Amount: ৳" + amount + "\n" +
    "Admin approve করবে"
  );
}

// ===== WALLET UI =====
function updateWallet() {
  const w = document.getElementById("walletText");
  if (w) {
    w.innerHTML =
      "Balance: ৳" + balance +
      "<br>Today: ৳" + todayEarn + " / " + dailyLimit;
  }
}
