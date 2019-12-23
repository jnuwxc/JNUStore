<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>注册</title>
    <link rel="stylesheet" type="text/css" href="css/login.css">
</head>
<body>
<?php
header("content-type:text/html; charset=utf-8");
$sidErr = "";
$sid = $_POST['sid'];
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $conn = mysql_connect("47.102.141.39:3306", "root", "18822d494a2da82f");
    mysql_select_db("wxc", $conn);
    $result = mysql_query("SELECT password FROM USER WHERE sid='" . $sid . "'");
    $row = mysql_fetch_array($result);
    if (strlen($sid) != 10) {
        $sidErr = "用户名是10位学号，请检查你的账号长度";
    } elseif ($row['password'] != null) {
        $sidErr = "你已经注册，请直接点击登录链接登录<a href='login.html'>登录</a>";
    } else {
        $sql = "INSERT INTO USER(sid, password, nickname, address, phone, sex) VALUE
('" . $sid . "'," . $_POST['password'] . ",'" . $_POST['nickname'] . "','" . $_POST['address'] . "','" . $_POST['phone'] . "','".$_POST['sex']."')";
        $re = mysql_query($sql);
        header("location:login.html");
    }
    mysql_close($conn);
}
?>

<p class="err"><?php echo $sidErr; ?></p>

<div class="login">
    <h1>register</h1>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>">
        <input type="number" placeholder="学号" name="sid" required>
        <input type="password" placeholder="密码" name="password" required>
        <input type="text" placeholder="昵称(不填则默认使用真实姓名)" name="nickname">
        <input list="dormitory" placeholder="宿舍（方便送货上门，可不填）" name="address">
        <input type="tel" placeholder="手机号" name="phone">
        <div style="width: 300px; height: 40px; margin-bottom: 30px;">
            <em>性别</em>
            <input type="radio" name="sex" value="男">男
            <input type="radio" name="sex" value="女">女
            <input type="radio" name="sex" value="保密">保密
        </div>
        <a href="login.html">已经注册？点击直接登录</a>
        <input id="submit" type="submit" value="注册"></input>
    </form>
    <datalist id="dormitory">
        <option value="北-李园"></option>
        <option value="北-桃园"></option>
        <option value="北-杏园"></option>
        <option value="北-榴园"></option>
        <option value="北-梅园"></option>
        <option value="北-桂园"></option>
        <option value="南-澈院"></option>
        <option value="南区我也不熟啊"></option>
    </datalist>
</div>

<div class="info">
    <h4>江南大学二手交易平台</h4>
    <h4>code by wxc</h4>
</div>
</body>
</html>

