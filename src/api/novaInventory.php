<?php
/**
 * ALWAYS COPY AND PASTE THIS WAMP CODE INTO OUR api/novaInventory.php because that will
 * be accessed during our final production
 * This is just so we can mess around locally
 */


//Remove all this code in production and use file in api/novaInventory.php

      header("Access-Control-Allow-Origin: *");
      header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
      header('Access-Control-Max-Age: 1000');
      header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

//Remove all this code in production and use file in api/novaInventory.php

$host = "localhost"; /* Host name */
$user = "root"; /* User */
$password = ""; /* Password */
$dbname = "novatracker"; /* Database name */

$con = mysqli_connect($host, $user, $password, $dbname);
$method = $_SERVER['REQUEST_METHOD'];
// Check connection
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}

if(isset($_POST['readItems'])){
  $table = 'item_collection';
  $data = mysqli_query($con,"SELECT * FROM $table");
  $response = array();
  while($row = mysqli_fetch_assoc($data)){
    $response[] = $row;
  }
  echo json_encode($response);
}

if(isset($_POST['insertItem'])){
  $table = 'item_collection';
  $item_name = $_POST['item_name'];
  $item_description = $_POST['item_description'];
  $item_quantity = $_POST['item_quantity'];
  $item_image = $_POST['item_image'];
  $stock = $_POST['stock'];
  $data = mysqli_query($con,"INSERT INTO `$table`(`item_name`, `item_description`, `item_quantity`, `item_image`, `stock`) VALUES ('$item_name', '$item_description', '$item_quantity', '$item_image', '$stock')");
  return $data->result();
}

if(isset($_POST['updateItem'])){
  $table = 'item_collection';
  $id = $_POST['id'];
  $item_name = $_POST['item_name'];
  $item_description = $_POST['item_description'];
  $item_quantity = $_POST['item_quantity'];
  $item_image = $_POST['item_image'];
  $stock = $_POST['stock'];
  $data = mysqli_query($con,"UPDATE `$table` SET `item_name`='$item_name', `item_description`='$item_description', `item_quantity`='$item_quantity', `item_image`='$item_image', `stock`='$stock' WHERE `id`=$id");
  return $data->result();
}

if(isset($_POST['deleteItem'])){
  $table = 'item_collection';
  $id = $_POST['id'];
  $data = mysqli_query($con,"DELETE FROM `$table` WHERE `id`=$id");
  return $data->result();
}

if(isset($_POST['readUsers'])){
  $table = 'users';
  $data = mysqli_query($con,"SELECT * FROM $table");
  $response = array();
  while($row = mysqli_fetch_assoc($data)){
    $response[] = $row;
  }
  echo json_encode($response);
}

if(isset($_POST['newUser'])){
  $table = 'users';
  $username = $_POST['username'];
  $password = $_POST['password'];
  $email = $_POST['email'];
  $alerts = $_POST['alerts'];
  $role = $_POST['role'];
  $data = mysqli_query($con,"INSERT INTO `$table`(`username`, `password`, `email`, `alerts`, `role`) VALUES ('$username', '$password', '$email', '$alerts','$role')");
  return $data->result();
}

if(isset($_POST['updateUser'])){
    $table = 'users';
    $username = $_POST['username'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $alerts = $_POST['alerts'];
    $role = $_POST['role'];
    $data = mysqli_query($con,"INSERT INTO `$table`(`username`, `password`, `email`, `alerts`, `role`) VALUES ('$username', '$password', '$email', '$alerts','$role')");
    return $data->result();
  }

  if(isset($_POST['deleteUser'])){
    $table = 'users';
    $id = $_POST['id'];
    $data = mysqli_query($con,"DELETE FROM `$table` WHERE `id`=$id");
    return $data->result();
  }


exit;



?>