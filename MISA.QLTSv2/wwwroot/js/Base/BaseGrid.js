// Lớp base chung cho các grid
class BaseGrid extends Grid {
    constructor(gridId, entity) {
        super(gridId, entity);

        // Lưu lại dữ liệu liệu của bảng để khi có thay đổi data
        this.cacheData = [];
        // Trạng thái form chi tiết của grid
        this.formMode = null;
        // Danh sách dữ liệu dưới bảng
        this.listData = [];
        // Url request dữ liệu cần đổ vào bảng
        this.url = null;
        // Truyền tham số vào url
        this.setUrl();
    }

    /**
     * Hàm set url
     * CreatedBY: BQDUY(25/2/2021)
     * */
    setUrl() {

    }

    /**
     * Hàm sự kiện cho tác vụ thêm sửa xóa trong grid
     * CreatedBy: BQDUY(25/02/2021)
     * */
    initEvents() {
        super.initEvents();
        var me = this,
            $toolbar = $(`${me.grid.data("toolbar")}`); // Là phần các button sự kiện dùng chung có trong các màn

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
                    me.refresh();
                    break;
                default:
                    break;
            }
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
     * Hàm xử lý khi ấn nút Refresh
     * CreatedBY: BQDUY(02/03/2021)
     * */
    refresh() {
        let me = this;
        $(me.grid).find('tbody').empty();
        me.loadAjaxData(me.url);
    }

    /**
     * Lấy ra câu thông báo khi nhấn nút Xóa
     * Author: Nguyen Dang Tung(3/2/2021)
     * */
    confirmDelete() {
        if (formDelete) {
            formDelete.excute(this);
        }
    }

    /**
     * Hàm thực hiện xóa một hàng trong bảng
     * CreatedBY: BQDUY(26/02/2021)
     * */
    delete() {
        let me = this;

        $('.loading').show();

        let selectedRow = me.getListId();
        
        var url = me.url;
        $.ajax({
            url: url,
            method: "DELETE",
            data: JSON.stringify(selectedRow),
            contentType: 'application/json',
            async: true
        }).done(function (res) {
            closeWarring();
            showMessengerSuccess("Xóa thành công!");
            if (res.Data > 0) {
                me.loadAjaxData(url);
            }
            $('.loading').hide();
        }).fail(function (res) {
            closeWarring();
            $('.loading').hide();
        })
    }

    /**
     * Hàm xử lý sự kiện khi double click vào một hàng trong grid
     * CreatedBy: BQDUY(25/02/2021)
     * */
    dbClickRow() {
        var me = this,
            data = this.getDataSelected();

        console.log(data);
        if (me.formDetail) {
            me.formDetail.show(data);
        }
        
        this.formMode = "edit";
    }

    /**
     * Hàm lấy dữ liệu từ server và render vào grid
     * CreatedBy: BQDUY(25/02/2021)
     * */
    loadAjaxData(url) {
        var me = this;
        $('.loading').show();
        callAjax(url, "GET", null, function (res) {
            if (res.Data) {
                me.loadData(res.Data);
            }
            $('.loading').hide();
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
        if (data) {
            this.listData = data;
            this.cacheData = data;
        }

        this.filterData();
        super.loadData(this.listData);
        
    }

    /**
     * Xử lý sự kiện tìm kiếm
     * CreatedBY: BQDUY(02/03/2021)
     * */
    filterData() {
    }
}
