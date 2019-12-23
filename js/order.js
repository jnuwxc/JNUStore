var oid = [];
var buyer = [];
var orderSum = [];
var userId;
$(document).ready(function () {
    //用户名显示
    $.ajax({
        type: "GET",
        url: "php/checkCookie.php",
        async: false,
        success: function (data) {
            if (data != "noSet" && data != "noLogin") {
                $(".header p").text(data);
                userId = data;
            }
        }
    });
    //顶部栏的点击事件
    $("#shopCart").click(function () {
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
    $.ajax({
        type: "POST",
        url: "php/sql.php",
        data: "sql=" + "SELECT * FROM ORDERS",
        async: false,
        success: function (data) {
            var obj = eval("(" + data + ")");//将返回的json转换成数组
            for (let i = 0; i < obj.length; i++) {
                oid.push(obj[i][0]);
                buyer.push(obj[i][1]);
                orderSum.push(obj[i][2]);
            }
        }
    });
    for (let i = 0; i < oid.length; i++) {
        var gid = [];
        var gname = [];
        var gpicture = [];
        var sum = [];
        var state = [];
        $(".list-head").after(" <div class=\"list\" id=\"" + oid[i] + "\">\n" +
            "            <div class=\"list-item-head\">\n" +
            "                <span id=\"orderTime\">订单时间: " + getLocalTime(oid[i]) + "</span>\n" +
            "                <span id=\"orderId\">订单号: " + oid[i] + "</span>\n" +
            "                <span id=\"orderSum\">订单总价: " + orderSum[i] + "</span>\n" +
            "            </div>\n" +
            "        </div>");
        $.ajax({
            type: "POST",
            url: "php/sql.php",
            data: "sql=" + "SELECT gid, subtotal, ostate FROM OrderItems WHERE oid=" + "'" + oid[i] + "'",
            async: false,
            success: function (data) {
                var obj = eval("(" + data + ")");//将返回的json转换成数组
                for (let j = 0; j < obj.length; j++) {
                    gid.push(obj[j][0]);
                    sum.push(obj[j][1]);
                    state.push(obj[j][2]);
                }
            }
        });
        for (let j = 0; j < gid.length; j++)  {
            $.ajax({
                type: "POST",
                url: "php/sql.php",
                data: "sql=" + "SELECT gpicture, gname, remarks FROM GOOD WHERE gid=" + gid[j],
                async: false,
                success: function (data) {
                    var obj = eval("(" + data + ")");//将返回的json转换成数组
                    gpicture.push(obj[0][0]);
                    gname.push(obj[0][1] + "  " + obj[0][2]);
                }
            });
            $("#" + oid[i]).append(" <div class=\"list-item\" id=\"" + oid[i] + userId + "\">\n" +
                "                <div class=\"order-info\">\n" +
                "                    <img src=\"" + gpicture[j] + "\">\n" +
                "                    <span>" + gname[j] + "</span>\n" +
                "                </div>\n" +
                "                <span class=\"order-price\">" + sum[j] + "</span>\n" +
                "                <span class=\"order-buyer\">" + buyer[i] + "</span>\n" +
                "                <span class=\"order-status\">" + state[j] + "</span>\n" +
                "                <span style=\"margin: 0 auto\">售后服务</span>\n" +
                "            </div>");
        }
    }
});

function getLocalTime(timeStamp) {
    timeStamp = timeStamp * 1000;
    var date = new Date(timeStamp);
    return date.getFullYear() + "." + date.getMonth() + "." + date.getDate() + "  " + date.getHours() + ":" + date.getMinutes();
}