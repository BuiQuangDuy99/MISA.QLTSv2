$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $(".dialog_dictionary").dialog({
        autoOpen: true,
        height: 717,
        width: 360,
        title: 'Thêm mới loại tài sản',
        modal: true,
    });

    new dictionaryForm("#dialog_dictionary");

    $("#add-demo").click(function () {
        dialog.dialog('open');

    });

})
class dictionaryForm extends baseForm {
    constructor(formId) {
        super(formId);
    }
}