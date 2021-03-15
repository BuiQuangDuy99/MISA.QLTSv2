class refDecrementForm extends baseForm {

    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);
        //Định nghĩa Dialog
        this.refDecrementForm = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        });
        this.popup = null;
        this.initEvent();

    }

    initEvent() {
        var me = this;
        super.initEvent();
        $('#PostedDate').datepicker({ dateFormat: "dd/mm/yy" }).inputmask("99/99/9999", { placeholder: "__/__/____" });
        me.createFormDetail('#dialog_addcolum', 500, 350);
        $('#btn_addcolum').off('click').click(function () {
            me.addColum();
        });
    }


    setApiUrl() {
        this.getApiUrl = 'https://localhost:44363/api/RefDecrements';
    }

    /**
     * Hàm xử lý sự kiện thay đổi selection
     * CretedBY: DVVUONG(26/02/2021)
     * */
    changeValueSelection() {

    }

    addColum() {
        let me = this;
        me.formMode = "Add";
        if (me.popup) {
            me.popup.show();
        }
    }

    show(data) {
        let me = this;
        if (data) {
            me.bindingData(data);
            me.refDecrementForm.dialog('open');
        }
        me.refDecrementForm.dialog('open');
    }

    bindingData(data) {
        let me = this;
        me.form.find("[fieldName]").each(function () {
            var propertyName = $(this).attr('fieldName');
            var propertyValue = data[0][propertyName];

            if ($(this).attr('dataType') == 'date') {
                propertyValue = formatDate(propertyValue, "DD-MM-YYYY");
            }
            else if ($(this).attr('dataType') == "Money") {
                var money = formatMoney(propertyValue);
                propertyValue = money;
            }

            this.value = propertyValue;

            if (propertyName == "RefDetail" && propertyValue != null) {
                propertyValue = JSON.parse(propertyValue);
                let gridDetail = new BaseGrid('#refDecrement-sub-grid', 'FixedAsset');
                gridDetail.loadData(propertyValue);
            }
        });
    }

    createFormDetail(formID, width, height) {
        var me = this;
        me.popup = new FormAdd(formID, width, height, me);
    }


    closeForm() {
        let me = this;
        me.resetForm();
        me.refDecrementForm.dialog('close');
    }

}