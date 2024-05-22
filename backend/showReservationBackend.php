<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: *");
require_once 'configuration.php';
session_start();
$userId = $_GET['userId'];

$sql_query = "SELECT * FROM `Reservation` WHERE guestId = ?";
global $connection;
$stmt = mysqli_prepare($connection, $sql_query);

mysqli_stmt_bind_param($stmt, "i", $userId);

mysqli_stmt_execute($stmt);

$result = mysqli_stmt_get_result($stmt);

if ($result) {
    $number_of_rows = mysqli_num_rows($result);
    $requested_rooms = array();
    for ($i = 0; $i < $number_of_rows; $i++) {
        $row = mysqli_fetch_array($result);
        array_push($requested_rooms, array('id' => $row['id'],
        'guestId' => $row['guestId'],
        'roomId' => $row['roomId'],
        'startDate' => $row['startDate'],
        'endDate' => $row['endData']));
    }
    mysqli_free_result($result);
    echo json_encode($requested_rooms);
}

mysqli_stmt_close($stmt);
mysqli_close($connection);
