document.getElementById("container").addEventListener("submit", function(event) {
    event.preventDefault(); // フォームの送信を一時的に防止

    // フィールドのエラーメッセージをリセット
    resetErrors();

    let isValid = true;

    // 名前（お名前）のバリデーション
    const name = document.getElementById("name").value;
    if (name === "") {
        displayError("name", "お名前を入力してください");
        isValid = false;
    }

    // フリガナのバリデーション
    const furigana = document.getElementById("furigana").value;
    const katakanaRegex = /^[\u30A0-\u30FF]+$/;
    if (furigana === "") {
        displayError("furigana", "フリガナを入力してください");
        isValid = false;
    } else if (!katakanaRegex.test(furigana)) {
        displayError("furigana", "フリガナはカタカナで入力してください");
        isValid = false;
    }

    // メールアドレスのバリデーション
    const mail = document.getElementById("mail").value;
    const mailRegex = /^[\w-]+(\.[\w-]+)*@[\w-]+\.[a-zA-Z]{2,7}$/;
    if (mail === "" || !mailRegex.test(mail)) {
        displayError("mail", "有効なメールアドレスを入力してください");
        isValid = false;
    }

    // パスワードのバリデーション
    const password = document.getElementById("password").value;
    if (password === "" || password.length < 8) {
        displayError("password", "パスワードは8文字以上で入力してください");
        isValid = false;
    }

    // 確認パスワードのバリデーション
    const confirmPassword = document.getElementById("confirm_password").value;
    if (confirmPassword !== password) {
        displayError("confirm_password", "パスワードが一致しません");
        isValid = false;
    }

    // バリデーションが全て通った場合のみフォームを送信
    if (isValid) {
        // フォームデータをローカルストレージに保存
        localStorage.setItem("name", name);
        localStorage.setItem("furigana", furigana);
        localStorage.setItem("mail", mail);
        localStorage.setItem("password", password);

        // 登録完了メッセージとホームへ戻るボタンを表示
        document.getElementById("container").innerHTML = "<p>会員登録が完了しました。</p>";
        document.getElementById("after").innerHTML = "<div class='button'><a href='index.html'><button class='contact_button home'>ホームに戻る</button></a></div>";

        // 会員登録が完了したため、送信ボタンを非表示にする
        document.getElementById("submitButton").style.display = "none";
    }
});

// エラーメッセージを表示
function displayError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}-error`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

// エラーメッセージをリセット
function resetErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach((element) => {
        element.textContent = "";
    });
}

// ページ読み込み時にローカルストレージからデータを取得してフォームに表示
window.addEventListener('DOMContentLoaded', function () {
    // ローカルストレージから取得した名前をフォームに設定
    if (localStorage.getItem("name")) {
        document.getElementById("name").value = localStorage.getItem("name");
    }

    // ローカルストレージから取得したフリガナをフォームに設定
    if (localStorage.getItem("furigana")) {
        document.getElementById("furigana").value = localStorage.getItem("furigana");
    }

    // ローカルストレージから取得したメールアドレスをフォームに設定
    if (localStorage.getItem("mail")) {
        document.getElementById("mail").value = localStorage.getItem("mail");
    }

    // 会員登録が完了している場合、ログアウトボタンを表示
    const logoutButton = document.getElementById("deleteAccountButton");
    const submitButton = document.getElementById("submitButton");

    if (localStorage.getItem("name")) {
        // 会員登録済みの場合、送信ボタンを非表示にし、ログアウトボタンを表示
        submitButton.style.display = "none";
        logoutButton.style.display = "block";

        logoutButton.addEventListener("click", function(event) {
            event.preventDefault(); // ログアウト時にページリダイレクトを防ぐ
            localStorage.removeItem("name");
            localStorage.removeItem("furigana");
            localStorage.removeItem("mail");
            localStorage.removeItem("password");

            // ログアウト後にページをリロードして送信ボタンをリセット
            window.location.reload();
        });
    } else {
        // 会員登録されていない場合、送信ボタンを表示
        submitButton.style.display = "block";
        logoutButton.style.display = "none";
    }
});
