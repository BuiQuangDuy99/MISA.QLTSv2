
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
        
        $('#txtSearchAsset').keyup(function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                me.loadData();
            }
        });

        // Sự kiện xóa trong cột chức năng
        me.grid.find('tbody').on('click', '#btn-delete', function (event) {
            event.stopPropagation();

            $(this).parents('tr').addClass('selected-row');
            if (formDelete) {
                formDelete.excute(me);
            }
        })

        // Sự kiện cho nút sửa trong cột chức năng
        this.grid.find('tbody').on('click', '#btn-change', function (event) {
            event.stopPropagation();

            $(me.grid).find('tbody tr').siblings().removeClass('selected-row');
            $(this).parents('tr').addClass('selected-row');
            me.dbClickRow();
        })
    }

    setUrl() {
        this.url = 'https://localhost:44363/api/FixedAsset';
    }

    createFormDetail(formID, width, height) {
        var me = this;
        this.formDetail = new assetIncreasedForm(formID, width, height, me);
    }

    loadData(data) {
        super.loadData(data);
        let assetNo = 0,
            amountTotal = 0;

        if (this.listData != null) {
            $.each(this.listData, function (index, obj) {
                assetNo = index + 1;
                amountTotal += obj["Cost"];
            });
            $('#lbAssetNo').empty().append(assetNo);
            $('#lbAmountTotal').empty().append(formatMoney(amountTotal));
        } else {
            $('#lbAssetNo').empty().append(0);
            $('#lbAmountTotal').empty().append(0);
        }
    }

    filterData() {
        var me = this,
            value = $('#txtSearchAsset').val();

        me.listData = me.cacheData.filter(function (item) {
            //if (item["FixedAssetCode"].includes(value) || item["FixedAssetName"].includes(value)) {
            //    return item;
            //}
            return item["FixedAssetCode"].includes(value) || item["FixedAssetName"].includes(value);
        });
    }

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
