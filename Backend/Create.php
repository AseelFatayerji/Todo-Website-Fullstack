<?php
include 'connection.php';
$username = $_POST['username'];
$name = $_POST['list_name'];
$item = $_POST['item'];

if (isset($_POST['imp']) && $_POST['imp'] == '1') {
    $important = $_POST['imp'];
    $query = $mysqli->prepare('INSERT INTO lists (user_name,list_name,item,important) VALUES(?,?,?,?);');
    $query->bind_param('sssi', $username, $name, $item, $important);
    $query->execute();
    $response['status'] = "success";
    $response['message'] = "list $name was created successfully for $username";
    header("Location:http://localhost/fullstack/Todo%20Website/Pages/Todolist.html?username=$username", true, 301);

    exit;
} else {
    $query = $mysqli->prepare('INSERT INTO lists (user_name,list_name,item) VALUES(?,?,?);');
    $query->bind_param('sss', $username, $name, $item);
    $query->execute();
    $response['status'] = "success";
    $response['message'] = "list $name was created successfully for $username";
    header("Location:http://localhost/fullstack/Todo%20Website/Pages/Todolist.html?username=$username", true, 301);
}

echo json_encode($response);
