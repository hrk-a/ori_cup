//作成画面

let selectedCupType = 'mug'; // デフォルトはマグカップ
let isTextDragging = false;


//  ----------  テキスト入力  ---------- 
const inputValue = document.getElementById('input_value');
const fontSelector = document.getElementById('fontSelector');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 初期の文字内容
let textContent = "";
let textX = 10;  // 初期X位置
let textY = 20;  // 初期Y位置
let isDragging = false;  // ドラッグ中かどうかのフラグ
let offsetX, offsetY;  // ドラッグ開始時のオフセット

// 初期設定
canvas.width = canvas.offsetWidth * window.devicePixelRatio;
canvas.height = canvas.offsetHeight * window.devicePixelRatio;
ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

// ---------- 入力内容の反映 ----------

// 入力した内容をdisplayTextに表示する関数
function updateDisplayText() {
    var inputText = document.getElementById("input_value").value; // テキストエリアから入力内容を取得

    // 改行を<br>タグに変換
    const formattedText = inputText.replace(/\n/g, "<br>");
    
    // テキストをdisplayTextに表示
    document.getElementById("displayText").innerHTML = formattedText;
    
    // displayTextの参照を取得してボーダーを追加
    const displayText = document.getElementById("displayText");

    // テキストが入力されたらボーダーを追加
    if (inputText.trim() !== "") {
      displayText.style.border = "2px solid black";  // ボーダーを追加
    } else {
      displayText.style.border = "none";  // テキストが空ならボーダーを削除
    }

    if (displayText) {
        displayText.style.border = "2px solid black";
    }
}

// 入力内容が変更された時に呼ばれるようにイベントリスナーを追加
document.getElementById("input_value").addEventListener("input", updateDisplayText);

// デバイスの解像度に合わせてキャンバスの解像度を設定
const dpr = window.devicePixelRatio || 1;  // デバイスのピクセル比
canvas.width = canvas.offsetWidth * dpr;
canvas.height = canvas.offsetHeight * dpr;
ctx.scale(dpr, dpr);  // コンテキストのスケールをデバイスに合わせる

// キャンバスの再描画関数
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // キャンバスをクリア

    // フォント設定
    ctx.font = `${fontSize}px ${selectedFont}`;
    ctx.fillStyle = "black";  // 文字の色

    // テキスト内容が改行を含む場合、行ごとに描画
    const lines = textContent.split('\n');  // 改行でテキストを分割
    let currentY = textY;  // 現在のY座標を保持

    // 横書きの場合
    if (writingMode === "horizontal") {
        lines.forEach(line => {
            ctx.fillText(line, textX, currentY);  // 行ごとにテキストを描画
            currentY += fontSize + 5;  // 次の行は縦に少しスペースを空けて描画
        });
    } else if (writingMode === "vertical") {
        // 縦書きの場合
        const x = 50; // 縦書きの開始位置（X座標）
        let y = 50; // 縦書きの開始位置（Y座標）
        lines.forEach(line => {
            for (let i = 0; i < line.length; i++) {
                ctx.fillText(line[i], x, y);  // 縦書きテキスト
                y += fontSize + 5; // 次の文字は縦にフォントサイズ＋5px下に描画
            }
        });
    }
}

// フォント選択時にキャンバスを再描画
fontSelector.addEventListener('change',redrawCanvas);

document.addEventListener("DOMContentLoaded", function () {
    const fontSelector = document.getElementById('fontSelector');
    const fontSizeInput = document.getElementById("font_size_input");
    const decreaseButton = document.getElementById("decrease_font_size");
    const increaseButton = document.getElementById("increase_font_size");
    const inputValueBox = document.getElementById("input_value");
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const verticalButton = document.getElementById("verticalButton"); // 縦書きボタン
    const normalButton = document.getElementById("normalButton"); // 横書きボタン


    let selectedFont = fontSelector.value || "sans-serif";  // 初期フォント
    let textContent = inputValueBox.value;// テキスト内容

    // グローバルスコープで writingMode を宣言
    let writingMode = "horizontal";  // デフォルトは横書き
    let fontSize = 18;  // 初期フォントサイズを18に設定（グローバルに定義）

    // キャンバスの再描画関数
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // キャンバスをクリア

        // フォント設定
        ctx.font = `${fontSize}px ${selectedFont}`;

 // テキスト内容が改行を含む場合、行ごとに描画
 const lines = textContent.split('\n');  // 改行でテキストを分割
 let currentY = textY;  // 現在のY座標を保持


   // 横書きの場合
   if (writingMode === "horizontal") {
    lines.forEach(line => {
        ctx.fillText(line, textX, currentY);  // 行ごとにテキストを描画
        currentY += fontSize + 5;  // 次の行は縦に少しスペースを空けて描画
    });
} else if (writingMode === "vertical") {
    // 縦書きの場合
    const x = 50; // 縦書きの開始位置（X座標）
    let y = 50; // 縦書きの開始位置（Y座標）
    lines.forEach(line => {
        for (let i = 0; i < line.length; i++) {
            ctx.fillText(line[i], x, y);  // 縦書きテキスト
            y += fontSize + 5; // 次の文字は縦にフォントサイズ＋5px下に描画
        }
    });
}
}

    // フォントサイズを小さくする
    decreaseButton.addEventListener("click", function () {
        fontSize = Math.max(12, fontSize - 1); 
        fontSizeInput.value = fontSize;
        updateFontSize();        
    });

    // フォントサイズを大きくする
    increaseButton.addEventListener("click", function () {
        fontSize = Math.min(72, fontSize + 1); 
        fontSizeInput.value = fontSize;
        updateFontSize();
    });

    // ユーザーが入力フィールドに直接値を入力した場合
    fontSizeInput.addEventListener("input", function () {
        fontSize = parseInt(fontSizeInput.value) || 18;  // 数値以外の場合は18に設定
        updateFontSize();  // フォントサイズを更新
    });

    // フォント選択時の処理
    fontSelector.addEventListener('change', function () {
        selectedFont = fontSelector.value;  // 選択したフォントを設定
        updateFontSize();  // フォントを適用して再描画
    });

    // フォントサイズを更新する関数
    function updateFontSize() {
        redrawCanvas();  // フォントサイズとフォントが反映されるように再描画
    }

    // テキスト入力が変わった時の処理
    inputValueBox.addEventListener('input', () => {
        textContent = inputValueBox.value;  // 入力された文字を保存
        redrawCanvas();  // キャンバスを再描画
    });

    // 横書きボタンがクリックされたとき
    normalButton.addEventListener('click', () => {
        writingMode = "horizontal";  // 横書きに設定
        redrawCanvas();  // 再描画
    });

    // 縦書きボタンがクリックされたとき
    verticalButton.addEventListener('click', () => {
        writingMode = "vertical";  // 縦書きに設定
        redrawCanvas();  // 再描画
    });

    // ページ読み込み時に初期フォントサイズとフォントを適用
    updateFontSize();  // 初期状態でキャンバスを再描画


    // ---------- カラーパレットの作成
    const colorPalette = document.getElementById('color_palette');
    const grayscaleColumn = document.getElementById('grayscale_column');

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
            
            // キャンバスのテキストの色を変更
            ctx.fillStyle = selectedColor;

            // すべての色オプションの選択状態をリセット
            document.querySelectorAll('.color_option').forEach(option => {
                option.classList.remove('selected');
            });

            // 選択した色オプションにクラス「selected」を追加
            event.target.classList.add('selected');

            // テキストの色を再描画
            redrawCanvas();  // 色変更後、縦書き/横書きの状態を維持して再描画
        }
    }

    // カラーパレットのクリックイベントを設定
    colorPalette.addEventListener('click', handleColorSelect);
    grayscaleColumn.addEventListener('click', handleColorSelect);

    // ドラッグ機能の追加
    canvas.addEventListener('mousedown', function (event) {
        if (event.offsetX >= textX && event.offsetX <= textX + ctx.measureText(textContent).width &&
            event.offsetY >= textY - fontSize && event.offsetY <= textY) {
            isDragging = true;  // ドラッグ開始
            offsetX = event.offsetX - textX;
            offsetY = event.offsetY - textY;
    }
    canvas.addEventListener('mousemove', function (event) {
        if (isDragging) {
            textX = event.offsetX - offsetX;
            textY = event.offsetY - offsetY;
            redrawCanvas();  // テキスト位置を更新して再描画
        }
    });

    canvas.addEventListener('mouseup', function () {
        isDragging = false;  // ドラッグ終了
    });

    canvas.addEventListener('mouseout', function () {
        isDragging = false;  // マウスが外に出たらドラッグを終了
    });
});
});

//　---------- 文字デザインの変更（プルダウンメニュー） ---------- 
document.addEventListener("DOMContentLoaded", () => {

    // コップ画像を読み込む
    const mugImage = new Image();
    //mugImage.src = '../img/mug.png';  // 画像のパスが正しいことを確認してください
    mugImage.onload = function () {
        // コップ画像が読み込まれたら、キャンバスに描画
        ctx.drawImage(mugImage, 0, 0, canvas.width, canvas.height);
    };

    // スクロールで拡大縮小
    canvas.addEventListener('wheel', function (e) {
        e.preventDefault(); // ページのスクロールを防止
        if (selectedImageIndex >= 0) {
            const imgData = uploadedImages[selectedImageIndex];
            const scaleFactor = 0.1;  // サイズ変更の倍率
            if (e.deltaY < 0) {  // 上にスクロール → 拡大
                imgData.width *= (1 + scaleFactor);
                imgData.height *= (1 + scaleFactor);
            } else if (e.deltaY > 0) {  // 下にスクロール → 縮小
                imgData.width *= (1 - scaleFactor);
                imgData.height *= (1 - scaleFactor);
            }
            redrawCanvas();  // 再描画
        }
    });

    // 画像と文字をキャンバスに描画
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // キャンバスをクリア
    }
    let dragStartX = 0;  // ドラッグ開始時のX座標
    let dragStartY = 0;  // ドラッグ開始時のY座標
    
    // テキストをクリックしたときにドラッグを開始
    canvas.addEventListener('mousedown', (e) => {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;
    
        // テキストがクリックされた場合、ドラッグを開始
        if (mouseX >= textX && mouseX <= textX + ctx.measureText(textContent).width &&
            mouseY >= textY - fontSize && mouseY <= textY) {
            isTextDragging = true;
            dragStartX = mouseX - textX;
            dragStartY = mouseY - textY;
        }
    });
    
    // テキストをドラッグしている間、位置を更新
    canvas.addEventListener('mousemove', (e) => {
        if (isTextDragging) {
            const mouseX = e.offsetX;
            const mouseY = e.offsetY;
    
            // ドラッグされた分だけテキストの位置を更新
            textX = mouseX - dragStartX;
            textY = mouseY - dragStartY;
    
            redrawCanvas();  // キャンバスを再描画
        }
    });
    
    // ドラッグを終了
    canvas.addEventListener('mouseup', () => {
        isTextDragging = false;
    });
    
    // キャンバスの再描画関数
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // キャンバスをクリア
    
        if (textContent) {
            ctx.font = `${fontSize}px ${selectedFont}`;
            ctx.fillStyle = selectedColor;  // 現在選択されている色
            ctx.fillText(textContent, textX, textY);
        }
    }
    
    // 画像と文字のドラッグオフセットを個別に管理
    let textOffsetX = 0, textOffsetY = 0;    // 文字のオフセット

    canvas.addEventListener('mousedown', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // 文字を選択
        if (mouseX >= text.x && mouseX <= text.x + ctx.measureText(text.content).width &&
            mouseY >= text.y - 30 && mouseY <= text.y) {
            selectedText = text;
            isTextDragging = true;
            textOffsetX = mouseX - text.x;  // 文字用オフセット
            textOffsetY = mouseY - text.y;
            selectedImageIndex = -1;  // 文字が選択されているので画像選択解除
            return;  // 文字が選択された場合、これ以降の処理を終了
        }

    });

    canvas.addEventListener('mousemove', function(e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;


        // 文字をドラッグ
        if (isTextDragging && selectedText) {
            selectedText.x = mouseX - textOffsetX;  // 文字用オフセットを使用
            selectedText.y = mouseY - textOffsetY;
            redrawCanvas();
        }
    });

    canvas.addEventListener('mouseup', function() {
        isImageDragging = false;
        isTextDragging = false;
        selectedText = null;  // 文字の選択を解除
    });

    //　---------- 画像のアップロード ---------- 
    document.getElementById('imageInput').addEventListener('change', function(event) {
        const files = event.target.files; // 選ばれたファイルを取得
        const displayDiv = document.getElementById('displayimg'); // 表示するdivを取得
    
        // まずはdivをクリア（前回選択された画像を削除）
        displayDiv.innerHTML = '';
    
        // 複数選択されていた場合はループ処理
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            // FileReaderを使って画像を読み込む
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // 読み込んだ画像をimg要素として表示
                const img = document.createElement('img');
                img.src = e.target.result; // 読み込んだ画像のURLを設定
                img.style.maxWidth = '200px'; // 画像の最大幅を設定（任意）
                displayDiv.appendChild(img); // divに画像を追加
            };
    
            // ファイルを読み込む
            reader.readAsDataURL(file);
        }
    });
});


