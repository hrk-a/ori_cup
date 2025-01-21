//作成画面

// 画像を変更する関数
// カップの色選択
let selectedCupType = 'mug'; // デフォルトはマグカップ


/* テキスト入力 */
const inputValue = document.getElementById('input_value');
const fontSelector = document.getElementById('fontSelector');
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 初期の文字内容
let textContent = "";

// 入力内容の反映
inputValue.addEventListener('input', () => {
    textContent = inputValue.value;  // 入力された文字を保存
    console.log("入力された文字:", textContent);  // コンソールに文字を表示    
    redrawCanvas();  // キャンバスを再描画
});

// デバイスの解像度に合わせてキャンバスの解像度を設定
const dpr = window.devicePixelRatio || 1;  // デバイスのピクセル比
canvas.width = canvas.offsetWidth * dpr;
canvas.height = canvas.offsetHeight * dpr;
ctx.scale(dpr, dpr);  // コンテキストのスケールをデバイスに合わせる

// キャンバスの再描画関数
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // キャンバスをクリア

    // テキスト内容があればキャンバスに描画
    if (textContent) {
        ctx.font = `18px ${fontSelector.value}`;  // フォントの設定
        ctx.fillStyle = "black";  // 文字の色
        ctx.fillText(textContent, 10, 20);  // (left10, top20)の位置に描画
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

    let textX = 10; // テキストの初期X位置
    let textY = 20; // テキストの初期Y位置

    // 初期のフォントサイズ
    let fontSize = parseInt(fontSizeInput.value) || 18;
    let selectedFont = fontSelector.value || "sans-serif";  // 初期フォント

    // テキスト内容
    let textContent = inputValueBox.value;

    // グローバルスコープで writingMode を宣言
    let writingMode = "horizontal";  // デフォルトは横書き

    // キャンバスの再描画関数
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // キャンバスをクリア

        // フォント設定
        ctx.font = `${fontSize}px ${selectedFont}`;

        if (writingMode === "horizontal") {
            // 横書きの場合
            ctx.fillText(textContent, textX, textY);  // 横書きテキスト
        } else if (writingMode === "vertical") {
            // 縦書きの場合
            const x = 50; // 縦書きの開始位置（X座標）
            let y = 50; // 縦書きの開始位置（Y座標）
            for (let i = 0; i < textContent.length; i++) {
                ctx.fillText(textContent[i], x, y);  // 縦書きテキスト
                y += fontSize + 5; // 次の文字は縦にフォントサイズ＋5px下に描画
            }
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
});


const rotationSlider = document.getElementById('rotation');
const rotationValue = document.getElementById('rotation_value');
let rotationAngle = 0;

// 回転と描画
function drawText(rotation) {
    // キャンバスの初期化
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const text = textContent;  // 入力された文字を使用
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    // 回転を設定
    ctx.save(); // 現在の状態を保存
    ctx.translate(x, y); // 回転の中心をcanvasの中心に設定
    ctx.rotate(rotation * Math.PI / 180); // 度数法からラジアンに変換
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0); // 文字を描画
    ctx.restore(); // 状態を元に戻す
}

// スライダーの変更イベント
rotationSlider.addEventListener('input', () => {
    rotationAngle = rotationSlider.value;
    rotationValue.textContent = rotationSlider.value;
    drawText(rotationAngle);  // 新しい角度で文字を描画
    
// 初回の描画
drawText(rotationAngle);

});


//　---------- 文字デザインの変更（プルダウンメニュー）
document.addEventListener("DOMContentLoaded", () => {
    //const inputValueBox = document.getElementById("myCanvas"); // 表示エリア

// コップ画像を読み込む
const mugImage = new Image();
//mugImage.src = '../img/mug.png';  // 画像のパスが正しいことを確認してください
mugImage.onload = function () {
    // コップ画像が読み込まれたら、キャンバスに描画
    ctx.drawImage(mugImage, 0, 0, canvas.width, canvas.height);
};

// アップロードされた画像を保持する配列
let uploadedImages = [];  // アップロードされた画像のデータを格納する配列
let selectedImageIndex = -1;  // 現在選択されている画像のインデックス
let selectedText = null;  // 現在選択されている文字のオブジェクト
let isImageDragging = false;  // 画像がドラッグ中かどうか
let isTextDragging = false;  // 文字がドラッグ中かどうか
let text = { content: "", x: 50, y: 50 };  // 文字のデータ（位置と内容）



// 画像選択のイベントリスナー
document.getElementById("imageInput").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const imgData = {
                    image: img,
                    x: 0, 
                    y: 0, 
                    width: img.width,
                    height: img.height
                };
                uploadedImages.push(imgData);  // 画像データを配列に追加
                redrawCanvas();  // キャンバスを再描画
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// ダウンロードボタン
document.getElementById('download').addEventListener('click', function() {
    if (uploadedImages.length > 0 || text.content) {
        // キャンバスからPNGデータURLを取得
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'mug-design.png';
        link.click();
    } else {
        alert("画像や文字がありません。画像をアップロードしてください。");
    }
});

// 画像のサイズ変更
const increaseSizeButton = document.getElementById('increaseSize');
const decreaseSizeButton = document.getElementById('decreaseSize');

increaseSizeButton.addEventListener('click', function () {
    if (selectedImageIndex >= 0) {
        const imgData = uploadedImages[selectedImageIndex];
        const scaleFactor = 0.1; // サイズ変更の倍率
        imgData.width *= (1 + scaleFactor); // 幅を拡大
        imgData.height *= (1 + scaleFactor); // 高さを拡大
        redrawCanvas(); // 再描画
    }
});

decreaseSizeButton.addEventListener('click', function () {
    if (selectedImageIndex >= 0) {
        const imgData = uploadedImages[selectedImageIndex];
        const scaleFactor = 0.1; // サイズ変更の倍率
        imgData.width *= (1 - scaleFactor); // 幅を縮小
        imgData.height *= (1 - scaleFactor); // 高さを縮小
        redrawCanvas(); // 再描画
    }
});

// 画像削除ボタン
const deleteButton = document.getElementById('delete');
deleteButton.addEventListener('click', function () {
    if (selectedImageIndex >= 0) {
        uploadedImages.splice(selectedImageIndex, 1); // 配列から画像を削除
        selectedImageIndex = -1; // 選択状態を解除
        redrawCanvas(); // 再描画
    }
});

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

            // 画像を描画
            uploadedImages.forEach(function(imgData) {
                ctx.drawImage(imgData.image, imgData.x, imgData.y, imgData.width, imgData.height);
            });
        
        }

        // 画像と文字のドラッグオフセットを個別に管理
        let imageOffsetX = 0, imageOffsetY = 0;  // 画像のオフセット

        canvas.addEventListener('mousedown', function(e) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;


            // 画像を選択（文字が選ばれなかった場合のみ）
            for (let i = 0; i < uploadedImages.length; i++) {
                const imgData = uploadedImages[i];
                if (mouseX >= imgData.x && mouseX <= imgData.x + imgData.width &&
                    mouseY >= imgData.y && mouseY <= imgData.y + imgData.height) {
                    selectedImageIndex = i;
                    isImageDragging = true;
                    imageOffsetX = mouseX - imgData.x;  // 画像用オフセット
                    imageOffsetY = mouseY - imgData.y;
                    break;
                }
            }
        });

        canvas.addEventListener('mousemove', function(e) {
            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            // 画像をドラッグ
            if (isImageDragging && selectedImageIndex >= 0) {
                const imgData = uploadedImages[selectedImageIndex];
                imgData.x = mouseX - imageOffsetX;  // 画像用オフセットを使用
                imgData.y = mouseY - imageOffsetY;
                redrawCanvas();
            }

      
        });

 });
