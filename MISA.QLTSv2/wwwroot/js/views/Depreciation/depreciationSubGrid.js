
class depreciationSubGrid extends BaseGrid {
    constructor(gridId, entity) {
        super(gridId, entity);
        //this.formDetail = new depreciationSubGridForm("#DialogSubGridDetail", 500, 375, this);
        //this.createFormDetail("#DialogSubGridDetail", 500, 375);
    }

    createFormDetail(formID, width, height) {
        var me = this;
        me.formDetail = new depreciationSubGridForm(formID, width, height, me);
    }

    dbClickRow() {
        var data = this.getDataSelected();
        console.log(data);
        this.formDetail.show(data);
        this.formMode = "edit";
    }

}

