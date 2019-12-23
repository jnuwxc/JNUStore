var cnum = 0;//分类的数目
var gnum = 0;//当前分类的商品数目
var goodsId = [];
var userId = "";

//在文档就绪后再进行某些操作
$(document).ready(function () {
    //下面很多地方使用ajax，而没有使用简单的get/post，因为post默认是异步请求，但是下面的(大部分)操作必须在此请求结束才能正常运行。
    $.ajax({
        type: "POST",
        url: "php/sql.php",
        data: "sql=" + "SELECT CATEGORY,catid FROM CATEGORY;",
        async: false,
        success: function (data) {
            var obj = eval("(" + data + ")");//将返回的json转换成数组
            console.log("分类：");
            console.log(obj);
            cnum = obj.length;
            var dom = $(".classification li:first");
            for (var i = 0; i < cnum; i++) {
                dom.attr("id", "c" + obj[i][1]);
                dom.text(obj[i][0]);
                dom = dom.next();
            }
        }
    });
    $.get("php/checkCookie.php", function (data) {
        console.log("cookie" + data);
        if (data != "noSet" && data != "noLogin") {
            userId = data;
            $(".user-show div").text(data);
            $(".user-show a").hide();
            $(".user-show").append("<a href='logout.php'>登出</a>");
        } else {
            $(".user-show div").text("用户名/昵称");
        }
    });
    cclick(1);
    for (let i = 1; i <= cnum; i++) {//这里必须使用let,不能使用var，原因:作用域
        $("#c" + i).click(function () {
            cclick(i);
        })
    }//分类栏的点击事件
    $("#contact").click(function () {
        alert("请联系qq: 1165124074");
    });
    $("#introduce").click(function () {
        alert("数据库大作业");
    });
    $(".header-left #manage").click(function () {
        window.location.href = "login.html";
    });
    $("#shopCartCard").click(function () {
        if (userId != "noSet" && userId != "noLogin" && userId != "") {
            window.location.href = "shopCart.html";
        } else {
            alert("请先登录");
        }
    });
    $("#orderCard").click(function () {
        if (userId != "noSet" && userId != "noLogin" && userId != "") {
            window.location.href = "order.html";
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
    $("#collection").click(function () {
        alert("此功能正在开发中");
    })
});

//分类栏被点击后的事件
function cclick(cid) {
    $(".goods").empty();//清空商品列表
    goodsId.length = 0;//清空存放商品号的数组，这直接赋0也太爽了吧。
    $.ajax({
        type: "POST",
        url: "php/sql.php",
        data: "sql=" + "SELECT catid,gpicture,gname,gprice,seller,gid FROM GOOD WHERE catid=" + cid,
        async: false,
        success: function (data) {
            var obj = eval("(" + data + ")");//将返回的json转换成数组
            console.log("当前分类下的商品:");
            console.log(obj);
            gnum = obj.length;
            var dom = $(".goods");
            for (var i = 0; i < gnum; i++) {
                goodsId.push("g" + obj[i][5]);
            }
            for (var j = 0; j < 2; j++) {
                for (var i = 0; i < gnum; i++) {
                    var gid = "g" + obj[i][5];
                    dom.append("<div class=\"list\", id=\"" + gid + "\">\n" +
                        "                <img src=\"\">\n" +
                        "                <div class=\"goodsInfo\">\n" +
                        "                    <b></b>\n" +
                        "                    <b style=\"margin-left: 15px;\"></b>\n" +
                        "                </div>\n" +
                        "                <div style=\"text-align: center\"></div>\n" +
                        "            </div>");
                    var childrens = dom.children(".list:last");
                    childrens.children("img").attr("src", obj[i][1]);
                    childrens.children(".goodsInfo").children("b:first").text(obj[i][2]);
                    childrens.children(".goodsInfo").children("b:first").next().text(obj[i][3] + "元");
                    childrens.children("div").last().text("由用户\"" + obj[0][4] + "\"出售");
                }
            }
            //商品的点击事件
            for (let i = 0; i < goodsId.length; i++) {
                $("#" + goodsId[i]).click(function () {
                    gclick(goodsId[i].substring(1, goodsId[i].length));
                })
            }
        }
    })
}

//某个商品被点击后的事件
function gclick(gid) {
    console.log("商品" + gid + "被点击");
    window.location.href = "good.html?" + gid;
}