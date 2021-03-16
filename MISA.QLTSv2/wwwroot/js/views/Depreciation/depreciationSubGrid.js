
class depreciationSubGrid extends BaseGrid {
    constructor(gridId, entity) {
        super(gridId, entity);
        this.createFormDetail("#DialogSubGridDetail", 500, 375);
    }

    createFormDetail(formID, width, height) {
        var me = this;
        this.formDetail = new depreciationSubGridForm(formID, width, height, me);

    }

}

