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
        this.subGrid = new ReftranferDetail("#reftransfer-sub-grid","FixedAsset");
        this.initEventpopup();
        showTooltipElement($('.reftransfer-sub-grid th'));
    }

    initEventpopup() {
        var me = this;
        super.initEvent();
        $('#TestDate').datepicker({ dateFormat: "dd/mm/yy" }).inputmask("99/99/9999", { placeholder: "__/__/____" });
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
        if (me.subGrid) {
            me.subGrid.formDetail.show();
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
                let gridDetail = new BaseGrid('#reftransfer-sub-grid', 'FixedAsset');

                gridDetail.loadData(propertyValue);
            }
        });
    }


    closeForm() {
        let me = this;
        me.resetForm();
        var refTransferGrid = new refTransfer('#reftransfer-grid', "RefTransfer");
        refTransferGrid.createFormDetail("#dialog_reftransfer", 800, 600);
        me.reftransferForm.dialog('close');
    }

}

