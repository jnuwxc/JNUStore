<?php
if (isset($_COOKIE["user"])) {
    if ($_COOKIE["user"] != "noLogin") {
        echo $_COOKIE["user"];
    }else{
        echo "noLogin";
    }
}else{
    echo "noSet";
}
?>
