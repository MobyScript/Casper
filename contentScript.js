const follower = document.createElement("div");
follower.id = "cursor-chaser";
document.body.appendChild(follower);

function getRandomPosition() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * width;
  const y = Math.random() * height;
  return { x, y };
}

let { x: followerX, y: followerY } = getRandomPosition();
follower.style.top = `${followerY}px`;
follower.style.left = `${followerX}px`;

let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

function moveFollower() {
  const speed = 0.02;
  const dx = mouseX - followerX;
  const dy = mouseY - followerY;

  followerX += dx * 0.06 * speed;
  followerY += dy * 0.06 * speed;

  follower.style.top = `${followerY}px`;
  follower.style.left = `${followerX}px`;

  requestAnimationFrame(moveFollower);
}

moveFollower();
