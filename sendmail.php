error_reporting(E_ALL);
ini_set('display_errors', 1);

<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer-6.9.1/src/PHPMailer.php';
require 'PHPMailer-6.9.1/src/Exception.php';
require 'PHPMailer-6.9.1/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Обработка данных из формы
    $q1 = isset($_POST["q1"]) ? $_POST["q1"] : "Не выбрано";
    $q2 = isset($_POST["q2"]) ? implode(", ", $_POST["q2"]) : "Не выбрано";
    $q3 = isset($_POST["q3"]) ? $_POST["q3"] : "Не указано";

    // Формирование сообщения для отправки
    $message = "Wyniki ankiety:\n\n";
    $message .= "Odpowiedź na pytanie 1: $q1\n";
    $message .= "Odpowiedź na pytanie 2: $q2\n";
    $message .= "Odpowiedź na pytanie 3: $q3\n";
   

    // Настройки SMTP для Gmail
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'vadimtsarenko777@gmail.com'; // Ваша полная электронная почта Gmail
    $mail->Password = 'zglb cmeb scwv ywax'; // Ваш пароль Gmail
    $mail->SMTPSecure = 'tls'; // Используйте 'tls'
    $mail->Port = 587; // Порт для STARTTLS


    // Отправка письма
    $mail->setFrom('vadimtsarenko777@gmail.com', 'Vadim'); // Замените на ваш адрес электронной почты и имя
    $mail->addAddress('vadimtsarenko777@gmail.com'); // Замените на ваш адрес электронной почты

    $mail->isHTML(false);
    $mail->Subject = 'Результаты опроса';
    $mail->Body = $message;
    $mail->CharSet = 'UTF-8'; // или 'ISO-8859-1' в зависимости от вашего случая
    $mail->Encoding = 'base64'; // или 'quoted-printable'

    if ($mail->send()) {
        // Вместо вывода строки используем перенаправление на страницу success.html
        header('Location: success.html');
        exit;
    } else {
        echo "Błąd w wysyłaniu e-maila: " . $mail->ErrorInfo;
    }
}
?>
