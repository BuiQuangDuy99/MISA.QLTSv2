//Lớp form chi tiết của bảng ở màn dictionary
class dictionaryForm extends baseForm {
    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);
        //Định nghĩa Dialog
        this.dictionary_Form = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        });
    }

    /**
     * load combobox khi khởi tạo form
     * CreatedBY: BQDUY(25/02/2021)
     * */
    initLoadComboBox(entity, dataCbx) {
        this.loadComboBox(entity, dataCbx);
    }

    setApiUrl() {
        this.getApiUrl = 'https://localhost:44363/api/v1/FACategories';
    }

    show(data) {
        let me = this;
        if (data) {
            me.bindingData(data);
            me.dictionary_Form.dialog('open');
        }
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