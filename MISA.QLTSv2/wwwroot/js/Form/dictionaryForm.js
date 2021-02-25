//Lớp form chi tiết của bảng ở màn dictionary
class dictionaryForm extends baseForm {
    constructor(formId, width, height) {
        super(formId);
        //Định nghĩa Dialog
        this.dictionary_Form = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        });
    }

    show() {
        let me = this;
        me.dictionary_Form.dialog('open');
    }

    closeForm() {
        let me = this;
        me.resetForm();
        me.dictionary_Form.dialog('close');
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