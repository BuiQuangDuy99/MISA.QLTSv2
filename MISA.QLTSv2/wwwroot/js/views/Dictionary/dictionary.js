$(document).ready(function () {
    //Sự kiện khi click vào nút thêm mới
    $("#add-demo").click(function () {
        formDetail.showForm();
    });
    $('#cbx-test').combobox();
    
    
})


//var formDetail = new dictionaryForm("#dialog_dictionary");
//Khởi tạo bảng và form màn loại tài sản
class Dictionary extends BaseGrid {

    constructor(gridId) {
        super(gridId);
    }

    initEvents() {
        super.initEvents();
        showTooltipElement($('button'));
    }

    /**
     * Hàm sự kiện xảy ra khi double click vào 1 hàng trong bảng 
     * CreatedBY: BQDUY(23/02/2021)
     * */
    dbClickRow() {
        var id = $(this).data('recordId');
        console.log(id);
        
        //$.getJSON("/js/data.json", function (data) {
        //    $.each(data, function (index, obj) {
        //        console.log("dang doc json");
        //        if (id == obj['Id']) {
        //            formDetail.bindingData(obj);
        //        }
        //    })
        //})
        //formDetail.showForm();    
    }
    
}

var dictionaryGrid = new Dictionary('#gridTest');

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

// THiết lập config header
dictionaryGrid.setConFigColum(conFigColum);

dictionaryGrid.initFormDetail("#idForm");

// Load dữ liệu grid
dictionaryGrid.loadData(dictionary);