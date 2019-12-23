<?php
setcookie("user", "noLogin", time()-3600);

echo '<meta http-equiv="Refresh" content="3;url=index.html">';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>登出</title>
    <link rel="stylesheet" type="text/css" href="css/login.css">
</head>
    <body>
    <h1>Logout</h1>
    <div style="text-align: center">
        <h3>你已经成功登出, 3秒后自动回到主页</h3>
    </div>
    <div class="info">
        <h4>江南大学二手交易平台</h4>
        <h4>code by wxc</h4>
    </div>
</body>
</html>
