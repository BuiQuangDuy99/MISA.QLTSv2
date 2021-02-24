$(document).ready(function () {
    new Dictionary('#gridTest');
    //Sự kiện khi click vào nút thêm mới
    $("#add-demo").click(function () {
        formDetail.showForm();
    });

    showTooltipElement($('button'));
})
var formDetail = new dictionaryForm("#dialog_dictionary");
class Dictionary extends Grid {
    constructor(gridId) {
        super(gridId, "dictionary");
    }
    /**
     * Hàm cấu hình các cột cho bảng ở màn dictionary
     * CreatedBY: BQDUY(23/02/2021)
     * */
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
    /**
     * Hàm sự kiện xảy ra khi double click vào 1 hàng trong bảng 
     * CreatedBY: BQDUY(23/02/2021)
     * */
    dbClickRow() {
        var id = $(this).data('recordId');
        console.log(id);
        
        $.getJSON("/js/data.json", function (data) {
            $.each(data, function (index, obj) {
                console.log("dang doc json");
                if (id == obj['Id']) {
                    formDetail.bindingData(obj);
                }
            })
        })
        formDetail.showForm();    
    }
    
}