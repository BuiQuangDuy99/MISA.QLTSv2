
class depreciationSubGridForm extends baseForm {
    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);
        //Định nghĩa Dialog
        this.depreciationForm = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        });
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
            $('#txtFixedAssetCode').autocomplete({
                delay: 0,
                source: arr,
                select: function (event, ui) {
                    //$.each($("#DialogSubGridDetail input[fieldName]"), function (index, input) {
                    //    if (!$(input).val()) {
                    //        let field = $(input).attr("fieldName");
                    //        $(input).val(ui.item[field]);

                    //    }
                    //})
                    $('#txtFixedAssetName').val(ui.item.FixedAssetName);

                }
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append($("<div>").text(item.label + " - " + item.FixedAssetName))
                    .appendTo(ul);
            };
            
        }).fail(function (data) {

        })
    }


    show() {
        this.depreciationForm.dialog('open');
    }

    /**
     * Hàm xử lý khi form đóng
     * CreatedBY: BQDUY(15/03/2021)
     * */
    closeForm() {
        let me = this;
        me.resetForm();
        me.depreciationForm.dialog('close');
    }

    saveChangeData(data) {
        let me = this,
            jsCaller = me.jsCaller;
        jsCaller.loadData(data);
        me.closeForm();
    }
}