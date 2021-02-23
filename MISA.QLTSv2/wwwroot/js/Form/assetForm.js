$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $(".dialog_asset").dialog({
        autoOpen: false,
        width: 700,
        height: 525,
        modal: true,
    });

    new assetIncreasedForm("#dialog_asset");

    $("#btn-add-assetincreased").click(function () {
        dialog.dialog('open');
    })

})  

class assetIncreasedForm extends baseForm {
    constructor(formId) {
        super(formId);
    }
    closeForm() {
        this.resetForm();
        dialog.dialog('close');
    }
}