$(document).ready(function () {
    //Định nghĩa Dialog
    dictionary_Form = $("#dialog_dictionary").dialog({
        autoOpen: false,
        height: 500,
        width: 700,
        modal: true,
    });
    new dictionaryForm("#dialog_dictionary");
    $('#btn-add-dictionary').click(function () {
        dictionary_Form.dialog('open');
    })
})
//Lớp form chi tiết của bảng ở màn dictionary
class dictionaryForm extends baseForm {
    constructor(formId) {
        super(formId);
    }
    closeForm() {
        this.resetForm();
        dictionary_Form.dialog('close');
    }
    /**
     * Hàm hiển thị form chi tiết
     * CreatedBY: BQDUY(23/02/2021)
     * */
    //showForm() {
    //    this.closeForm();
    //    dialog.dialog('open');
    //}
    //getDataForm() {
    //    this.getData();
    //}
}