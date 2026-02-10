const envelopeBtn = document.getElementById("envelope");
const hint = document.getElementById("hint");

function setHint(text){ if (hint) hint.textContent = text; }

function restartBalloons(){
  const balloons = document.querySelectorAll(".balloon");
  balloons.forEach(b => {
    b.style.animation = "none";
    // force reflow so CSS animations restart
    void b.offsetHeight;
    b.style.animation = "";
  });
}

function openEnvelope(){
  if (!document.body.classList.contains("open")){
    document.body.classList.add("open");
    setHint("Tap again to replay");
    restartBalloons();
  } else {
    // Replay balloons + letter motion without snapping the envelope shut
    document.body.classList.remove("open");
    void document.body.offsetHeight;
    document.body.classList.add("open");
    restartBalloons();
  }
}

envelopeBtn?.addEventListener("click", openEnvelope);

// Accessibility: open with Enter/Space when focused
document.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && document.activeElement === envelopeBtn){
    e.preventDefault();
    openEnvelope();
  }
});
