<?php
include('connection.php');
$query = $mysqli->prepare('SELECT * FROM listst');
$query->bind_param('ss', $email, $email);
$query->execute();
$query->store_result();
$query->bind_result($email, $name, $hashed_password);
$query->fetch();
$num_rows = $query->num_rows();