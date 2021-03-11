
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
            date = date.toString().substring(0, 10);
            //date = moment(date, ["DD-MM-YYYY", "MM-DD-YYYY", "DD-MMM-YYYY", "MMM-DD-YYYY"]).format("YYYY-MM-DD");
            return moment(date).format(formatDate || "DD-MM-YYYY");
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
    if (isNaN(number) == true) {
        return "";
    }
    else {

        try {
            if (number != null) {
                return number.toString().replace(/(\d)(?=(\d{3})+\b)/g, '$1.');
            }
            return 0;
        } catch (e) {
        }
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
 * CreatedBy: NDTUNG(3/2/2021)
 * */
function showAlertConfirm(Messenget) {
    $('.warring').show();
    $('.warring-notify').text(Messenget);
    $('#btn-ok-warring').hide();
    $('#btn-yes-warring, #btn-no-warring').show();
}
/**
 * Đóng hộp thoại cảnh báo
 * CreatedBy: NDTUNG(3/2/2021)
 * */
function closeWarring() {
    $('.warring').hide();
    $('#tbListData tbody tr').removeClass("row-selected");
}

/**
 * Hàm hiện thị tooltip
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
/**
 * Hàm ẩn thị tooltip
 * @param {any} element đối tượng cần ẩn
 * CreatedBy: BQDUY(24/02/2021)
 */
function hideTooltipElement(elements) {
    $.each(elements, function (index, element) {
        $(element).removeClass('border-red');
        $(element).removeAttr('title');
        $(element).tooltip({
            items: $(this),
            disabled: true,
        })
    })
}

/**
 * Hiển thị hộp thoại cảnh báo
 * Author: Nguyen Dang Tung(2/3/2021)
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
 * Author: Nguyen Dang Tung(2/3/2021)
 * */
function showAlertConfirm(Messenget) {
    $('.warring').show();
    $('.warring-notify').text(Messenget);
    $('#btn-ok-warring').hide();
    $('#btn-yes-warring, #btn-no-warring').show();

}

/**
 * Đóng hộp thoại cảnh báo
 * Author: Nguyen Dang Tung(2/3/2021)
 * */
function closeWarring() {
    $('.warring').hide();
    //$('#tbListData tbody tr').removeClass("row-selected");
    //setDisabled();
}

/**
 * Hàm tạo ID 
 * Author: BQDUY(9/3/2021)
 * */
function createGuid() {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    var guid = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
    return guid;
}

/**
 * Hiển thị hộp thoại thành công
 * Author: Nguyen Dang Tung(9/3/2021)
 */
function showMessengerSuccess(msg) {
    $('.success_content').text(msg);
    $('.success').show(2000, async function () {
        await setTimeout(async function () {
            await $('.success').hide(2000);
        }, 2500);
    });
    $('.success').css('display', 'flex');
};

function roundToTwo(num) {
    return +(Math.round(num + "e+2") + "e-2");
}