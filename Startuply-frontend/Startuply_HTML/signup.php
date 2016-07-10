<?php

$to = "office@vivaco.com";

if (!isset($_POST['small-form'])){
	$subject = "Signup";
	$message = "Fullname: " . $_POST['fullname'];
	$message .= "<br>Password: " . $_POST['password'];
	$message .= "<br>Website: " . $_POST['website'];
	$message .= "<br>Email: " . $_POST['email'];
} else {
	$subject = "Quick signup";
	$message = "Fullname: " . $_POST['fullname'];
	$message .= "<br>Password: " . $_POST['password'];
	$message .= "<br>Email: " . $_POST['email'];
};

$headers  = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=utf-8" . "\r\n";
$headers .= "From: " . $_POST['fullname'] . " <" . $_POST['email'] . ">". "\r\n";

if( mail($to, $subject, $message, $headers) ) {
	echo "ok";
} else {
	echo "error";
}