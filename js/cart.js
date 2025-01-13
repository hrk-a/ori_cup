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

  // 個数の取得とローカルストレージに保存
    const quantityInput = document.getElementById('quantity');
    const savedQuantity = localStorage.getItem('selectedQuantity') || 1; // 初期値は1に設定
    quantityInput.value = savedQuantity;

    quantityInput.addEventListener('input', function() {
        const selectedQuantity = quantityInput.value;
        localStorage.setItem('selectedQuantity', selectedQuantity);

        // 合計金額の更新
        const totalPrice = selectedCupPrice * selectedQuantity;
        const totalPriceFormatted = totalPrice.toLocaleString();
        const merchandisePriceElement = document.getElementById('merchandise_price');
        merchandisePriceElement.innerText =totalPriceFormatted + '円';
    });

    // 初期表示時に合計金額を表示
    const totalPrice = selectedCupPrice * savedQuantity;
    const totalPriceFormatted = totalPrice.toLocaleString();
    const merchandisePriceElement = document.getElementById('merchandise_price');
    merchandisePriceElement.innerText =totalPriceFormatted + '円';
};
