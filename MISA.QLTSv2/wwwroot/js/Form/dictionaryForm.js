$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $(".dialog_dictionary").dialog({
        autoOpen: false,
        height: 500,
        width: 360,
        title: 'Thêm mới loại tài sản',
        modal: true,
    });

    var fromDictionary = new dictionaryForm("#dialog_dictionary");

    $("#add-demo").click(function () {
        fromDictionary.closeForm();
        dialog.dialog('open');
    });

})
class dictionaryForm extends baseForm {
    constructor(formId) {
        super(formId);
        //fromDictionary.loadFormData(data);
        //window['dictionaryForm'].loadFormData(data);
    }
}