var isCollection = false;
var isAgainst = false;
var isServer = [false, false, false];
var gid = "";
var gprice = 0;
$(document).ready(function () {
    gid = window.location.search.substring(1, 6)
    $("#collection").click(function () {
        if (isCollection) {
            $("#collection").attr("src", "images/collection.png");
            isCollection = false;
        } else {
            $("#collection").attr("src", "images/collectionR.png");
            isCollection = true;
        }
    })
    $("#against").click(function () {
        if (isAgainst) {
            $("#against").attr("src", "images/against.png");
            isAgainst = false;
        } else {
            $("#against").attr("src", "images/againstR.png");
            isAgainst = true;
        }
    })
    var gnum = 0;
    $.ajax({
        type: "POST",
        url: "php/sql.php",
        data: "sql=" + "SELECT * FROM GOOD WHERE gid=" + gid,
        async: false,
        success: function (data) {
            var obj = eval("(" + data + ")");//将返回的json转换成数组
            console.log(obj)
            $(".gname").text(obj[0][1]);
            $(".gpicture").attr("src", obj[0][2]);
            $(".gdetails .gnum").text("库存:" + obj[0][3]);
            gnum = obj[0][3];
            $(".gdetails p").text(obj[0][7]);
            $(".gprice").text(obj[0][4] + "元");
            gprice = Number(obj[0][4]);
        }
    });
    $(".server-item:first").click(function () {
        if (isServer[0]) {
            $(".server-item:first").attr("style", "border: #a9a9a9 1px solid");
            isServer[0] = false;
        } else {
            $(".server-item:first").attr("style", "border: #df3033 1px solid");
            isServer[0] = true;
        }
    })
    $("#inspection").click(function () {
        if (isServer[1]) {
            $("#inspection").attr("style", "border: #a9a9a9 1px solid");
            isServer[1] = false;
        } else {
            $("#inspection").attr("style", "border: #df3033 1px solid");
            isServer[1] = true;
        }
    })
    $(".server-item:last").click(function () {
        if (isServer[2]) {
            $(".server-item:last").attr("style", "border: #a9a9a9 1px solid");
            isServer[2] = false;
        } else {
            $(".server-item:last").attr("style", "border: #df3033 1px solid");
            isServer[2] = true;
        }
    });
    var userId = "noSet";
    $.ajax({
        type: "GET",
        url: "php/checkCookie.php",
        async: false,
        success: function (data) {
            if (data != "noSet" && data != "noLogin") {
                userId = data;
                $(".header p").text(userId);
                $.ajax({
                    type: "POST",
                    url: "php/sql.php",
                    data: "sql=" + "SELECT address FROM USER WHERE sid=" + userId,
                    async: false,
                    success: function (address) {
                        var obj = eval("(" + address + ")");//将返回的json转换成数组
                        $(".address input").attr("value", obj[0][0]);
                    }
                });
            }
        }
    });
    //顶部栏的点击事件
    $("#shopCart").click(function () {
        console.log("购物车点击");
        if (userId != "noSet" && userId != "noLogin" && userId != "") {
            window.location.href = "shopCart.html";
        } else {
            alert("请先登录");
        }
    });
    $("#address").click(function () {
        if (userId != "noSet" && userId != "noLogin" && userId != "") {
            $.ajax({
                type: "POST",
                url: "php/sql.php",
                data: "sql=" + "SELECT address FROM USER WHERE sid=" + "'" + userId + "'",
                success: function (data) {
                    var obj = eval("(" + data + ")");//将返回的json转换成数组
                    alert(obj[0][0]);
                }
            });
        } else {
            alert("请先登录");
        }
    });
    $("#order").click(function () {
        if (userId != "noSet" && userId != "noLogin" && userId != "") {
            window.location.href = "order.html";
        } else {
            alert("请先登录");
        }
    });
    //用户购买的数量
    var num = Number($("#num-input").val());
    $("#add-btn").click(function () {
        $("#num-input").val(num + 1);
        num += 1;
    });
    $("#minus-btn").click(function () {
        $("#num-input").val(num - 1);
        num -= 1;
    });
    $(".add-cart").click(function () {
        if (userId != "noSet" && userId != "noLogin") {
            console.log(userId);
            if (num > 0 && num <= gnum) {
                var sql = "INSERT INTO OrderItems(sid, gid, qty, subtotal, ostate) VALUES (" + userId + "," + gid + "," + num + "," + num * gprice + ", '已支付')";
                $.post(
                    "php/sql.php",
                    {
                        "sql": sql
                    },
                    function () {
                        console.log(sql);
                        console.log("加入购物车成功");
                        window.location.href = "shopCart.html";
                    }
                );
                $.post(
                    "php/sql.php",
                    {
                        "sql": "UPDATE GOOD SET gnum = " + (gnum - num) + " WHERE gid=" + gid,
                    },
                    function () {
                    }
                )
            } else if (num <= 0) {
                alert("购买数量不能低于1件");
            } else {
                alert("库存不足");
            }
        } else {
            alert("请先登录再购买");
        }
    });
});