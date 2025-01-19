window.onload = function() {
    // コップの種類
    const selectedCupName = localStorage.getItem('selectedCupName');
    document.getElementById('selectedCupName').innerText = selectedCupName;

    // コップの色
    const selectedColor = localStorage.getItem('selectedColor');
    document.getElementById('selectedColor').innerText = selectedColor;

    // コップの種類がグラス、ジョッキ、ワイングラスの場合、色の表示を透明にする
    if (selectedCupName === 'グラス' || selectedCupName === 'ジョッキ' || selectedCupName === 'ワイングラス') {
        document.getElementById('selectedColor').innerText = '透明'; 
    } else {
        document.getElementById('selectedColor').innerText = selectedColor; // それ以外は通常通り表示
    }
    
    // 日本語名と価格をマッピング
    const price = {
        'マグカップ': 1100,
        'タンブラー': 1500,
        'グラス': 800,
        'ジョッキ': 1100,
        'ワイングラス': 2000
    };

    // カップ名に対応する価格を取得
    let selectedCupPrice = price[selectedCupName];

    // 価格が見つからない場合はundefinedになるので、空の文字列を代入
    if (typeof selectedCupPrice === 'undefined') {
        selectedCupPrice = ''; // 価格がない場合は空文字を設定
    }

    // 価格を3桁ごとにカンマを入れてフォーマット
    const formattedPrice = (typeof selectedCupPrice === 'number') ? selectedCupPrice.toLocaleString() : selectedCupPrice;

    // 価格表示用の要素を取得
    const priceElement = document.getElementById('price');
    
    // 価格が設定されていれば表示、それ以外は何も表示しない
    if (selectedCupPrice !== '') {
        priceElement.innerText = formattedPrice + '円'; // 価格表示
    } else {
        priceElement.innerText = ''; // 価格情報がない場合は何も表示しない
    }

    // 消費税率を設定（例：10%）
    const taxRate = 0.1;

    // 個数の取得とローカルストレージに保存
    const quantityInput = document.getElementById('quantity');
    const savedQuantity = localStorage.getItem('selectedQuantity') || 1; // 初期値は1に設定
    quantityInput.value = savedQuantity;

    // 合計金額の計算と消費税を加算
    function updateTotalPrice() {
        const selectedQuantity = quantityInput.value;

        // 価格が空でない場合のみ計算
        if (selectedCupPrice !== '') {
            const totalPrice = selectedCupPrice * selectedQuantity;
            const taxAmount = totalPrice * taxRate; // 消費税額
            const totalWithTax = totalPrice + taxAmount; // 消費税込みの合計金額

            const totalPriceFormatted = totalPrice.toLocaleString();
            const totalWithTaxFormatted = totalWithTax.toLocaleString();

            // 合計金額の更新
            const merchandisePriceElement = document.getElementById('merchandise_price');
            merchandisePriceElement.innerText = totalPriceFormatted + '円';

            // 消費税込みの価格の更新
            const syouhizeiElement = document.getElementById('syouhizei');
            syouhizeiElement.innerHTML = '(税込) ' + '<span id="merchandise_price">' + totalWithTaxFormatted + '<span>' + '円';
        }
    }

    // 個数の変更があった場合に合計金額を更新
    quantityInput.addEventListener('input', function() {
        localStorage.setItem('selectedQuantity', quantityInput.value);
        updateTotalPrice();
    });

    // 初期表示時に合計金額と消費税込みの価格を表示
    updateTotalPrice();

    // 削除ボタンの処理
    const deleteButton = document.getElementById('deleteButton'); // 削除ボタンのID（適切なIDを設定）
    const noCartMessage = document.querySelector('.no_cart'); // カートが空の場合のメッセージ
    const buyButton = document.querySelector('.buy'); // 購入ボタンのID（適切なIDを設定）
    const errorMessageElement = document.createElement('p'); // エラーメッセージの要素を作成
    errorMessageElement.style.color = 'red'; // メッセージの色を赤に設定

    if (deleteButton) {
        deleteButton.addEventListener('click', function() {
            // ローカルストレージの情報を削除
            localStorage.removeItem('selectedColor');
            localStorage.removeItem('selectedCupName');
            localStorage.removeItem('selectedQuantity');

            // UIを更新（削除後に表示をリセット）
            document.getElementById('selectedCupName').innerText = '';
            document.getElementById('selectedColor').innerText = '';
            document.getElementById('quantity').value = 1;

            // 商品がカートに無い場合のメッセージ表示
            noCartMessage.style.display = 'block'; // カートが空になったのでメッセージを再表示
        });
    }

    // 購入ボタンのクリック処理
    if (buyButton) {
        buyButton.addEventListener('click', function(event) {
            // カートが空であればエラーメッセージを表示して遷移を防止
            if (!selectedCupName || !selectedColor || !savedQuantity) {
                // エラーメッセージを表示
                errorMessageElement.innerText = 'カートに商品がありません。購入できません。';
                document.getElementById('cart_but').appendChild(errorMessageElement); // メッセージをDOMに追加

                event.preventDefault(); // ページ遷移を防止
            }
        });
    }

    // カートが空かどうかを確認して購入ボタンの有効/無効を設定
    function checkCartStatus() {
        if (!selectedCupName || !selectedColor || !savedQuantity) {
            // カートが空なら購入ボタンを無効化
            buyButton.disabled = true;
            buyButton.style.backgroundColor = '#ccc'; // 無効化スタイル
            noCartMessage.style.display = 'block'; // カートが空の場合のメッセージ表示
        } else {
            // カートにアイテムがあれば購入ボタンを有効化
            buyButton.disabled = false;
            buyButton.style.backgroundColor = ''; // 通常のスタイルに戻す
            noCartMessage.style.display = 'none'; // カートが空のメッセージを非表示
        }
    }

    // 初期ロード時にカートの状態をチェック
    checkCartStatus();
};