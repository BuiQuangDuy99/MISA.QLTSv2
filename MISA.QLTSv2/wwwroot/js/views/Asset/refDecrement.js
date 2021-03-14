$(document).ready(function () {

})


class refDecrement extends BaseGrid {

    constructor(gridId, entity) {
        super(gridId, entity);
        this.initEvents();
    }

    initEvents() {
        let me = this;
        super.initEvents();
        showTooltipElement($('button'));
        showTooltipElement($('td'));
    }

    setUrl() {
        this.url = 'https://localhost:44363/api/refdecrements';
    }

    createFormDetail(formID, width, height) {
        var me = this;
        this.formDetail = new refDecrementForm(formID, width, height, me);
    }
}

var refDecrementGrid = new refDecrement('#refdecrement-grid', "RefDecrement");

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
        FieldText: "Ngày ghi giảm",
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
        FieldText: "Lý do ghi giảm",
        Index: 4
    },
    {
        DataType: "money",
        FieldName: "CostRemainder",
        FieldText: "Giá trị còn lại",
        Index: 5
    },
    {
        DataType: "function",
        FieldName: "Function",
        FieldText: "Chức năng",
        Index: 5
    }
];

//khởi tạo form ghi tăng tài sản
refDecrementGrid.createFormDetail("#dialog_refdecrement", 800, 600);

// THiết lập config header
refDecrementGrid.setConFigColum(conFigColum);

// Load dữ liệu grid
refDecrementGrid.loadAjaxData('https://localhost:44363/api/refdecrements');
