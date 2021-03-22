$(document).ready(function () {

})

//---------------------refTransferGrid-------------------------//

class refTransfer extends BaseGrid {

    constructor(gridId, entity) {
        super(gridId, entity);
        this.initEvents();
    }

    initEvents() {
        let me = this;
        super.initEvents();
        //show content khi hover vào
        showTooltipElement($('button'));
        showTooltipElement($('td'));

        //sự kiện cho input tìm kiếm

        $('#txtsearch').keyup(function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                me.loadData();
            }
        });

        //sự kiện cho nút xóa trong cột chức năng

        this.grid.find('tbody').on('click', '#btn-delete', function (event) {
            event.stopPropagation();
            $(this).parents('tr').addClass('selected-row');
            if (formDelete) {
                formDelete.excute(me);
            }
        })

        //sự kiện cho nút sửa trong cột chức năng

        this.grid.find('tbody').on('click', '#btn-change', function (event) {
            event.stopPropagation();
            $(me.grid).find('tbody tr').siblings().removeClass('selected-row');
            $(this).parents('tr').addClass('selected-row');
            me.dbClickRow();
        })

    }

    /**
     * Hàm set url
     * createdBy:NVTUYEN(15/03/2021)
     * */

    setUrl() {
        this.url = 'https://localhost:44363/api/RefTransfer';
    }

    /**
     * Hàm khởi tạo form detail
     * @param {any} formID
     * @param {any} width
     * @param {any} height
     * createdBy:NVTUYEN(15/03/2021)
     */

    createFormDetail(formID, width, height) {
        var me = this;
        this.formDetail = new reftransferForm(formID, width, height, me);
    }

    /**
     * Hàm xử lý khi lọc dữ liệu
     * createdBy:NVTUYEN(15/03/2021)
     * */

    filterData() {
        var me = this,
            value = $('#txtsearch').val();

        me.listData = me.cacheData.filter(function (item) {
            return item["RefNo"].includes(value);
        });
    }
    /**
     * Override lại hàm loadata để thực hiện tác vụ riêng
     * @param {any} data dữ liệu cần load
     * CreatedBy:NVTUYEN(15/03/2021)
     */
    loadData(data) {
        super.loadData(data);
        let refNoTotal = this.listData.length;
        $('#lbRefTransferNo').empty().append(refNoTotal);
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

//khởi tạo grid refTransfer
var refTransferGrid = new refTransfer('#reftransfer-grid', "RefTransfer");

//khởi tạo form ghi tăng tài sản
refTransferGrid.createFormDetail("#dialog_reftransfer", 800, 600);

// THiết lập config header
refTransferGrid.setConFigColum(conFigColum);

// Load dữ liệu grid
refTransferGrid.loadAjaxData('https://localhost:44363/api/RefTransfer');
