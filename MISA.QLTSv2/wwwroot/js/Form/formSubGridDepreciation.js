
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
        this.autocomplete();
    }
    /**
     * Hàm khởi tạo sự kiện cho form của subGid
     * CreatedBY: BQDUY(18/03/2021)
     * */
    initEventSubForm() {
        $('#DialogSubGridDetail input[fieldName="Cost"], input[fieldName="DepreciationRate"]').off('blur').on('blur', function () {
            $('input[fieldName="Amount"]').val(formatMoney(Math.round(parseFloat($('input[fieldName="Cost"]').val().split(".").join("")) * parseFloat($('input[fieldName="DepreciationRate"]').val().split(".").join("")) / 100)));
        });
    }
    /**
     * Hàm xử lý sự kiện cho combobox autocomplete
     * CreatedBY: BQDUY(18/03/2021)
     * */
    autocomplete() {
        var me = this;

        $.ajax({
            url: 'https://localhost:44363/api/FixedAsset',
            method: "GET"
        }).done(function (data) {
            var arr = [];

            $.each(data.Data, function (index, object) {
                object["label"] = object["FixedAssetCode"];
                object["value"] = object["FixedAssetCode"];
                arr.push(object);
            });
            // Thêm sự kiện focus ô input thì sẽ bắn menu, dùng sự kiện search của autocomplte jueryui
            $('#txtFixedAssetCode').autocomplete({
                delay: 0,
                minLength: 0,
                source: arr,
                select: function (event, ui) {
                    me.bindingDataForm(ui.item);
                }
            }).on("focus", function () {
                $(this).autocomplete("search", '');
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .append($("<div>").text(item.label + " - " + item.FixedAssetName))
                    .appendTo(ul);
            };


        }).fail(function (data) {

        })
    }

    bindingDataForm(data) {

        data["Amount"] = data["Cost"] * data["DepreciationRate"] * 0.01;

        $.each($("#DialogSubGridDetail input[fieldName]"), function (index, input) {
            let field = $(input).attr("fieldName"),
                dataType = $(input).attr("dataType"),
                value = data[field];

            if (dataType == "money") {
                if (!isNaN(value)) {
                    $(input).val(formatMoney(value));
                } else {
                    $(input).val("");
                }
            } else {
                $(input).val(value);
            }
        })
    }

    /**
     * Hàm hiển thị form khi click
     * CreatedBY: BQDUY(18/03/2021)
     * */
    show(data) {
        let me = this;

        if (data) {
            me.bindingData(data);
            me.depreciationForm.dialog('open');
        }
        me.depreciationForm.dialog('open');
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

    /**
     * Hàm lấy data từ form và chuyển thành string
     * CreatedBY: BQDUY(18/03/2021)
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

    /**
     * Hàm xử lý khi cất hoặc thêm mới
     * @param {any} data dữ liệu để cất
     * CreatedBY: BQDUY(18/03/2021)
     */
    saveChangeData(data) {
        let me = this,
            jsCaller = me.jsCaller;

        if (me.jsCaller.formMode == "Add") {
            let listData = jsCaller.subGrid.listSubGrid,
                isValid = true;
            $.each(listData, function (index, obj) {
                if (data['FixedAssetId'] == obj['FixedAssetId']) {
                    isValid = false;
                }
            })
            if (isValid) {
                jsCaller.subGrid.loadData(data);
                me.closeForm();
            }
            else {
                showAlertWarring("Mã tài sản đã tồn tại");
                $('input[fieldName="FixedAssetCode"]').focus();
            }

        } else if (me.jsCaller.formMode == "edit") {

            var listDataGrid = me.jsCaller.subGrid.listSubGrid;

            $.each(listDataGrid, function (index, obj) {
                if (obj["FixedAssetId"] === $(me.jsCaller.subGrid.grid).find(".selected-row").data("recordId")) {
                    Object.assign(obj, data);
                }
            })

            jsCaller.subGrid.loadData(listDataGrid);
            me.closeForm();
        }
    }
}