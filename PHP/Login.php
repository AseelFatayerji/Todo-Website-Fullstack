<?php
include('connection.php');

$email = $_POST['name'];
$password = $_POST['password'];

$query = $mysqli->prepare('SELECT * FROM users WHERE email=? or user_name =?');
$query->bind_param('ss', $email, $email);
$query->execute();
$query->store_result();
$query->bind_result($email, $name, $hashed_password);
$query->fetch();
$num_rows = $query->num_rows();

if ($num_rows == 0) {
    $response['status'] = "user not found";
//     echo "<script>
//     localStorage.setItem('loginfailed', 'true');  
// </script>";
    header("Location:http://localhost/fullstack/Todo%20Website", true, 301);
} else {
    if ($password == $hashed_password) {
        $response['status'] = "logged in";
        $response['user_id'] = $id;
        $response['name'] = $name;
        $response['email'] = $email;
        header("Location:http://localhost/fullstack/Todo%20Website/Pages/Porfile.html?username=$name", true, 301);
        exit;
    } else {
        $response['status'] = "incorrect credentials $email";
//         echo "<script>
//         localStorage.setItem('loginfailed', 'true');  
// </script>";
        header("Location:http://localhost/fullstack/Todo%20Website", true, 301);

    }
}
echo json_encode($response);