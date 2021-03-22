// class form chi tiết của màn điều chuyển tài sản
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

        this.formSubDetail = new FormAdd("#dialog_addcolum", 500, 300, this);

        this.subGrid = new ReftranferDetail("#reftransfer-sub-grid", "FixedAsset");

        this.initEventpopup();
    }
    /**
     * Hàm khởi tạo sự kiện riêng cho form 
     * CreatedBy: NVTUYEN(15/03/2021) 
     * */
    initEventpopup() {
        var me = this;
        super.initEvent();
        // Thay đổi định dạng input cho datepicker
        $('#TestDate').datepicker({ dateFormat: "dd/mm/yy" }).inputmask("99/99/9999", { placeholder: "__/__/____" });
        // Sự kiện cho nút thêm mới row trong bảng con
        $('#btn_addcolum').off('click').click(function () {
            me.addColum();
        });
        // Sự kiện double click vào 1 row thì chuyển formMode thành dạng form Edit, và binding dữ liệu của row lên form
        this.form.find('tbody').off('dblclick', 'tr');
        // Sự kiện khi dbclick vào 1 row trong bảng con
        this.form.find('tbody').on('dblclick', 'tr', me.subGrid.dbClickRow.bind(this));
        // sự kiện khi kịch vào xóa nhiều 
        $('#btn-deleteAll').off('click').on('click', function () {
            me.deleteAll()
        })
        // Up case cho trường số chứng từ
        $('input[fieldName="RefNo"]').off('keyup').keyup(function () {
            this.value = this.value.toLocaleUpperCase();
        });
    }

    /**
     * Hàm sét url cho form
     * createdBy:NVTUYEN(15/03/2021)
     * */
    setApiUrl() {
        this.getApiUrl = 'https://localhost:44363/api/RefTransfer';
    }
    /**
     * Hàm xử lý sự kiện thay đổi selection
     * CretedBY: NVTUYEN(26/02/2021)
     * */
    changeValueSelection() {

    }

    /**
     * Hàm xử lý khi thực hiện nút thêm dòng
     * createdBy:NVTUYEN(15/03/2021)
     * */
    addColum() {
        let me = this;

        me.formMode = "Add";
        if (me.formSubDetail) {
            me.formSubDetail.show();
        }
    }

    /**
     * Hàm xủa lý khi thực hiện nút xóa hết dòng
     * createdBy:NVTUYEN(15/03/2021)
     * */
    deleteAll() {
        let me = this;

        me.subGrid.listSubGrid = [];
        me.subGrid.loadData(me.subGrid.listSubGrid);
    }

    /**
     * Hàm xử lý khi show form
     * @param {any} data
     * createdBy:NVTUYEN(15/03/2021)
     */
    show(data) {
        let me = this;
        if (me.subGrid) {
            me.subGrid.listSubGrid = [];
        }
        if (data) {
            me.bindingData(data);
            me.reftransferForm.dialog('open');
        }
        me.reftransferForm.dialog('open');
    }

    /**
     * Hàm xử lý thực hiện binding dữ liệu vào form
     * @param {any} data
     * createdBy:NVTUYEN(15/03/2021)
     */
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
                me.subGrid.loadData(propertyValue);
                me.subGrid.listSubGrid = propertyValue;
            }
        });
    }

    /**
     * Hàm xử lý khi thực hiện đóng form
     * createdBy:NVTUYEN(15/03/2021)
     * */
    closeForm() {
        let me = this;

        me.resetForm();
        me.reftransferForm.dialog('close');
    }

}

