
//-----------------Form-----------------------------
class baseForm {
    ///constructor
    constructor(Idform) {

        this.form = $(Idform);
        this.initEvent();
    };
    initEvent() {

        this.form.find("#btn-cancel").off("click");
        this.form.find("#btn-save").off("click");

        this.form.find("input[required]").on("blur", this.checkInputRequired);
        this.form.find("input[required]").on("keyup", this.checkInputRequired);
        this.form.find("#btn-cancel").on("click",this.closeForm);
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
            this.value = propertyValue;
        });
    }
}