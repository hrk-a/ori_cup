window.onload = function () {
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
    totalPriceElement.innerText = '(税込) ' + totalPrice.toLocaleString() + '円';

    // ---------- 受取り日 -----------
    // 祝日を定義
    const holidays = [
        "2025-01-01",
        "2025-01-13",
        "2025-02-11",
        "2025-02-23",
    ];

    function isHolidayOrWeekend(date) {
        const day = date.getDay();
        const dateString = date.toISOString().split("T")[0];
        return day === 0 || day === 6 || holidays.includes(dateString);
    }

    function getNextWeekday(date) {
        while (isHolidayOrWeekend(date)) {
            date.setDate(date.getDate() + 1);
        }
        return date;
    }

    function formatDateToMonthDayWithDay(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekDayNames = ['日', '月', '火', '水', '木', '金', '土'];
        const weekDay = weekDayNames[date.getDay()];
        return `${month}月${day}日(${weekDay})`;
    }

    function getPickupDateRange() {
        const now = new Date();
        const minDate = new Date(now);
        minDate.setDate(now.getDate() + 7);

        const maxDate = new Date(now);
        maxDate.setDate(now.getDate() + 14);

        const adjustedMinDate = getNextWeekday(minDate);
        const adjustedMaxDate = getNextWeekday(maxDate);

        return {
            minDate: formatDateToMonthDayWithDay(adjustedMinDate),
            maxDate: formatDateToMonthDayWithDay(adjustedMaxDate),
        };
    }

    const pickupDateRange = getPickupDateRange();
    document.getElementById("date").textContent = `${pickupDateRange.minDate} ～ ${pickupDateRange.maxDate}`;

  // 名前を取得
    let name = localStorage.getItem('name');

    // 名前が存在する場合のみ表示
        document.getElementById('name').textContent = name;
};

// ---------- ラッピング -----------
function showName() {
    // 選択されているラジオボタンを取得
    const selectedRadio = document.querySelector('input[name="name"]:checked');
    // 選ばれている場合、その値を表示
    if (selectedRadio) {
        document.getElementById("nameDisplay").innerHTML = selectedRadio.value;
    }

    // 全てのラジオボタンを取得
    document.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener('change', (e) => {
            // 全てのラジオボタンの親要素から active 状態を削除
            document.querySelectorAll('.Lapping_cont').forEach((cont) => {
                cont.style.border = '';
                cont.style.backgroundColor = '';
            });

            // 選択されたラジオボタンの親要素にスタイルを適用
            const parent = e.target.closest('.Lapping_cont');
            if (parent) {
                parent.style.border = '2px dashed #7e99d4';
                parent.style.backgroundColor = '#e5f0fe';
                parent.style.borderRadius = '8px';
            }
        });
    });
}

// ---------- 支払い方法　---------- 
// 支払い方法の変更イベントをリッスン
document.getElementById('payment-method').addEventListener('change', function() {
    var paymentMethod = this.value;

    // すべての詳細情報を非表示
    document.getElementById('cod_details').style.display = 'none';

    // 支払い方法に応じて詳細を表示
    if (paymentMethod === 'cod') {
        document.getElementById('cod_details').style.display = 'block';
    }
});

document.querySelector('.contact_button').addEventListener('click', function (event) {
    event.preventDefault();

    // ローカルストレージからデータを取得
    const name = localStorage.getItem('name');
    const mail = localStorage.getItem('mail');

    console.log('name:', name); // デバッグ用
    console.log('mail:', mail); // デバッグ用

    const errorMessageElement = document.getElementById('error-message');

    if (!name || !mail) {
        errorMessageElement.innerHTML = `
            購入を確定するには、会員登録が必要です。
            <a href="signup.html" class="error_kaiintourokuhakotira">会員登録はこちら</a>
        `;
    } else {
        errorMessageElement.innerHTML = '';
        window.location.href = "DetailsScreen4.html";
    }
});


// ローカルストレージからメールを取得
let email = localStorage.getItem('email');

// ボタンがクリックされたとき
document.getElementById('sendButton').addEventListener('click', function() {
    let email = localStorage.getItem('email');

    // メール送信処理をサーバーにリクエスト
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('メールが送信されました');
        } else {
            alert('メール送信に失敗しました');
        }
    })
    .catch(error => {
        console.error('エラー:', error);
    });
});
