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
        $('input[required]').on("blur", this.checkInput);
        $('input[required]').on("keyup", function () {
            let input = $(this);
            if ($(this).val().trim() != "") {
                input.removeClass('border-red');
                input.removeAttr('title');            }
        });
        $('input').click(function () { $(this).select(); });
        $('#btn-login').on('click', this.loginOnClick.bind(this));
        $('.login').keypress(function (event) {
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
        var maxLength = 20, val = $(this).val().trim(),input=$(this);

        if (val.length > maxLength || val == "") {
            $(this).addClass('border-red');
            if (val == "") {
                $(this).attr('title', 'Trường này không được để trống');

                this.showTooltip(input).bind(this,input);

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
                $(this).attr('title', 'Không được dài quá 20 ký tự');
                //showTooltip($(this));
                $(this).tooltip({
                    items: input,
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
        var maxLength = 20, isValid = true;
        $("input[required]").each(function () {
            var val = $(this).val().trim();
            if (val.length > maxLength) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Không được dài quá 20 ký tự');
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
        }
        var isValid = this.validateLogin();
        if (isValid) {
            var account = this.getAccount();
            if ((JSON.stringify(account) === JSON.stringify(accountTest))) {
                $('.loading').show();
                window.location.href = "https://localhost:44363/Asset/AssetIncreased";
                this.resetLogin();
                //$('.loading').hide();
            }
            else {
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
}







