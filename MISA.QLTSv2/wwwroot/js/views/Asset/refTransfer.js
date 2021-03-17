$(document).ready(function () {

})


class refTransfer extends BaseGrid {

    constructor(gridId, entity) {
        super(gridId, entity);
        // this.initEvents();
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
        this.url = 'https://localhost:44363/api/RefTransfer';
    }

    createFormDetail(formID, width, height) {
        var me = this;
        this.formDetail = new reftransferForm(formID, width, height, me);
    }


    filterData() {
        var me = this,
            value = $('#txtsearch').val();

        me.listData = me.cacheData.filter(function (item) {
            return item["RefNo"].includes(value);
        });
    }
}

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
        FieldName: "PostedDate",
        FieldText: "Ngày điều chuyển",
        Index: 2
    },
    {
        DataType: "text",
        FieldName: "RefNo",
        FieldText: "Số chứng từ",
        Index: 3
    },
    {
        DataType: "text",
        FieldName: "JournalMemo",
        FieldText: "Lý do điều chuyển",
        Index: 4
    },
    {
        DataType: "function",
        FieldName: "Function",
        FieldText: "Chức năng",
        Index: 5
    }
];

var refTransferGrid = new refTransfer('#reftransfer-grid', "RefTransfer");

//khởi tạo form ghi tăng tài sản
refTransferGrid.createFormDetail("#dialog_reftransfer", 800, 600);

// THiết lập config header
refTransferGrid.setConFigColum(conFigColum);

// Load dữ liệu grid
refTransferGrid.loadAjaxData('https://localhost:44363/api/RefTransfer');
