<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");
header("Access-Control-Allow-Headers: *");

$_DELETE = $_GET;

if (!$_DELETE['id']) {
    http_response_code(400);
    echo "{\"error\" : \"No id provided.\"}";
    exit;
} else {
    $id = $_DELETE["id"];
    require_once ("configuration.php");
    global $connection;
    $sql_query = "DELETE FROM `Reservation` WHERE id = ?";
    $stmt = mysqli_prepare($connection, $sql_query);
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();
    if (!$result) {
        http_response_code(200);
        echo "{\"message\" : \"Reservation was successfully deleted.\"}";
        exit;
    } else {
        http_response_code(404);
        echo "{\"message\" : \"Id not found\"}";
        exit;
    }
}
