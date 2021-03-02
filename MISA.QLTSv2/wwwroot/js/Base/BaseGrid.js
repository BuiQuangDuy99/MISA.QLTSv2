class BaseGrid extends Grid {
    constructor(gridId, toolbarId) {
        super(gridId);

        this.formDetail = null;
        this.formMode = null;
        this.listData = [];
    }

    /**
     * Hàm sự kiện cho tác vụ thêm sửa xóa trong grid
     * CreatedBy: BQDUY(25/02/2021)
     * */
    initEvents() {
        var me = this,
            $toolbar = $(`${me.grid.data("toolbar")}`);
        super.initEvents();

        //find taats ca data-command cho từng button
        //Gán sự kiện chung cho từng button
        //Tạo hàm để override

        $toolbar.find('#btn-add-dictionary').click(function () {
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
        $toolbar.find('#btn-add-department').click(function () {
            me.formMode = "Add";
            if (me.formDetail) {
                me.formDetail.show();
            }
        })

        $('#btn-remove-dictionary').off('click').on('click', me.deleteRow.bind(me));
        $('#btn-remove-department').off('click').on('click', me.deleteRow.bind(me));
        $('#btn-change').click(function () {
            dbClickRow();
        })
    }

    //Hàm thực hiện data-command

    /**
     * Hàm thực hiện xóa một hàng trong bảng
     * CreatedBY: BQDUY(26/02/2021)
     * */
    deleteRow() {
        let me = this;
        var data = me.getAllRecord();
        let selectedRow = $("#gridDepartment tbody").find(".selected-row");
        if (selectedRow.length>0) {
            data = data.filter(item => item["Id"] !== selectedRow.data("recordId"));
            $("#gridDepartment tbody").empty();
            me.loadData(data);
        } else {
            alert("Vui lòng chọn bản ghi để xóa!");
        }
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
    loadAjaxData(url) {
        var me = this;

        $.ajax({
            url: url,
            method: "GET"
        }).done(function (res) {
            if (res) {
                me.loadData(res);
            }
        }).fail(function (res) {

        })
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
        this.listData = data;
    }
}
