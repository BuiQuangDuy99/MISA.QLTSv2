class reftransferForm extends baseForm {

    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);
        //Định nghĩa Dialog
        this.reftransferForm = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        });
    }

    initEvent() {
        super.initEvent();
        $('#TestDate').datepicker({ dateFormat: "dd/mm/yy" }).inputmask("99/99/9999", { placeholder: "__/__/____" });

    }

    setApiUrl() {
        this.getApiUrl = 'https://localhost:44363/api/RefTransfer';
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
            me.reftransferForm.dialog('open');
        }
        me.reftransferForm.dialog('open');
    }

    closeForm() {
        let me = this;
        me.resetForm();
        me.reftransferForm.dialog('close');
    }

}