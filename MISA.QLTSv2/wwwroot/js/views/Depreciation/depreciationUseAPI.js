class depreciation extends BaseGrid {
    constructor(gridId, entity) {
        super(gridId, entity);
        this.initEvents();
    }

    initEvents() {
        let me = this;
        super.initEvents();

        showTooltipElement($('button'));
        showTooltipElement($('td'));

        // Khởi tạo sự kiện cho ô tìm kiếm
        $('#txtsearch').keyup(function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                me.loadData();
            }
        });

        // Sự kiện xóa trong cột chức năng
        me.grid.find('tbody').on('click', '#btn-delete', function (event) {
            event.stopPropagation();

            console.log('sự kiện xóa của gird, k phải base');

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
    /**
     * set url để lên baseGrid có thể ghép url với id để thực thi ajax
     * CreatedBY: BQDUY(11/03/2021)
     * */
    setUrl() {
        this.url = 'https://localhost:44363/api/v1/RefDepreciations';
    }

    /**
     * Hàm khởi tạo form của màn loại tài sản
     * @param {any} formID id của form
     * @param {any} width chiều ngang
     * @param {any} height chiều cao
     * CreatedBY: BQDUY(11/03/2021)
     */
    createFormDetail(formID, width, height) {
        let me = this;
        me.formDetail = new depreciationForm(formID, width, height, me);
    }

    /**
     * Hàm xử lý tìm kiếm
     * CreatedBY: BQDUY(15/03/2021)
     * */
    filterData() {
        let me = this,
            value = $('#txtsearch').val();

        // tìm trong cacheData xong có chứa kí tự mà mình tìm kiếm không
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
        FieldText: "Ngày tính hao mòn",
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
        FieldText: "Diễn giải",
        Index: 4
    },
    {
        DataType: "money",
        FieldName: "AmountTotal",
        FieldText: "Số tiền",
        Index: 5
    },
    {
        DataType: "function",
        FieldName: "Function",
        FieldText: "Chức năng",
        Index: 6
    }
];

var depreciationGrid = new depreciation('#depreciation-grid-api', 'RefDepreciation');

//khởi tạo form chi tiết chứng từ
depreciationGrid.createFormDetail("#dialog_depreciation_use_API", 800, 600);

// Thiết lập config header
depreciationGrid.setConFigColum(conFigColum);

//Load dữ liệu grid
depreciationGrid.loadAjaxData('https://localhost:44363/api/v1/RefDepreciations');



