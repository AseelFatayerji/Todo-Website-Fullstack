<?php
include('connection.php');


$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

$check_email = $mysqli->prepare('SELECT email FROM users WHERE email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();


if ($email_exists == 0) {
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $query = $mysqli->prepare('INSERT INTO users (email,user_name,pass) VALUES(?,?,?);');
    $query->bind_param('sss', $email, $name, $password);
    $query->execute();
    $response['status'] = "success";
    $response['message'] = "user $name was created successfully";
    header("Location:http://localhost/fullstack/Todo%20Website/Pages/Porfile.html?username=$name" , true, 301);
    exit;
} else {
    $response["status"] = "user already exists";
    $response["message"] = "user $name wasn't created";
}
echo json_encode($response);
