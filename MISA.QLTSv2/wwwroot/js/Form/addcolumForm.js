// class form chi tiết của bảng tài sản trong màn điều chuyển
class FormAdd extends baseForm {
    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);

        this.FormAdd = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        })
        this.autocomplete(); // Hàm xử lý autocomplete tài sản
        this.autocompleteDepartment(); // Hàm xử lý autocomplete combox phòng ban điều chuyển
        this.initEventSubForm();
    }

    /**
     * Khởi tạo sự kiện cho form của bảng tài sản
     * CreatedBy: NVTUYEN(22/03/2021)
     * */
    initEventSubForm() {
        $('#btnACInput').off('click').on('click', function () {
            $('#txtreftranfer').focus();
        });
        $('#btnACCbx').off('click').on('click', function () {
            $('#txtDepartmentTransfer').focus();
        });
    }

    /**
     *Hàm load autocomplete cho input mã tài sản
     * createdBy:NVTUYEN(19/03/2021)
     * */
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
                minLength: 0,
                source: arr,
                select: function (event, ui) {
                    $('#txtfixedassetname').val(ui.item.FixedAssetName);
                    $('#txtdepartmentnow').val(ui.item.DepartmentName);
                    $('#txtFixedAssetId').val(ui.item.FixedAssetId);
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
    /**
     * Hàm load autocomplete cho input phòng ban
     * CreatedBy:NVTUYEN(19/03/2021)
     * */
    autocompleteDepartment() {
        $.ajax({
            url: 'https://localhost:44363/api/Departments',
            method: "GET"
        }).done(function (data) {
            var array = [];
            $.each(data, function (index, object) {
                object["label"] = object["DepartmentName"];
                object["value"] = object["DepartmentName"];
                array.push(object);
            })
            $('#txtDepartmentTransfer').autocomplete({
                delay: 0,
                minLength: 0,
                source: array,
                select: function (event, ui) {

                }
            }).on("focus", function () {
                $(this).autocomplete("search", '');
            })
        }).fail(function (data) {

        })
    }

    /**
     * hàm xử lý show form
     * @param {any} data
     * createdBy:NVTUYEN(15/03/2021)
     */

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
     * Hàm xử lý lấy dữ liêu của các input khi thực hiện nút lưu
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

    /**
     * Hàm xử lý thực hiện cập nhật dữ liệu
     * @param {any} data
     * createdBy:NVTUYEN(15/03/2021)
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