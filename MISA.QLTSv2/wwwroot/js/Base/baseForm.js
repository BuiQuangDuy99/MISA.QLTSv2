

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
        this.getData(); 
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
        this.form.find("[required]").blur(this.checkStatusInput);
        //this.form.find("[required]").keyup(this.checkStatusInput);
        this.form.find("[required]").focus(function () {
            $(this).removeClass("border-red");
            $(this).attr("title", "");
        });

        this.form.find("input[dataType='money'],input[dataType='Number']").on("keypress", function () {
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
                propertyValue = formatDate(propertyValue, "DD-MM-YYYY");
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
        if (jsCaller.formMode == "Add") {
            $.ajax({
                url: url,
                method: "POST",
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).done(function (res) {
                me.closeForm();
                me.jsCaller.loadAjaxData(me.getApiUrl);
                showMessengerSuccess("Thêm thành công!");

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
                me.closeForm();
                me.jsCaller.loadAjaxData(me.getApiUrl);
                showMessengerSuccess("Sửa thành công!");

            }).fail(function (res) {

            })
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
                case "date":
                    value = input.datepicker("getDate");
                    debugger
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
        this.form.find("input[fieldName], textarea, select, table").each(function () {
            var fieldName = $(this).attr("fieldName"),
                dataType = $(this).attr("DataType");

            //if (dataType == "Combobox") {
            //    fieldName = $(this).attr("fieldValue");

            //}
            if (me.jsCaller.formMode == "edit") {
                //data[fieldName] = me.jsCaller.grid.find(".selected-row").data("recordId");
                data[me.jsCaller.entity + "Id"] = me.jsCaller.grid.find(".selected-row").data("recordId");
            }
            if (dataType == "JSON") {
                data[fieldName] = JSON.stringify(testVarJSON);
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
        if (isValid) {
            var data = me.getData();
            console.log(data);
            me.saveChangeData(data);
        }
    }
} 

var testVarJSON = [{
    "FixedAssetId": "57d426d2-7d83-11eb-ba81-6a929c950d9c",
    "FixedAssetCode": "TS999",
    "FixedAssetName": "âxaxa",
    "Cost": 2828.0000,
    "DepreciationRate": 12.0
},
{
    "FixedAssetId": "5f7b48e5-16f9-2f2f-ecdc-845b5dcdad45",
    "FixedAssetCode": "TS000",
    "FixedAssetName": "tài sản thứ 2",
    "Cost": 999.0000,
    "DepreciationRate": 10.0
}]