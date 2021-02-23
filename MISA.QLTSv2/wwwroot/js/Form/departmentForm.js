$(document).ready(function () {
    //Định nghĩa Dialog
    dialogs = $(".department_dialog").dialog({
        autoOpen: false,
        //height: 400,
        width: 480,
        modal: true,
        draggable: true
    });

    new departmentForm('#department_dialog');
    $("#btn-add-depatment").click(function () {
        dialogs.dialog('open');
    })

})

class departmentForm extends baseForm {
    constructor(formId) {
        super(formId);
    }
        
    closeForm() {
        this.resetForm();
        dialogs.dialog('close');
    }
}