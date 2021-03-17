
class depreciationForm extends baseForm {
    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);
        //Định nghĩa Dialog
        this.depreciationForm = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        });
        this.subGrid = new depreciationSubGrid("#depreciation-sub-grid", "FixedAsset");
        this.subGrid.createFormDetail("#DialogSubGridDetail", 500, 375);
        this.initEventDepreciationForm();
        showTooltipElement($('.depreciation-sub-grid th'));
    }

    /**
     * Hàm khởi tạo url để thực hiện ajax
     * CreatedBY: BQDUY(15/03/2021)
     * */
    setApiUrl() {
        this.getApiUrl = 'https://localhost:44363/api/v1/RefDepreciations';
    }

    /**
     * Hàm tạo sự kiện trên form Depreciation
     * CreatedBY: BQDUY(15/03/2021)
     * */
    initEventDepreciationForm() {
        var me = this;
        super.initEvent();

        $('.btn-add-row').off('click').click(function () {
            me.addRow();
        });

        $('.depreciation-sub-grid').on('click', 'tr td button', (function () {
            me.deleteRow($(this));
        }));

        $('.btn-delete-all-row').off('click').click(function () {
            me.deleteAllRow();
        });
        me.formatTd();

        $('input[fieldName="RefNo"]').off('keyup').keyup(function () {
            this.value = this.value.toLocaleUpperCase();
        });
    }

    /**
     * Hàm tạo một dòng khi nhấn click "Thêm dòng"
     * CreatedBY: BQDUY(15/03/2021)
     */
    addRow() {
        let me = this;
        //    tr = $(`<tr>
        //                <td class="text-alight-center"></td>
        //                <td><input type="text" class="input-depreciation-sub-grid"></td>
        //                <td></td>
        //                <td class="text-alight-right" dataType="Money" ></td>
        //                <td class="text-alight-right dataType="Number" "></td>
        //                <td class="text-alight-right" dataType="Money"></td>
        //                <td><button class="button btn-depr-delete hide" title="Xóa"><div class="icon-delete-row"></div></button></td>
        //            </tr>`);
        this.subGrid.formDetail.show();
        //$('#depreciation-sub-grid tbody').append(tr);
        //me.bindingSTT();
        //showTooltipElement($('.depreciation-sub-grid button'));
    }

    /**
     * Hàm binding tự động STT
     * CreatedBy:NDTUNG (2/3/2021)
     * */
    bindingSTT() {
        $('.depreciation-sub-grid tbody tr').each(function (index) {
            {
                $(this).find("td").eq(0).text(index + 1);
            }
        });
    }

    /**
     * Hàm xóa một dòng khi nhấn click nút xóa trên dòng
     * CreatedBy:NDTUNG (2/3/2021)
     */
    deleteRow(button) {
        $(button).parents('tr').remove();
    }

    /**
     * Hàm xóa toàn bộ dòng
     * CreatedBy:NDTUNG (2/3/2021)
     * */
    deleteAllRow() {
        $('.depreciation-sub-grid tbody').empty();
    }

    show(data) {
        let me = this;
        if (data) {
            me.bindingData(data);
            me.depreciationForm.dialog('open');
        }
        me.depreciationForm.dialog('open');
    }

    /**
     * binding dữ liệu từ hàng được chọn ở grid lên form
     * @param {any} data dữ liệu của row được selected
     * CreatedBY: BQDUY(11/03/2021)
     */
    bindingData(data) {
        let me = this;
        me.form.find("[fieldName]").each(function () {
            var propertyName = $(this).attr('fieldName');
            var propertyValue = data[0][propertyName];
            
            if ($(this).attr('dataType') == 'date') {
                propertyValue = formatDate(propertyValue, "DD-MM-YYYY");
            }
            else if ($(this).attr('dataType') == "Money") {
                var money = formatMoney(propertyValue);
                propertyValue = money;
            }

            this.value = propertyValue;

            if (propertyName == "RefDetail") {
                propertyValue = JSON.parse(propertyValue);

                let gridDetail = new BaseGrid('#depreciation-sub-grid', 'FixedAsset');

                gridDetail.loadData(propertyValue);

                $('#depreciation-sub-grid tbody tr').each(function () {
                    $(this).find('td').eq(5).prop("textContent", parseFloat($(this).find('td').eq(3).prop("textContent")) / 100 * parseFloat($(this).find('td').eq(4).prop("textContent")));
                });
            }
        });
    }

    /**
     * Hàm xử lý khi form đóng
     * CreatedBY: BQDUY(15/03/2021)
     * */
    closeForm() {
        let me = this;
        me.resetForm();
        var depreciationGrid = new depreciation('#depreciation-grid-api', 'RefDepreciation');
        depreciationGrid.createFormDetail("#dialog_depreciation_use_API", 800, 600);

        me.depreciationForm.dialog('close');
    }

    /**
     * Hàm định dạng td của bảng trang form
     * CreatedBy:NDTUNG (2/3/2021)
     * */
    formatTd() {
        $('.depreciation-sub-grid tbody tr td input').each(function () {
            let money,
                dataType = $(this).attr('dataType');
            switch (dataType) {
                case "Money":
                    money = parseInt($(this).val());
                    $(this).addClass('text-alight-right');
                    $(this).empty();
                    $(this).append(formatMoney(money));
                    break;
                case "Number":
                    money = parseInt($(this).val());
                    $(this).addClass('text-alight-right');
                    break;
                default:
            }
        })
    }

}
//var subGrid = new depreciationSubGrid("#depreciation-sub-grid", "FixedAsset");
