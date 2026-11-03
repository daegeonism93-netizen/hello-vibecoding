const datetimeEl = document.getElementById("datetime");
const messageEl = document.getElementById("message");
const greetingEl = document.getElementById("greetingMessage");
const cheerEl = document.getElementById("cheerMessage");
const helloBtn = document.getElementById("helloBtn");
const cheerBtn = document.getElementById("cheerBtn");
const heartBtn = document.getElementById("heartBtn");
const leaveHeartBtn = document.getElementById("leaveHeartBtn");
const innerWorld = document.getElementById("innerWorld");
const stars = document.getElementById("stars");
const themeToggle = document.getElementById("themeToggle");

const cheerMessages = [
  "오늘도 충분히 잘하고 있어요. 천천히 가도 괜찮습니다.",
  "작은 한 걸음이 내일의 큰 변화를 만듭니다.",
  "지금 들이는 시간이 분명 빛날 거예요.",
  "실수해도 괜찮아요. 배우는 중이니까요.",
  "당신의 노력은 눈에 보이지 않아도 쌓이고 있습니다.",
  "오늘은 어제보다 한 칸 더 앞으로 가면 충분해요.",
  "자신을 믿어 주세요. 이미 멋진 시작을 하고 있습니다.",
  "지쳐도 괜찮아요. 잠시 쉬고 다시 가면 됩니다.",
  "포기하지 않는 마음이 가장 큰 재능입니다.",
  "당신은 생각보다 훨씬 강하고 따뜻합니다.",
  "오늘의 응원이 내일의 용기가 되길 바랍니다.",
  "천천히, 그러나 확실하게. 당신은 잘하고 있어요."
];

function hello() {
  messageEl.innerText = "제 홈페이지에 오신 것을 환영합니다.";
  showAnimatedMessage(greetingEl, "😊 AI와 함께 만든 첫 웹페이지입니다!");
}

function showAnimatedMessage(element, text) {
  element.hidden = false;
  element.textContent = text;
  element.classList.remove("show");
  void element.offsetWidth;
  element.classList.add("show");
}

function updateDateTime() {
  const now = new Date();
  datetimeEl.textContent = now.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
}

function toggleDarkMode() {
  const isDark = document.body.classList.toggle("dark");
  themeToggle.textContent = isDark ? "다크모드 ON" : "다크모드 OFF";
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function showCheerMessage() {
  const nextMessage = cheerMessages[Math.floor(Math.random() * cheerMessages.length)];
  showAnimatedMessage(cheerEl, nextMessage);
}

function createInnerWorldDecor() {
  if (stars.dataset.ready === "true") {
    return;
  }

  for (let i = 0; i < 48; i += 1) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 2.8}s`;
    stars.appendChild(star);
  }

  for (let i = 0; i < 10; i += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = i % 2 === 0 ? "♡" : "♥";
    heart.style.left = `${8 + Math.random() * 84}%`;
    heart.style.animationDuration = `${7 + Math.random() * 5}s`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    stars.appendChild(heart);
  }

  stars.dataset.ready = "true";
}

function enterHeart() {
  createInnerWorldDecor();
  innerWorld.hidden = false;
  innerWorld.setAttribute("aria-hidden", "false");
  document.body.classList.add("in-heart");
  requestAnimationFrame(() => {
    innerWorld.classList.add("is-open");
  });
}

function leaveHeart() {
  innerWorld.classList.remove("is-open");
  document.body.classList.remove("in-heart");
  window.setTimeout(() => {
    innerWorld.hidden = true;
    innerWorld.setAttribute("aria-hidden", "true");
  }, 700);
}

helloBtn.addEventListener("click", hello);
cheerBtn.addEventListener("click", showCheerMessage);
heartBtn.addEventListener("click", enterHeart);
leaveHeartBtn.addEventListener("click", leaveHeart);
themeToggle.addEventListener("click", toggleDarkMode);

updateDateTime();
setInterval(updateDateTime, 1000);
