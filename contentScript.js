let animationActive = false; // Tracks if the animation is currently active
let intervalId = null; // Stores the interval for moving Casper
let startX = window.innerWidth - 100; // Starting position (right bottom corner)
let startY = window.innerHeight - 100;

const follower = document.createElement("div");
follower.id = "Casper";
document.body.appendChild(follower);
const images = {
  left: [
    chrome.runtime.getURL("images/left1.png"),
    chrome.runtime.getURL("images/left2.png"),
  ],
  right: [
    chrome.runtime.getURL("images/right1.png"),
    chrome.runtime.getURL("images/right2.png"),
  ],
  upLeft: [
    chrome.runtime.getURL("images/upleft1.png"),
    chrome.runtime.getURL("images/upleft2.png"),
  ],
  upRight: [
    chrome.runtime.getURL("images/upright1.png"),
    chrome.runtime.getURL("images/upright2.png"),
  ],
  downLeft: [
    chrome.runtime.getURL("images/downleft1.png"),
    chrome.runtime.getURL("images/downleft2.png"),
  ],
  downRight: [
    chrome.runtime.getURL("images/downright1.png"),
    chrome.runtime.getURL("images/downright2.png"),
  ],
  up: [
    chrome.runtime.getURL("images/up1.png"),
    chrome.runtime.getURL("images/up2.png"),
  ],
  down: [
    chrome.runtime.getURL("images/down1.png"),
    chrome.runtime.getURL("images/down2.png"),
  ],
};

Object.keys(images).forEach((direction) => {
  images[direction].forEach((src) => {
    const img = new Image();
    img.src = chrome.runtime.getURL(src);
  });
});

const gifImage = document.createElement("img");
gifImage.src = chrome.runtime.getURL("images/yawn1.png");
gifImage.alt = "Casper!";
follower.appendChild(gifImage);

// Set starting position of Casper
follower.style.top = `${startY}px`;
follower.style.left = `${startX}px`;

let mouseX = 0,
  mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

function getCasperPosition() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = width - follower.offsetWidth;
  const y = height - follower.offsetHeight;
  return { x, y };
}

let { x: followerX, y: followerY } = getCasperPosition();
follower.style.top = `${followerY}px`;
follower.style.left = `${followerX}px`;

function getDirection(followerX, followerY, mouseX, mouseY) {
  const dx = mouseX - followerX;
  const dy = mouseY - followerY;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  if (angle >= -135 && angle <= -45) {
    return "up";
  } else if (angle >= 45 && angle <= 135) {
    return "down";
  } else if (angle > -45 && angle < 45) {
    return "right";
  } else if (angle > 135 || angle < -135) {
    return "left";
  } else if (angle > -135 && angle < -90) {
    return "upLeft";
  } else if (angle > -90 && angle < -45) {
    return "upRight";
  } else if (angle > 90 && angle < 135) {
    return "downLeft";
  } else if (angle > 45 && angle < 90) {
    return "downRight";
  }
}

let frame = 0;
function updateImage(follower, direction) {
  const imageSrc = images[direction][frame % 2];
  follower.querySelector("img").src = imageSrc;
  frame++;
}

function moveFollower() {
  const speed = 2;
  const dx = mouseX - followerX;
  const dy = mouseY - followerY;

  followerX += dx * 0.01 * speed;
  followerY += dy * 0.01 * speed;

  follower.style.top = `${followerY}px`;
  follower.style.left = `${followerX}px`;

  const direction = getDirection(followerX, followerY, mouseX, mouseY);
  updateImage(follower, direction);
}

setInterval(moveFollower, 200);
