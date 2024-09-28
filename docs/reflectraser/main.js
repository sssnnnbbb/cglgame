title = "reflectRacer";

description = `
[Tap] 90度回転
`;

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
    // プレイヤーキャラクターの初期位置と状態をリセット
    player = { x: 50, y: 50 };  // 単純な座標オブジェクトに変更
    direction = { x: 1, y: 0 }; // 右方向に進む設定
    speed = 0.1; // スピードの初期化
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
  player.x += speed * direction.x;
  player.y += speed * direction.y;
  
  // プレイヤーが画面外に出ないように位置を固定
  player.x = clamp(player.x, 0, 99);
  player.y = clamp(player.y, 0, 99);

  // プレイヤーの座標をデバッグ用に確認
  console.log(`Player Position: (${player.x}, ${player.y})`);

  // プレイヤーの描画 (シンプルな四角形で描画)
  color("cyan");
  rect(player.x, player.y, 10, 10);  // 四角形でプレイヤーを描画

  // プレイヤーの進行方向を変更（90度回転）
  if (input.isJustPressed) {
    play("select");
    // 90度回転（右回り）
    const tempX = direction.x;
    direction.x = -direction.y;
    direction.y = tempX;
  }

  // 障害物の生成と動き
  nextObstacleTicks--;
  if (nextObstacleTicks < 0) {
    const obstaclePos = { x: rnd(10, 90), y: rnd(10, 90) };
    obstacles.push({ pos: obstaclePos, speed: rnd(0.5, 1) });
    nextObstacleTicks = rnd(30, 60) / difficulty;
  }

  // 障害物の描画と動作
  color("black");
  remove(obstacles, (o) => {
    o.pos.y += o.speed * difficulty;

    rect(o.pos.x, o.pos.y, 5, 5);  // 障害物の描画

    // 障害物が画面外に出たら削除
    if (o.pos.y > 100) {
      return true;
    }

    // 障害物に衝突したらゲームオーバー
    if (Math.hypot(player.x - o.pos.x, player.y - o.pos.y) < 5) {
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
  speed = 0.1 + difficulty * 0.05;
}

function gameOver() {
  // ゲームオーバー処理
  gameOverFlag = true;
  play("lucky");
  end(); // ゲームを終了
}
