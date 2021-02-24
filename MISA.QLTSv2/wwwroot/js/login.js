$(document).ready(function () {
    new Login();
});
class Login {
    constructor() {
        this.initEvent();
    }
    /**
     * Hàm các sự kiện form Login
     * CreatedBy: NDTUNG (24/2/2021)
     * */
    initEvent() {
        $('#btn-login').off('click');
        $('input[required]').on("blur", this.checkInput); //Sự kiện khi blur qua input
        $('input[required]').on("keyup", function () {    //Sự kiện khi nhập tại input
            let input = $(this);
            if ($(this).val().trim() != "") {
                input.removeClass('border-red');
                input.removeAttr('title');
                //$(this).tooltip("close");
            }
        });
        $('input').click(function () { $(this).select(); });//Sự kiện khi click qua input
        $('#btn-login').on('click', this.loginOnClick.bind(this)); //Sự kiện khi click qua Đăng nhập
        $('.login').keypress(function (event) {                    //Sự kiện khi nhấn qua enter
            if (event.which == 13) {
                $('[required]').trigger('blur');
                $('#btn-login').trigger('click');
            }
        });
    }

    /**
 * Hàm kiểm tra bắt buộc nhập và độ dài input
 * CreatedBy: NDTUNG (18/2/2021)
 */
    checkInput() {
        var maxLength, val = $(this).val().trim(), input = $(this);
        maxLength = parseInt($(this).attr('maxlength'));
        if (val == "") {
            $(this).addClass('border-red');
            $(this).attr('title', 'Trường này không được để trống');

            this.showTooltip.bind(this, input);

            //$(this).tooltip({
            //    items: $(this),
            //    content: $(this).attr('title'),
            //    track: true,
            //    position: {
            //        my: "left+10 top",
            //        at: "right+5 top",
            //        collision: "none"
            //    },
            //    disabled: false
            //})
            $(this).tooltip("close");
        }
        else if (val.length > maxLength) {
            $(this).addClass('border-red');
            $(this).attr('title', 'Không được dài quá ' + maxLength + ' ký tự');
            //showTooltip($(this));
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
            })
            $(this).tooltip("close");
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
    checkRequired() {
        var isValid = true;
        $("input[required]").each(function () {
            var val = $(this).val().trim();
            if (val == "") {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được để trống');
                //showTooltip($(this));
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
                })
                isValid = false;
            }
            else {
                //hideTooltip($(this))
                $(this).removeClass('border-red');
                $(this).removeAttr('title');
                $(this).tooltip({
                    items: $(this),
                    disabled: true
                });
            }
        });
        var inputRequire = $(".border-red");
        inputRequire.first().focus();
        return isValid;
    }
    /**
 * Hàm kiểm tra độ dài các trường input
 * CreatedBy: NDTUNG (18/2/2021)
 */
    checkLength() {
        var isValid = true;
        $("input[maxlength]").each(function () {
            var maxlength = parseInt($(this).attr('maxlength'));
            var val = $(this).val().trim();
            if (val.length > maxlength) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Không được dài quá ' + maxlength + ' ký tự');
                //this.showTooltip($(this));
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
                })
                isValid = false;
            }
            else {
                //hideTooltip($(this))
                $(this).removeClass('border-red');
                $(this).removeAttr('title');
                $(this).tooltip({
                    items: $(this),
                    disabled: true
                });
            }
        });
        var inputRequire = $(".border-red");
        inputRequire.first().focus();
        return isValid;
    }
    /**
 * Lấy dữ liệu tài khoản
 * CreatedBy: NDTUNG (18/2/2021)
 */

    getAccount() {
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
    resetLogin() {
        $("[fieldName]").each(function () {
            $(this).val("");
        });
        $(".border-red").removeClass("border-red");
    }
    /**
    * Reset lại Login
    * CreatedBy : NDTUNG (17/2/2021)
    */
    validateLogin() {
        this.delayLoading();
        var isValid = this.checkRequired();
        if (isValid) { isValid = this.checkLength() }
        return isValid;
    }

    /** 
     * Thông báo lỗi nếu như đăng nhập không thành công
     * CreatedBy: NDTUNG (21/2/2021)
     */
    errorAcount(account) {
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
                })
                $(this).tooltip("open");
                //showTooltip($(this));
                //$(this).tooltip('open');
            }
        })
        //var inputRequire = $(".border-red");
        //inputRequire.first().focus();
    }
    /**
     * Sự kiện kích nút đăng nhập
     * CreatedBy: NDTUNG (18/2/2021)
     */
    loginOnClick() {
        var accountTest = {
            UnitBudgetCode: "Misa",
            UserName: "12345678",
            Password: "12345678"
        }, check = 0;
        $('.loading').show();
        var isValid = this.validateLogin();
        if (isValid) {
            $('input[fieldName]').each(function () {
                var feildName = $(this).attr('fieldName');
                if ($(this).val() == accountTest[feildName]) {
                    check++;
                }
            });
            if (check == $('input').length) {
                window.location.href = "https://localhost:44363/Asset/AssetIncreased";
                this.resetLogin();
                this.delayLoading();
            }
            else {
                this.delayLoading();
                this.errorAcount(accountTest);
            }
        }
    }
    /**
     * Ẩn Tooltip
     * CreatedBy: NDTUNG (22/2/2021)
     */
    hideTooltip(input) {
        input.removeClass('border-red');
        input.removeAttr('title');
        input.tooltip({
            items: input,
            disabled: true
        });
    }
    /**
     * Hiển thị Tooltip
     * CreatedBy: NDTUNG (22/2/2021)
     */
    showTooltip(input) {
        input.tooltip({
            items: input,
            content: input.attr('title'),
            track: true,
            position: {
                my: "left+10 top",
                at: "right+5 top",
                collision: "none"
            },
            disabled: false
        })
    }

    delayLoading() {
        setTimeout(function () {
            $('.loading').hide();
        }, 3000)
    }
}