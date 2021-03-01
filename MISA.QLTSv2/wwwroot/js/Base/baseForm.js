﻿
//-----------------Form-----------------------------
class baseForm {
    ///constructor
    constructor(Idform, jsCaller) {
        //this.formMode = Enum.FormMode.Add;
        this.form = $(Idform);
        this.jsCaller = jsCaller;
        this.setApiUrl();
        this.getApiUrl = null;
        this.initEvent();
    };

    /**
     * Hàm khởi tạo các sự kiện trong Form
     * CreatedBy : NDTUNG (4/2/2021)
     */
    initEvent() {
        //var data = this.getJson();
        this.form.find("#btn-cancel").off("click");
        this.form.find("#btn-save").off("click");
        //this.form.find("#btn-save").on("click", this.getJson());
        this.form.find("#btn-cancel,#btn-close").on("click", this.closeForm.bind(this));
        this.form.find("#btn-save").on("click", this.saveData.bind(this));
        this.form.find('input').click(function () { $(this).select(); });
        this.form.find("input").blur(this.checkStatusInput);
        this.form.find("input").keyup(this.checkStatusInput);
        //this.form.find("input").blur(this.checkInputNumber.bind(this));
        //this.form.find("input").keyup(this.checkInputNumber.bind(this));
        this.form.find("input[DataType='Money'],input[DataType='Number']").on("keypress", function () {
            if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
                event.preventDefault();
            }
            else {
                $("input[DataType='Money']").keyup(this.formatPrice)
            }
        }.bind(this));


    }

    setUrlJsonFile() {

    }


    setApiUrl() {

    }
    /**
     *Kiểm tra xem đã đúng validate chưa
     * CreatedBy : NDTUNG (4/2/2021)
     */
    checkStatusInput() {
        var value = $(this).val(),
            require = $(this).attr("required");
        if (value.trim() == "" && require) {
            $(this).addClass("border-red");
            $(this).attr("title", "Trường này không được để trống!");
        } else {
            $(this).removeClass("border-red");
            $(this).attr("title", "");
        }
    }

    /**
     *Format định dạng tiền khi người dùng nhập trường nguyên giá
     *CreatedBy : NDTUNG (4/2/2021)
     */
    formatPrice() {
        try {
            if (isNaN($("input[DataType='Money']").val()) != null) {
                var value = $("input[DataType='Money']").val().split(".").join("");
                var formated = formatMoney(value);
                $("input[DataType='Money']").val(formated);
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
        var isValid = true;
        this.form.find("input[required]").each(function () {
            var val = $(this).val();

            if (val.trim() == "") {
                $(this).addClass('border-red');
                $(this).attr('title', 'Trường này không được để trống');
                isValid = false;
            }
            else {
                $(this).removeClass('border-red');
                $(this).removeAttr('title');
            }
        });
        var inputRequire = this.form.find(".border-red");
        inputRequire.first().focus();
        return isValid;

    }
    /**
     * Validate các ô nhập số 
     * CreatedBy : NDTUNG (4/2/2021)
     */
    checkInputNumber() {
        var isValid = true;
        this.form.find("input[DataType='Number']").each(function () {
            var val = $(this).val().trim();
            if (val != "") {
                var test = /^[0-9]+$/i;
                if (!test.test(val)) {
                    $(this).addClass('border-red');
                    $(this).attr('title', 'Càn nhập đúng định dạng số!');
                    isValid = false;
                }
                else {
                    $(this).removeClass('border-red');
                    $(this).removeAttr('title');

                }
            }
        });
        var inputRequire = this.form.find(".border-red");
        inputRequire.first().focus();
        return isValid;
    }

    /**
     * Validate form
     * CreatedBy : NDTUNG (4/2/2021)
     */
    validateForm() {
        var me = this;

        var isValid = me.checkInputRequired(); //Validate các trường Required

        if (isValid) {
            isValid = me.checkInputNumber(); //Validate các ô nhập số
        }

        return isValid;


    }

    /**
         * Reset lại form
         * CreatedBy : NDTUNG (3/2/2021)
         */
    resetForm() {
        this.form.find("[fieldName]").each(function () {
            $(this).val("");
        });
        this.form.find(".border-red").removeClass("border-red");
    }
    /**
     * Đóng form
     * CreatedBy : NDTUNG (3/2/2021)
     */
    closeForm() {
        //this.resetForm();
        //dialog.dialog('close');
    }




    /**
    * Đổ dữ liệu vào trong form
    * CreatedBy : NDTUNG (3/2/2021)
    */
    bindingData(data) {
        this.form.find("[fieldName]").each(function () {
            var propertyName = $(this).attr('fieldName');
            var propertyValue = data[0][propertyName];
            if ($(this).attr('dataType') == 'date') {
                propertyValue = formatDate(propertyValue,"YYYY-MM-DD");
            }
            else if ($(this).attr('dataType') == "Money") {
                var money = formatMoney(propertyValue);
                propertyValue = money;
            }
            this.value = propertyValue;
        });
    }

    /**
     * Load data combobox từ dữ liệu giả
     * CreatedBY: BQDUY(25/02/2021)
     * */
    loadComboBox(entity, data) {
        let fieldValue = entity + "Id",
            fieldName = entity + "Name",
            me = this;
        $.each(data, function (index, element) {
            let select = me.form.find("select"),
                option = `<option value="` + element[fieldValue] + `">` + element[fieldName] + `</option>`;
            $(select).append(option);
        })
    }

    /**
     * Lưu dữ diệu vào Database
     * CreatedBy : NDTUNG (4/2/2021)
     */
    saveChangeData(data) {
        //var url = this.getApiUrl;
        //var formMode = this.formMode;
        //if (formMode == 1) {
        //    callAjax(url, "Post", data, function (res) {
        //        if (res.MISACode == Enum.StatusResponse.Success) {
        //            showAlertWarring("Cất dữ liệu thành công!")
        //        }
        //    });
        //}
        //else if (formMode == 2) {
        //    callAjax(url, "Put", data, function (res) {
        //        if (res.MISACode == Enum.StatusResponse.Success) {
        //            showAlertWarring("Cất dữ liệu thành công!")
        //        }
        //    });
        //}
        let me = this,
            jsCaller = me.jsCaller;

        if (jsCaller.formMode == "Add") {

            jsCaller.listData.push(data);
            jsCaller.loadData(jsCaller.listData);
        }
    }

    /**
  * Lấy dữ liệu từ các ô input
  * CreatedBy : NDTUNG (3/2/2021)
  */
    getDataInput(input, dataType) {
        let value = input.val();

        if (value) {
            switch (dataType) {
                case "Date":
                    value += " 00:00:00";
                    break;
                case "Number":
                    value = parseInt(value);
                    break;
                case "Money":
                    value = parseInt(value.split(".").join(""));
                    break;
                case "Combobox":
                    var test = input.children();
                    $.each(test, function (index, option) {
                        var check = $(option).prop("selected");
                        if (check) {
                            value = $(option).prop("label");
                        }
                        
                    })
                    break;
                default:
                    value = value.trim();
            }
        }

        return value;
    }

    /**
     * Lấy dữ liệu trong form
     * CreatedBy : NDTUNG (3/2/2021)
     */
    getData() {
        var me = this;
        var data = {};
        this.form.find("[fieldName], select").each(function () {
            var fieldName = $(this).attr("fieldName"),
                dataType = $(this).attr("DataType");

            //if (dataType == "Combobox") {
            //    fieldName = $(this).attr("fieldValue");

            //}

            data[fieldName] = me.getDataInput($(this), dataType);

        });
        return data;
    }

    /**
     * Lưu dữ liệu vào file .json
     * CreatedBy: DVVUONG (25/02/2021)
     * */
    saveChangeData_(data) {
        var source = null;
        $.getJSON(this.urlJsonFile, function (dataJson) {
            source = dataJson;
        }).fail(function () {
            console.log("load false");
        });

    }

    /**
     * Sự kiện click nút Lưu
     * CreatedBy : NDTUNG (4/2/2021)
     */
    saveData() {
        var me = this;
        var isValid = me.validateForm();
        if (isValid) {
            var data = me.getData();
            me.saveChangeData(data);
            me.closeForm();
        }
    }

}