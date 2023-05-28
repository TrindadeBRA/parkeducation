<?php

// require 'vendor/autoload.php';

require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// $smtpServer = 'sandbox.smtp.mailtrap.io';
// $smtpPort = 2525;
// $smtpUsername = '6b7d501ab873ed';
// $smtpPassword = 'bd4318119a887d';

// Configurações do servidor SMTP MAIL TRAP
$smtpServer = 'mail.promocaopark.com.br';
$smtpPort = 587;
$smtpUsername = 'contato@promocaopark.com.br';
$smtpPassword = 'p+ZAqW$KlidA';






$mailer = new PHPMailer();
$mailer->IsSMTP();
$mailer->SMTPDebug = 1;
$mailer->Port = $smtpPort; //Indica a porta de conexão 
$mailer->Host = $smtpServer;//Endereço do Host do SMTP 
$mailer->SMTPAuth = true; //define se haverá ou não autenticação 
$mailer->Username = $smtpUsername; //Login de autenticação do SMTP
$mailer->Password = $smtpPassword; //Senha de autenticação do SMTP
$mailer->FromName = 'Bart S. Locaweb'; //Nome que será exibido
$mailer->From = 'contato@promocaopark.com.br';
$mailer->AddAddress('trindadebra@gmail.com','Nome do 
destinatário');
//Destinatários
$mailer->Subject = 'Teste enviado através do PHP Mailer 
SMTPLW';
$mailer->Body = 'Este é um teste realizado com o PHP Mailer 
SMTPLW';
if(!$mailer->Send())
{
echo "Message was not sent";
echo "Mailer Error: " . $mailer->ErrorInfo; exit; }
print "E-mail enviado!"
?>
