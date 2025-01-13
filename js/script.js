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
    

    //ハンバーガー
    window.onload = function() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        const closeBtn = document.getElementById('closeBtn');
        
        // ハンバーガーアイコンがクリックされたときの処理
        hamburger.addEventListener('click', () => {
            navMenu.classList.add('active'); // メニューを表示
            hamburger.style.display = 'none'; // ハンバーガーアイコンを隠す
        });
    
        // ×ボタンがクリックされたときの処理
        closeBtn.addEventListener('click', () => {
            navMenu.classList.remove('active'); // メニューを閉じる
            hamburger.style.display = 'flex'; // ハンバーガーアイコンを再表示
        });
    
        // ハンバーガーメニュー内のリンククリック処理
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
        
                // 外部リンク（http://）またはページ遷移の場合、スムーズスクロールしない
                if (href.startsWith('http')) {
                    return; // 外部リンクはそのまま遷移
                }
    
                // メニューを閉じる
                navMenu.classList.remove('active');
                hamburger.style.display = 'flex'; // ハンバーガーアイコンを再表示
        
                // ページ内リンク（#）でスクロール
                if (href.startsWith('#')) {
                    e.preventDefault(); // デフォルトのリンク動作（ページ遷移）を防ぐ
                    const targetId = href.substring(1); // #を除いたIDを取得
                    const targetElement = document.getElementById(targetId); // 対象の要素を取得
        
                    // 対象が存在する場合、スムーズスクロールを実行
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    
        // 通常画面（デスクトップやタブレット）のリンクにも対応
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
    };
    