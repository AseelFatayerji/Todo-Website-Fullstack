<?php

include 'connection.php';

$username = $_POST['username'];
$name = $_POST['list_name'];
$item = $_POST['item'];
$newitem = $_POST['newitem'];
echo "$item $newitem";
$query = $mysqli->prepare('UPDATE lists SET item = ? WHERE user_name = ? and list_name=? and item =?;');
$query->bind_param('ssss',$newitem, $username, $name, $item);
$query->execute();
$response['status'] = "success";
$response['message'] = "item $name was successfully deletd for $username";
header("Location:http://localhost/fullstack/Todo%20Website/Pages/Todolist.html?username=$username", true, 301);