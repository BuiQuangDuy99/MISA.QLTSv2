$(document).ready(function () {
    //Định nghĩa Dialog
    dialog = $(".dialog_dictionary").dialog({
        autoOpen: false,
        height: 500,
        width: 360,
        title: 'Thêm mới loại tài sản',
        modal: true,
    });

    //var formDictionary = new dictionaryForm("#dialog_dictionary");

})
class dictionaryForm extends baseForm {
    constructor(formId) {
        super(formId);
    }

    showForm() {
        this.closeForm();
        dialog.dialog('open');
    }
}