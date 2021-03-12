class refDecrementForm extends baseForm {

    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);
        //Định nghĩa Dialog
        this.refDecrementForm = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        });
    }

    initEvent() {
        super.initEvent();
        $('#PostedDate').datepicker({ dateFormat: "dd/mm/yy" }).inputmask("99/99/9999", { placeholder: "__/__/____" });
    }

    setApiUrl() {
        this.getApiUrl = 'https://localhost:44363/api/RefDecrements';
    }

    /**
     * Hàm xử lý sự kiện thay đổi selection
     * CretedBY: DVVUONG(26/02/2021)
     * */
    changeValueSelection() {

    }

    show(data) {
        let me = this;
        if (data) {
            me.bindingData(data);
            me.refDecrementForm.dialog('open');
        }
        me.refDecrementForm.dialog('open');
    }

    closeForm() {
        let me = this;
        me.resetForm();
        me.refDecrementForm.dialog('close');
    }

}