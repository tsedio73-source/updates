const TRACKING_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";
const VISIT_KEY = "laxmi-first-tap-recorded";
const zone = document.getElementById("buttonZone");
const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");
const hint = document.getElementById("hint");
const celebration = document.getElementById("celebration");
const againButton = document.getElementById("againButton");

let yesMoves = 0;
let noMoves = 0;
const messages = ["Hmm… try catching it again.", "The buttons are feeling shy today.", "Almost! Maybe one more tap?", "Laxmi, this is getting interesting…"];

function recordFirstTap(answer) {
  if (localStorage.getItem(VISIT_KEY)) return;
  localStorage.setItem(VISIT_KEY, answer);
  hint.textContent = "Your answer has been recorded ♥";

  if (!TRACKING_ENDPOINT || TRACKING_ENDPOINT.includes("PASTE_YOUR")) return;
  const payload = {
    answer,
    tappedAt: new Date().toISOString(),
    page: window.location.href,
    userAgent: navigator.userAgent,
    language: navigator.language,
    screen: `${window.screen.width}x${window.screen.height}`
  };
  fetch(TRACKING_ENDPOINT, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    keepalive: true
  }).catch(() => {
    // The local record remains saved even if the network is unavailable.
  });
}

function moveButton(button, moveCount) {
  const padding = 8;
  const maxLeft = Math.max(padding, zone.clientWidth - button.offsetWidth - padding);
  const maxTop = Math.max(8, zone.clientHeight - button.offsetHeight - 8);
  const currentLeft = button.offsetLeft;
  const currentTop = button.offsetTop;
  let left = padding + Math.random() * Math.max(0, maxLeft - padding);
  let top = 8 + Math.random() * Math.max(0, maxTop - 8);
  if (Math.abs(left - currentLeft) < 45) left = (left + maxLeft / 2) % Math.max(maxLeft, 1);
  if (Math.abs(top - currentTop) < 25) top = (top + maxTop / 2) % Math.max(maxTop, 1);
  button.style.left = `${Math.round(left)}px`;
  button.style.top = `${Math.round(top)}px`;
  hint.textContent = messages[moveCount % messages.length];
}

function showCelebration() {
  celebration.hidden = false;
  document.body.style.overflow = "hidden";
  againButton.focus({ preventScroll: true });
}

function resetButtons() {
  yesMoves = 0;
  noMoves = 0;
  yesButton.style.left = "";
  yesButton.style.top = "";
  noButton.style.left = "";
  noButton.style.top = "";
  hint.textContent = localStorage.getItem(VISIT_KEY) ? "Your answer has been recorded ♥" : "Tap an answer to see what happens";
  celebration.hidden = true;
  document.body.style.overflow = "";
  yesButton.focus({ preventScroll: true });
}

yesButton.addEventListener("click", () => {
  recordFirstTap("Yes");
  yesMoves += 1;
  moveButton(yesButton, yesMoves);
  if (yesMoves > 2) hint.textContent = "Okay, okay… you really mean it!";
  if (yesMoves >= 4) showCelebration();
});

noButton.addEventListener("click", () => {
  recordFirstTap("No");
  noMoves += 1;
  moveButton(noButton, noMoves);
  hint.textContent = "The ‘No’ button is running away…";
});

noButton.addEventListener("pointerenter", () => {
  if (window.matchMedia("(pointer: fine)").matches) {
    noMoves += 1;
    moveButton(noButton, noMoves);
  }
});

againButton.addEventListener("click", resetButtons);
celebration.addEventListener("click", (event) => {
  if (event.target === celebration) resetButtons();
});
