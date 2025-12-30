function withdraw() {
  let today = new Date().getDay(); // Monday = 1

  if (today !== 1) {
    alert("Withdraw শুধু সোমবার করা যাবে");
    return;
  }

  if (balance < minWithdraw) {
    alert("Minimum withdraw ৳" + minWithdraw);
    return;
  }

  let withdrawAmount = Math.min(balance, maxBalance);

  // ===== TELEGRAM CONFIG =====
  let BOT_TOKEN = "8562951849:AAFxWHbHtVrESTydp6MVejuEGECIDbyiZds";
  let ADMIN_ID = "7279123256";

  let message =
    "📤 New Withdraw Request\n\n" +
    "💰 Amount: ৳" + withdrawAmount + "\n" +
    "👤 User Balance: ৳" + balance + "\n" +
    "📅 Day: Monday";

  let url =
    "https://api.telegram.org/bot" +
    BOT_TOKEN +
    "/sendMessage?chat_id=" +
    ADMIN_ID +
    "&text=" +
    encodeURIComponent(message);

  fetch(url);

  alert(
    "Withdraw request sent!\n" +
    "Amount: ৳" + withdrawAmount +
    "\nAdmin approve করবে।"
  );
}
