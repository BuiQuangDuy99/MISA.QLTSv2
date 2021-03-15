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
    }

    initEvent() {
        super.initEvent();
        $('#PostedDate').datepicker({ dateFormat: "dd/mm/yy" }).inputmask("99/99/9999", { placeholder: "__/__/____" });
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


    closeForm() {
        let me = this;
        me.resetForm();
        var refDecrementGrid = new refDecrement('#refdecrement-grid', "RefDecrement");
        refDecrementGrid.createFormDetail("#dialog_refdecrement", 800, 600);
        me.refDecrementForm.dialog('close');
    }

}