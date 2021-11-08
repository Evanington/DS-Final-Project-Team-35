<?php
// require 'common.php';
require 'class/DbConnection.php';


// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM assignment';
$vars = [];

if (isset($_GET['g_id'])) {
    // This is an example of a parameterized query
    $sql = 'SELECT * FROM assignment
    JOIN Referee
    ON assignment.RefID = Referee.RefID
    JOIN games
    ON assignment.g_id = games.g_id
    WHERE assignment.g_id = ?';
    $vars = [$_GET['g_id']];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$patients = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($patients, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;