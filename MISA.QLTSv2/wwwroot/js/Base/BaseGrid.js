class BaseGrid extends Grid {
    constructor(gridId, toolbarId) {
        super(gridId);
        this.formDetail = null;
        this.formMode = null;
    }

    /**
     * Hàm sự kiện cho tác vụ thêm sửa xóa trong grid
     * CreatedBy: BQDUY(25/02/2021)
     * */
    initEvents() {
        var me = this;
        super.initEvents();

        $('#btn-add-dictionary').click(function () {
            me.formMode = "Add";
            if (me.formDetail) {
                me.formDetail.show();
            }
        })
        $('#btn-add-assetincreased').click(function () {
            me.formMode = "Add";
            if (me.formDetail) {
                me.formDetail.show();
            }
        })
        $('#btn-change').click(function () {
            dbClickRow();
        })
    }

    /**
     * Hàm xử lý sự kiện khi double click vào một hàng trong grid
     * CreatedBy: BQDUY(25/02/2021)
     * */
    dbClickRow() {
        var data = this.getDataSelected();
        console.log(data);
        this.formDetail.show(data);
        this.formMode = "edit";
    }

    /**
     * Hàm lấy dữ liệu từ server và render vào grid(tạm thời dùng biến fake data)
     * CreatedBy: BQDUY(25/02/2021)
     * */
    loadAjaxData() {
        var me = this;
        if (data) {
            me.loadData(data);
        }
    }

    /**
     * Hàm cấu hình cột cho grid
     * @param {any} configColumn biến cấu hình của thead
     * CreatedBy: BQDUY(25/02/2021)
     */
    setConFigColum(configColumn) {
        super.setConFigColum(configColumn);
    }

    /**
     * Hàm đổ data vào grid
     * @param {any} data dữ liệu nhận được từ việc call ajax đến server
     * CreatedBY: BQDUY(25/02/2021)
     */
    loadData(data) {
        super.loadData(data);
    }
}
