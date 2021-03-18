
class FormAdd extends baseForm {
    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);

        this.FormAdd = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        })
        this.autocomplete();
    }

    autocomplete() {
        $.ajax({
            url: 'https://localhost:44363/api/FixedAsset',
            method: "GET"
        }).done(function (data) {
            var arr = [];
            $.each(data.Data, function (index, object) {
                object["label"] = object["FixedAssetCode"];
                object["value"] = object["FixedAssetCode"];
                arr.push(object);
                
            })
            $('#txtreftranfer').autocomplete({
                delay: 0,
                source: arr,
                select: function (event, ui) {
                    $('#txtfixedassetname').val(ui.item.FixedAssetName);
                    $('#txtdepartmentnow').val(ui.item.DepartmentName);
                    
                }
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append($("<div>").text(item.label + " - " + item.FixedAssetName))
                    .appendTo(ul);
            };
        }).fail(function (data) {

        })
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
        jsCaller.subGrid.loadData(data);
        me.closeForm();
    }
}