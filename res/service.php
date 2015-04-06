<?php

//Author: Hamilton Greene
//PHP Instance to be placed server side
//Much of this is ripped from W3Schools - We'll see how it works then customize to fit our needs

//Need to fill these out with correct info for DB instance
$servername = "localhost";
$username = "username";
$password = "password";
$dbname = "myDB";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

//Fill out with actual SQL statement
$sql = "SELECT * FROM Questions";
$result = $conn->query($sql);

//Check if there are results
if ($result->num_rows > 0) {

	//Create two arrays to hold result data
	$resultArray = array();
	$tempArray = array();


    //PUsh data into arrays - not sure if this is going to work
    while($row = $result->fetch_object()) {

    	//Place row into tempArray, then push into resultArray -> set up for JSON format
        $tempArray = $row;
        array_push($resultArray, $tempArray);
    }

    //Place array in JSON Format
    echo json_encode($resultArray);
   
} else {
    echo "0 results";
}
$conn->close();
?>