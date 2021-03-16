
class FormAdd extends baseForm {
    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);

        this.FormAdd = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        })
        $('#txtreftranfer').autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    url: "https://localhost:44363/api/FixedAsset",
                    dataType: "json",
                    data: {
                        q: request.term
                    },
                    success: function (data) {
                        response(data);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtreftranfer").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $("#txtreftranfer").val(ui.item.name);
                $("#project-id").val(ui.item.email);

                return false;
            }
        })
            .data("ui-autocomplete")._renderItem = function (ul, item) {
                return $("<li>")
                    .data("ui-autocomplete-item", item)
                    .append("<a> " + item.name + "<br>" + item.email + "</a>")
                    .appendTo(ul);
            };
    }

    show(data) {
        let me = this;
        if (data) {
            me.bindingData(data);
            me.FormAdd.dialog('open');
        }
        me.FormAdd.dialog('open');
    }


    /**
     * Hàm xử lý khi form đóng
     * CreatedBY: NVTUYEN(15/03/2021)
     * */
    closeForm() {
        let me = this;
        me.resetForm();
        me.FormAdd.dialog('close');
    }
    /**
     * Hàm sử lý khi thực hiện lưu
     * @param {any} data
     * CreatedBy:NVTUYEN(15/03/2021)
     */

    saveChangeData(data) {
        let me = this,
            jsCaller = me.jsCaller;
        jsCaller.loadData(data);
        me.closeForm();
    }
}