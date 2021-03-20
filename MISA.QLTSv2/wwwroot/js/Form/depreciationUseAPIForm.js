// Class form chi tiết của bảng danh sách tính hao mòn
class depreciationForm extends baseForm {
    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);
        //Định nghĩa Dialog
        this.depreciationForm = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        });

        //Khởi tạo form chi tiết của bảng danh sách tài sản
        this.formSubDetail = new depreciationSubGridForm("#DialogSubGridDetail", 500, 375, this);
        // Khởi tạo bảng danh sách tài sản bên trong form chi tiết tính hao mòn
        this.subGrid = new depreciationSubGrid("#depreciation-sub-grid", "FixedAsset");
        // Khởi tạo sự kiện cho form
        this.initEventDepreciationForm();
        // Hàm show tooltip cho những chỗ viết tắt trên th
        showTooltipElement($('.depreciation-sub-grid th'));
    }

    /**
     * Hàm khởi tạo url để thực hiện ajax
     * CreatedBY: BQDUY(15/03/2021)
     * */
    setApiUrl() {
        this.getApiUrl = 'https://localhost:44363/api/v1/RefDepreciations';
    }

    /**
     * Hàm tạo sự kiện trên form Depreciation
     * CreatedBY: BQDUY(15/03/2021)
     * */
    initEventDepreciationForm() {
        var me = this;
        super.initEvent();
        // Sự kiện khi ấn thêm dòng
        $('.btn-add-row').off('click').click(function () {
            me.addRow();
        });

        // Sự kiện khi ấn xóa toàn bộ dòng
        $('.btn-delete-all-row').off('click').click(function () {
            me.deleteAllRow();
        });

        // Up case cho trường số chứng từ
        $('input[fieldName="RefNo"]').off('keyup').keyup(function () {
            this.value = this.value.toLocaleUpperCase();
        });
        // dùng regex để check định dạng nhập dd/mm/yyyy
        $('#TestDate').off('blur').on('blur', function () {
            let formatDate = /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/g;
            let checkDate = $(this).val();

            if (!formatDate.test(checkDate)) {
                $(this).addClass('border-red');
                $(this).attr('title', 'Cần nhập đúng định dạng ngày/tháng/năm!');
            } else {
                $(this).removeClass('border-red');
                $(this).removeAttr('title');
            }
        })

        // Sự kiện double click vào 1 row thì chuyển formMode thành dạng form Edit, và binding dữ liệu của row lên form
        this.form.find('tbody').off('dblclick', 'tr');
        this.form.find('tbody').on('dblclick', 'tr', me.subGrid.dbClickRow.bind(this));
    }

    /**
     * Hàm tạo một dòng khi nhấn click "Thêm dòng"
     * CreatedBY: BQDUY(15/03/2021)
     */
    addRow() {
        let me = this;

        me.formMode = "Add";
        if (me.formSubDetail) {
            me.formSubDetail.show();
        }
    }

    /**
     * Hàm xóa toàn bộ dòng
     * CreatedBy:BQDUY (19/03/2021)
     * */
    deleteAllRow() {
        let me = this;
        $('.depreciation-sub-grid tbody').empty();
        me.subGrid.listSubGrid = [];
    }

    /**
     * Hiện thị form khi có dữ liệu thì binding dữ liệu vào form không thì mở form trắng
     * @param {any} data dữ liệu được binding lên form\
     * CreatedBY: BQDUY(11/03/2021)
     */
    show(data) {
        let me = this;

        // Làm rỗng mảng data của subgrid để không bị lưu cache nhập từ trước
        if (me.subGrid) {
            me.subGrid.listSubGrid = [];
        }
        if (data) {
            me.bindingData(data);
            me.depreciationForm.dialog('open');
        }
        me.depreciationForm.dialog('open');
    }

    /**
     * binding dữ liệu từ hàng được chọn ở grid lên form
     * @param {any} data dữ liệu của row được selected
     * CreatedBY: BQDUY(11/03/2021)
     */
    bindingData(data) {
        let me = this;

        me.form.find("[fieldName]").each(function () {
            // Lấy fieldName của ô input để map với các trường của data
            var propertyName = $(this).attr('fieldName');
            // Lấy giá trị của các trường trong data
            var propertyValue = data[0][propertyName];
            
            if ($(this).attr('dataType') == 'date') {
                propertyValue = formatDate(propertyValue, "DD-MM-YYYY");
            }
            else if ($(this).attr('dataType') == "money") {
                var money = formatMoney(propertyValue);
                propertyValue = money;
            }

            this.value = propertyValue;

            // Nếu trường đấy cần bind ra bảng con, chuyển từ text sang JSON
            if (propertyName == "RefDetail") {
                propertyValue = JSON.parse(propertyValue);

                me.subGrid.loadData(propertyValue);
                me.subGrid.listSubGrid = propertyValue;
            }
        });
    }

    /**
     * Hàm xử lý khi form đóng
     * CreatedBY: BQDUY(15/03/2021)
     * */
    closeForm() {
        let me = this;

        me.resetForm();
        me.depreciationForm.dialog('close');
    }
}
