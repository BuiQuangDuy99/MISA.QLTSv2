var callAjax = function (url, method, data, functionCallBack, async = true) {
    $.ajax({
        url: url,
        method: method,
        async: async,
        data: JSON.stringify(data),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (res) {
            functionCallBack(res);
        },
        error: function (res) {
            console.log(res.responseText);
        }
    });
}

/**
 * Format dữ liệu ngày tháng sang ngày/tháng/năm
 * @param {any} date tham số có kiểu dữ liệu bất kỳ
 * CreateBy: BQDUY(4/2/2021)
 */
function formatDate(date) {
    var date = new Date(date);
    if (Number.isNaN(date.getTime())) {
        return "";
    } else {
        var day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        return day + '/' + month + '/' + year;
    }

}


