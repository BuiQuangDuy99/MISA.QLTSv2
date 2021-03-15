class reftransferForm extends baseForm {

    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);
        //Định nghĩa Dialog
        this.reftransferForm = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        });
        this.popup = null;
        this.initEventpopup();
    }

    initEventpopup() {
        var me = this;
        super.initEvent();
        $('#TestDate').datepicker({ dateFormat: "dd/mm/yy" }).inputmask("99/99/9999", { placeholder: "__/__/____" });
        me.createFormDetail('#dialog_addcolum', 500, 300);
        $('#btn_addcolum').off('click').click(function () {
            me.addColum();
        });
    }

    setApiUrl() {
        this.getApiUrl = 'https://localhost:44363/api/RefTransfer';
    }
    /**
     * Hàm xử lý sự kiện thay đổi selection
     * CretedBY: NVTUYEN(26/02/2021)
     * */
    changeValueSelection() {

    }

    addColum() {
        let me = this;
        me.formMode = "Add";
        if (me.popup) {
            debugger
            me.popup.show();
        }
    }

    show(data) {
        let me = this;
        if (data) {
            me.bindingData(data);
            me.reftransferForm.dialog('open');
        }
        me.reftransferForm.dialog('open');
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
                let gridDetail = new BaseGrid('#depreciation-sub-grid', 'FixedAsset');

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
        me.reftransferForm.dialog('close');
    }

}

