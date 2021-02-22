$(document).ready(function () {
    new assetIncreased();
})

class assetIncreased extends Grid {
    constructor() {
        super('#asset-grid');
    }
    setConFigColum() {
        this.conFigColum = [
            {
                DataType: "number",
                Field: "STT",
                FieldText: "STT",
                Index: 1
            },
            {
                DataType: "datetime",
                Field: "DateTime",
                FieldText: "Ngày ghi tăng",
                Index: 2
            },
            {
                DataType: "text",
                Field: "AssetCode",
                FieldText: "Mã tài sản",
                Index: 3
            },
            {
                DataType: "text",
                Field: "AssetName",
                FieldText: "Tên tài sản",
                Index: 4
            },
            {
                DataType: "text",
                Field: "AssetGroupName",
                FieldText: "Loại tài sản",
                Index: 5
            },
            {
                DataType: "text",
                Field: "Department",
                FieldText: "Phòng ban",
                Index: 6
            },
            {
                DataType: "money",
                Field: "Price",
                FieldText: "Nguyên giá",
                Index: 7
            },
            {
                DataType: "function",
                Field: "Function",
                FieldText: "Chức năng",
                Index: 8
            }
        ];
    }
    
}