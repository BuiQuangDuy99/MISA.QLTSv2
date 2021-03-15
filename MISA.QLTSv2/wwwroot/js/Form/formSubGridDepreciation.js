
class depreciationSubGridForm extends baseForm {
    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);
        //Định nghĩa Dialog
        this.depreciationForm = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        });
    }

    show() {
        this.depreciationForm.dialog('open');
    }

    /**
     * Hàm xử lý khi form đóng
     * CreatedBY: BQDUY(15/03/2021)
     * */
    closeForm() {
        let me = this;
        me.resetForm();
        //var depreciationGrid = new depreciation('#depreciation-grid-api', 'RefDepreciation');
        //depreciationGrid.createFormDetail("#dialog_depreciation_use_API", 800, 600);

        me.depreciationForm.dialog('close');
    }
}