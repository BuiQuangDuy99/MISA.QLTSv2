
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
        this.initEventSubForm();
    }

    initEventSubForm() {
        $('#DialogSubGridDetail input[fieldName="Cost"], input[fieldName="DepreciationRate"]').off('blur').on('blur', function () {
            $('input[fieldName="Amount"]').val(formatMoney(Math.round(parseFloat($('input[fieldName="Cost"]').val().split(".").join("")) * parseFloat($('input[fieldName="DepreciationRate"]').val().split(".").join("")) / 100)));
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
                    $.each($("#DialogSubGridDetail input[fieldName]"), function (index, input) {                       
                        let field = $(input).attr("fieldName");
                        if ($(input).attr("dataType") == "money") {
                            $(input).val(formatMoney(parseFloat(ui.item[field])));
                        }
                        $(input).val(ui.item[field]);
                        if (field == "Amount") {
                            $(input).val(formatMoney(Math.round(parseFloat($('input[fieldName="Cost"]').val().split(".").join("")) * parseFloat($('input[fieldName="DepreciationRate"]').val().split(".").join("")) / 100)));
                        }
                    })
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