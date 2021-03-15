class depreciation extends BaseGrid {
    constructor(gridId, entity) {
        super(gridId, entity);
        this.initEvents();
    }

    initEvents() {
        let me = this,
            count = 0;
        super.initEvents();
        showTooltipElement($('button'));
        showTooltipElement($('td'));
        
    }
    /**
     * set url để lên baseGrid có thể ghép url với id để thực thi ajax
     * CreatedBY: BQDUY(11/03/2021)
     * */
    setUrl() {
        this.url = 'https://localhost:44363/api/v1/RefDepreciations';
    }

    /**
     * Hàm khởi tạo form của màn loại tài sản
     * @param {any} formID id của form
     * @param {any} width chiều ngang
     * @param {any} height chiều cao
     * CreatedBY: BQDUY(11/03/2021)
     */
    createFormDetail(formID, width, height) {
        var me = this;
        this.formDetail = new depreciationForm(formID, width, height, me);
    }

    /**
     * Hàm xử lý tìm kiếm
     * CreatedBY: BQDUY(15/03/2021)
     * */
    filterData() {
        var me = this,
            value = $('#txtsearch').val();

        me.listData = me.cacheData.filter(function (item) {
            return item["RefNo"].includes(value);
        });
    }
}

var depreciationGrid = new depreciation('#depreciation-grid-api', 'RefDepreciation');

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
        DataType: "Money",
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
//khởi tạo form ghi tăng tài sản
depreciationGrid.createFormDetail("#dialog_depreciation_use_API", 800, 600);

// THiết lập config header
depreciationGrid.setConFigColum(conFigColum);

//Load dữ liệu grid
depreciationGrid.loadAjaxData('https://localhost:44363/api/v1/RefDepreciations');

