<?php
header("content-type:text/html; charset=utf-8");
$id = $_POST["username"];
$password = $_POST["password"];

if ($id == "admin" && $password = "123") {
    header("location:../manage.html");
}else{
    $conn = mysql_connect("47.102.141.39:3306", "***", "******");//账号密码就保密了哈
    if (!$conn)
    {
        die('Could not connect: ' . mysql_error());
    }

    mysql_select_db("wxc", $conn);
    $result = mysql_query("SELECT password FROM USER WHERE sid='".$id."'");
    $row = mysql_fetch_array($result);
    mysql_close($conn);

    if ($row['password'] == $password) {
        date_default_timezone_set("PRC");
        setcookie("user", $id, time()+3600,"/");
        header("location:../index.html");
    }else{
        echo '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登录失败</title>
    <link rel="stylesheet" type="text/css" href="../css/login.css">
</head>
<body>
<h1>登录失败</h1>
<div class="login">
    <h3>默认账号是10位学号哦</h3>
    <h3>要是忘记了密码，可以申请重置哦（此功能正在开发中）</h3>
    <h3>5页自动回到登录界面</h3>
</div>
<div class="info">
    <h4>江南大学二手交易平台</h4>
    <h4>code by wxc</h4>
</div>
</body>
</html>';
        echo '<meta http-equiv="Refresh" content="3;url=../login.html">';
    }
}
?>
