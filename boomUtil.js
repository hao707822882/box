/**
 * Created by Administrator on 2016/7/25.
 */
var bJ = {
    jsonp: function (url, success, fail) {
        $.ajax({
            async: false,
            url: url,
            type: "GET",
            dataType: 'jsonp',
            jsonp: 'callback',
            timeout: 5000,
            success: function (json) { //客户端jquery预先定义好的callback函数,成功获取跨域服务器上的json数据后,会动态执行这个callback函数
                success && success(json);
            },
            error: function (xhr) {
                fail && fail(xhr);
            }
        })
    },
    toURLStr: function (data) {
        var str = "";
        for (var key in data) {
            str = str + key + "=" + data[key];
        }
        return str;
    }
}


BOOM = {
    userStatue: function (success, fail) {
        bJ.jsonp("http://school.iboom.tv/school/auth/userStatue.do", success, fail)
    },
    login: function (logObj, success, fail) {
        bJ.jsonp("http://school.iboom.tv/school/auth/login.do?" + bJ.toURLStr(logObj), success, fail)
    },
    saveRank: function (rankObj, success, fail) {
        bJ.jsonp("http://school.iboom.tv/school/boot/rank/saveRank?" + bJ.toURLStr(logObj), success, fail)
    }
}