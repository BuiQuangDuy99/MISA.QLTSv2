﻿
//Khởi tạo bảng và form màn loại tài sản
class Dictionary extends BaseGrid {

    constructor(gridId, entity) {
        super(gridId, entity);
        this.initEvents();
    }

    initEvents() {
        let me = this;
        super.initEvents();
        showTooltipElement($('button'));
        showTooltipElement($('td'));
    }

    setUrl() {
        this.url = 'https://localhost:44363/api/v1/FixedAssetCategories';
    }

    /**
     * Hàm khởi tạo form của màn loại tài sản
     * @param {any} formID id của form
     * @param {any} width chiều ngang
     * @param {any} height chiều cao
     * CreatedBY: BQDUY(26/02/2021)
     */
    createFormDetail(formID, width, height) {
        var me = this;
        this.formDetail = new dictionaryForm(formID, width, height, me);
    }
}

var dictionaryGrid = new Dictionary('#gridTest', "FixedAssetCategory");

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
        FieldName: "FixedAssetCategoryCode",
        FieldText: "Mã Loại Tài Sản",
        Index: 2
    },
    {
        DataType: "text",
        FieldName: "FixedAssetCategoryName",
        FieldText: "Tên Loại Tài Sản",
        Index: 3
    },
    {
        DataType: "text",
        FieldName: "ParentName",
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
        FieldName: "DepreciationRate",
        FieldText: "Tỷ Lệ Hao Mòn (%)",
        Index: 6
    },
    {
        DataType: "year",
        FieldName: "LifeTime",
        FieldText: "Số Năm Sử Dụng",
        Index: 7
    },
    {
        DataType: "text",
        FieldName: "Description",
        FieldText: "Ghi Chú",
        Index: 8
    }
];

//Khởi tạo form loại tài sản:
dictionaryGrid.createFormDetail("#dialog_dictionary", 700, 500);

// THiết lập config header
dictionaryGrid.setConFigColum(conFigColum);

// Load dữ liệu grid
dictionaryGrid.loadAjaxData('https://localhost:44363/api/v1/FixedAssetCategories');

