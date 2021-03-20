

//-----------------Form-----------------------------
class baseForm {
    ///constructor
    constructor(Idform, jsCaller) {
        //this.formMode = Enum.FormMode.Add;
        this.form = $(Idform);
        this.jsCaller = jsCaller;
        this.getApiUrl = null;
        this.setApiUrl();
        this.initEvent();
    };

    /**
     * Hàm khởi tạo các sự kiện trong Form
     * CreatedBy : NDTUNG (4/2/2021)
     */
    initEvent() {
        let me = this;
        //var data = this.getJson();
        this.form.find("#btn-cancel").off("click");
        this.form.find("#btn-save").off("click");
        //this.form.find("#btn-save").on("click", this.getJson());
        this.form.find("#btn-cancel,#btn-close").on("click", this.closeForm.bind(this));
        this.form.find("#btn-save").on("click", this.saveData.bind(this));
        this.form.find('input').click(function () { $(this).select(); });
        //this.form.find("[required]").blur(this.checkStatusInput);
        this.form.find("[required]").keyup(this.checkStatusInput);
        this.form.find("[required]").focus(function () {
            $(this).removeClass("border-red");
            $(this).attr("title", "");
        });

        this.form.find("input[dataType='money']").on("keypress", function () {
            if (event.which != 8 && isNaN(String.fromCharCode(event.which))) {
                event.preventDefault();
            }
            else {
                $("input[dataType='money']").keyup(function () {
                    me.formatPrice($(this));
                })
            }
        });

        this.form.find("input[dataType='date']").datepicker({ dateFormat: "dd/mm/yy" }).inputmask("99/99/9999", { placeholder: "__/__/____" });

        this.form.find(".icon_PostDate").off('click').click(function () {
            $('input[dataType="date"]').focus();
        });

        this.form.find('input[dataType="Number"]').keyup(function () {
            if (me.checkInputNumber() == true) {
                $(this).removeClass("border-red");
                $(this).removeAttr("title");
            }
            else {
                $(this).addClass("border-red");
                $(this).attr("title", "Cần nhập đúng định dạng số!");
            }
        });
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
    formatPrice(input) {
        try {
            var value = input.val().split(".").join("");
            var formated = formatMoney(value);
            input.val(formated);

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
                var test = /^((0|[1-9]\d?)(\.\d{1,2})?|100(\.00?)?)$/i;
                if (!test.test(val)) {
                    $(this).addClass('border-red');
                    $(this).attr('title', 'Cần nhập đúng định dạng số!');
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
            if ($(this).attr("dataType") == "JSON") {
                $(this).find('tbody').empty();
            }
        });
        this.form.find(".border-red").removeClass("border-red");
    }

    /**
     * Đóng form
     * CreatedBy : NDTUNG (3/2/2021)
     */
    closeForm() {

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
                propertyValue = formatDate(propertyValue, "DD-MM-YYYY");
            }
            else if ($(this).attr('dataType') == "money") {
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
        let selects = me.form.find("select[fieldName]");
        $.each(selects, function (index, select) {
            if (fieldName == $(select).attr("fieldName")) {
                $.each(data, function (index, element) {
                    let option = `<option value="` + element[fieldValue] + `">` + element[fieldName] + `</option>`;
                    $(select).append(option);
                })
            }
        })
    }

    /**
     * Lưu dữ diệu vào Database
     * CreatedBy : NDTUNG (4/2/2021)
     */
    saveChangeData(data) {
        let me = this,
            jsCaller = me.jsCaller;

        var url = me.getApiUrl;
        $('.loading').show();
        if (jsCaller.formMode == "Add") {
            $.ajax({
                url: url,
                method: "POST",
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).done(function (res) {
                if (res.HttpCode == 200) {
                    me.closeForm();
                    me.jsCaller.loadAjaxData(me.getApiUrl);
                    showMessengerSuccess("Thêm thành công!");
                    $('.loading').hide();
                } else {
                    $('.loading').hide();
                    showAlertWarring(res.Data);
                }

            }).fail(function (res) {

            })
        } else if (jsCaller.formMode == "edit") {
            var idSelected = me.jsCaller.grid.find(".selected-row").data("recordId");
            $.ajax({
                url: url + '/' + idSelected,
                method: "PUT",
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).done(function (res) {
                if (res.HttpCode == 200) {
                    me.closeForm();
                    me.jsCaller.loadAjaxData(me.getApiUrl);
                    showMessengerSuccess("Sửa thành công!");
                    $('.loading').hide();

                } else {
                    $('.loading').hide();
                    showAlertWarring(res.Data);
                }
            }).fail(function (res) {

            })
        }
    }

    /**
  * Lấy dữ liệu từ các ô input
  * CreatedBy : NDTUNG (3/2/2021)
  */
    getDataInput(input, dataType) {
        var me = this;
        let value = input.val();

        if (value != null) {
            switch (dataType) {
                case "date":
                    value = input.datepicker("getDate");

                    break;
                case "Number":
                    value = parseFloat(value);
                    break;
                case "money":
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
                case "Total":
                    $.each(me.subGrid.listSubGrid, function (index, obj) {
                        value += obj["Amount"];
                    });
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
        this.form.find("input[fieldName], textarea, select, table").each(function () {
            var fieldName = $(this).attr("fieldName"),
                dataType = $(this).attr("DataType");

            if (me.jsCaller.formMode == "edit") {
                data[me.jsCaller.entity + "Id"] = me.jsCaller.grid.find(".selected-row").data("recordId");
            }
            if (dataType == "JSON" && (me.subGrid.listSubGrid != null)) {
                data[fieldName] = JSON.stringify(me.subGrid.listSubGrid);
            } else {
                data[fieldName] = me.getDataInput($(this), dataType);
            }

        });
        return data;
    }
    /**
     * Sự kiện click nút Lưu
     * CreatedBy : NDTUNG (4/2/2021)
     **/
    saveData() {
        var me = this;
        var isValid = me.validateForm();
        // Kiểm tra nếu form có bảng nhỏ thì check, nếu có bảng trong bảng chưa có thì chưa cho lưu
        if (me.subGrid) {
            if (me.subGrid.listSubGrid.length == 0) {
                showAlertWarring("Vui lòng chọn tài sản để hoàn thành chứng từ!");
            } else {
                if (isValid) {
                    var data = me.getData();
                    console.log(data);
                    me.saveChangeData(data);
                }
            }
        } else {
            if (isValid) {
                var data = me.getData();
                console.log(data);
                me.saveChangeData(data);
            }
        }
    }
}