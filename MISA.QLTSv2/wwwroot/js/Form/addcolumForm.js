
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
                    $('#txtFixedAssetId').val(ui.item.FixedAssetId);
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

    getData() {
        var me = this;
        var data = {};
        this.form.find("input[fieldName], textarea, select, table").each(function () {
            var fieldName = $(this).attr("fieldName"),
                dataType = $(this).attr("DataType");

            if (dataType == "JSON" && (me.subGrid.listSubGrid != null)) {
                data[fieldName] = JSON.stringify(me.subGrid.listSubGrid);
            } else {
                data[fieldName] = me.getDataInput($(this), dataType);

            }

        });
        return data;
    }

    saveChangeData(data) {
        let me = this,
            jsCaller = me.jsCaller;
        if (me.jsCaller.formMode == "Add") {
            debugger
            jsCaller.subGrid.loadData(data);
            me.closeForm();

        } else if (me.jsCaller.formMode == "edit") {
            var listDataGrid = me.jsCaller.subGrid.listSubGrid;
            $.each(listDataGrid, function (index, obj) {
                if (obj["FixedAssetId"] === $(me.jsCaller.subGrid.grid).find(".selected-row").data("recordId")) {
                    Object.assign(obj,data);
                }
            })
            debugger
            jsCaller.subGrid.loadData(listDataGrid);
            me.closeForm();
        }
    }
}