<?php

include 'connection.php';

$username = $_POST['username'];
$name = $_POST['list_name'];
$item = $_POST['item'];
$complete = 1;
echo "$username $name $item $complete";
$query = $mysqli->prepare('UPDATE lists SET complete = ? WHERE user_name = ? and list_name=? and item =?;');
$query->bind_param('isss',$complete, $username, $name, $item);
$query->execute();
$response['status'] = "success";
$response['message'] = "item $name was successfully deletd for $username";
header("Location:http://localhost/fullstack/Todo%20Website/Front-end/Pages/Todolist.html?username=$username", true, 301);