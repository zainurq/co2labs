<?php
// Tambahkan header CORS
header("Access-Control-Allow-Origin: *"); // Atau ganti * dengan URL frontend Anda jika ingin lebih spesifik
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Periksa apakah permintaan adalah OPTIONS dan kembalikan status 200
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Import PHPMailer dan konfigurasi lainnya
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Pastikan Anda telah menginstal PHPMailer menggunakan Composer

// Debugging: Cek metode request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
    exit();
}

// Ambil data POST
$name = $_POST['name'] ?? ''; // Gunakan operator null coalescing untuk menangani parameter yang tidak ada
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';
$source = $_POST['source'] ?? ''; // Menangani parameter source jika tidak ada

$mail = new PHPMailer(true);

try {
    // Konfigurasi SMTP
    $mail->isSMTP();
    $mail->Host       = 'smtp.mailgun.org';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'no-reply@labsco2.com';
    $mail->Password   = '07286a4c7d2ce6a32b29a18e48ce6013-2b91eb47-1f600d20';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;
    

    // Pengaturan email
    $mail->setFrom('info@labsco2.com', 'Co2 Labs');
    $mail->addAddress('mail@labsco2.com');
    $mail->SMTPDebug = 2;  // Enables verbose debug output


    $mail->isHTML(true);
    $mail->Subject = 'New Contact Form Submission';
    $mail->Body    = "Name: $name<br>Email: $email<br>Message: $message<br>Source: $source";

    $mail->send();
    echo json_encode(['status' => 'success', 'message' => 'Email berhasil dikirim']);
} catch (Exception $e) {
    echo json_encode(['status' => 'error', 'message' => 'Email tidak dapat dikirim. Error: ' . $mail->ErrorInfo]);
}
