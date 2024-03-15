<?php
include 'connection.php';
$readSql = "SELECT * FROM lists";
$result = mysqli_query($mysqli, $readSql);

$list = [];
while ($row = mysqli_fetch_assoc($result)) {
    $item = array(
        'id' => $row['id'],
        'name' => $row['user_name'],
        'list' => $row['list_name'],
        'item' => $row['item'],
        'imp' => $row['important'],
        'complete' => $row['complete']

    );
    $list[] = $item;    
}
echo json_encode($list);


