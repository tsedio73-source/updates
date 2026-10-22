(() => {
  const birthdayAt = new Date("2026-10-23T00:00:00+05:30").getTime();
  const dateLabel = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(birthdayAt);
  const dateTime = document.querySelector(".countdown-footer");
  if (dateTime) dateTime.setAttribute("title", dateLabel);

  const values = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };
  const reveal = document.getElementById("birthday-reveal");
  const interactionNote = document.getElementById("interaction-note");
  const blowButton = document.getElementById("blow-button");
  const relightButton = document.getElementById("relight-button");
  const wishButton = document.getElementById("wish-button");
  const cakeCard = document.getElementById("cake-card");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let birthdayHasArrived = false;

  function updateCountdown() {
    const remaining = Math.max(0, birthdayAt - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    values.days.textContent = String(days).padStart(2, "0");
    values.hours.textContent = String(hours).padStart(2, "0");
    values.minutes.textContent = String(minutes).padStart(2, "0");
    values.seconds.textContent = String(seconds).padStart(2, "0");

    if (remaining === 0 && !birthdayHasArrived) {
      birthdayHasArrived = true;
      reveal.hidden = false;
      document.body.classList.add("birthday-time");
      interactionNote.textContent = "Midnight aa gaya — ab celebration officially shuru!";
      if (!reducedMotion.matches) launchConfetti();
    }
  }

  function blowCandles() {
    document.body.classList.add("flames-off");
    blowButton.hidden = true;
    relightButton.hidden = false;
    interactionNote.textContent = "Wish maang li? Bas, ab stars ko pata hai. ✨";
  }

  function relightCandles() {
    document.body.classList.remove("flames-off");
    relightButton.hidden = true;
    blowButton.hidden = false;
    interactionNote.textContent = "Candles phir se jal gayi — ek aur wish ready hai.";
  }

  function launchConfetti() {
    if (reducedMotion.matches) {
      interactionNote.textContent = "Tumhari wish stars tak pahunch gayi. ✨";
      return;
    }

    const canvas = document.getElementById("confetti");
    const context = canvas.getContext("2d");
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const colors = ["#e45e91", "#f4a4c2", "#f3cb72", "#ae8ec9", "#98c8aa", "#fff8e9"];
    const pieces = Array.from({ length: 105 }, () => ({
      x: Math.random() * window.innerWidth,
      y: -20 - Math.random() * window.innerHeight * 0.45,
      size: 4 + Math.random() * 6,
      speed: 2.1 + Math.random() * 3.6,
      drift: (Math.random() - 0.5) * 2.3,
      turn: Math.random() * Math.PI,
      spin: (Math.random() - 0.5) * 0.18,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: Math.random() > 0.5 ? "rect" : "circle",
    }));
    const startedAt = performance.now();
    const duration = 2600;

    function frame(now) {
      const elapsed = now - startedAt;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const opacity = Math.max(0, 1 - elapsed / duration);
      for (const piece of pieces) {
        piece.x += piece.drift;
        piece.y += piece.speed;
        piece.turn += piece.spin;
        if (piece.y > window.innerHeight + 20) piece.y = -15;
        context.globalAlpha = opacity;
        context.fillStyle = piece.color;
        context.save();
        context.translate(piece.x, piece.y);
        context.rotate(piece.turn);
        if (piece.shape === "rect") {
          context.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.62);
        } else {
          context.beginPath();
          context.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
          context.fill();
        }
        context.restore();
      }
      context.globalAlpha = 1;
      if (elapsed < duration) requestAnimationFrame(frame);
      else context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }

    requestAnimationFrame(frame);
    interactionNote.textContent = "Wish maango — confetti bhi tumhare liye! ✨";
  }

  blowButton.addEventListener("click", blowCandles);
  relightButton.addEventListener("click", relightCandles);
  wishButton.addEventListener("click", launchConfetti);
  updateCountdown();
  window.setInterval(updateCountdown, 1000);

  if (cakeCard && window.matchMedia("(pointer: fine)").matches && !reducedMotion.matches) {
    cakeCard.addEventListener("pointermove", (event) => {
      const bounds = cakeCard.getBoundingClientRect();
      const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;
      cakeCard.style.setProperty("--tilt-x", `${relativeY * -7}deg`);
      cakeCard.style.setProperty("--tilt-y", `${relativeX * 9}deg`);
    });
    cakeCard.addEventListener("pointerleave", () => {
      cakeCard.style.setProperty("--tilt-x", "0deg");
      cakeCard.style.setProperty("--tilt-y", "0deg");
    });
  }
})();
