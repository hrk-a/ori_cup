//カップ・色の変更　ナビゲーション

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

        // 「透明」という色情報をローカルストレージに保存
        localStorage.setItem('selectedColor', '透明');
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

    // 日本語名をローカルストレージに保存
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