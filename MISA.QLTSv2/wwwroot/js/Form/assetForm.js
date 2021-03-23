class assetIncreasedForm extends baseForm {
    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);
        //Định nghĩa Dialog
        this.assetIncreasedForm = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        });
        this.autocomplete();
    }

    initEvent() {
        super.initEvent();
    }

    setApiUrl() {
        this.getApiUrl = 'https://localhost:44363/api/FixedAsset';
    }
    /**
     * Hàm xử lý sự kiện thay đổi selection
     * CretedBY: NVTUYEN(26/02/2021)
     * */
    changeValueSelection() {
       
    }

    autocomplete() {
        var me = this;
        // Gọi ajax để lấy danh sách phòng ban
        $.ajax({
            url: 'https://localhost:44363/api/Departments',
            method: "GET"
        }).done(function (data) {
            var arr = [];
            // Build lại danh sách phòng ban để thực hiện được autocomplete
            $.each(data, function (index, object) {
                object["label"] = object["DepartmentCode"];
                object["value"] = object["DepartmentCode"];
                arr.push(object);
            });
            // Thêm sự kiện focus ô input thì sẽ bắn menu, dùng sự kiện search của autocomplte jueryui
            $('#txtDepartment').autocomplete({
                delay: 0,
                minLength: 0,
                source: arr,
                select: function (event, ui) {
                    $('#txtDepartmentName').val(ui.item.DepartmentName);
                }
            }).on("focus", function () {
                $(this).autocomplete("search", '');
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .attr("title", item.label + " - " + item.DepartmentName)
                    .append($("<div>").text(item.label + " - " + item.DepartmentName))
                    .appendTo(ul);
            };
        }).fail(function (data) {

        });
        $.ajax({
            url: 'https://localhost:44363/api/v1/FACategories',
            method: "GET"
        }).done(function (data) {
            var arr = [];
            // Build lại danh sách phòng ban để thực hiện được autocomplete
            $.each(data.Data, function (index, object) {
                object["label"] = object["FixedAssetCategoryCode"];
                object["value"] = object["FixedAssetCategoryCode"];
                arr.push(object);
            });
            // Thêm sự kiện focus ô input thì sẽ bắn menu, dùng sự kiện search của autocomplte jueryui
            $('#txtFixedAssetCategoryCode').autocomplete({
                delay: 0,
                minLength: 0,
                source: arr,
                select: function (event, ui) {
                    $('#txtFixedAssetCategoryName').val(ui.item.FixedAssetCategoryName);
                }
            }).on("focus", function () {
                $(this).autocomplete("search", '');
            }).autocomplete("instance")._renderItem = function (ul, item) {
                return $("<li>")
                    .attr("title", item.label + " - " + item.FixedAssetCategoryName)
                    .append($("<div>").text(item.label + " - " + item.FixedAssetCategoryName))
                    .appendTo(ul);
            };
        }).fail(function (data) {

        });
    }

    show(data) {
        let me = this;
        if (data) {
            me.bindingData(data);
            me.assetIncreasedForm.dialog('open');
        }
        me.assetIncreasedForm.dialog('open');
    }

    closeForm() {
        let me = this;
        me.resetForm();
        me.assetIncreasedForm.dialog('close');
    }

}