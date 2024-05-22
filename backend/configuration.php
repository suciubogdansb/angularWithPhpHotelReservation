<?php
$connection = mysqli_connect("127.0.0.1", "root", "", "WebDev");
if (!$connection) {
    die("". mysqli_connect_error());
}
