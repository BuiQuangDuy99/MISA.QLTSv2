$(document).ready(function () {
    $('#btn-login').off('click');
    $('input[required]').on("blur keyup", checkInput);
    $('input').click(function () { $(this).select(); });
    $('#btn-login').on('click', (loginOnClick));
    $(document).keypress(function (event) {
        if (event.which == 13) {
            $('[required]').trigger('blur');
            $('#btn-login').trigger('click');
        }
    });


});

/**
 * Hàm kiểm tra bắt buộc nhập và độ dài input
 * CreatedBy: NDTUNG (18/2/2021)
 */
function checkInput() {
    var maxLength = 20;
    var val = $(this).val().trim();
    if (val.length > maxLength || val == "") {
        $(this).addClass('border-red');
        if (val == "") {
            $(this).attr('title', 'Trường này không được để trống');
            $(this).tooltip({
                items: $(this),
                track: true,
                content: $(this).attr('title'),
                position: {
                    my: "left+10 top",
                    at: "right+5 top",
                    collision: "none"
                },
                disabled: false
            });
        }
        else {
            $(this).attr('title', 'Không được dài quá 20 ký tự');
            $(this).tooltip({
                items: $(this),
                track: true,
                content: $(this).attr('title'),
                position: {
                    my: "left+10 top",
                    at: "right+5 top",
                    collision: "none"
                },
                disabled: false 
            });
        }
    }
    else {
        $(this).removeClass('border-red');
        $(this).removeAttr('title');
        $(this).tooltip({
            items: $(this),
            disabled: true
        });
    }
}

/**
 * Hàm kiểm tra bắt buộc nhập các trường input
 * CreatedBy: NDTUNG (18/2/2021)
 */
function checkRequired() {
    var isValid = true;
    $("input[required]").each(function () {
        var val = $(this).val().trim();
        if (val == "") {
            $(this).addClass('border-red');
            $(this).attr('title', 'Trường này không được để trống');
            $(this).tooltip({
                items: $(this),
                track: true,
                content: $(this).attr('title'),
                position: {
                    my: "left+10 top",
                    at: "right+5 top",
                    collision: "none"
                },
                disabled: false
            });
            isValid = false;
        }
        else {
            $(this).removeClass('border-red');
            $(this).removeAttr('title');
            $(this).tooltip({
                items: $(this),
                disabled: true
            });
        }
    });
    //var inputRequire = $(".border-red");
    //inputRequire.first().focus();
    return isValid;
}

/**
 * Hàm kiểm tra độ dài các trường input
 * CreatedBy: NDTUNG (18/2/2021)
 */
function checkLength() {
    var maxLength = 20;
    isValid = true;
    $("input[required]").each(function () {
        var val = $(this).val().trim();
        if (val.length > maxLength) {
            $(this).addClass('border-red');
            $(this).attr('title', 'Không được dài quá 20 ký tự');
            $(this).tooltip({
                items: $(this),
                track: true,
                content: $(this).attr('title'),
                position: {
                    my: "left+10 top",
                    at: "right+5 top",
                    collision: "none"
                },
                disabled: false
            });
            isValid = false;
        }
        else {
            $(this).removeClass('border-red');
            $(this).removeAttr('title');
            $(this).tooltip({
                items: $(this),
                disabled: true
            });
        }
    });
    //var inputRequire = $(".border-red");
    //inputRequire.first().focus();
    return isValid;
}
/**
 * Lấy dữ liệu tài khoản
 * CreatedBy: NDTUNG (18/2/2021)
 */
function getAccount() {
    var data = {};
    $('input').each(function () {
        var fieldName = $(this).attr('fieldName');
        data[fieldName] = $(this).val().trim();
    });
    return data;
    console.log(data);
}
/**
* Reset lại Login
* CreatedBy : NDTUNG (18/2/2021)
*/
function resetLogin() {
    $("[fieldName]").each(function () {
        $(this).val("");
    });
    $(".border-red").removeClass("border-red");
}
/**
* Reset lại Login
* CreatedBy : NDTUNG (17/2/2021)
*/
function validateLogin() {
    var isValid = checkRequired();
    if (isValid) { isValid = checkLength() }
    return isValid;
}

/** 
 * Thông báo lỗi nếu như đăng nhập không thành công
 * CreatedBy: NDTUNG (21/2/2021)
 */
function errorAcount(account) {
    $('input').each(function () {
        var fieldName = $(this).attr('fieldName');
        if ($(this).val() != account[fieldName]) {
            $(this).attr('title', 'Thông tin đăng nhập không chính xác.');
            $(this).addClass('border-red');
            $(this).tooltip({
                items: $(this),
                content: $(this).attr('title'),
                track: true,
                position: {
                    my: "left+10 top",
                    at: "right+5 top",
                    collision: "none"
                },
                disabled: false
            }).tooltip('open');
        }
    })
}
/**
 * Sự kiện kích nút đăng nhập
 * CreatedBy: NDTUNG (18/2/2021)
 */
function loginOnClick() {
    var accountTest = {
        UnitBudgetCode: "Misa",
        UserName: "12345678",
        Password: "12345678"
    }
    var isValid = validateLogin();
    if (isValid) {
        var account = getAccount();
        if ((JSON.stringify(account) === JSON.stringify(accountTest))) {
            window.location.href = "https://localhost:44363";
            resetLogin();
        }
        else {
            errorAcount(accountTest);
        }
    }
}