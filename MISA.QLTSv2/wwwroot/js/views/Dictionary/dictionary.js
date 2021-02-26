$(document).ready(function () {
    $('#cbx-test').combobox();
    var day = new Date("2020");
    console.log(day);
    var date = formatDate(day, 'DD/MM/YYYY');
    console.log(date);
})

//Khởi tạo bảng và form màn loại tài sản
class Dictionary extends BaseGrid {

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
        this.formDetail = new dictionaryForm(formID, width, height, me);
        this.formDetail.initLoadComboBox("AssetGroup", dictionary);
        //this.formDetail.initLoadComboBox("AssetClass", dictionary);
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

//Khởi tạo form loại tài sản:
dictionaryGrid.createFormDetail("#dialog_dictionary", 700, 500);

// THiết lập config header
dictionaryGrid.setConFigColum(conFigColum);

// Load dữ liệu grid
dictionaryGrid.loadData(dictionary);

