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
    const selectedCupPrice = price[selectedCupName] || '価格情報が見つかりません';

    // 価格を3桁ごとにカンマを入れてフォーマット
    const formattedPrice = (typeof selectedCupPrice === 'number') ? selectedCupPrice.toLocaleString() : selectedCupPrice;

    // 価格表示用の要素を取得
    const priceElement = document.getElementById('price');
    priceElement.innerText = formattedPrice + '円'; // 価格表示

    // 消費税率を設定（例：10%）
    const taxRate = 0.1;

    // 個数の取得とローカルストレージに保存
    const quantityInput = document.getElementById('quantity');
    const savedQuantity = localStorage.getItem('selectedQuantity') || 1; // 初期値は1に設定
    quantityInput.value = savedQuantity;

    // 合計金額の計算と消費税を加算
    function updateTotalPrice() {
        const selectedQuantity = quantityInput.value;
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

    // 個数の変更があった場合に合計金額を更新
    quantityInput.addEventListener('input', function() {
        localStorage.setItem('selectedQuantity', quantityInput.value);
        updateTotalPrice();
    });

    // 初期表示時に合計金額と消費税込みの価格を表示
    updateTotalPrice();
};
