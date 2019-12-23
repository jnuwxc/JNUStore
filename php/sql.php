<?php
header("content-type:text/html; charset=utf-8");
$statement = $_POST['sql'];
$db = "wxc";
$conn = mysql_connect("47.102.141.39:3306", "wxc", "wxc12345");
if (!$conn) {
    die('Could not connect: ' . mysql_error());
}
mysql_select_db($db, $conn);
$result_sql = mysql_query($statement);
mysql_close($conn);

//将数据转换成json并返回
$result = array();
while ($row = mysql_fetch_array($result_sql)) {
    $result[] = $row;
}
if ($result) {
    echo json_encode($result);
} else {
    echo mysql_error();
}
?>
