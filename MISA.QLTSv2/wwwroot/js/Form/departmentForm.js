
//Lớp form chi tiết của bảng ở màn department
class departmentForm extends baseForm {
    constructor(formId, width, height) {
        super(formId);
        //Định nghĩa Dialog
        this.department_Form = $(formId).dialog({
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

    show(data) {
        let me = this;
        if (data) {
            me.bindingData(data);
            me.department_Form.dialog('open');
        }
        me.department_Form.dialog('open');
    }

    closeForm() {
        let me = this;
        me.resetForm();
        me.department_Form.dialog('close');
    }

    setUrlJsonFile() {
        this.urlJsonFile = "/wwwroot/js/departments.json";
    }
        
    closeForm() {
        this.resetForm();
        dialogs.dialog('close');
    }
}