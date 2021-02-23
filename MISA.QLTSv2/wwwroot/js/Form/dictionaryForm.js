$(document).ready(function () {
    //Định nghĩa Dialog
    dialog = $(".dialog_dictionary").dialog({
        autoOpen: false,
        height: 500,
        width: 360,
        title: 'Thêm mới loại tài sản',
        modal: true,
    });
})
//Lớp form chi tiết của bảng ở màn dictionary
class dictionaryForm extends baseForm {
    constructor(formId) {
        super(formId);
    }
    /**
     * Hàm hiển thị form chi tiết
     * CreatedBY: BQDUY(23/02/2021)
     * */
    showForm() {
        this.closeForm();
        dialog.dialog('open');
    }
    getDataForm() {
        this.getData();
    }
}