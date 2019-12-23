$(document).ready(function () {
    var currentId = "CATEGORY";
    setCurrent(currentId);
    $(".left").children().click(function (data) {
        currentId = data.currentTarget.id;
        setCurrent(currentId);
    });

    function setCurrent(id) {
        $(".left").children().removeClass("current");
        $("#" + id).addClass("current");
        $(".right").children().remove();
        $.ajax({
            type: "POST",
            url: "php/sql.php",
            async: false,
            data: "sql=" + "SELECT * FROM " + currentId,
            success: function (data) {
                var obj = eval("(" + data + ")");//将返回的json转换成数组
                if (currentId == "CATEGORY") {
                    $(".right").append("        <table cellpadding=\"10px\" id=\"" + currentId + "\">\n" +
                        "            <tr>\n" +
                        "                <th>分类号</th>\n" +
                        "                <th>分类名</th>\n" +
                        "                <th>备注</th>\n" +
                        "                <th>修改</th>\n" +
                        "                <th>删除</th>\n" +
                        "            </tr>\n" +
                        "        </table>");
                    for (let i = 0; i < obj.length; i++) {
                        $("table").append("       <tr id=\"" + obj[i][0] + "\">\n" +
                            "            <td align=\"center\">" + obj[i][0] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][1] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][2] + "</td>\n" +
                            "            <td align=\"center\">修改</td>\n" +
                            "            <td align=\"center\" class='delete'>删除</td>\n" +
                            "        </tr>");
                        $("#" + obj[i][0]).children(".delete").click(function () {
                            deleteLine("CATEGORY", "catid", obj[i][0]);
                            location.reload();
                        });
                    }
                    //添加
                    $("#" + obj[obj.length - 1][0]).after("<tr class='add'>\n" +
                        "                <td><input type=\"text\" id='catid'></td>\n" +
                        "                <td><input type=\"text\" id='category'></td>\n" +
                        "                <td><input type=\"text\" id='remark'></td>\n" +
                        "                <td>x</td>\n" +
                        "                <td class='confirmAdd'>确认添加</td>\n" +
                        "            </tr>");
                    $(".add").children(".confirmAdd").click(function () {
                        var catid = $("#catid").val();
                        var category = $("#category").val();
                        var remark = $("#remark").val();
                        var sql = "INSERT INTO CATEGORY VALUE(" + catid + ",'" + category + "','" + remark + "')";
                        addLine(sql);
                    });
                } else if (currentId == "USER") {
                    $(".right").append("        <table cellpadding=\"10px\" id=\"" + currentId + "\">\n" +
                        "            <tr>\n" +
                        "                <th style=\"width: 75px\">学号</th>\n" +
                        "                <th>姓名</th>\n" +
                        "                <th style=\"width: 75px\">密码</th>\n" +
                        "                <th>性别</th>\n" +
                        "                <th>年龄</th>\n" +
                        "                <th style=\"width: 150px\">地址</th>\n" +
                        "                <th>电话</th>\n" +
                        "                <th>昵称</th>\n" +
                        "                <th>修改</th>\n" +
                        "                <th>删除</th>\n" +
                        "            </tr>\n" +
                        "        </table>\n");
                    for (let i = 0; i < obj.length; i++) {
                        $("table").append("        <tr id=\"" + obj[i][0] + "\">\n" +
                            "            <td align=\"center\">" + obj[i][0] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][1] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][2] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][3] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][4] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][5] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][6] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][8] + "</td>\n" +
                            "            <td align=\"center\">修改</td>\n" +
                            "            <td align=\"center\" class='delete'>删除</td>\n" +
                            "        </tr>");
                        $("#" + obj[i][0]).children(".delete").click(function () {
                            deleteLine("USER", "sid", obj[i][0]);
                            location.reload();
                        });
                    }
                    $("#" + obj[obj.length - 1][0]).after("<tr class='add'>\n" +
                        "                <td><input type=\"text\" id='sid'></td>\n" +
                        "                <td><input type=\"text\" id='sname'></td>\n" +
                        "                <td><input type=\"text\" id='password'></td>\n" +
                        "                <td><input type=\"text\" id='sex'></td>\n" +
                        "                <td><input type=\"text\" id='age'></td>\n" +
                        "                <td><input type=\"text\" id='address'></td>\n" +
                        "                <td><input type=\"text\" id='phone'></td>\n" +
                        "                <td><input type=\"text\" id='payid'></td>\n" +
                        "                <td>x</td>\n" +
                        "                <td class='confirmAdd'>确认添加</td>\n" +
                        "            </tr>");
                    $(".add").children(".confirmAdd").click(function () {
                        var sid = $("#sid").val();
                        var sname = $("#sname").val();
                        var password = $("#password").val();
                        var sex = $("#sex").val();
                        var age = $("#age").val();
                        var address = $("#address").val();
                        var phone = $("#password").val();
                        var payid = $("#payid").val();
                        var sql = "INSERT INTO USER VALUE(" +
                            "'" + sid + "','" + sname + "','" + password + "','" + sex + "','" + sex + "',"
                            + age + ",'" + address + "','" + phone + "','" + payid + "')";
                        addLine(sql);
                    });
                } else if (currentId == "GOOD") {
                    $(".right").append("<table cellpadding=\"10px\" id=\"" + currentId + "\">\n" +
                        "            <tr>\n" +
                        "                <th>商品号</th>\n" +
                        "                <th>商品名</th>\n" +
                        "                <th>图片地址</th>\n" +
                        "                <th>数量</th>\n" +
                        "                <th>单价</th>\n" +
                        "                <th>状态</th>\n" +
                        "                <th>分类号</th>\n" +
                        "                <th>备注</th>\n" +
                        "                <th>出售者</th>\n" +
                        "                <th>修改</th>\n" +
                        "                <th>删除</th>\n" +
                        "            </tr>\n" +
                        "        </table>");
                    for (let i = 0; i < obj.length; i++) {
                        $("table").append("<tr id=\"" + obj[i][0] + "\">\n" +
                            "            <td align=\"center\">" + obj[i][0] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][1] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][2] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][3] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][4] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][5] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][6] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][7] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][8] + "</td>\n" +
                            "            <td align=\"center\">修改</td>\n" +
                            "            <td align=\"center\" class='delete'>删除</td>\n" +
                            "        </tr>");
                        $("#" + obj[i][0]).children(".delete").click(function () {
                            deleteLine("GOOD", "gid", obj[i][0]);
                            location.reload();
                        });
                    }
                    $("#" + obj[obj.length - 1][0]).after("<tr class='add'>\n" +
                        "                <td><input type=\"text\" id='gid'></td>\n" +
                        "                <td><input type=\"text\" id='gname'></td>\n" +
                        "                <td><input type=\"text\" id='gpicture'></td>\n" +
                        "                <td><input type=\"text\" id='gnum'></td>\n" +
                        "                <td><input type=\"text\" id='gprice'></td>\n" +
                        "                <td><input type=\"text\" id='gstate'></td>\n" +
                        "                <td><input type=\"text\" id='catid'></td>\n" +
                        "                <td><input type=\"text\" id='remarks'></td>\n" +
                        "                <td><input type=\"text\" id='seller'></td>\n" +
                        "                <td>x</td>\n" +
                        "                <td>确认添加</td>\n" +
                        "            </tr>");
                    $(".add").children(".confirmAdd").click(function () {
                        var gid = $("#gid").val();
                        var gname = $("#gname").val();
                        var gpicture = $("#gpicture").val();
                        var gnum = $("#gnum").val();
                        var gprice = $("#gprice").val();
                        var gstate = $("#gstate").val();
                        var catid = $("#catid").val();
                        var remarks = $("#remarks").val();
                        var seller = $("#seller").val();
                        var sql = "INSERT INTO GOOD VALUE(" +
                            "'" + gid + "','" + gname + "','" + gpicture + "'," + gnum + "," + gprice + ",'"
                            + gstate + "','" + catid + "','" + remarks + "','" + seller + "')";
                        addLine(sql);
                    });
                } else if (currentId == "OrderItems") {
                    $(".right").append("<table cellpadding=\"10px\" id=\"" + currentId + "\">\n" +
                        "            <tr>\n" +
                        "                <th>学号</th>\n" +
                        "                <th>订单号</th>\n" +
                        "                <th>商品号</th>\n" +
                        "                <th>数量</th>\n" +
                        "                <th>总价</th>\n" +
                        "                <th>状态</th>\n" +
                        "                <th>修改</th>\n" +
                        "                <th>删除</th>\n" +
                        "            </tr>\n" +
                        "        </table>");
                    for (let i = 0; i < obj.length; i++) {
                        $("table").append("<tr id=\"" + obj[i][0] + obj[i][2] + "\">\n" +
                            "            <td align=\"center\">" + obj[i][0] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][1] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][2] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][3] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][4] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][5] + "</td>\n" +
                            "            <td align=\"center\">修改</td>\n" +
                            "            <td align=\"center\" class='delete'>删除</td>\n" +
                            "        </tr>");
                        $("#" + obj[i][0]).children(".delete").click(function () {
                            $.ajax({
                                type: "POST",
                                url: "php/sql.php",
                                data: "sql=" + "DELETE FROM OrderItems WHERE sid=" + obj[i][0] + " and gid=" + obj[i][1]
                            })
                        });
                    }
                    $("#" + obj[obj.length - 1][0] + obj[obj.length - 1][2]).after("<tr  class='add'>\n" +
                        "                <td><input type=\"text\" id='sid'></td>\n" +
                        "                <td><input type=\"text\" id='oid'></td>\n" +
                        "                <td><input type=\"text\" id='gid'></td>\n" +
                        "                <td><input type=\"text\" id='qty'></td>\n" +
                        "                <td><input type=\"text\" id='subtotal'></td>\n" +
                        "                <td><input type=\"text\" id='ostate'></td>\n" +
                        "                <td>x</td>\n" +
                        "                <td>确认添加</td>\n" +
                        "            </tr>");
                    $(".add").children(".confirmAdd").click(function () {
                        var sid = $("#sid").val();
                        var oid = $("#oid").val();
                        var gid = $("#gid").val();
                        var qty = $("#qty").val();
                        var subtotal = $("#subtotal").val();
                        var ostate = $("#ostate").val();
                        var sql = "INSERT INTO GOOD VALUE(" +
                            "'" + sid + "','" + oid + "','" + gid + "'," + qty + "," + subtotal + ",'"
                            + ostate + "')";
                        addLine(sql);
                    });
                } else if (currentId = "ORDERS") {
                    $(".right").append("<table cellpadding=\"10px\" id=\"" + currentId + "\">\n" +
                        "            <tr>\n" +
                        "                <th>订单号</th>\n" +
                        "                <th>购买者</th>\n" +
                        "                <th>总价</th>\n" +
                        "                <th>修改</th>\n" +
                        "                <th>删除</th>\n" +
                        "            </tr>\n" +
                        "        </table>");
                    for (let i = 0; i < obj.length; i++) {
                        $("table").append("        <tr id=\"" + obj[i][0] + "\">\n" +
                            "            <td align=\"center\">" + obj[i][0] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][1] + "</td>\n" +
                            "            <td align=\"center\">" + obj[i][2] + "</td>\n" +
                            "            <td align=\"center\">修改</td>\n" +
                            "            <td align=\"center\" class='delete'>删除</td>\n" +
                            "        </tr>\n");
                        $("#" + obj[i][0]).children(".delete").click(function () {
                            deleteLine("ORDERS", "oid", obj[i][0]);
                            location.reload();
                        });
                    }
                    $("#" + obj[obj.length - 1][0]).after("<tr  class='add'>\n" +
                        "                <td><input type=\"text\" id='oid'></td>\n" +
                        "                <td><input type=\"text\" id='buyer'></td>\n" +
                        "                <td><input type=\"text\" id='osum'></td>\n" +
                        "                <td>x</td>\n" +
                        "                <td>确认添加</td>\n" +
                        "            </tr>");
                    $(".add").children(".confirmAdd").click(function () {
                        var oid = $("#oid").val();
                        var buyer = $("#buyer").val();
                        var osum = $("#osum").val();
                        var sql = "INSERT INTO GOOD VALUE(" + "'" + oid + "','" + buyer + "'," + osum + ")";
                        addLine(sql);
                    });
                }
            }
        });
        currentId = "";
    }

    function deleteLine(table, keyName, keyValue) {
        if (table != "CATEGORY") {
            keyValue = "'" + keyValue + "'";
        }
        $.ajax({
            type: "POST",
            url: "php/sql.php",
            data: "sql=" + "DELETE FROM " + table + " WHERE " + keyName + "=" + keyValue,
        });
    }

    function addLine(sql) {
        console.log(sql);
        $.ajax({
            type: "POST",
            url: "php/sql.php",
            data: "sql=" + sql,
            success: function (data) {
                location.reload();
            }
        })
    }
});