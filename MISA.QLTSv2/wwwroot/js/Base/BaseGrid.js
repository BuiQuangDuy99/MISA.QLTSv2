class BaseGrid extends Grid {
    constructor(gridId, entity) {
        super(gridId, entity);

        this.formDetail = null;
        this.formMode = null;
        this.listData = [];
        this.url = null;
        this.setUrl();
    }

    setUrl() {

    }

    /**
     * Hàm sự kiện cho tác vụ thêm sửa xóa trong grid
     * CreatedBy: BQDUY(25/02/2021)
     * */
    initEvents() {
        super.initEvents();
        var me = this,
            $toolbar = $(`${me.grid.data("toolbar")}`);

        //find tất cả data-command cho từng button
        //Gán sự kiện chung cho từng button
        //Tạo hàm để override
        $toolbar.find("[CommandName]").off('click');
        $toolbar.find("[CommandName]").on('click', function () {
            let commandName = $(this).attr("CommandName");
            switch (commandName) {
                case "Add":
                    me.add();
                    break;
                case "Edit":
                    me.edit();
                    break;
                case "Delete":
                    me.confirmDelete();
                    break;
                case "Save":
                    me.save();
                    break;
                case "Refresh":
                    break;
                default:
                    break;
            }
        });

        $('.close, #btn-no-warring,#btn-ok-warring').off('click').click(closeWarring);
        $('#btn-yes-warring').off('click').click(function () {
            me.delete()
        });
    }

    //Hàm thực hiện data-command
    /**
     * Hàm xử lý sự kiện khi ấn button Thêm mới
     * CreatedBY: BQDUY(02/03/2021)
     * */
    add() {
        let me = this;
        me.formMode = "Add";
        if (me.formDetail) {
            me.formDetail.show();
        }
    }

    /**
     * Lấy ra câu thông báo khi nhấn nút Xóa
     * Author: Nguyen Dang Tung(3/2/2021)
     * */
    confirmDelete() {
        var msg = "Bạn có chắc chắn muốn xóa không?";
        showAlertConfirm(msg);
    }

    /**
     * Hàm thực hiện xóa một hàng trong bảng
     * CreatedBY: BQDUY(26/02/2021)
     * */
    delete() {
        closeWarring();
        $('.loading').show();
        let me = this;
        let selectedRow = me.grid.find(".selected-row");
        //if (selectedRow.length>0) {
        //    data = data.filter(item => item["FixedAssetCategoryId"] !== selectedRow.data("recordId"));
        //    me.grid.find("tbody").empty();
        //    me.loadData(data);
        //} else {
        //    alert("Vui lòng chọn bản ghi để xóa!");
        //}
        var url = me.url;
        $.ajax({
            url: url + "/" + selectedRow.data("recordId"),
            method: "DELETE",
            async: true
        }).done(function (res) {
            closeWarring();
            if (res > 0) {
                me.loadAjaxData(url);
            }
            $('.loading').hide();
        }).fail(function (res) {
            alert("ko xóa được");
            closeWarring();
            $('.loading').hide();
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
    loadAjaxData(url) {

        var me = this;

        $.ajax({
            url: url,
            method: "GET",
            async: false
        }).done(function (res) {
            if (res) {
                me.loadData(res.Data);
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
