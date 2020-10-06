<?php
/**
 * ALWAYS COPY AND PASTE THIS WAMP CODE INTO OUR api/novaInventory.php because that will
 * be accessed during our final production
 * This is just so we can mess around locally
 */

header('Access-Control-Allow-Origin: ' . $_SERVER['HTTP_ORIGIN']);
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

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
  $data = mysqli_query($con,"SELECT * FROM `$table`");
  $result = array();
  while($row = mysqli_fetch_assoc($data)){
    $result[] = $row;
  }
  echo json_encode($result);
}

if(isset($_POST['insertItem'])){
  $table = 'item_collection';
  $name = $_POST['name'];
  $item_description = $_POST['item_description'];
  $item_quantity = $_POST['item_quantity'];
  $item_image = $_POST['item_image'];
  $low_stock = $_POST['low_stock'];
  $data = mysqli_query($con,"INSERT INTO `$table`(`name`, `item_description`, `item_quantity`, `item_image`, `low_stock`) VALUES ('$name', '$item_description', '$item_quantity', '$item_image', '$low_stock')");
  return $data;
}

if(isset($_POST['updateItem'])){
  $table = 'item_collection';
  $id = $_POST['id'];
  $name = $_POST['name'];
  $item_description = $_POST['item_description'];
  $item_quantity = $_POST['item_quantity'];
  $item_image = $_POST['item_image'];
  $low_stock = $_POST['low_stock'];
  $data = mysqli_query($con,"UPDATE `$table` SET `name`='$name', `item_description`='$item_description', `item_quantity`='$item_quantity', `item_image`='$item_image', `low_stock`='$low_stock' WHERE `id`=$id");
  return $data;
}

if(isset($_POST['findItem'])){
  $table = 'item_collection';
  $id = $_POST['id'];
  $data = mysqli_query($con,"SELECT * FROM `$table` WHERE `id`=$id");
  while($row = mysqli_fetch_assoc($data)){
    $result[] = $row;
  }
  echo json_encode($result);
}

if(isset($_POST['findItemName'])){
  $table = 'item_collection';
  $name = $_POST['name'];
  $data = mysqli_query($con,"SELECT * FROM `$table` WHERE LOWER(`name`) LIKE '$name%'");
  while($row = mysqli_fetch_assoc($data)){
    $result[] = $row;
  }
  echo json_encode($result);
}

if(isset($_POST['deleteItem'])){
  $table = 'item_collection';
  $id = $_POST['id'];
  $data = mysqli_query($con,"DELETE FROM `$table` WHERE `id`='$id'");
  return $data;
}

if(isset($_POST['readUsers'])){
  $table = 'users';
  $data = mysqli_query($con,"SELECT * FROM `$table`");
  $response = array();
  while($row = mysqli_fetch_assoc($data)){
    $response[] = $row;
  }
  echo json_encode($response);
}

if(isset($_POST['newUser'])){
  $table = 'users';
  $name = $_POST['name'];
  $password = $_POST['password'];
  $email = $_POST['email'];
  $alerts = $_POST['alerts'];
  $role = $_POST['role'];
  $user_image = $_POST['user_image'];
  $user_theme = '';
  $data = mysqli_query($con,"INSERT INTO `$table`(`name`, `password`, `email`, `alerts`, `role`, `user_image`, `user_theme`) VALUES ('$name', '$password', '$email', '$alerts','$role', '$user_image', '$user_theme')");
  return $data;
}

if(isset($_POST['updateUser'])){
    $table = 'users';
    $id = $_POST['id'];
    $name = $_POST['name'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $alerts = $_POST['alerts'];
    $role = $_POST['role'];
    $user_image = $_POST['user_image'];
    $user_theme = $_POST['user_theme'];
    $data = mysqli_query($con,"UPDATE `$table` SET `name`='$name', `password`='$password', `email`='$email', `alerts`='$alerts', `role`='$role', `user_image`='$user_image', `user_theme`='$user_theme' WHERE `id`=$id");
    return $data;
  }

  if(isset($_POST['findUser'])){
    $table = 'users';
    $id = $_POST['id'];
    $data = mysqli_query($con,"SELECT * FROM `$table` WHERE `id`='$id'");
    $response = array();
    while($row = mysqli_fetch_assoc($data)){
      $response[] = $row;
    }
    echo json_encode($response);
  }

  if(isset($_POST['findUserName'])){
    $table = 'users';
    $name = $_POST['name'];
    $data = mysqli_query($con,"SELECT * FROM `$table` WHERE `name`='$name'");
    $response = array();
    while($row = mysqli_fetch_assoc($data)){
      $response[] = $row;
    }
    echo json_encode($response);
  }

  if(isset($_POST['deleteUser'])){
    $table = 'users';
    $id = $_POST['id'];
    $data = mysqli_query($con,"DELETE FROM `$table` WHERE `id`='$id'");
    return $data;
  }


exit;

?>