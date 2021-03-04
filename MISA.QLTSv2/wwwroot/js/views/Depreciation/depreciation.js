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
    }
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
        FieldName: "DateTime",
        FieldText: "Ngày tính hao mòn",
        Index: 2
    },
    {
        DataType: "text",
        FieldName: "depreciation_no",
        FieldText: "Số chứng từ",
        Index: 3
    },
    {
        DataType: "text",
        FieldName: "Explain",
        FieldText: "Diễn giải",
        Index: 4
    },
    {
        DataType: "money",
        FieldName: "Price",
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
depreciationGrid.createFormDetail("#dialog_depreciation", 800, 600);

// THiết lập config header
depreciationGrid.setConFigColum(conFigColum);

//Load dữ liệu grid
depreciationGrid.loadData(deprectation);

//bindingDataForInput() {
//    //this.on(this.input, {
//    //    select: function (event, ui) {
//    //        alert(ui.item.value);
//    //        ui.item.option.selected = true;
//    //        this._trigger("select", event, {
//    //            item: ui.item.option
//    //        });
//    //    }
//    //})
//}
