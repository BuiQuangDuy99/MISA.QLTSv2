
class depreciation extends BaseGrid {
    constructor(gridId) {
        super(gridId);
        this.initEvents();
    }
    initEvents() {
        let me = this;
        super.initEvents();
        showTooltipElement($('button'));
        showTooltipElement($('td'));
        $('.content ').on('click', '.btn-remove ,#btn-delete', function () {
            if ($('#depreciation-grid tbody tr').hasClass("selected-row")) {
                showAlertConfirm("Bạn có chắc chắn muốn xóa không?")
            }
            else {
                showAlertWarring("Vui lòng chọn chứng từ cần xóa!")
            }
        });

        $('#depreciation-grid').off('click').on('click', '#btn-change', function () {
            alert(1);
        });

        $('#txtsearch').keypress(function (e) {
            if (e.which == 13) {
                me.loadData();
            }
        });

        
    }
    filterData() {
        var me = this,
            value = $('#txtsearch').val();
        me.listData = me.cacheData.filter(function (item) {
            return item["RefNo"].includes(value);
        });
    }

    /**
     * Khởi tạo form tính hao mòn
     * CreatedBy: NDTUNG(26/2/2021)
     * @param {any} formID
     * @param {any} width
     * @param {any} height
     */
    createFormDetail(formID, width, height) {
        var me = this;
        this.formDetail = new depreciationForm(formID, width, height, me);
    }
}


var depreciationGrid = new depreciation('#depreciation-grid');

// Biến config cho từng column trong bảng

var conFigColum = [
    {
        DataType: "STT",
        FieldName: "STT",
        FieldText: "STT",
        Index: 1
    },
    {
        DataType: "datetime",
        FieldName: "PostedDate",
        FieldText: "Ngày tính hao mòn",
        Index: 2
    },
    {
        DataType: "text",
        FieldName: "RefNo",
        FieldText: "Số chứng từ",
        Index: 3
    },
    {
        DataType: "text",
        FieldName: "JournalMemo",
        FieldText: "Diễn giải",
        Index: 4
    },
    {
        DataType: "money",
        FieldName: "AmountTotal",
        FieldText: "Số tiền",
        Index: 5
    },
    {
        DataType: "function",
        FieldName: "Function",
        FieldText: "Chức năng",
        Index: 6
    }
];

//khởi tạo form tính hao mòn
depreciationGrid.createFormDetail("#dialog_depreciation", 800, 600);

// THiết lập config header
depreciationGrid.setConFigColum(conFigColum);

//Load dữ liệu grid
depreciationGrid.loadData(deprectation);

