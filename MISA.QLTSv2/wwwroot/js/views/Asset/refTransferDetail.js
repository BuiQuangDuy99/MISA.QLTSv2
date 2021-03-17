class ReftranferDetail extends BaseGrid {
    constructor(gridId, entity) {
        super(gridId, entity);
        this.initEvents();
    }

    initEvents() {
        this.grid.find('tbody').off('click', 'tr');
        this.grid.find('tbody').on('click', 'tr', this.gridRowOnClick);
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
            $(this).siblings().removeClass('selected-row');
        }
    }
}
