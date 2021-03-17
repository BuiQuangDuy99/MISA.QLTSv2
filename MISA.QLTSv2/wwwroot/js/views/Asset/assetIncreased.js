$(document).ready(function () {
    $('#cbxdepartment').combobox({
        select: function (event, ui) {
            debugger
            $('#txtdepartment').val(ui.item);
        }
    });
    $('#cbxassetcategory').combobox({
        select: function (event, ui) {
            debugger
            $('#txtAssetGroupName').val(ui.item);

        }
    });

    //$('#dtIncrementDate').mask("00/00/0000", { placeholder: "___/___/______" }).datepicker();
})

class assetIncreased extends BaseGrid {
    constructor(gridId, entity) {
        super(gridId, entity);
        this.initEvents();
    }
    initEvents() {
        let me = this;
        super.initEvents();
        showTooltipElement($('button'));
        showTooltipElement($('td'));
        
        $('#txtsearch').keyup(function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                me.loadData();
            }
        });
    }

    setUrl() {
        this.url = 'https://localhost:44363/api/FixedAsset';
    }

    createFormDetail(formID, width, height) {
        var me = this;
        this.formDetail = new assetIncreasedForm(formID, width, height, me);
    }

    //filterData() {
    //    var me = this,
    //        value = $('#txtsearch').val();

    //    me.listData = me.cacheData.filter(function (item) {
    //        return item["FixedAssetCode"].includes(value);
    //    });
    //}

}


var assetIncreasedGrid = new assetIncreased('#asset-grid', "FixedAsset");

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
        FieldName: "IncrementDate",
        FieldText: "Ngày ghi tăng",
        Index: 2
    },
    {
        DataType: "text",
        FieldName: "FixedAssetCode",
        FieldText: "Mã tài sản",
        Index: 3
    },
    {
        DataType: "text",
        FieldName: "FixedAssetName",
        FieldText: "Tên tài sản",
        Index: 4
    },
    {
        DataType: "text",
        FieldName: "FixedAssetCategoryName",
        FieldText: "Loại tài sản",
        Index: 5
    },
    {
        DataType: "text",
        FieldName: "DepartmentName",
        FieldText: "Phòng ban",
        Index: 6
    },
    {
        DataType: "money",
        FieldName: "Cost",
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
var availableTags = [
    "ActionScript",
    "AppleScript",
    "Asp",
    "BASIC",
    "C",
    "C++",
    "Clojure",
    "COBOL",
    "ColdFusion",
    "Erlang",
    "Fortran",
    "Groovy",
    "Haskell",
    "Java",
    "JavaScript",
    "Lisp",
    "Perl",
    "PHP",
    "Python",
    "Ruby",
    "Scala",
    "Scheme"
];
//khởi tạo form ghi tăng tài sản
assetIncreasedGrid.createFormDetail("#dialog_asset", 700, 525);

// THiết lập config header
assetIncreasedGrid.setConFigColum(conFigColum);

// Load dữ liệu grid
assetIncreasedGrid.loadAjaxData('https://localhost:44363/api/FixedAsset');

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
