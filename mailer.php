<?php
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

try {
  
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Dados do formulário
    $name = $_POST['name'];
    $telphone = $_POST['telphone'];
    $email = $_POST['email'];
    
    $jsonData = $_POST['json-data'];
    $jsonDecoded = json_decode($jsonData, true);
    
    if($jsonDecoded["E-mail da unidade"]){
      $dataEmailUnidade = $jsonDecoded["E-mail da unidade"];
    }

    if($jsonDecoded["E-mail Comercial"]){
      $dataEmailCOmercial = $jsonDecoded["E-mail Comercial"];
    }
    
    if($jsonDecoded["E-mail Backup Park"]){
      $dataEmailBackup = $jsonDecoded["E-mail Backup Park"];
    }
    
    if($jsonDecoded["Estado"]){
      $dataEstado = $jsonDecoded["Estado"];
    }
    
    if($jsonDecoded["Cidade"]){
      $dataCidade = $jsonDecoded["Cidade"];
    }
    
    if($jsonDecoded["Unidade"]){
      $dataUnidade = $jsonDecoded["Unidade"];
    }
    
    $subject = "[Promo. Dia dos Namorados] - " . $dataUnidade . " - " . $name; 
    
    $msg = "Nome: " . $name . "<br>";
    $msg .= "Email: " . $email . "<br>";
    $msg .= "Telefone: " . $telphone . "<br>";
    $msg .= "<br>" . $dataEstado . " - " . $dataCidade . " - " . $dataUnidade;
    
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    
    // Configurações do servidor SMTP
    $mail->isSMTP();
    $mail->Host = 'sandbox.smtp.mailtrap.io';
    $mail->SMTPAuth = true;
    $mail->Port = 2525;
    $mail->Username = '6b7d501ab873ed';
    $mail->Password = 'bd4318119a887d';

    // Dados do remetente e destinatário
    $mail->setFrom("contato@promocaopark.com.br");

    $dataEmailUnidade ? $mail->addAddress($dataEmailUnidade) : "";
    $dataEmailCOmercial ? $mail->addAddress($dataEmailCOmercial) : "";
    $dataEmailBackup ? $mail->addAddress($dataEmailBackup) : "";

    // Conteúdo do email
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body = $msg;

    $mail->send();
    $redirect_url = "https://promocaopark.com.br?emailsend=true";
    header("Location: " . $redirect_url);
    exit();

  }


} catch (Exception $e) {
    echo 'Houve um erro ao enviar o email: ' . $mail->ErrorInfo;
}
