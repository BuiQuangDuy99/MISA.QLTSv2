$(document).ready(function () {
    new Login();
});

/**
 * Class dùng để login
 * NDTUNG 24.02.2021
 * */
class Login {

    /**
    * Hàm khởi tạo
    * CreatedBy: NDTUNG (24/2/2021)
    * */
    constructor() {
        var me = this;

        // Khởi tạo các sự kiện cho form 
        me.initEvents();
    }

    /**
     * Hàm các sự kiện form Login
     * CreatedBy: NDTUNG (24/2/2021)
     * */
    initEvents() {
        var me = this;

        // Khởi tạo sự kiện khi click button login
        $('#btn-login').off('click');
        $('#btn-login').on('click', me.loginOnClick.bind(me));

        // Sự kiện khi blur qua input
        $('input[required]').on("blur", function () {
            me.checkInput($(this));
        });

        //Sự kiện khi nhập tại input
        $('input[required]').on("keyup", function () {
            me.inputEventOnKeyUp($(this))
        });

        //Sự kiện khi click qua input
        $('input').click(function () { $(this).select(); });

        // Sự kiện khi nhấn qua enter
        $('.login').keypress(function (event) {
            if (event.which == 13) {
                $('[required]').trigger('blur');
                $('#btn-login').trigger('click');
            }
        });
    }

    /**
    * Sự kiện khi nhập tại input
    * CreatedBy: NDTUNG (24/2/2021)
    * */
    inputEventOnKeyUp(input) {
        if (input.val().trim() != "") {
            input.removeClass('border-red');
            input.removeAttr('title');
            input.tooltip({
                items: $(this),
                disabled: true,
            })
        }
    }

    /**
    * Hàm kiểm tra bắt buộc nhập và độ dài input
    * CreatedBy: NDTUNG (18/2/2021)
    */
    checkInput(input) {

        var maxLength,
            val = input.val().trim();

        maxLength = parseInt(input.attr('maxlength'));

        if (val == "") {

            input.addClass('border-red');
            input.attr('title', 'Trường này không được để trống');

            this.showTooltip(input);
            input.tooltip("close");
        }
        else if (val.length > maxLength) {

            this.showTooltip(input);
            $(this).tooltip("close");
        }

        else {
            this.hideTooltip(input);
        }
    }
    /**
     * Hàm kiểm tra bắt buộc nhập các trường input
     * CreatedBy: NDTUNG (18/2/2021)
     */
    checkRequired() {
        var me = this,
            isValid = true;

        $("input[required]").each(function () {

            var val = $(this).val().trim();

            if (val == "") {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được để trống');

                me.showTooltip($(this));

                isValid = false;
            }
            else {
                me.hideTooltip($(this))
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

        var me = this,
            isValid = true;

        $("input[maxlength]").each(function () {

            var maxlength = parseInt($(this).attr('maxlength')),
                val = $(this).val().trim();

            if (val.length > maxlength) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Không được dài quá ' + maxlength + ' ký tự');

                me.showTooltip($(this));
                isValid = false;
            }
            else {
                me.hideTooltip($(this))
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
    * Kiểm tra form Login
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
        var me = this;

            $('input').each(function () {
                var fieldName = $(this).attr('fieldName');

                if ($(this).val() != account[fieldName]) {
                    $(this).attr('title', 'Thông tin đăng nhập không chính xác.');
                    $(this).addClass('border-red');

                    me.showTooltip($(this));
                    $(this).tooltip('open');
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
        var check = 0,
            accountTest = {
                UnitBudgetCode: "Misa",
                UserName: "12345678",
                Password: "12345678"
            };

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
     * Ẩn Tooltip
     * CreatedBy: NDTUNG (22/2/2021)
     */
    delayLoading() {
        setTimeout(function () {
            // calsll
            $('.loading').hide();
        }, 3000)
    }
}