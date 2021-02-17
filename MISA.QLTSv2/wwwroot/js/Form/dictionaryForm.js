$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: true,
        height: 751,
        width: 750,
        modal: true,
    });
    new dictionaryForm("#dialog_dictionary");

})
class dictionaryForm extends baseForm {
    constructor(formId) {
        super(formId);
    }
}