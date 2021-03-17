class ReftranferDetail extends BaseGrid {
    constructor(gridId, entity) {
        super(gridId, entity);
        this.createFormDetail("#dialog_addcolum", 500, 300);
    }
    createFormDetail(formID, width, height) {
        var me = this;
        this.formDetail = new FormAdd(formID, width, height, me);

    createFormDetail(formID, width, height) {
        var me = this;
        this.formDetail = new ReftranferDetail(formID, width, height, me);

    }

}