$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $("#dialog_dictionary").dialog({
        autoOpen: false,
        height: 600,
        width: 800,
        modal: true,
    });

    new dictionaryForm("#dialog_dictionary");
    $(".btn-add").click(function() {
        dialog.dialog('open');
    })

})
class dictionaryForm extends baseForm {
    constructor(formId) {
        super(formId);
    }
}