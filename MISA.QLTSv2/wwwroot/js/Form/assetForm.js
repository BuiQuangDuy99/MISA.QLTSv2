class assetIncreasedForm extends baseForm {
    constructor(formId, width, height) {
        super(formId);
        //Định nghĩa Dialog
        this.assetIncreasedForm = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        });
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