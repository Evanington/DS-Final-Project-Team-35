<?php
// require 'common.php';
require 'class/DbConnection.php';


// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM games';
$vars = [];

if(isset($_GET['g_id'])){
    //This method keeps people from being able to SQL inject into your database
    //This LIMITS the input into the "studentId" field, making sure you can't edit the SQL Database
    $sql = 'SELECT * FROM games WHERE g_id = ?';
    $vars = [ $_GET['g_id'] ];
}
// if (isset($_GET['guid'])) {
//   // This is an example of a parameterized query
//   $sql = 'SELECT * FROM Patient WHERE patientGuid = ?';
//   $vars = [ $_GET['guid'] ];
// }

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$patients = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($patients, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;