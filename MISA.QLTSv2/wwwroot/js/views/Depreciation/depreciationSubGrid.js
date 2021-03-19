
class depreciationSubGrid extends BaseGrid {
    constructor(gridId, entity) {
        super(gridId, entity);
        this.initEvents();
    }

    initEvents() {
        var me = this;

        this.grid.find('tbody').off('click', 'tr').on('click', 'tr', this.gridRowOnClick);

        this.grid.find('tbody').on('click', '.btn-delete', function (event) {
            event.stopPropagation();
            console.log("chạy vào sự kiện xóa");
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

                console.log($(this).data('recordId'));
            }
        } else {
            $(this).addClass('selected-row');
            console.log($(this).data('recordId'));
            console.log("b");
            $(this).siblings().removeClass('selected-row');
        }
    }

    createFormDetail(formID, width, height) {
        var me = this;
        me.formDetail = new depreciationSubGridForm(formID, width, height, me);
    }

    dbClickRow() {
        var data = this.subGrid.getDataSelected();
        this.formSubDetail.show(data);
        this.formMode = "edit";
    }

    deleteRow() {
        let me = this,
            listDataGrid = me.listSubGrid,
            selectedRow = me.grid.find(".selected-row");
        console.log("chạy vào hàm xóa");
        listDataGrid = listDataGrid.filter(item => item["FixedAssetId"] !== selectedRow.data("recordId"));
        me.listSubGrid = listDataGrid;
        me.loadData(me.listSubGrid);
    }
}

