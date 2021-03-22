// class bảng con trong form của màn tính hao mòn tài sản
class depreciationSubGrid extends BaseGrid {
    constructor(gridId, entity) {
        super(gridId, entity);
        this.initEvents();
    }
    /**
     * Override lại hàm của base để thực hiện một số tính năng riêng
     * */
    initEvents() {
        var me = this;
        // Sự kiện chọn một row hoặc nhiều row
        this.grid.find('tbody').off('click', 'tr').on('click', 'tr', this.gridRowOnClick);
        // Sự kiện khi click vào nút delete trong cột chức năng
        this.grid.find('tbody').on('click', '.btn-delete', function (event) {
            event.stopPropagation();
            $(this).parents('tr').addClass('selected-row');
            me.deleteRow();
        })
    }

    /**
     * xử lý sự kiện click vào 1 row
     * @param {any} event
     * CreatedBY: BQDUY(19/03/2021)
     */
    gridRowOnClick(event) {
        if (event.ctrlKey) {
            if ($(this).hasClass('selected-row')) {
                $(this).removeClass('selected-row');
            } else {
                $(this).addClass('selected-row');
            }
        } else {
            $(this).addClass('selected-row');
            console.log($(this).data('recordId'));
            console.log("b");
            $(this).siblings().removeClass('selected-row');
        }
    }
    /**
     * Khởi tạo form chi tiết của bảng
     * @param {any} formID id của form
     * @param {any} width chiều rộng
     * @param {any} height chiều dài
     * CreatedBY: BQDUY(19/03/2021)
     */
    createFormDetail(formID, width, height) {
        var me = this;
        me.formDetail = new depreciationSubGridForm(formID, width, height, me);
    }
    /**
     * Hàm xử lý khi db click vào một row trong bảng
     * CreatedBY: BQDUY(19/03/2021)
     * */
    dbClickRow() {
        var data = this.subGrid.getDataSelected();
        this.formSubDetail.show(data);
        this.formMode = "edit";
    }
    /**
     * Hàm xử lý khi ấn nút xóa trong bảng
     * CreatedBY: BQDUY(19/03/2021)
     * */
    deleteRow() {
        let me = this,
            listDataGrid = me.listSubGrid,
            selectedRow = me.grid.find(".selected-row");

        listDataGrid = listDataGrid.filter(item => item["FixedAssetId"] !== selectedRow.data("recordId"));
        me.listSubGrid = listDataGrid; // lưu lại dữ liệu của bảng con
        me.loadData(me.listSubGrid);
    }
}

