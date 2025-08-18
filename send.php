<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "phpmailer/src/Exception.php"
require "phpmailer/src/PHPMailer.php"
require "phpmailer/src/SMTP.php";


// Configuration
$to_email = 'emmanuelwisdomolamide@gmail.com'; // Replace with your email address
$subject = 'Contact Form Submission';

// Get the form data
$name = $_POST['full_name'];
$email = $_POST['email'];
$message = $_POST['message'];

if(isset($_POST["submit"])){
    $mail = new PHPMailer(true)

    $mail->isSMTP();
    $mail->Host = "smtp.gmail.com";
    $mail->Username = "emmanuelwisdomolamide@gmail.com"
    $mail->Password = "Emmanuelwisdom@6537";
    $mail->Port = 465;
    $mail->SMTPSecure = 'ssl';
    $mail->SMTPAuth = true;
    $mail->Username = 'emmanuelwisdomolamide@gmail.com';

    $mail->setFrom("emmanuelwisdomolamide@gmail.com");
    $mail->addAddress($_POST["email"]);

    $mail->isHTML(true);

    $mail->Subject = $_POST("subject");
    $mail->Body = $_POST("message");
    $mail->send();
}

if (!$mail->send()) {
    echo 'Error sending message: ' . $mail->ErrorInfo;
} else {
    echo 'Message sent successfully!';
}






<section id="Work" class="Works">
		<div class="About">
			<p>Works</p>
		</div>
	
		<div class="features">
			<div class="row">
				<div class="text-col">
					<h3 style="color: white;">Model of the netflix website </h3>
				</div>
				<div class="img-col">
					<a href="first proj .html">
					<img src="first prj.png" class="clr" >
				</a>
				</div>
			</div>

			<div class="features">
				<div class="row">
					<div class="img-col">
						<a href="https://www.figma.com/proto/uKC0dO7SDhyY9smvhoDxEL/shopping-proj?kind=proto&node-id=0-3&page-id=0%3A1&starting-point-node-id=0%3A3&t=plhBzy0PbKCLESs0-1">
						<img src="figma pic.png"  class="clr">
					</a>
					</div>
					<div class="text-col">
						<h3>web design</h3>
					</div>
				
				</div>

			</div>
		</section>
	</section>