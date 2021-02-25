$(document).ready(function () {
    $('#cbxdepartment').combobox();
    $('#cbxasset').combobox();
})

class assetIncreased extends BaseGrid {
    constructor(gridId) {
        super(gridId);
        this.initEvents();
    }
    initEvents() {
        let me = this;
        super.initEvents();
        showTooltipElement($('button'));
        showTooltipElement($('td'));
        $('#btn-add-assetincreased').click(function () {
            me.formDetail.show();
        })
    }
    createFormDetail(formID, width, height) {
        this.formDetail = new assetIncreasedForm(formID, width, height);
    }
}


var assetIncreasedGrid = new assetIncreased('#asset-grid');

// Biến config cho từng column trong bảng

var conFigColum = [
    {
        DataType: "number",
        FieldName: "STT",
        FieldText: "STT",
        Index: 1 
    },
    {
        DataType: "datetime",
        FieldName: "DateTime",
        FieldText: "Ngày ghi tăng",
        Index: 2
    },
    {
        DataType: "text",
        FieldName: "AssetCode",
        FieldText: "Mã tài sản",
        Index: 3
    },
    {
        DataType: "text",
        FieldName: "AssetName",
        FieldText: "Tên tài sản",
        Index: 4
    },
    {
        DataType: "text",
        FieldName: "AssetGroupName",
        FieldText: "Loại tài sản",
        Index: 5
    },
    {
        DataType: "text",
        FieldName: "Department",
        FieldText: "Phòng ban",
        Index: 6
    },
    {
        DataType: "money",
        FieldName: "Price",
        FieldText: "Nguyên giá",
        Index: 7
    },
    {
        DataType: "function",
        FieldName: "Function",
        FieldText: "Chức năng",
        Index: 8
    }
];
//khởi tạo form ghi tăng tài sản
assetIncreasedGrid.createFormDetail("#dialog_asset", 700, 525);

// THiết lập config header
assetIncreasedGrid.setConFigColum(conFigColum);

// Load dữ liệu grid
assetIncreasedGrid.loadData(asset);

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
