//作成画面

// 画像を変更する関数
// カップの色選択
let selectedCupType = 'mug'; // デフォルトはマグカップ

// カップの種類を変更する関数
function changeImage(cupType) {
    selectedCupType = cupType; // グローバル変数を更新
    const displayImage = document.getElementById("display_image");
    const colorSection = document.getElementById('color');

    if (!displayImage) {
        console.error("display_image 要素が見つかりません");
        return;
    }

    // 画像パスを設定
    const imagePath = `img/cup/${cupType}.png`;

    // ふわっと表示
    displayImage.classList.remove("fade-in");  // クラスをリセット
    void displayImage.offsetWidth;  // DOMの再描画を強制
    displayImage.classList.add("fade-in");  // クラスを追加してアニメーションをトリガー

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
}

 // フォントを変更する関数
 document.getElementById('fontSelector').addEventListener('change', function() {
    var selectedFont = this.value; // プルダウンで選ばれたフォント
    document.getElementById('text').style.fontFamily = selectedFont; // テキストのフォントを変更
});

// 色を変更する関数
function changeColor(color) {
    const displayImage = document.getElementById("display_image");

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
        return; // 色変更を無効化
    }

    // ふわっと表示
    displayImage.classList.remove("fade-in");
    void displayImage.offsetWidth;
    displayImage.classList.add("fade-in");

    displayImage.src = colorImage; // 色変更後の画像を反映
    console.log("画像が変更されました: " + colorImage);
}

// 現在選択されているカップの種類を取得する関数
function getSelectedCupType() {
    return selectedCupType;
}

document.addEventListener("DOMContentLoaded", () => {
    // ナビゲーションとコンテンツ要素を取得
    const navLinks = document.querySelectorAll("#create_nav a");
    const contents = document.querySelectorAll(".content");

    // 画像切り替え処理
    const updateImage = (link, isActive) => {
        const img = link.querySelector("img");
        if (img) {
            const defaultSrc = isActive ? img.getAttribute("data-hover") : img.getAttribute("data-default");
            img.src = defaultSrc;
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
                }
            });
        });

        // マウスオーバー・マウスアウトイベントで画像切り替え
        link.addEventListener("mouseover", () => {
            if (!link.classList.contains("active")) updateImage(link, true);
        });
        link.addEventListener("mouseout", () => {
            if (!link.classList.contains("active")) updateImage(link, false);
        });
    });

    // 初期状態で一番最初のリンクをマウスオーバー画像に設定
    const firstLink = navLinks[0]; // 最初のリンクを取得
    if (firstLink) {
        firstLink.classList.add("active");  // activeクラスを追加
        updateImage(firstLink, true);       // 初期状態でマウスオーバー画像に切り替え
        firstLink.dispatchEvent(new MouseEvent("mouseover"));  // 最初のリンクにマウスオーバーイベントを手動で発火
    }

    // ナビゲーションの画像更新 (PC/SP切り替え)
    const updateNavImages = () => {
        const isSP = window.innerWidth <= 520;
        const images = document.querySelectorAll('.nav-image');

        images.forEach(img => {
            const pcDefaultSrc = img.getAttribute('data-pc');
            const pcHoverSrc = img.getAttribute('data-hover') || pcDefaultSrc;
            const spDefaultSrc = img.getAttribute('data-sp');
            const spHoverSrc = img.getAttribute('data-hover') || spDefaultSrc;

            img.setAttribute('data-default', isSP ? spDefaultSrc : pcDefaultSrc);
            img.setAttribute('data-hover', isSP ? spHoverSrc : pcHoverSrc);
            img.src = isSP ? spDefaultSrc : pcDefaultSrc;
        });
    };

    // 画面サイズ変更時に画像を更新
    window.addEventListener('resize', updateNavImages);
    updateNavImages(); // 初期状態で画像を更新


    // ページ読み込み時、リサイズ時に画像更新
    updateNavImages();
    window.addEventListener('resize', updateNavImages);


    // 入力内容の反映
    const formTestInputValue = document.getElementById('input_value');
    const inputValueBox = document.getElementById('input_value_box'); //ここが文字が反映される場所

    formTestInputValue.addEventListener('input', () => {
        inputValueBox.textContent = formTestInputValue.value;
    });

    // カラーパレットの作成
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
            inputValueBox.style.color = selectedColor;

            document.querySelectorAll('.color_option').forEach(option => {
                option.classList.remove('selected');
            });

            event.target.classList.add('selected');
        }
    }

    // カラーパレットのクリックイベントを設定
    colorPalette.addEventListener('click', handleColorSelect);
    grayscaleColumn.addEventListener('click', handleColorSelect);

    // 初期文字色設定
    inputValueBox.style.color = '#000000';
});

// 入力内容を反映
const inputArea = document.getElementById('input_value');
const displayBox = document.getElementById('input_value_box');
const fontSizeInput = document.getElementById('font_size_input');
const fontSizeValueCurrent = document.getElementById('font_size_value_current');
const rotationSlider = document.getElementById('rotation');
const rotationValue = document.getElementById('rotation_value');
const rotationValueCurrent = document.getElementById('rotation_value_current');
const textDesignSelect = document.getElementById('text_design');

document.addEventListener("DOMContentLoaded", function () {
    const fontSizeInput = document.getElementById("font_size_input");
    const decreaseButton = document.getElementById("decrease_font_size");
    const increaseButton = document.getElementById("increase_font_size");
    const inputValueBox = document.getElementById("input_value_box");

    // 初期のフォントサイズ
    let fontSize = parseInt(fontSizeInput.value);

    // フォントサイズを更新する関数
    function updateFontSize() {
        inputValueBox.style.fontSize = `${fontSize}px`;
    }

    // フォントサイズを小さくする
    decreaseButton.addEventListener("click", function () {
        if (fontSize > 0) {
            fontSize -= 1;
            fontSizeInput.value = fontSize;
            updateFontSize();
        }
    });

    // フォントサイズを大きくする
    increaseButton.addEventListener("click", function () {
        fontSize += 1;
        fontSizeInput.value = fontSize;
        updateFontSize();
    });

    // ユーザーが入力フィールドに直接値を入力した場合
    fontSizeInput.addEventListener("input", function () {
        fontSize = parseInt(fontSizeInput.value);
        updateFontSize();
    });

    // ページ読み込み時に初期フォントサイズを適用
    updateFontSize();
});

// 角度調整用スライダー
rotationSlider.addEventListener('input', () => {
    displayBox.style.transform = `translateX(-50%) rotate(${rotationSlider.value}deg)`;
    rotationValue.textContent = rotationSlider.value;
    rotationValueCurrent.textContent = rotationSlider.value;
});

// 入力されたテキストをリアルタイムで表示
inputArea.addEventListener('input', () => {
    displayBox.textContent = inputArea.value;
});

// ドラッグで移動
let isDragging = false;
let offsetX, offsetY;

// displayBoxをクリックしたときにドラッグを開始
displayBox.addEventListener('mousedown', (e) => {
    isDragging = true;
    // クリック位置からのオフセットを計算
    offsetX = e.clientX - displayBox.offsetLeft;
    offsetY = e.clientY - displayBox.offsetTop;
    // マウスカーソルを移動中に変える場合（任意）
    displayBox.style.cursor = 'move';
});

// マウスを動かしたときに、ドラッグ状態なら位置を更新
document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        displayBox.style.left = e.clientX - offsetX + 'px';
        displayBox.style.top = e.clientY - offsetY + 'px';
    }
});

// マウスを離したときにドラッグを終了
document.addEventListener('mouseup', () => {
    isDragging = false;
    displayBox.style.cursor = 'default';
});

// 文字デザインの変更（プルダウンメニュー）
document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("input_value"); // 入力フィールド
    const inputValueBox = document.getElementById("input_value_box"); // 表示エリア
    const verticalButton = document.getElementById("verticalButton"); // 縦書きボタン
    const normalButton = document.getElementById("normalButton"); // 横書きボタン

    // 入力フィールドの内容をリアルタイムで反映
    textInput.addEventListener("input", () => {
        inputValueBox.textContent = textInput.value; // 入力値を反映
    });

    // 縦書きボタンのクリックイベント
    verticalButton.addEventListener("click", () => {
        inputValueBox.classList.add("vertical-write"); // 縦書きスタイルを適用
    });

    // 横書きボタンのクリックイベント
    normalButton.addEventListener("click", () => {
        inputValueBox.classList.remove("vertical-write"); // 縦書きスタイルを解除
    });
});

// キャンバスとコンテキストの取得
const canvas = document.getElementById('mugCanvas');
const ctx = canvas.getContext('2d');

// コップ画像を読み込む
const mugImage = new Image();
//mugImage.src = '../img/mug.png';  // 画像のパスが正しいことを確認してください
mugImage.onload = function () {
    // コップ画像が読み込まれたら、キャンバスに描画
    ctx.drawImage(mugImage, 0, 0, canvas.width, canvas.height);
};

// アップロードされた画像を保持する配列
let uploadedImages = [];
let isDragging_picture = false;  // ドラッグフラグ
let draggingIndex = -1;  // 現在ドラッグ中の画像インデックス
let offsetX_picture, offsetY_picture;  // ドラッグ時のオフセット
let selectedImageIndex = -1;  // 現在選択中の画像インデックス

// アップロードされた画像のイベントリスナー
const uploadInput = document.getElementById('upload');
uploadInput.addEventListener('change', function (event) {
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = function (e) {
            const uploadedImage = new Image();
            uploadedImage.crossOrigin = 'anonymous';  // CORS対応の画像を読み込むために設定
            uploadedImage.src = e.target.result;

            uploadedImage.onload = function () {
                // 画像の初期位置をキャンバス中央に設定
                const imgWidth = uploadedImage.width;
                const imgHeight = uploadedImage.height;
                const imgX = (canvas.width - imgWidth) / 2;
                const imgY = (canvas.height - imgHeight) / 2;

                // 配列に新しい画像を追加
                uploadedImages.push({
                    image: uploadedImage,
                    x: imgX,
                    y: imgY,
                    width: imgWidth,
                    height: imgHeight
                });

                redrawCanvas(); // 再描画
            };
        };
        reader.readAsDataURL(file); // アップロード画像を読み込む
    }
});

// キャンバスの再描画
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // キャンバスをクリア
    ctx.drawImage(mugImage, 0, 0, canvas.width, canvas.height); // コップの画像を再描画
    uploadedImages.forEach((imgData, index) => {
        ctx.drawImage(imgData.image, imgData.x, imgData.y, imgData.width, imgData.height); // 各画像を描画
        /*if (selectedImageIndex === index) {
          // 選択されている画像に枠線を表示
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = 'nono';
          ctx.strokeRect(imgData.x, imgData.y, imgData.width, imgData.height);
        }*/
    });
}

// ダウンロードボタンの設定
const downloadButton = document.getElementById('download');
downloadButton.addEventListener('click', function () {
    // 画像がすべて読み込まれているかを確認
    let allImagesLoaded = uploadedImages.every(imgData => imgData.image.complete);

    if (allImagesLoaded) {
        // アップロードされた画像だけを扱うため、再描画を強制
        redrawCanvas();

        // キャンバスからPNGデータURLを取得
        const dataURL = canvas.toDataURL('img/png');

        // ダウンロード用のリンクを作成
        const link = document.createElement('a');
        link.href = dataURL; // 画像のURLをリンクに設定
        link.download = 'mug-design.png'; // ダウンロードするファイル名
        // リンクをクリックしてダウンロードを開始
        link.click();
    } else {
        alert("画像の読み込みが完了していません。再度お試しください。");
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

    