
//-----------------Form-----------------------------
class baseForm {
    ///constructor
    constructor(Idform) {

        this.form = $(Idform);
        this.setApiUrl();
        this.getApiUrl = null;
        this.initEvent();
    };
    initEvent() {

        this.form.find("#btn-cancel").off("click");
        this.form.find("#btn-save").off("click");
        this.form.find("#btn-cancel").on("click", this.closeForm);

        this.form.find(input).on("Click", "this.select()");
        this.form.find("input[required]").on("blur", this.checkInputRequired);
        this.form.find("input[required]").on("keyup", this.checkInputRequired);
        this.form.find("input[DataType='Number']").on("blur", this.checkInputNumber);
        this.form.find("input[DataType='Number']").on("keyup", this.checkInputNumber);
        this.form.find('#txtPrice').on("keypress", function () {
            if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
                event.preventDefault();
            }
            else {
                $('#txtPrice').keyup(this.formatPrice)
            }
        }.bind(this));
    }
    setApiUrl() {

    }

    /**
     *Format định dạng tiền khi người dùng nhập trường nguyên giá
     *CreatedBy : NDTUNG (4/2/2021)
     */
    formatPrice() {
        try {
            if (isNaN($("#txtPrice").val()) != null) {
                var value = $("#txtPrice").val().split(".").join("");
                var formated = formatMoney(value);
                $("#txtPrice").val(formated);
            }
        } catch (e) {
            alert(e);
        }
    }

    /**
     * Validate bắt buộc nhập 
     * CreatedBy : NDTUNG (3/2/2021)
     */
    checkInputRequired() {
        var val = $(this).val();

        if (val.trim() == "") {
            $(this).addClass('border-red');
            $(this).attr('title', 'Trường này không được để trống');
            $(this).attr('Validate', false);
        }
        else {
            $(this).removeClass('border-red');
            $(this).removeAttr('title');
            $(this).attr('Validate', true);
        }

    }
    /**
     * Validate các ô nhập số 
     * CreatedBy : NDTUNG (4/2/2021)
     */
    checkInputNumber() {
        var val = $(this).val();
        var test = /^[0-9]+$/i;
        if (!test.test(val)) {
            $(this).addClass('border-red');
            $(this).attr('title', 'Càn nhập đúng định dạng số!');
            $(this).attr('Validate', false);

        }
        else {
            $(this).removeClass('border-red');
            $(this).removeAttr('title');
            $(this).attr('Validate', true);

        }

    }


    /**
         * Reset lại form
         * CreatedBy : NDTUNG (3/2/2021)
         */
    resetForm() {
        this.form.find("[fieldName]").each(function () {
            $(this).val("");
        });
        this.form.find(".border-red").removeClass(".border-red");
    }

    /**
     * Đóng form
     * CreatedBy : NDTUNG (3/2/2021)
     */
    closeForm() {
        this.resetForm;
        dialog.dialog('close');
    }

    /**
     * Lấy dữ liệu trong form
     * CreatedBy : NDTUNG (3/2/2021)
     */
    getData() {
        var data = {};
        var inputs = this.form.find("[fieldName]");
        $.each(inputs, function (index, input) {
            var propertyName = $(this).attr("fieldName");
            var value = $(this).val();
            if (propertyName == "Price") {
                value = $(this).val().split(".").join("");
            }
            data[propertyName] = value;
        });
        return data;
    }


    /**
    * Đổ dữ liệu vào trong form
    * CreatedBy : NDTUNG (3/2/2021)
    */
    bindingData(data) {
        this.form.find("[fieldName]").each(function () {
            var propertyName = this.attr('fieldName');
            var propertyValue = data[propertyName];
            if ($(this).attr('type') == 'date') {
                propertyvalue = formatStringDate(propertyvalue);
            }
            if ($(this).attr('fieldname') == "price") {
                var money = formatMoney(propertyvalue);
                propertyvalue = money;
            }
            this.value = propertyValue;
        });
    }

    /**
     * Lưu dữ diệu vào Database
     * CreatedBy : NDTUNG (4/2/2021)
     */
    saveChangeData(data) {
        var url = this.getApiUrl;
        if (formMode == "Add") {
            callAjax(url, "Post", data, function (res) {
                if (res.MISACode == Enum.StatusResponse.Success) {
                    showAlertWarring("Cất dữ liệu thành công!")
                }
            });
        }
        if (formMode == "Edit") {
            callAjax(url, "Put", data, function (res) {
                if (res.MISACode == Enum.StatusResponse.Success) {
                    showAlertWarring("Cất dữ liệu thành công!")
                }
            });
        }
    }
    saveData() {
        var inputValadate = $('input[required]');
        $.each(inputValadate, function (index, input) {
            $(input).trigger('blur');
        });
        var inputNotValidate = $('input[Validate="false"]')
        if (inputValadate && inputNotValidate.length > 0) {
            showAlertWarring("Vui lòng nhập đầy đủ các trường dữ liệu thông tin bắt buôc!");
            inputNotValidate[0].focus();
            return;
        }
        if (inputNotValidate.length == 0) {
            var data = this.getData();
            this.saveChangeData(data);
            this.closeForm();
        }

    }
}