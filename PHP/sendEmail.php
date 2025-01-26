<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // POSTデータを取得
    $selectedCupName = $_POST['selectedCupName'];
    $selectedColor = $_POST['selectedColor'];
    $nameDisplay = $_POST['nameDisplay'];
    $selectedQuantity = $_POST['selectedQuantity'];
    $payment_method = $_POST['payment_method'];
    $totalPrice = $_POST['totalPrice'];
    $date = $_POST['date'];

    // メール送信先
    $to = "recipient@example.com";  // 受信者のメールアドレス
    $subject = "ご注文確認";  // メールの件名

    // メールの本文
    $message = "ご注文ありがとうございます。\n\n";
    $message .= "商品名: " . $selectedCupName . "\n";
    $message .= "カラー: " . $selectedColor . "\n";
    $message .= "ラッピング: " . $nameDisplay . "\n";
    $message .= "数量: " . $selectedQuantity . "\n";
    $message .= "支払い方法: " . $payment_method . "\n";
    $message .= "合計金額: " . $totalPrice . "\n";
    $message .= "受取り日: " . $date . "\n";

    // メールのヘッダー（送信者アドレス）
    $headers = "From: your-email@example.com";  // 送信者のメールアドレス
}
?>
