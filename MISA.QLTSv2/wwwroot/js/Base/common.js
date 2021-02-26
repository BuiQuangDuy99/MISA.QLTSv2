
/**
 * Hàm Ajax dùng chung
 * CreatBy: BQDUY (4/2/2021)
*/
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
 * CreateBy: BQDUY(/02/2021)
 */
function formatDate(date, formatDate) {
    try {
        if (!date) {
            return "";
        } else {
            date = moment(date, ["dd-mm-yyyy", "mm-dd-yyyy", "dd-mmm-yyyy", "mmm-dd-yyyy"]).format("yyyy-mm-dd");
            return moment(new Date(date)).format(formatDate);
        }
    } catch (e) {
        console.log(e);
    }
}

/**
 * Chuyển đổi dữ liệu từ dd/mm/yyyy lên form
 * CreatBy: NDTUNG (4/2/2021)
*/
function formatStringDate(date) {
    if (!date) {
        return "";
    }
    else {
        var date = new Date(date);

        day = date.getDate();
        month = date.getMonth() + 1;
        year = date.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        return year + "-" + month + "-" + day;
    }
}

/**-----------------------------------------------------
 *Hàm định dạng số thành tiền
 *CreatedBy: NDTUNG(4/2/2021)
 **@param {any} number số tiền
 */
function formatMoney(number) {
    try {
        if (number != null) {
            return number.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1.');
        }
        return 0;
    } catch (e) {
        console.log(e);
    }

}

/**
 * Hiển thị hộp thoại cảnh báo
 * CreatedBy: NDTUNG(4/2/2021)
 * */
function showAlertWarring(msg, msgLength) {
    $('.warring').show();
    $('.warring-notify').empty();
    if (!msgLength)
        $('.warring-notify').text(msg);
    else
        for (var i = 0; i < msgLength; i++) {
            var div = $(`<div>- ` + msg[i] + `</div>`);
            $('.warring-notify').append(div);
        }
    $('#btn-yes-warring,#btn-no-warring').hide();
    $('#btn-ok-warring').show();
}
/**
 * Hiển thị hộp thoại xác nhận
 * CreatedBy: NDTUNG(4/2/2021)
 * */
function showAlertConfirm(Messenget) {
    $('.warring').show();
    $('.warring-notify').text(Messenget);
    $('#btn-ok-warring').hide();
    $('#btn-yes-warring, #btn-no-warring').show();
}
/**
 * Đóng hộp thoại cảnh báo
 * CreatedBy: NDTUNG(4/2/2021)
 * */
function closeWarring() {
    $('.warring').hide();
    $('#tbListData tbody tr').removeClass("row-selected");
}

/**
 * Hàm hiện thị gợi ý chức năng cho button
 * @param {any} element đối tượng cần hiện thị
 * CreatedBy: BQDUY(24/02/2021)
 */
function showTooltipElement(elements) {
    $.each(elements, function (index, element) {
        $(element).tooltip({
            content: $(this).attr('title'),
            track: true
        })
    }) 
}