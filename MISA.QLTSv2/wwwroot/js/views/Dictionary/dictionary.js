$(document).ready(function () {
    new Dictionary('#gridTest');
    $("#add-demo").click(function () {
        formDetail.showForm();
    });
})
var formDetail = new dictionaryForm("#dialog_dictionary");
class Dictionary extends Grid {
    constructor(gridId) {
        super(gridId);
    }

    setConFigColum() {
        // Biến config cho từng column trong bảng
        var conFigColum = [
            {
                DataType: "number",
                FieldName: "STT",
                FieldText: "STT",
                Index: 1
            },
            {
                DataType: "text",
                FieldName: "AssetTypeCode",
                FieldText: "Mã Loại Tài Sản",
                Index: 2
            },
            {
                DataType: "text",
                FieldName: "AssetTypeName",
                FieldText: "Tên Loại Tài Sản",
                Index: 3
            },
            {
                DataType: "text",
                FieldName: "AssetClassName",
                FieldText: "Thuộc loại",
                Index: 4
            },
            {
                DataType: "text",
                FieldName: "AssetGroupName",
                FieldText: "Nhóm Tài Sản",
                Index: 5
            },
            {
                DataType: "percent",
                FieldName: "WearPercent",
                FieldText: "Tỷ Lệ Hao Mòn (%)",
                Index: 6
            },
            {
                DataType: "year",
                FieldName: "YearOfUse",
                FieldText: "Số Năm Sử Dụng",
                Index: 7
            },
            {
                DataType: "text",
                FieldName: "Note",
                FieldText: "Ghi Chú",
                Index: 8
            }
        ];
        this.conFigColum = conFigColum;
    }

    dbClickRow() {
        var id = $(this).data('recordId');
        console.log(id);
        formDetail.showForm();
        formDetail.bindingData();
    }
}