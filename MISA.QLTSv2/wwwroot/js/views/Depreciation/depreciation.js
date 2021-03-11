class depreciation extends BaseGrid {
    constructor(gridId) {
        super(gridId);
        this.initEvents();
    }
    initEvents() {
        let me = this,
            count = 0;
        super.initEvents();
        showTooltipElement($('button'));
        showTooltipElement($('td'));
        $('.content ').on('click','.btn-remove ,#btn-delete',function () {
            $("#depreciation-grid tbody tr").each(function () {
                if ($(this).hasClass("selected-row")) {
                    count++;
                }
            })
            if (count == 0) {
                showAlertWarring("Vui lòng chọn chứng từ cần xóa!")
            }
            else {
                showAlertConfirm("Bạn có chắc chắn muốn xóa không?")
            }
        });
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
