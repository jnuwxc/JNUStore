var userId = [];
var gid = [];
var qty = [];
var subtotal = [];
var selectedId = [];
$(document).ready(function () {
    $(".container").remove(".list");
    //用户名显示
    $.ajax({
        type: "GET",
        url: "php/checkCookie.php",
        async: false,
        success: function (data) {
            if (data != "noSet" && data != "noLogin") {
                $(".header p").text(data);
            }
        }
    });
    //查询订单项信息
    $.ajax({
        type: "POST",
        url: "php/sql.php",
        async: false,
        data: "sql=" + "SELECT sid, gid, qty, subtotal FROM OrderItems",
        success: function (data) {
            var obj = eval("(" + data + ")");//将返回的json转换成数组
            for (var i = 0; i < obj.length; i++) {
                userId.push(obj[i][0]);
                gid.push(obj[i][1]);
                qty.push(obj[i][2]);
                subtotal.push(obj[i][3]);
                console.log(obj);
            }
        }
    });
    //根据订单项数量来创建htmL文件，并更改相关数值,以及处理选中事件
    for (let i = 0; i < userId.length; i++) {
        $(".container").append("<div class=\"list\" id=\"" + userId[i] + gid[i] + "\">\n" +
            "            <input type=\"checkbox\" name=\"checkGoods\" value=\"" +userId[i] + gid[i] + "\">\n" +
            "            <div class=\"goods-info\">\n" +
            "                <img src=\"images/g1.jpg\">\n" +
            "                <span class=\"gname\">商品名字</span>\n" +
            "            </div>\n" +
            "            <span class=\"gprice\">价格</span>\n" +
            "            <div class=\"gnum\">数量</div>\n" +
            "            <span class=\"note\">小计</span>\n" +
            "            <button class=\"delete-btn\">删除</button>\n" +
            "        </div>");
        $.ajax({
            type: "POST",
            url: "php/sql.php",
            async: false,
            data: "sql=" + "SELECT gpicture,gname,gprice FROM GOOD WHERE gid=" + gid[i],
            success: function (data) {
                var obj = eval("(" + data + ")");//将返回的json转换成数组
                $("#" + userId[i] + gid[i] + " .goods-info img").attr("src", obj[0][0]);
                $("#" + userId[i] + gid[i] + " .gname").text(obj[0][1]);
                $("#" + userId[i] + gid[i] + " .gprice").text(obj[0][2]);
            }
        });
        $("#" + userId[i] + gid[i] + " .gnum").text(qty[i]);
        $("#" + userId[i] + gid[i] + " .note").text(subtotal[i]);
    };

    //顶部栏的点击事件
    $("#shopCart").click(function () {
        if (userId[0] != "noSet" && userId[0] != "noLogin" && userId[0] != "") {
            window.location.href = "shopCart.html";
        } else {
            alert("请先登录");
        }
    });
    $("#address").click(function () {
        if (userId[0] != "noSet" && userId[0] != "noLogin" && userId[0] != "") {
            $.ajax({
                type: "POST",
                url: "php/sql.php",
                data: "sql=" + "SELECT address FROM USER WHERE sid=" + "'" + userId[0] + "'",
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
        if (userId[0] != "noSet" && userId[0] != "noLogin" && userId[0] != "") {
            window.location.href = "order.html";
        } else {
            alert("请先登录");
        }
    });

    $(".total").click(function () {
        var total = 0;//选中的商品总价格
        selectedId.length = 0;
        $("input[name='checkGoods']:checked").each(function () {
            selectedId.push($(this).val());
        });
        for (var i = 0; i < selectedId.length; i++) {
            total += Number(subtotal[getSubtotal(selectedId[i])]);
            console.log(i + " " + total);
        }
        $(".commit .total").text("￥" + total);
    });
    function getSubtotal(idNow) {
        let result = -1;
        for (var i = 0; i < userId.length; i++) {
            if (idNow.substring(0, 10) == userId[i] && idNow.substring(10, 16) == gid[i]) {
                result = i;
                break;
            }
        }
        return result;
    }
    //结算
    $(".settlement").click(function () {
        var timeStamp = Math.round(new Date().getTime() / 1000);//获取当前时间戳
        console.log(timeStamp);
        for (var i = 0; i < selectedId.length; i++) {
            $.ajax({
                type: "POST",
                url: "php/sql.php",
                async: false,
                data: "sql=" + "UPDATE OrderItems SET oid=" + timeStamp +
                    " WHERE sid=" + selectedId[i].substring(0, 10) +
                    " and gid=" + selectedId[i].substring(10, 16),
                success: function () {
                    console.log("插入时间戳oid成功");
                }
            })
        }
        //其实前面的userId根本不用数组，都是这一个用户买的，所以Id一样
        var buyer = $(".header p").text();
        var osum = Number($(".commit .total").text().substring(1, $(".commit .total").text().length));
        var sql = "INSERT INTO ORDERS(oid, buyer, osum) VALUES(" + "'" + timeStamp + "','" + buyer + "'," + osum + ")";
        $.ajax({
            type: "POST",
            url: "php/sql.php",
            data: "sql=" + sql,
            async: false,
            success: function () {
                alert("购买成功");
                window.location.href = "order.html";
            }
        });
    });
    $(".list-head input").click(function () {
        if ($(this).val() == "all") {
            $("input[name='checkGoods']").attr("checked", "true");
            $(this).val("noAll");
        }else {
            $("input[name='checkGoods']").attr("checked", "false");
            $(this).val("all");
        }
    });
    $(".cart-remove").click(function () {
        $(".list").remove();
        $.post("php/sql.php", {sql: "DELETE FROM OrderItems"}, function (data) {
            console.log(data)
        })
    });
});
