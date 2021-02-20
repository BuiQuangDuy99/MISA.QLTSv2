$(document).ready(function () {
    $('#btn-login').off('click');
    $('.login input[required]').blur(checkInput);
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
 * Hàm kiểm tra bắt buộc nhập từng input
 * CreatedBy: NDTUNG (18/2/2021)
 */
//function checkRequiredInput() {
//    var val = $(this).val();
//    if (val.trim() == "") {
//        $(this).addClass('border-red');
//        $(this).attr('title', 'Trường này không được để trống');
//        $(this).tooltip({
//            content: $(this).attr('title'),
//            track: true
//        });
//        isValid = false;
//    }
//    else {
//        $(this).removeClass('border-red');
//        $(this).removeAttr('title');
//        $(this).tooltip({
//            disabled: true
//        });
//    }
//}

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
                track: true,
                content: $(this).attr('title'),
                disabled: false
            });
        }
        else {
            $(this).attr('title', 'Không được dài quá 20 ký tự');
            $(this).tooltip({
                track: true,
                content: $(this).attr('title'),
                disabled: false
            })  
        }
        //isValid = false;
    }
    else {
        $(this).removeClass('border-red');
        $(this).removeAttr('title');
        $(this).tooltip({
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
            //$(this).tooltip({
            //    content: $(this).attr('title'),
            //    track: true
            //});
            isValid = false;
        }
        else {
            $(this).removeClass('border-red');
            $(this).removeAttr('title');
            //$(this).tooltip({
            //    disabled: true
            //});
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
            //$(this).tooltip({
            //   content: $(this).attr('title'),
            //   track: true
            //});
            isValid = false;
        }
        else {
            $(this).removeClass('border-red');
            $(this).removeAttr('title');
            //$(this).tooltip({
            //    disabled: true
            //});
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
 * Sự kiện kích nút đăng nhập
 * CreatedBy: NDTUNG (18/2/2021)
 */
function loginOnClick() {
    var isValid = validateLogin();
    if (isValid) {
        getAccount();
        resetLogin();
    }
}