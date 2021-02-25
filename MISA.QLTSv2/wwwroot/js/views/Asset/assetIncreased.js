$(document).ready(function () {
    new assetIncreased();
    $('')
})

class assetIncreased extends BaseGrid {
    constructor(gridId) {
        super('#asset-grid', "data");
        super(gridId);
        this.initEvents();
    }

    setConFigColum() {
        this.conFigColum = [
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
    }
    
}