<?php
require './vendor/autoload.php'; // Importar o arquivo autoload do PHPMailer

// Verificar se o formulário foi submetido
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Dados do formulário
  $estado = $_POST['estado'];
  $cidade = $_POST['cidade'];
  $unidade = $_POST['unidade'];

  var_dump($_POST);

  // Configurações do PHPMailer
  $mail = new PHPMailer\PHPMailer\PHPMailer();
  $mail->isSMTP();
  $mail->Host = 'smtp.example.com'; // Configure o host SMTP
  $mail->SMTPAuth = true;
  $mail->Username = 'seu_email@example.com'; // Configure o e-mail usado para enviar o e-mail
  $mail->Password = 'sua_senha'; // Configure a senha do e-mail
  $mail->SMTPSecure = 'tls';
  $mail->Port = 587;

  $mail->setFrom('seu_email@example.com', 'Seu Nome'); // Configure o remetente
  $mail->addAddress('destinatario@example.com', 'Nome do Destinatário'); // Configure o destinatário

  $mail->isHTML(true);
  $mail->Subject = 'Dados do Formulário';
  $mail->Body = "Estado: $estado<br>Cidade: $cidade<br>Unidade: $unidade";

  // Verificar se o e-mail foi enviado com sucesso
  if ($mail->send()) {
    echo "E-mail enviado com sucesso!";
  } else {
    echo "Erro ao enviar o e-mail: " . $mail->ErrorInfo;
  }
}
