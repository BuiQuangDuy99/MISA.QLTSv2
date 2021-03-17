class ReftranferDetail extends BaseGrid {
    constructor(gridId, entity) {
        super(gridId, entity);
        this.initEvents();
    }

    createFormDetail(formID, width, height) {
        var me = this;
        this.formDetail = new ReftranferDetail(formID, width, height, me);

    }

}