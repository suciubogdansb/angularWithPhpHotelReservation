<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");
require_once ("configuration.php");
global $connection;
session_start();
$userId = $_POST['userId'];
$roomId = $_POST['roomNumber'];
$startDate = $_POST['startDate'];
$endDate = $_POST['endDate'];

if ($startDate > $endDate) {
    http_response_code(400); 
    echo "{\"error\" : \"Invalid date range. Please select a start date before the end date.\"}";
    exit;
}


$sql_select_query = "SELECT * FROM `Reservation` WHERE ( ( startDate BETWEEN ? AND ? ) OR ( endData BETWEEN ? AND ?) ) AND roomId = ?";
$select_stmt = mysqli_prepare($connection, $sql_select_query);
mysqli_stmt_bind_param($select_stmt, "ssssi", $startDate, $endDate, $startDate, $endDate, $roomId);
mysqli_stmt_execute($select_stmt);

$select_result = $select_stmt->get_result();
if ($select_result->num_rows > 0) {
    http_response_code(400);
    echo "{\"message\" : \"Room is already reserved during this time period. Please select another room or time period.\"}";
} else {
    $sql_insert_query = "INSERT INTO `Reservation` (guestId, roomId, startDate, endData) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($connection, $sql_insert_query);
    mysqli_stmt_bind_param($stmt, "iiss", $userId, $roomId, $startDate, $endDate);

    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    if (!$result) {
        http_response_code(200);
        echo "{\"message\" : \"Reservation was successful!\"}";
    } else {
        http_response_code(400);
        echo "{\"message\" : \"Reservation failed. Please try again.\"}";
    }
}