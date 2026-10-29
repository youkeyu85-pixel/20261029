// 宣告走路精靈圖片變數
let walkSprite;

// 宣告空翻精靈圖片變數
let flipSprite;

// 宣告角色目前的水平位置
let characterX;

// 宣告角色目前的垂直位置
let characterY;

// 宣告角色顯示的寬度
let characterWidth = 135;

// 宣告角色顯示的高度
let characterHeight = 96;

// 宣告走路精靈圖的格數
let walkFrameCount = 4;

// 宣告空翻精靈圖的格數
let flipFrameCount = 7;

// 宣告目前顯示的動畫影格
let currentFrame = 0;

// 宣告動畫播放速度
let animationSpeed = 8;

// 宣告角色移動速度
let moveSpeed = 5;

// 宣告右方向鍵目前是否被按住
let isMovingRight = false;

// 宣告走路圖片是否載入成功
let walkImageLoaded = false;

// 宣告空翻圖片是否載入成功
let flipImageLoaded = false;

// 在程式開始前載入圖片
function preload() {
  // 載入走路精靈圖片
  walkSprite = loadImage(
    "1/走/walk.png",
    // 圖片載入成功時執行
    function () {
      // 設定走路圖片載入成功
      walkImageLoaded = true;
    },
    // 圖片載入失敗時執行
    function () {
      // 設定走路圖片載入失敗
      walkImageLoaded = false;
    }
  );

  // 載入空翻精靈圖片
  flipSprite = loadImage(
    "1/空翻/walk.png",
    // 圖片載入成功時執行
    function () {
      // 設定空翻圖片載入成功
      flipImageLoaded = true;
    },
    // 圖片載入失敗時執行
    function () {
      // 設定空翻圖片載入失敗
      flipImageLoaded = false;
    }
  );
}

// 建立畫布與初始化角色
function setup() {
  // 建立符合瀏覽器視窗大小的畫布
  createCanvas(windowWidth, windowHeight);

  // 設定背景顏色為 #dee2e6
  background("#dee2e6");

  // 將角色放在畫面水平中央
  characterX = width / 2 - characterWidth / 2;

  // 將角色放在畫面垂直中央
  characterY = height / 2 - characterHeight / 2;

  // 設定圖片顯示模式為左上角對齊
  imageMode(CORNER);

  // 設定矩形繪製模式為左上角對齊
  rectMode(CORNER);

  // 設定文字水平置中
  textAlign(CENTER, CENTER);

  // 設定影像插值模式
  imageSmoothingEnabled = false;
}

// 每一幀重複執行繪圖程式
function draw() {
  // 清除畫面並填滿背景色
  background("#dee2e6");

  // 如果右方向鍵被按住，讓角色往右移動
  if (isMovingRight) {
    // 增加角色的水平位置
    characterX += moveSpeed;
  }

  // 限制角色不能超出畫面右側
  characterX = constrain(characterX, 0, width - characterWidth);

  // 限制角色不能超出畫面左側
  characterX = max(characterX, 0);

  // 根據目前狀態更新動畫影格
  updateAnimationFrame();

  // 繪製角色動畫
  drawCharacter();
}

// 更新目前的動畫影格
function updateAnimationFrame() {
  // 根據影格速度計算動畫影格
  currentFrame = floor(frameCount / animationSpeed);

  // 如果角色正在移動，使用空翻動畫的影格數
  if (isMovingRight) {
    // 讓空翻動畫循環播放
    currentFrame = currentFrame % flipFrameCount;
  } else {
    // 讓走路動畫循環播放
    currentFrame = currentFrame % walkFrameCount;
  }
}

// 繪製角色目前的動畫影格
function drawCharacter() {
  // 如果角色正在移動，顯示空翻動畫
  if (isMovingRight) {
    // 確認空翻圖片已成功載入
    if (flipImageLoaded && flipSprite) {
      // 計算空翻精靈圖每一格的寬度
      let frameWidth = flipSprite.width / flipFrameCount;

      // 計算空翻精靈圖每一格的高度
      let frameHeight = flipSprite.height;

      // 使用 sourceRect 顯示目前的空翻影格
      image(
        flipSprite,
        characterX,
        characterY,
        characterWidth,
        characterHeight,
        currentFrame * frameWidth,
        0,
        frameWidth,
        frameHeight
      );
    } else {
      // 圖片載入失敗時繪製替代角色
      drawFallbackCharacter("#dc3545");
    }
  } else {
    // 確認走路圖片已成功載入
    if (walkImageLoaded && walkSprite) {
      // 計算走路精靈圖每一格的寬度
      let frameWidth = walkSprite.width / walkFrameCount;

      // 計算走路精靈圖每一格的高度
      let frameHeight = walkSprite.height;

      // 使用 sourceRect 顯示目前的走路影格
      image(
        walkSprite,
        characterX,
        characterY,
        characterWidth,
        characterHeight,
        currentFrame * frameWidth,
        0,
        frameWidth,
        frameHeight
      );
    } else {
      // 圖片載入失敗時繪製替代角色
      drawFallbackCharacter("#198754");
    }
  }
}

// 繪製圖片載入失敗時的替代角色
function drawFallbackCharacter(characterColor) {
  // 儲存目前的繪圖狀態
  push();

  // 設定替代角色的填滿顏色
  fill(characterColor);

  // 設定替代角色的外框顏色
  stroke("#212529");

  // 設定外框粗細
  strokeWeight(3);

  // 繪製角色身體
  rect(characterX, characterY, characterWidth, characterHeight, 12);

  // 設定眼睛顏色
  fill("#ffffff");

  // 繪製左眼
  ellipse(
    characterX + characterWidth * 0.35,
    characterY + characterHeight * 0.35,
    14,
    14
  );

  // 繪製右眼
  ellipse(
    characterX + characterWidth * 0.65,
    characterY + characterHeight * 0.35,
    14,
    14
  );

  // 設定嘴巴顏色
  stroke("#ffffff");

  // 繪製嘴巴
  line(
    characterX + characterWidth * 0.35,
    characterY + characterHeight * 0.65,
    characterX + characterWidth * 0.65,
    characterY + characterHeight * 0.65
  );

  // 顯示替代角色提示文字
  noStroke();

  // 設定提示文字顏色
  fill("#212529");

  // 設定提示文字大小
  textSize(14);

  // 顯示圖片載入失敗提示
  text(
    "圖片載入失敗",
    characterX + characterWidth / 2,
    characterY + characterHeight + 24
  );

  // 還原繪圖狀態
  pop();
}

// 當鍵盤按鍵被按下時執行
function keyPressed() {
  // 判斷使用者是否按下右方向鍵
  if (keyCode === RIGHT_ARROW) {
    // 設定角色開始向右移動
    isMovingRight = true;

    // 防止瀏覽器因方向鍵而捲動畫面
    return false;
  }
}

// 當鍵盤按鍵被放開時執行
function keyReleased() {
  // 判斷使用者是否放開右方向鍵
  if (keyCode === RIGHT_ARROW) {
    // 設定角色停止向右移動
    isMovingRight = false;

    // 讓動畫從第一格重新開始
    currentFrame = 0;

    // 防止瀏覽器因方向鍵而捲動畫面
    return false;
  }
}

// 當瀏覽器視窗大小改變時執行
function windowResized() {
  // 重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 重新設定角色的垂直位置為畫面中央
  characterY = height / 2 - characterHeight / 2;

  // 確保角色仍然位於畫面範圍內
  characterX = constrain(characterX, 0, width - characterWidth);
}