title = "反射レーサー";

description = `
[Tap] 90度回転
`;

characters = [
  `
llll
l  l
l  l
llll
`,
];

options = {
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 10,
};

let player;
let direction;
let speed;
let obstacles;
let nextObstacleTicks;
let score;
let multiplier;
let gameOverFlag;

function update() {
  if (!ticks) {
    // プレイヤーキャラクターの初期位置と状態
    player = vec(50, 50);
    direction = vec(1, 0); // 右方向に進む
    speed = 1.5;
    obstacles = [];
    nextObstacleTicks = 0;
    score = 0;
    multiplier = 1;
    gameOverFlag = false;
  }

  if (gameOverFlag) {
    return;
  }

  // プレイヤーの移動
  player.add(vec(speed)
