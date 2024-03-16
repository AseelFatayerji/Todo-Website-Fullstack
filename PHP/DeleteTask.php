<?php

include 'connection.php';

$username = $_POST['username'];
$name = $_POST['list_name'];
$item = $_POST['item'];
$query = $mysqli->prepare('DELETE FROM lists WHERE user_name = ? and list_name=? and item =?;');
$query->bind_param('sss', $username, $name, $item);
$query->execute();
$response['status'] = "success";
$response['message'] = "item $name was successfully deletd for $username";
header("Location:http://localhost/fullstack/Todo%20Website/Pages/Todolist.html?username=$username", true, 301);