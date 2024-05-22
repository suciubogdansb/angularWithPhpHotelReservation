<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: *");

require_once "configuration.php";
$username = $_POST['username'];
if(strlen($username) == 0 || strlen($username) >= 15) {
    http_response_code(400);
    die("Invalid username");
}

global $connection;
$row = null;
$selectQuery = "SELECT id FROM `SiteUser` WHERE userName = '$username'";
$result = mysqli_query($connection, $selectQuery);
if(mysqli_num_rows($result) == 0) {
    $insertQuery = "INSERT INTO `SiteUser` (userName) VALUES ('$username')";
    $result = mysqli_query($connection, $insertQuery);
    $result = mysqli_query($connection, $selectQuery);
}
$row = mysqli_fetch_assoc($result);

session_start();
$_SESSION['userId'] = $row['id'];
echo json_encode($row);
mysqli_close($connection);