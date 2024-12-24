document.getElementById('check_button').addEventListener('click', function (event) {
    event.preventDefault(); // フォームの送信を防ぐ

    // 入力フィールドの値を取得
    const kindsSelect = document.getElementById('kindsSelect').value;
    const name = document.getElementById('name').value.trim();
    const furigana = document.getElementById('furigana').value.trim();
    const mail = document.getElementById('mail').value.trim();
    const phone1 = document.getElementById('phone1').value.trim();
    const phone2 = document.getElementById('phone2').value.trim();
    const phone3 = document.getElementById('phone3').value.trim();
    const message = document.getElementById('kinds_text').value.trim();

    // エラーメッセージをリセット
    resetErrorMessages();

    let hasError = false;

    // お問い合わせ項目のバリデーション
    if (kindsSelect === "nomal") {
        setErrorMessage('kindsSelect', '項目を選択してください。');
        hasError = true;
    }

    // お名前のバリデーション
    if (!name) {
        setErrorMessage('name', '名前を入力してください。');
        hasError = true;
    }

    // フリガナのバリデーション
    if (!furigana) {
        setErrorMessage('furigana', 'フリガナを入力してください。');
        hasError = true;
    }

    // メールアドレスのバリデーション
    if (!mail) {
        setErrorMessage('mail', 'メールアドレスを入力してください。');
        hasError = true;
    } else {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(mail)) {
            setErrorMessage('mail', '有効なメールアドレスを入力してください。');
            hasError = true;
        }
    }

    // 電話番号のバリデーション
    if (!phone1 || !phone2 || !phone3) {
        setErrorMessage('phone', '電話番号の部分を全て入力してください。');
        hasError = true;
    } else {
        const phonePattern = /^\d{1,4}$/;
        if (!phonePattern.test(phone1) || !phonePattern.test(phone2) || !phonePattern.test(phone3)) {
            setErrorMessage('phone', '電話番号は数字のみで入力してください。');
            hasError = true;
        }
    }

    // お問い合わせ内容のバリデーション
    if (!message) {
        setErrorMessage('kinds_text', 'お問い合わせ内容を入力してください。');
        hasError = true;
    }

    // 入力内容をローカルストレージに保存（デバッグ用やデータ保持のため）
    localStorage.setItem('kindsSelect', kindsSelect);
    localStorage.setItem('name', name);
    localStorage.setItem('furigana', furigana);
    localStorage.setItem('mail', mail);
    localStorage.setItem('phone1', phone1);
    localStorage.setItem('phone2', phone2);
    localStorage.setItem('phone3', phone3);
    localStorage.setItem('message', message);

    // エラーがなければモーダルを表示
    if (!hasError) {
        // モーダルウィンドウを表示
        const modalOverlay = document.querySelector('.modal_overlay');
        const modal = document.getElementById('modal');
        
        // モーダルとオーバーレイを表示
        modalOverlay.style.display = "block"; //表示
        modal.style.display = "block"; // モーダルを表示する

        // モーダル内に入力された値を表示
        document.getElementById('modal-kindsSelect').innerHTML = `${kindsSelect}`;
        document.getElementById('modal-name').innerHTML = `${name}`;
        document.getElementById('modal-furigana').innerHTML = `${furigana}`;
        document.getElementById('modal-email').innerHTML = `${mail}`;
        document.getElementById('modal-phone').innerHTML = `${phone1}-${phone2}-${phone3}`;
        document.getElementById('modal-message').innerHTML = `${message.replace(/\n/g, '<br>')}`;

        // モーダル送信ボタンのイベント
        document.getElementById('check_contents').addEventListener('submit', function (event) {
            event.preventDefault();
            document.getElementById('check_contents').innerHTML =
            '<h2>お問い合わせ完了画面</h2><br><h3 class="thanks">お問い合わせありがとうございました。</h3><br><br><p class="thanks_comment">※メールアドレスが間違っている場合は「自動確認メール」が届きません。<br>お手数ですが再度ご入力ください</p></td></tr></table>';
        });

        // モーダルを閉じる処理
        const closeModal = document.getElementById('close-modal');
        closeModal.addEventListener('click', function () {
            modalOverlay.style.display = "none";  // オーバーレイを非表示
            modal.style.display = "none";         // モーダルを非表示
        });

        // モーダルの外側をクリックしたら閉じる
        window.addEventListener('click', function (e) {
            if (e.target === modal) {
                modalOverlay.style.display = "none";  // オーバーレイを非表示
                modal.style.display = "none";         // モーダルを非表示
                }
        });
    }
});

// エラーメッセージを表示する関数
function setErrorMessage(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// エラーメッセージをリセットする関数
function resetErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}
