$(document).ready(function () {

    //Định nghĩa Dialog
    dialog = $(".dialog__content").dialog({
        autoOpen: true,
        height: 751,
        width: 750,
        modal: true,
    });
    new grid("#dialog");

})
class grid extends baseForm {
    constructor(formId) {
        super(formId);
    }
}