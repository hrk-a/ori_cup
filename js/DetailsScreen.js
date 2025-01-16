window.onload = function() {
    // コップの種類
    const selectedCupName = localStorage.getItem('selectedCupName');
    document.getElementById('selectedCupName').innerText = selectedCupName;

    // コップの色
    const selectedColor = localStorage.getItem('selectedColor');
    document.getElementById('selectedColor').innerText = selectedColor;
    
    // コップの種類がグラス、ジョッキ、ワイングラスの場合、色の表示を透明にする
    if (selectedCupName === 'グラス' || selectedCupName === 'ジョッキ' || selectedCupName === 'ワイングラス') {
        document.getElementById('selectedColor').innerText = '透明'; // 透明にする
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
    priceElement.innerText = formattedPrice + '円'; // 価格のみ表示

    // コップの数
    const selectedQuantity = localStorage.getItem('selectedQuantity');
    document.getElementById('selectedQuantity').innerText = selectedQuantity + '個';
    
    // 消費税率を設定（例：10%）
    const taxRate = 0.1;

    // 消費税込みの合計金額を計算
    const totalPrice = selectedCupPrice * selectedQuantity * (1 + taxRate);  // 合計金額（税込み）

    // 合計金額の表示
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.innerText ='(税込) ' + totalPrice.toLocaleString() + '円';
};
