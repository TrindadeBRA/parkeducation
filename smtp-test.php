<?php

require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;


// Configurações do servidor SMTP MAIL TRAP
$smtpServer = 'sandbox.smtp.mailtrap.io';
$smtpPort = 2525;
$smtpUsername = '6b7d501ab873ed';
$smtpPassword = 'bd4318119a887d';

// Configurações do servidor SMTP MAIL TRAP
// $smtpServer = 'mail.mfzsolucoes.com.br';
// $smtpPort = 587;
// $smtpUsername = 'parkidiomas@mfzsolucoes.com.br';
// $smtpPassword = '(J6$Hn)pI^UD';

// Endereço de e-mail de origem
$fromEmail = 'origem@example.com';

// Endereço de e-mail de destino
$toEmail = 'trindadebra@gmail.com';
$toEmail2 = 'brunofrancoweb@gmail.com';

// Assunto e corpo do e-mail
$subject = 'Teste de envio de e-mail';
$body = 'Este é um teste de envio de e-mail via SMTP.';


$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = $smtpServer;
$mail->Port = $smtpPort;
$mail->SMTPAuth = true;
$mail->Username = $smtpUsername;
$mail->Password = $smtpPassword;
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

// Configurações adicionais (opcional)
$mail->CharSet = 'UTF-8';
$mail->setFrom($fromEmail);
$mail->addAddress($toEmail);
$mail->addAddress($toEmail2);
$mail->Subject = $subject;
$mail->Body = $body;

// Tenta enviar o e-mail
if (!$mail->send()) {
    echo 'Erro ao enviar o e-mail: ' . $mail->ErrorInfo;
} else {
    echo 'E-mail enviado com sucesso!';
}