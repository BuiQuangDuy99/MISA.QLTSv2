
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

            //$.widget("custom.catcomplete", $.ui.autocomplete, {
            //    _renderMenu: function (ul, items) {
            //        var self = this,
            //            currentCategory = "";
            //        debugger
            //        $.each(items, function (index, item) {
            //            //if (item.FixedAssetCode != currentCategory) {
            //            //    ul.append("<li class='ui-autocomplete-category'>" + item.FixedAssetCode + "</li>");
            //            //    currentCategory = item.FixedAssetCode;
            //            //}
            //            self._renderItem(ul, item);
                        
            //        });
            //    },
            //});
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
            });
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