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

    /**
     * 
     * @param {any} target
     */
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

    /**
     * Hàm xử lý form confirm
     * createdBy:NVTUYEN(15/03/2021)
     * */

    showFormConfirm() {
        var msg = "Bạn có chắc chắn muốn xóa không?";

        showAlertConfirm(msg);
    }

    /**
    * Hàm xử lý form cảnh báo người dùng
    * createdBy:NVTUYEN(15/03/2021)
    * */

    showFormWarning() {
        var msg = "Bạn cần chọn chứng từ để xóa!!!";

        showAlertWarring(msg);
    }
}

//khởi tạo form delete
var formDelete = new FormDelete();