title = "ミニマルメイズ";

description = `
[Hold] ジャンプ
`;

characters = [];

options = {
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 1,
  theme: "simple",
};

/** @type {Vector} */
let playerPos;
/** @type {Vector} */
let nextTarget;
/** @type {number} */
let nextTargetDist;
/** @type {boolean} */
let isJumping;
/** @type {number} */
let jumpSpeed;

function update() {
  if (!ticks) {
    playerPos = vec(50, 50);
    nextTarget = vec(0, 0);
    nextTargetDist = 0;
    isJumping = false;
    jumpSpeed = 1;
  }
  color("black");
  char("a", playerPos);
  
  if (!isJumping) {
    // ジャンプの開始
    if (input.isJustPressed) {
      play("jump");
      nextTarget = vec(rnd(10, 90), rnd(10, 90));
      nextTargetDist = playerPos.distanceTo(nextTarget);
      isJumping = true;
    }
  } else {
    // ジャンプ中の動き
    const step = jumpSpeed * difficulty * 0.2;
    playerPos.moveTowards(nextTarget, step);
    color("light_blue");
    line(playerPos, nextTarget, 2);
    if (playerPos.distanceTo(nextTarget) < 2) {
      isJumping = false;
    }
  }

  // ゲームオーバーの条件
  if (playerPos.x < 0 || playerPos.x > 100 || playerPos.y < 0 || playerPos.y > 100) {
    play("explosion");
    end();
  }

  // スコアの加算
  addScore(floor(nextTargetDist - playerPos.distanceTo(nextTarget)));
}
