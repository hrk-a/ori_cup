//作成画面

// 画像を変更する関数
// カップの色選択
let selectedCupType = 'mug'; // デフォルトはマグカップ

// ---------- カップの種類を変更する関数
function changeImage(cupType) {
    selectedCupType = cupType; // グローバル変数を更新
    const displayImage = document.getElementById("display_image");
    const colorSection = document.getElementById('color');
    const cupElements = document.querySelectorAll('.cup img'); // 全てのコップ画像を取得    

    if (!displayImage) {
        console.error("display_image 要素が見つかりません");
        return;
    }

    // 画像パスを設定
    const imagePath = `img/cup/${cupType}.png`;
    displayImage.src = imagePath; // カップ画像を変更
    console.log("画像が変更されました: " + imagePath);

    // カラー選択の有効化/無効化
    if (cupType === 'glass' || cupType === 'jug' || cupType === 'wine') {
        // カラーパレットを無効化し、見た目を変更
        if (colorSection) {
            colorSection.style.pointerEvents = 'none';
            colorSection.style.opacity = '0.5';
            colorSection.style.backgroundColor = '#d3d3d3'; // 薄いグレーに変更
        }
    } else {
        // カラーパレットを有効化し、元の見た目に戻す
        if (colorSection) {
            colorSection.style.pointerEvents = 'auto';
            colorSection.style.opacity = '1';
            colorSection.style.backgroundColor = '#ffffff'; // 背景色を元に戻す
        }
    }

    // 既存の選択状態をリセット
    cupElements.forEach((cup) => {
        cup.classList.remove('selected');
    });

    // 選択された画像に 'selected' クラスを付与
    const selectedCup = document.querySelector(`.cup img[onclick="changeImage('${cupType}')"]`);
    if (selectedCup) {
        selectedCup.classList.add('selected');
    }

    // カップ種類と日本語の名前をマッピング
        const cupNameMap = {
            mug: 'マグカップ',
            tumbler: 'タンブラー',
            glass: 'グラス',
            jug: 'ジョッキ',
            wine: 'ワイングラス'
    };
    
    // 日本語のカップ名を取得
    const selectedCupName = cupNameMap[cupType] || '未選択'; // デフォルト値として'未選択'を設定

    //日本語名をローカルストレージに保存
    localStorage.setItem('selectedCupName', selectedCupName); // 日本語名を保存    
}

// ---------- 色を変更する関数
function changeColor(color) {
    const displayImage = document.getElementById("display_image");
    const colorElements = document.querySelectorAll('.color_img img'); // 全ての色画像を取得

    if (!displayImage) {
        console.error("display_image 要素が見つかりません");
        return;
    }

    // 色画像のパスを設定
    let colorImage;
    if (selectedCupType === 'mug') {
        colorImage = `img/cup/${color}_cup.png`; // マグカップ
    } else if (selectedCupType === 'tumbler') {
        colorImage = `img/cup/${color}_tumbler.png`; // タンブラー
    } else {
        console.warn("色変更はサポートされていないカップタイプです:", selectedCupType);
        return;
    }

    displayImage.src = colorImage; // 色変更後の画像を反映
    console.log("画像が変更されました: " + colorImage);

    // 既存の選択状態をリセット
    colorElements.forEach((colorEl) => {
        colorEl.classList.remove('selected');
    });

    // 選択された色画像に 'selected' クラスを付与
    const selectedColorElement = document.querySelector(`.color_img img[src="img/cup/${color}.png"]`);
    if (selectedColorElement) {
        selectedColorElement.classList.add('selected');
    }

    // 日本語の色名を取得
    const selectedColorName = event.target.getAttribute("data-color");

    // 日本語の色名をローカルストレージに保存
    localStorage.setItem('selectedColor', selectedColorName);
}

// 現在選択されているカップの種類を取得する関数
function getSelectedCupType() {
    return selectedCupType;
}

// ---------- ナビゲーション
document.addEventListener("DOMContentLoaded", () => {
    // ナビゲーションとコンテンツ要素を取得
    const navLinks = document.querySelectorAll("#create_nav a");
    const contents = document.querySelectorAll(".content");

    // 画像切り替え処理
    const updateImage = (link, isHover) => {
        const img = link.querySelector("img");
        if (img) {
            if (isHover) {
                img.src = img.getAttribute("data-hover");
            } else {
                img.src = img.getAttribute("data-default");
            }
        }
    };

    // クリックイベント: ナビゲーションの切り替え
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            // ナビゲーションのactive状態を更新
            navLinks.forEach(nav => {
                nav.classList.remove("active");
                updateImage(nav, false); // デフォルト画像に戻す
            });

            link.classList.add("active");
            updateImage(link, true); // アクティブ画像に切り替え

            // 対応する内容を表示
            const targetId = link.getAttribute("data-target");
            contents.forEach(content => {
                content.classList.remove("active");
                if (content.id === targetId) {
                    content.classList.add("active");

                    // コップ選択のコンテンツの場合、リンクの画像をホバー画像にする
                    updateImage(link, true); // コンテンツが表示されたときにホバー画像に切り替え
                }
            });
        });

        // マウスオーバー・マウスアウトイベントで画像切り替え
        link.addEventListener("mouseover", () => {
            if (!link.classList.contains("active")) {
                updateImage(link, true); // オーバー時にホバー画像に切り替え
            }
        });

        link.addEventListener("mouseout", () => {
            if (!link.classList.contains("active")) {
                updateImage(link, false); // マウスアウト時にデフォルト画像に戻す
            }
        });
    });

    // 初期状態で一番最初のリンクをアクティブにし、ホバー画像に切り替え
    const firstLink = navLinks[0]; // 最初のリンクを取得
    if (firstLink) {
        firstLink.classList.add("active");  // activeクラスを追加
        updateImage(firstLink, true);       // 初期状態でホバー画像に切り替え
    }

    // ナビゲーションの画像更新 (PC/Tablet/SP切り替え)
    const updateNavImages = () => {
        const isSPorTablet = window.innerWidth <= 832;  // スマートフォンまたはタブレット
        const isPC = window.innerWidth > 832;           // PCサイズ
        const images = document.querySelectorAll('.nav-image');

        images.forEach(img => {
            const pcDefaultSrc = img.getAttribute('data-pc');  // PC用デフォルト画像
            const pcHoverSrc = img.getAttribute('data-hover') || pcDefaultSrc;  // PC用hover画像
            const spTabletDefaultSrc = img.getAttribute('data-sp');  // スマホとタブレット共通のデフォルト画像
            const spTabletHoverSrc = img.getAttribute('data-sp-hover') || spTabletDefaultSrc;  // スマホ・タブレット用hover画像

            // スマホまたはタブレットサイズの場合
            if (isSPorTablet) {
                img.setAttribute('data-default', spTabletDefaultSrc);
                img.setAttribute('data-hover', spTabletHoverSrc);
                img.src = spTabletDefaultSrc;

                // クリックでホバー画像に切り替え
                img.addEventListener('click', () => {
                    img.src = spTabletHoverSrc;
                });

                // マウスアウトで元のデフォルト画像に戻す
                img.addEventListener('mouseout', () => {
                    img.src = spTabletDefaultSrc;
                });
            } 
            // PCサイズの場合
            else if (isPC) {
                img.setAttribute('data-default', pcDefaultSrc);
                img.setAttribute('data-hover', pcHoverSrc);
                img.src = pcDefaultSrc;

                // クリックでホバー画像に切り替え
                img.addEventListener('click', () => {
                    img.src = pcHoverSrc;
                });

                // マウスアウトで元のデフォルト画像に戻す
                img.addEventListener('mouseout', () => {
                    img.src = pcDefaultSrc;
                });
            }
        });
    };

    // 初期状態で画像を更新
    updateNavImages();

    // 画面リサイズ時に画像を更新
    window.addEventListener('resize', updateNavImages);
    
    // ページが読み込まれたときにも画像更新
    document.addEventListener('DOMContentLoaded', updateNavImages);
});

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


// 文字の反映先の要素を取得
//const inputValueBox = document.getElementById('myCanvas'); // ここが文字が反映される場所

/*// 入力内容の反映 
inputValue.addEventListener('input', () => {
    inputValueBox.textContent = inputValue.value;  // 入力された文字を反映
});*/

// カラーパレットから色を選択する
const colorPalette = document.getElementById('color_palette');
const grayscaleColumn = document.getElementById('grayscale_column');

// 色相と明度を組み合わせた色を作成
const hues = Array.from({ length: 22 }, (_, i) => i * 16.36);
const colors = [];
const rows = 10;
const columns = 22;

// 色を作成
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
    colorOption.addEventListener('click', () => {
        textColor = color;  // 選択された色をtextColorに設定
        redrawCanvas();  // キャンバスを再描画
    });
    colorPalette.appendChild(colorOption);
});

// 白黒グラデーションをカラムに追加
grayscaleColors.forEach(grayscale => {
    const grayscaleOption = document.createElement('div');
    grayscaleOption.classList.add('color_option');
    grayscaleOption.style.backgroundColor = grayscale;
    grayscaleOption.setAttribute('data-color', grayscale);
    grayscaleOption.addEventListener('click', () => {
        textColor = grayscale;  // 選択された色をtextColorに設定
        redrawCanvas();  // キャンバスを再描画
    });
    grayscaleColumn.appendChild(grayscaleOption);
});

// キャンバスに文字を描画する関数
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // キャンバスをクリア
    ctx.fillStyle = textColor;  // 文字の色を選択された色に設定
    ctx.font = '30px Arial';  // フォント設定
    ctx.textAlign = 'center';  // 文字をキャンバスの中央に配置
    ctx.textBaseline = 'middle';  // 文字のベースラインを中央に設定
    ctx.fillText(textContent, canvas.width / 2, canvas.height / 2);  // 文字をキャンバスに描画
} 


//　---------- 文字の反映
document.addEventListener("DOMContentLoaded", function () {
    const fontSelector = document.getElementById('fontSelector');
    const fontSizeInput = document.getElementById("font_size_input");
    const decreaseButton = document.getElementById("decrease_font_size");
    const increaseButton = document.getElementById("increase_font_size");
    const inputValueBox = document.getElementById("input_value");
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    
    let textX = 10; // テキストの初期X位置
    let textY = 20; // テキストの初期Y位置
    let isDragging = false; // ドラッグ中かどうかのフラグ
    let offsetX = 0; // マウスのクリック位置からテキスト位置までのオフセット
    let offsetY = 0; // マウスのクリック位置からテキスト位置までのオフセット

    // 初期のフォントサイズ
    let fontSize = parseInt(fontSizeInput.value) || 18;
    let selectedFont = fontSelector.value || "sans-serif";  // 初期フォント

    // フォントサイズを更新する関数
    function updateFontSize() {
        ctx.font = `${fontSize}px ${selectedFont}`;  // フォントサイズの変更
        redrawCanvas();  // キャンバスを再描画
    }
    
    // キャンバスの再描画関数
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);  // キャンバスをクリア
    
        const textContent = inputValueBox.value;  // 入力されたテキスト
        if (textContent) {
            ctx.fillStyle = "black";  // 文字色
            ctx.fillText(textContent, textX, textY);  // テキストの描画位置
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

   // ページ読み込み時に初期フォントサイズとフォントを適用
   updateFontSize();  // 初期状態でキャンバスを再描画
});

const rotationSlider = document.getElementById('rotation');
const rotationValue = document.getElementById('rotation_value');
let rotationAngle = 0;
// キャンバスの再描画関数
function redrawCanvas() {
    drawText(rotationAngle);  // 回転角度を反映して文字を描画
}

// 文字を描画する関数
function drawText(rotation) {
    // canvasの初期化
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 文字の位置とスタイル設定
    const text = textContent;  // 入力された文字を使用
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    // 回転を設定
    ctx.save(); // 現在の状態を保存
    //ctx.translate(x, y); // 回転の中心をcanvasの中心に設定
    ctx.rotate(rotation * Math.PI / 180); // 度数法からラジアンに変換
    ctx.fillText(text, -ctx.measureText(text).width / 2, 0); // 文字を描画
    ctx.restore(); // 状態を元に戻す
}

// スライダーの変更イベント
rotationSlider.addEventListener('input', () => {
    rotationAngle = rotationSlider.value;
    rotationValue.textContent = rotationSlider.value;
    drawText(rotationAngle);  // 新しい角度で文字を描画
});

// 初回の描画
drawText(rotationAngle);

/*// 入力されたテキストをリアルタイムで表示
inputArea.addEventListener('input', () => {
    displayBox.textContent = inputArea.value;
});*/


//　---------- 文字デザインの変更（プルダウンメニュー）
document.addEventListener("DOMContentLoaded", () => {
    const inputValueBox = document.getElementById("myCanvas"); // 表示エリア
    const verticalButton = document.getElementById("verticalButton"); // 縦書きボタン
    const normalButton = document.getElementById("normalButton"); // 横書きボタン

   /* // 入力フィールドの内容をリアルタイムで反映
    textInput.addEventListener("input", () => {
        inputValueBox.textContent = textInput.value; // 入力値を反映
    });*/

    // 縦書きボタンのクリックイベント
    verticalButton.addEventListener("click", () => {
        inputValueBox.classList.add("vertical-write"); // 縦書きスタイルを適用
    });

    // 横書きボタンのクリックイベント
    normalButton.addEventListener("click", () => {
        inputValueBox.classList.remove("vertical-write"); // 縦書きスタイルを解除
    });
});

// コップ画像を読み込む
const mugImage = new Image();
//mugImage.src = '../img/mug.png';  // 画像のパスが正しいことを確認してください
mugImage.onload = function () {
    // コップ画像が読み込まれたら、キャンバスに描画
    ctx.drawImage(mugImage, 0, 0, canvas.width, canvas.height);
};

// アップロードされた画像を保持する配列
let isDragging_picture = false;  // ドラッグフラグ
let draggingIndex = -1;  // 現在ドラッグ中の画像インデックス
let offsetX_picture, offsetY_picture;  // ドラッグ時のオフセット

let uploadedImages = [];  // アップロードされた画像のデータを格納する配列
let selectedImageIndex = -1;  // 現在選択されている画像のインデックス
let selectedText = null;  // 現在選択されている文字のオブジェクト
let isImageDragging = false;  // 画像がドラッグ中かどうか
let isTextDragging = false;  // 文字がドラッグ中かどうか
let offsetX = 0, offsetY = 0;  // ドラッグ時のオフセット

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


// キャンバスの再描画
/*function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
    ctx.drawImage(mugImage, 0, 0, canvas.width, canvas.height); // コップの画像を再描画
    uploadedImages.forEach((imgData, index) => {
        ctx.drawImage(imgData.image, imgData.x, imgData.y, imgData.width, imgData.height); // 各画像を描画
        if (selectedImageIndex === index) {
          // 選択されている画像に枠線を表示
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'nono';
        ctx.strokeRect(imgData.x, imgData.y, imgData.width, imgData.height);
        }
    });
}*/

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

// 画像のドラッグ操作
canvas.addEventListener('mousedown', function (e) {
    const rect = canvas.getBoundingClientRect();  // キャンバスの位置を取得
    const mouseX = e.clientX - rect.left;  // マウスの座標をキャンバスに合わせる
    const mouseY = e.clientY - rect.top;

    // 画像の範囲内をクリックした場合にドラッグを開始
    for (let i = 0; i < uploadedImages.length; i++) {
        const imgData = uploadedImages[i];
        if (mouseX >= imgData.x && mouseX <= imgData.x + imgData.width &&
            mouseY >= imgData.y && mouseY <= imgData.y + imgData.height) {
            selectedImageIndex = i; // 画像を選択
            isDragging = true;
            draggingIndex = i;
            offsetX = mouseX - imgData.x;
            offsetY = mouseY - imgData.y;
            break;
        }
    }
});

canvas.addEventListener('mousemove', function (e) {
    if (isDragging && draggingIndex >= 0) {
        const rect = canvas.getBoundingClientRect();  // キャンバスの位置を取得
        const mouseX = e.clientX - rect.left;  // マウスの座標をキャンバスに合わせる
        const mouseY = e.clientY - rect.top;

        const imgData = uploadedImages[draggingIndex];
        imgData.x = mouseX - offsetX;  // 新しい位置に画像を移動
        imgData.y = mouseY - offsetY;
        redrawCanvas();  // 再描画
    }
});

canvas.addEventListener('mouseup', function () {
    isDragging = false;  // ドラッグ終了
    draggingIndex = -1;  // 現在ドラッグ中の画像インデックスをリセット
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

    // 文字を描画
    if (text.content) {
        ctx.fillText(text.content, text.x, text.y);  // 文字を指定位置に描画
    }
}
    // 画像と文字のドラッグオフセットを個別に管理
    let imageOffsetX = 0, imageOffsetY = 0;  // 画像のオフセット
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

// コップを選んだ時の処理
const cupButtons = document.querySelectorAll(".cup-button");
        
cupButtons.forEach(button => {
    button.addEventListener("click", function () {
        const type = this.getAttribute("data-type");
        const color = this.getAttribute("data-color");

         // 選んだアイテムをローカルストレージに保存
        let cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
        cartData.push({ type, color });
        localStorage.setItem("cartItems", JSON.stringify(cartData));

        alert(`${type} (${color}) がカートに追加されました`);
    });
});

// カートリンクにアイテム数を表示
document.addEventListener("DOMContentLoaded", function () {
    let cartData = JSON.parse(localStorage.getItem("cartItems")) || [];
    let cartCount = cartData.length;
    let cartLink = document.getElementById("create_cart");
    
    if (cartCount > 0) {
        cartLink.innerHTML += `<span class="cart-count">(${cartCount}点)</span>`;
    }
});