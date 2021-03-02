class assetIncreasedForm extends baseForm {
    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);
        //Định nghĩa Dialog
        this.assetIncreasedForm = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        });
    }

    initEvent() {
        super.initEvent();
        $('#cbxdepartment').change(function () {
            $('#txtdepartment').val($(this).val());
        })

    }


    /**
     * Hàm xử lý sự kiện thay đổi selection
     * CretedBY: NVTUYEN(26/02/2021)
     * */
    changeValueSelection() {
       
    }

    show(data) {
        let me = this;
        if (data) {
            me.bindingData(data);
            me.assetIncreasedForm.dialog('open');
        }
        me.assetIncreasedForm.dialog('open');
    }

    closeForm() {
        let me = this;
        me.resetForm();
        me.assetIncreasedForm.dialog('close');
    }

}