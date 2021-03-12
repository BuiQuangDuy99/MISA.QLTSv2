class FormDelete {
    constructor() {
        var me = this;

        me.target = null;

        // Khởi tạo sự kiện
        me.initEvents();
    }

    initEvents() {
        var me = this;

        // Đóng form cảnh báo
        $('.close, #btn-no-warring,#btn-ok-warring').off('click').click(closeWarring);

        // Đồng ý xóa
        $('#btn-yes-warring').off('click').click(function () {
            me.target.delete();
        });
    }

    excute(target) {
        var me = this;

        me.target = target;

        let selectedRow = target.getListId();

        if (selectedRow.length > 0) {
            me.showFormConfirm();
        } else {
            me.showFormWarning();
        }
    }

    showFormConfirm() {
        var msg = "Bạn có chắc chắn muốn xóa không?";

        showAlertConfirm(msg);
    }

    showFormWarning() {
        var msg = "Không được xóa...?";

        showAlertWarring(msg);
    }
}


var formDelete = new FormDelete();