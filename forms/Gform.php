<?php

$goalName = $_POST["goalName"];
$frequency = filter_input(INPUT_POST, "frequency", FILTER_VALIDATE_INT);
$settime = filter_input(INPUT_POST, "settime", FILTER_VALIDATE_INT);

var_dump($goalName, $frequency, $settime);

$host = "localhost";
$dbname = "PlanMyWeek";
$username = "root";
$password = "";

$conn = mysqli_connect(hostname: $host, 
                        username: $username, 
                        password: $password, 
                        database: $dbname);

if (mysqli_connect_errno()) {
    die("Connection error: " . mysqli_connect_error());
}

$sql = "INSERT INTO goals (goalName, frequency, settime)
        VALUES (?, ?, ?, ?)";

$stmt = mysqli_stmt_init($conn);

if ( ! mysqli_stmt_prepare($stmt, $sql)) {
    die(mysqli_error($conn));
}

mysqli_stmt_bind_param($stmt, "sii", 
                        $goalName, 
                        $frequency,
                        $settime);
        
mysqli_stmt_execute($stmt);
