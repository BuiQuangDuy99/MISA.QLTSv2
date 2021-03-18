
class ReftranferDetail extends BaseGrid {
    constructor(gridId, entity) {
        super(gridId, entity);
        this.initEvents();
    }

    initEvents() {
        var me = this;

        this.grid.find('tbody').off('click', 'tr').on('click', 'tr', this.gridRowOnClick);

        this.grid.find('tbody').on('click','.btn-delete', function (event) {
            event.stopPropagation();
            console.log("a");
            me.deleteRow();
        })
    }

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

    dbClickRow() {
        var data = this.subGrid.getDataSelected();

        this.formSubDetail.show(data);
        this.formMode = "edit";
    }

    deleteRow() {
        var me = this;
        debugger
    }

}
