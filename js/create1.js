<<<<<<< HEAD
let selectedCupType = 'mug'; // デフォルトはマグカップ
let isTextDragging = false;
let isImageDragging = false;
let textContent = '';
let image = null;  // 画像の変数
let imageWidth = 200;  // 初期画像幅
let imageHeight = 200; // 初期画像高さ
let imageX = 0;  // 画像のX座標
let imageY = 0;  // 画像のY座標
let aspectRatio = 1; // アスペクト比（初期設定）

// 初期設定
const inputValue = document.getElementById('input_value');
const fontSelector = document.getElementById('fontSelector');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth * window.devicePixelRatio;
canvas.height = canvas.offsetHeight * window.devicePixelRatio;
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

// ---------- テキストの入力処理 ----------
// 初期テキスト位置
let textX = 10;
let textY = 20;
let selectedFont = fontSelector.value || "sans-serif";  // 初期フォント
let fontSize = 18;  // 初期フォントサイズを18に設定
let writingMode = "horizontal";  // デフォルトは横書き

// 入力内容の反映
function updateDisplayText() {
    const inputText = document.getElementById("input_value").value; // テキストエリアから入力内容を取得
    const formattedText = inputText.replace(/\n/g, "<br>");
    document.getElementById("displayText").innerHTML = formattedText;
    const displayText = document.getElementById("displayText");
    if (inputText.trim() !== "") {
        displayText.style.border = "2px solid black";  // ボーダーを追加
    } else {
        displayText.style.border = "none";  // テキストが空ならボーダーを削除
    }
}

// 入力内容が変更された時に呼ばれるようにイベントリスナーを追加
document.getElementById("input_value").addEventListener("input", updateDisplayText);

// キャンバスの再描画関数
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // キャンバスをクリア
    if (image) {
        ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);  // 画像を描画
    }
    if (textContent) {
        ctx.font = `${fontSize}px ${selectedFont}`;
        ctx.fillStyle = displayText.style.color || "black";  // テキストの色
        if (writingMode === "horizontal") {
            const lines = textContent.split('\n');
            let currentY = textY;
            lines.forEach(line => {
                ctx.fillText(line, textX, currentY);
                currentY += fontSize + 3;  // 次の行は少しスペースを空けて
            });
        } else if (writingMode === "vertical") {
            let x = textX; // 初期位置（左側）で開始
            let y = textY; // 初期位置で開始
            const lines = textContent.split('\n');
            lines.forEach(line => {
                for (let i = 0; i < line.length; i++) {
                    ctx.fillText(line[i], x, y);
                    y += fontSize + 2;
                }
                x -= fontSize + 2;  // xを減少させて、左に進むように
                y = textY;  // yは初期位置に戻す
            });
        }
    }
}

// フォントサイズを小さくする
document.getElementById("decrease_font_size").addEventListener("click", function () {
    fontSize = Math.max(12, fontSize - 1);
    document.getElementById("font_size_input").value = fontSize;
    redrawCanvas();
});

// フォントサイズを大きくする
document.getElementById("increase_font_size").addEventListener("click", function () {
    fontSize = Math.min(72, fontSize + 1);
    document.getElementById("font_size_input").value = fontSize;
    redrawCanvas();
});

// ユーザーが入力フィールドに直接値を入力した場合
document.getElementById("font_size_input").addEventListener("input", function () {
    fontSize = parseInt(document.getElementById("font_size_input").value) || 18;
    redrawCanvas();
});

// フォント選択時の処理
fontSelector.addEventListener('change', function () {
    selectedFont = fontSelector.value;  // 選択したフォントを設定
    redrawCanvas();  // フォントを適用して再描画
});

// テキスト入力が変わった時の処理
inputValue.addEventListener('input', () => {
    textContent = inputValue.value;  // 入力された文字を保存
    redrawCanvas();  // キャンバスを再描画
});

// 横書きボタンがクリックされたとき
document.getElementById("normalButton").addEventListener('click', () => {
    writingMode = "horizontal";  // 横書きに設定
    redrawCanvas();  // 再描画
});

// 縦書きボタンがクリックされたとき
document.getElementById("verticalButton").addEventListener('click', () => {
    writingMode = "vertical";  // 縦書きに設定
    redrawCanvas();  // 再描画
});

// ---------- カラーパレット ----------
const colorPalette = document.getElementById('color_palette');
const grayscaleColumn = document.getElementById('grayscale_column');
const displayText = document.getElementById('displayText');

const hues = Array.from({ length: 22 }, (_, i) => i * 16.36);
const colors = [];
const rows = 10;
const columns = 22;

// 色相と明度を組み合わせた色を作成
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        const hue = hues[col % hues.length];
        const lightness = 90 - (row * 7);
        const adjustedLightness = Math.max(lightness, 20);
        const color = `hsl(${hue}, 100%, ${adjustedLightness}%)`;
        colors.push(color);
    }
}

// 白黒グラデーション
const grayscaleColors = [];
for (let row = 0; row < rows; row++) {
    const lightness = 100 - (row * 10);
    const grayscale = `hsl(0, 0%, ${lightness}%)`;
    grayscaleColors.push(grayscale);
}

// 色オプションを作成してカラーパレットに追加
colors.forEach(color => {
    const colorOption = document.createElement('div');
    colorOption.classList.add('color_option');
    colorOption.style.backgroundColor = color;
    colorOption.setAttribute('data-color', color);
    colorPalette.appendChild(colorOption);
});

// 白黒グラデーションをカラムに追加
grayscaleColors.forEach(grayscale => {
    const grayscaleOption = document.createElement('div');
    grayscaleOption.classList.add('color_option');
    grayscaleOption.style.backgroundColor = grayscale;
    grayscaleOption.setAttribute('data-color', grayscale);
    grayscaleColumn.appendChild(grayscaleOption);
});

// 色選択時の処理
function handleColorSelect(event) {
    if (event.target.classList.contains('color_option')) {
        const selectedColor = event.target.getAttribute('data-color');
        
        // displayTextのテキストの色を変更
        displayText.style.color = selectedColor;

        // displayTextの枠線を変更
        displayText.style.border = `2px solid ${selectedColor}`;

        // すべての色オプションの選択状態をリセット
        document.querySelectorAll('.color_option').forEach(option => {
            option.classList.remove('selected');
        });

        // 選択した色オプションにクラス「selected」を追加
        event.target.classList.add('selected');
        redrawCanvas();  // 再描画

    }
}
// カラーパレットでクリックした時に色を変更
colorPalette.addEventListener('click', handleColorSelect); // colorPaletteクリックで色を選択
// グレースケールのカラムをクリックした時に色を変更
grayscaleColumn.addEventListener('click', handleColorSelect); // grayscaleColumnクリックで色を選択


// マウスイベントの設定
let isDraggingText = false;
let offsetX = 0;
let offsetY = 0;

// テキストのドラッグ機能の更新
canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    // クリックした場所がテキストの範囲内かどうかを判定
    if (mouseX >= textX && mouseX <= textX + ctx.measureText(textContent).width &&
        mouseY >= textY && mouseY <= textY + fontSize) {
        isDraggingText = true;
        offsetX = mouseX - textX; // クリックした位置からのオフセット
        offsetY = mouseY - textY;
        canvas.style.cursor = 'grabbing';
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDraggingText) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        // 新しい位置を計算
        textX = mouseX - offsetX;
        textY = mouseY - offsetY;
        redrawCanvas();
    }
});

canvas.addEventListener('mouseup', () => {
    isDraggingText = false;
    canvas.style.cursor = 'pointer';
});

canvas.addEventListener('mouseleave', () => {
    isDraggingText = false;
    canvas.style.cursor = 'default';
});


// ---------- 画像選択処理 ---------- 
document.getElementById('imageInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                image = img;  // 画像を保存
                imageWidth = img.width;
                imageHeight = img.height;
                aspectRatio = img.width / img.height;  // アスペクト比を計算
                imageX = (canvas.width - imageWidth) / 2;
                imageY = (canvas.height - imageHeight) / 2;
                redrawCanvas();  // 画像描画
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// 画像のサイズ変更
document.getElementById('increaseSize').addEventListener('click', () => {
    imageWidth += 50;
    imageHeight = imageWidth / aspectRatio;  // アスペクト比に基づいて高さを調整
    redrawCanvas();
});

document.getElementById('decreaseSize').addEventListener('click', () => {
    if (imageWidth > 50 && imageHeight > 50) {
        imageWidth -= 50;
        imageHeight = imageWidth / aspectRatio;  // アスペクト比に基づいて高さを調整
        redrawCanvas();
    }
});
// マウスのスクロールで画像のサイズ変更
canvas.addEventListener('wheel', (event) => {
    // スクロール方向によってサイズを変更
    if (event.deltaY < 0) {
        // 上にスクロール（サイズを大きくする）
        imageWidth += 50;
        imageHeight = imageWidth / aspectRatio;  // アスペクト比に基づいて高さを調整
    } else if (event.deltaY > 0) {
        // 下にスクロール（サイズを小さくする）
        if (imageWidth > 50 && imageHeight > 50) {
            imageWidth -= 50;
            imageHeight = imageWidth / aspectRatio;  // アスペクト比に基づいて高さを調整
        }
    }
    redrawCanvas();
});

// 画像のドラッグ機能の追加
let isDraggingImage = false;
let imageOffsetX = 0, imageOffsetY = 0;

canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    // 画像がクリックされたかどうかを判定
    if (mouseX >= imageX && mouseX <= imageX + imageWidth &&
        mouseY >= imageY && mouseY <= imageY + imageHeight) {
        isDraggingImage = true;
        imageOffsetX = mouseX - imageX; // クリック位置からのオフセット
        imageOffsetY = mouseY - imageY;
        canvas.style.cursor = 'grabbing';
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDraggingImage) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        // 画像の新しい位置を計算
        imageX = mouseX - imageOffsetX;
        imageY = mouseY - imageOffsetY;

        redrawCanvas();
    }
});

canvas.addEventListener('mouseup', () => {
    isDraggingImage = false;
    canvas.style.cursor = 'pointer';
});

// 画像削除
document.getElementById('delete').addEventListener('click', () => {
    image = null;
    redrawCanvas();  // キャンバスをクリア
});

// 画像ダウンロード
document.getElementById('download').addEventListener('click', () => {
    if (image) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'downloaded-image.png';
        link.click();
    } else {
        alert('画像がありません！');
    }
});

=======
let selectedCupType = 'mug'; // デフォルトはマグカップ
let isTextDragging = false;
let isImageDragging = false;
let textContent = '';
let image = null;  // 画像の変数
let imageWidth = 200;  // 初期画像幅
let imageHeight = 200; // 初期画像高さ
let imageX = 0;  // 画像のX座標
let imageY = 0;  // 画像のY座標
let aspectRatio = 1; // アスペクト比（初期設定）

// 初期設定
const inputValue = document.getElementById('input_value');
const fontSelector = document.getElementById('fontSelector');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth * window.devicePixelRatio;
canvas.height = canvas.offsetHeight * window.devicePixelRatio;
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

// ---------- テキストの入力処理 ----------
// 初期テキスト位置
let textX = 10;
let textY = 20;
let selectedFont = fontSelector.value || "sans-serif";  // 初期フォント
let fontSize = 18;  // 初期フォントサイズを18に設定
let writingMode = "horizontal";  // デフォルトは横書き

// 入力内容の反映
function updateDisplayText() {
    const inputText = document.getElementById("input_value").value; // テキストエリアから入力内容を取得
    const formattedText = inputText.replace(/\n/g, "<br>");
    document.getElementById("displayText").innerHTML = formattedText;
    const displayText = document.getElementById("displayText");
    if (inputText.trim() !== "") {
        displayText.style.border = "2px solid black";  // ボーダーを追加
    } else {
        displayText.style.border = "none";  // テキストが空ならボーダーを削除
    }
}

// 入力内容が変更された時に呼ばれるようにイベントリスナーを追加
document.getElementById("input_value").addEventListener("input", updateDisplayText);

// キャンバスの再描画関数
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // キャンバスをクリア
    if (image) {
        ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);  // 画像を描画
    }
    if (textContent) {
        ctx.font = `${fontSize}px ${selectedFont}`;
        ctx.fillStyle = displayText.style.color || "black";  // テキストの色
        if (writingMode === "horizontal") {
            const lines = textContent.split('\n');
            let currentY = textY;
            lines.forEach(line => {
                ctx.fillText(line, textX, currentY);
                currentY += fontSize + 3;  // 次の行は少しスペースを空けて
            });
        } else if (writingMode === "vertical") {
            let x = textX; // 初期位置（左側）で開始
            let y = textY; // 初期位置で開始
            const lines = textContent.split('\n');
            lines.forEach(line => {
                for (let i = 0; i < line.length; i++) {
                    ctx.fillText(line[i], x, y);
                    y += fontSize + 2;
                }
                x -= fontSize + 2;  // xを減少させて、左に進むように
                y = textY;  // yは初期位置に戻す
            });
        }
    }
}

// フォントサイズを小さくする
document.getElementById("decrease_font_size").addEventListener("click", function () {
    fontSize = Math.max(12, fontSize - 1);
    document.getElementById("font_size_input").value = fontSize;
    redrawCanvas();
});

// フォントサイズを大きくする
document.getElementById("increase_font_size").addEventListener("click", function () {
    fontSize = Math.min(72, fontSize + 1);
    document.getElementById("font_size_input").value = fontSize;
    redrawCanvas();
});

// ユーザーが入力フィールドに直接値を入力した場合
document.getElementById("font_size_input").addEventListener("input", function () {
    fontSize = parseInt(document.getElementById("font_size_input").value) || 18;
    redrawCanvas();
});

// フォント選択時の処理
fontSelector.addEventListener('change', function () {
    selectedFont = fontSelector.value;  // 選択したフォントを設定
    redrawCanvas();  // フォントを適用して再描画
});

// テキスト入力が変わった時の処理
inputValue.addEventListener('input', () => {
    textContent = inputValue.value;  // 入力された文字を保存
    redrawCanvas();  // キャンバスを再描画
});

// 横書きボタンがクリックされたとき
document.getElementById("normalButton").addEventListener('click', () => {
    writingMode = "horizontal";  // 横書きに設定
    redrawCanvas();  // 再描画
});

// 縦書きボタンがクリックされたとき
document.getElementById("verticalButton").addEventListener('click', () => {
    writingMode = "vertical";  // 縦書きに設定
    redrawCanvas();  // 再描画
});

// ---------- カラーパレット ----------
const colorPalette = document.getElementById('color_palette');
const grayscaleColumn = document.getElementById('grayscale_column');
const displayText = document.getElementById('displayText');

const hues = Array.from({ length: 22 }, (_, i) => i * 16.36);
const colors = [];
const rows = 10;
const columns = 22;

// 色相と明度を組み合わせた色を作成
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        const hue = hues[col % hues.length];
        const lightness = 90 - (row * 7);
        const adjustedLightness = Math.max(lightness, 20);
        const color = `hsl(${hue}, 100%, ${adjustedLightness}%)`;
        colors.push(color);
    }
}

// 白黒グラデーション
const grayscaleColors = [];
for (let row = 0; row < rows; row++) {
    const lightness = 100 - (row * 10);
    const grayscale = `hsl(0, 0%, ${lightness}%)`;
    grayscaleColors.push(grayscale);
}

// 色オプションを作成してカラーパレットに追加
colors.forEach(color => {
    const colorOption = document.createElement('div');
    colorOption.classList.add('color_option');
    colorOption.style.backgroundColor = color;
    colorOption.setAttribute('data-color', color);
    colorPalette.appendChild(colorOption);
});

// 白黒グラデーションをカラムに追加
grayscaleColors.forEach(grayscale => {
    const grayscaleOption = document.createElement('div');
    grayscaleOption.classList.add('color_option');
    grayscaleOption.style.backgroundColor = grayscale;
    grayscaleOption.setAttribute('data-color', grayscale);
    grayscaleColumn.appendChild(grayscaleOption);
});

// 色選択時の処理
function handleColorSelect(event) {
    if (event.target.classList.contains('color_option')) {
        const selectedColor = event.target.getAttribute('data-color');
        
        // displayTextのテキストの色を変更
        displayText.style.color = selectedColor;

        // displayTextの枠線を変更
        displayText.style.border = `2px solid ${selectedColor}`;

        // すべての色オプションの選択状態をリセット
        document.querySelectorAll('.color_option').forEach(option => {
            option.classList.remove('selected');
        });

        // 選択した色オプションにクラス「selected」を追加
        event.target.classList.add('selected');
        redrawCanvas();  // 再描画

    }
}
// カラーパレットでクリックした時に色を変更
colorPalette.addEventListener('click', handleColorSelect); // colorPaletteクリックで色を選択
// グレースケールのカラムをクリックした時に色を変更
grayscaleColumn.addEventListener('click', handleColorSelect); // grayscaleColumnクリックで色を選択


// マウスイベントの設定
let isDraggingText = false;
let offsetX = 0;
let offsetY = 0;

// テキストのドラッグ機能の更新
canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    // クリックした場所がテキストの範囲内かどうかを判定
    if (mouseX >= textX && mouseX <= textX + ctx.measureText(textContent).width &&
        mouseY >= textY && mouseY <= textY + fontSize) {
        isDraggingText = true;
        offsetX = mouseX - textX; // クリックした位置からのオフセット
        offsetY = mouseY - textY;
        canvas.style.cursor = 'grabbing';
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDraggingText) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        // 新しい位置を計算
        textX = mouseX - offsetX;
        textY = mouseY - offsetY;
        redrawCanvas();
    }
});

canvas.addEventListener('mouseup', () => {
    isDraggingText = false;
    canvas.style.cursor = 'pointer';
});

canvas.addEventListener('mouseleave', () => {
    isDraggingText = false;
    canvas.style.cursor = 'default';
});


// ---------- 画像選択処理 ---------- 
document.getElementById('imageInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = new Image();
            img.onload = function () {
                image = img;  // 画像を保存
                imageWidth = img.width;
                imageHeight = img.height;
                aspectRatio = img.width / img.height;  // アスペクト比を計算
                imageX = (canvas.width - imageWidth) / 2;
                imageY = (canvas.height - imageHeight) / 2;
                redrawCanvas();  // 画像描画
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// 画像のサイズ変更
document.getElementById('increaseSize').addEventListener('click', () => {
    imageWidth += 50;
    imageHeight = imageWidth / aspectRatio;  // アスペクト比に基づいて高さを調整
    redrawCanvas();
});

document.getElementById('decreaseSize').addEventListener('click', () => {
    if (imageWidth > 50 && imageHeight > 50) {
        imageWidth -= 50;
        imageHeight = imageWidth / aspectRatio;  // アスペクト比に基づいて高さを調整
        redrawCanvas();
    }
});
// マウスのスクロールで画像のサイズ変更
canvas.addEventListener('wheel', (event) => {
    // スクロール方向によってサイズを変更
    if (event.deltaY < 0) {
        // 上にスクロール（サイズを大きくする）
        imageWidth += 50;
        imageHeight = imageWidth / aspectRatio;  // アスペクト比に基づいて高さを調整
    } else if (event.deltaY > 0) {
        // 下にスクロール（サイズを小さくする）
        if (imageWidth > 50 && imageHeight > 50) {
            imageWidth -= 50;
            imageHeight = imageWidth / aspectRatio;  // アスペクト比に基づいて高さを調整
        }
    }
    redrawCanvas();
});

// 画像のドラッグ機能の追加
let isDraggingImage = false;
let imageOffsetX = 0, imageOffsetY = 0;

canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    // 画像がクリックされたかどうかを判定
    if (mouseX >= imageX && mouseX <= imageX + imageWidth &&
        mouseY >= imageY && mouseY <= imageY + imageHeight) {
        isDraggingImage = true;
        imageOffsetX = mouseX - imageX; // クリック位置からのオフセット
        imageOffsetY = mouseY - imageY;
        canvas.style.cursor = 'grabbing';
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDraggingImage) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        // 画像の新しい位置を計算
        imageX = mouseX - imageOffsetX;
        imageY = mouseY - imageOffsetY;

        redrawCanvas();
    }
});

canvas.addEventListener('mouseup', () => {
    isDraggingImage = false;
    canvas.style.cursor = 'pointer';
});

// 画像削除
document.getElementById('delete').addEventListener('click', () => {
    image = null;
    redrawCanvas();  // キャンバスをクリア
});

// 画像ダウンロード
document.getElementById('download').addEventListener('click', () => {
    if (image) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'downloaded-image.png';
        link.click();
    } else {
        alert('画像がありません！');
    }
});

>>>>>>> e3c0476369bcf09414f0f563e6ade155d6318a3f
