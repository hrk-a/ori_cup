// ---------- スライドショー ----------
document.addEventListener("DOMContentLoaded", function () {
    const slideshows = document.querySelectorAll('.slideshow');  // クラスで複数のスライドショーを選択
    
    slideshows.forEach(slideshow => {
        // 画像の配列
        const images = [
            "img/cup/mag1.png",
            "img/cup/mag2.png",
            "img/cup/mag3.png",
            "img/cup/mag4.png",
            "img/cup/tumbler1.png",
            "img/cup/tumbler2.png",
            "img/cup/tumbler3.png",
            "img/cup/tumbler4.png",
            "img/cup/glass1.png",
            "img/cup/glass2.png",
            "img/cup/glass3.png",
            "img/cup/glass4.png",
            "img/cup/jug1.png",
            "img/cup/jug2.png",
            "img/cup/jug3.png",
            "img/cup/jug4.png",
            "img/cup/wine1.png",
            "img/cup/wine2.png",
            "img/cup/wine3.png",
            "img/cup/wine4.png",
            "img/cup/green_tumbler.png",
            "img/cup/green_cup.png",
            "img/cup/lime_cup.png",
            "img/cup/mandarin_cup.png",
            "img/cup/lime_tumbler.png",
            "img/cup/mandarin_tumbler.png",
            "img/cup/pink_cup.png",
            "img/cup/pink_tumbler.png",
            "img/cup/purple_cup.png",
            "img/cup/purple_tumbler.png",
            "img/cup/red_cup.png",
            "img/cup/red_tumbler.png",
            "img/cup/tumbler.png",
            "img/cup/turquoise_cup.png",
            "img/cup/turquoise_tumbler.png",
            "img/cup/white_cup.png"
        ];

        // シャッフル関数
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];  // 配列の要素を交換
            }
        }

        // 画像をシャッフル
        shuffleArray(images);

        // 画像をスライドショーに追加
        images.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'スライド画像';
            slideshow.appendChild(img);
        });

        // 画像を複製して無限ループする
        const cloneImages = [...images];
        cloneImages.forEach(src => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = 'スライド画像';
            slideshow.appendChild(img);  // 複製された画像を追加
        });
    });
});


//ホーム画面のjs
document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const imgElement = link.querySelector("img");

        // 初期設定
        const defaultImage = link.getAttribute("data-image");
        const hoverImage = link.getAttribute("data-hover-image");

        if (link.classList.contains("active-nav")) {
            imgElement.src = hoverImage; // アクティブ状態はマウスオーバー画像
        } else {
            imgElement.src = defaultImage; // 非アクティブは通常画像
        }

        // クリックイベント
        link.addEventListener("click", function (event) {
            event.preventDefault(); // リンクのデフォルト動作をキャンセル

            // 他のリンクをデフォルト画像に戻す
            navLinks.forEach(nav => {
                const navImg = nav.querySelector("img");
                navImg.src = nav.getAttribute("data-image");
                nav.classList.remove("active-nav");
            });

            // クリックされたリンクをアクティブに
            imgElement.src = hoverImage;
            link.classList.add("active-nav");

            // 必要なら対応するコンテンツを表示
            const target = link.getAttribute("data-target");
            document.querySelectorAll(".content").forEach(content => {
                content.classList.remove("active");
            });
            if (target) {
                document.getElementById(target)?.classList.add("active");
            }
        });

        // マウスオーバーイベント
        link.addEventListener("mouseover", () => {
            if (!link.classList.contains("active-nav")) {
                imgElement.src = hoverImage;
            }
        });

        // マウスアウトイベント
        link.addEventListener("mouseout", () => {
            if (!link.classList.contains("active-nav")) {
                imgElement.src = defaultImage;
            }
        });
    });
    
});

//会員登録の名前の表示
 // ページ読み込み時にローカルストレージから名前を取得して表示
    window.addEventListener('DOMContentLoaded', function () {
    const userName = localStorage.getItem("name");
    if (userName) {
        document.getElementById("user-name-text").textContent = userName;
    }
    const furigana = localStorage.getItem("furigana");
    if (furigana) {
        document.getElementById("furigana").textContent = furigana;
    }
    const mail = localStorage.getItem("mail");
    if (mail) {
        document.getElementById("mail").textContent = mail;
    }
});


// よくある質問のコンテンツと色の切り替え
// クリックイベントの設定
document.addEventListener('DOMContentLoaded', function() {
    // クリックイベントの設定
    document.querySelectorAll('.question_design').forEach(item => {
        item.addEventListener('click', function() {
            const target = this.getAttribute('data-target'); // data-target属性を取得

            // 他のリンクに 'active' クラスを削除
            document.querySelectorAll('.question_design').forEach(link => {
                link.classList.remove('active-nav-link');
                link.style.backgroundColor = '';  // 背景色をリセット
            });

            // 現在クリックされたリンクに 'active' クラスを追加
            this.classList.add('active-nav-link');
            this.style.backgroundColor = this.getAttribute('data-color');  // 背景色を設定

            // 他のコンテンツを非表示にする
            document.querySelectorAll('.question_content').forEach(content => {
                content.style.display = 'none';
            });

            // 対象コンテンツを表示する
            const targetContent = document.getElementById(target);
            if (targetContent) {
                targetContent.style.display = 'block';  // クリックされたコンテンツを表示
            }
        });
    });
});

/*スクロールしたときに画像がふわっと表示される*/
window.addEventListener("scroll", function() {
    const images = document.querySelectorAll('.howto_step img');
    const windowHeight = window.innerHeight;
    
    images.forEach(function(image) {
        const imageTop = image.getBoundingClientRect().top;

        // 画像がスクロールで画面に現れたら "visible" クラスを追加
        if (imageTop < windowHeight * 0.8) {
            image.classList.add('visible');
        }
    });
});
window.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('#top_logo img');
    
    // ページが読み込まれたら "visible" クラスを追加
    images.forEach(function(image) {
        image.classList.add('visible');
    });
});



// アコーディオン
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const content = item.querySelector('.accordion-content');
        const toggleIcon = header.querySelector('.toggle-icon'); // +- アイコンを取得

        // 他のアコーディオンをすべて閉じる
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
                otherItem.querySelector('.toggle-icon').setAttribute('src', 'img/icon/plus.png'); // 他の項目を閉じると+に戻す
            }
        });

        // クリックしたアコーディオンを開閉する
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + "px";
            toggleIcon.setAttribute('src', 'img/icon/minus.png'); // 開いたときは-にする
        } else {
            content.style.maxHeight = null;
            toggleIcon.setAttribute('src', 'img/icon/plus.png'); // 閉じたときは+に戻す
        }
    });
});


// メンバー紹介
    // クリックで画像を切り替える
    // 画像の配列を定義
    const images = [
        "img/profile/natsumi.jpg",
        "img/profile/konatsu.jpg",
        "img/profile/chika.jpg",
        "img/profile/haruka.jpg"
    ];
    let currentIndex = 0;

    // 画像を切り替える関数
    function changeImage() {
        currentIndex = (currentIndex + 1) % images.length; // 次の画像インデックスを計算
        const mainImage = document.getElementById("profile-img");
        mainImage.src = images[currentIndex]; // 新しい画像に切り替え
    }
    