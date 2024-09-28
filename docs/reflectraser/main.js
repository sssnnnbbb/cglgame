title = "reflectRacer";

description = `
[Tap] 90度回転
`;

characters = [
  `
  ll
 l  l
 l  l
  ll
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
    player = vec(50, 50); // 画面中央に初期化
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
  player.add(vec(speed).mul(direction));
  
  // プレイヤーキャラクターの描画
  color("black");
  char("a", player); // "a"キャラクターを描画

  // 壁に衝突する場合、ゲームオーバー
  if (!player.isInRect(0, 0, 100, 100) && ticks > 1) {
    play("hit");
    gameOver();
    return;
  }

  // プレイヤーの進行方向を変更（90度回転）
  if (input.isJustPressed) {
    play("select");
    direction = direction.rotate(PI / 2); // 90度回転
  }

  // 障害物を追加
  nextObstacleTicks--;
  if (nextObstacleTicks < 0) {
    const obstaclePos = vec(rnd(10, 90), rnd(10, 90));
    obstacles.push({ pos: obstaclePos, speed: rnd(0.5, 1) });
    nextObstacleTicks = rnd(30, 60) / difficulty;
  }

  // 障害物を描画し、動かす
  color("black");
  remove(obstacles, (o) => {
    // 障害物を下に動かす
    o.pos.y += o.speed * difficulty;

    // 障害物の描画
    box(o.pos, 5);

    // 障害物が画面外に出たら削除
    if (o.pos.y > 100) {
      return true;
    }

    // 障害物に衝突したらゲームオーバー
    if (player.distanceTo(o.pos) < 5) {
      play("explosion");
      gameOver();
      return true;
    }

    return false;
  });

  // スコアを増加させる
  addScore(multiplier);
  multiplier++;

  // 難易度に応じてスピードを上げる
  speed = 1.5 + difficulty * 0.5;
}

function gameOver() {
  // ゲームオーバー処理
  gameOverFlag = true;
  play("lucky");
  end(); // ゲームを終了
}
