﻿
class depreciationForm extends baseForm {
    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);
        //Định nghĩa Dialog
        this.depreciationForm = $(formId).dialog({
            autoOpen: true,
            height: height,
            width: width,
            modal: true,
        });
        this.initEventDepreciationForm();
        showTooltipElement($('.depreciation-sub-grid th'));
    }

    /**
     * Hàm tạo sự kiện trên form Depreciation
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
        $('#TestDate').datepicker().inputmask("99/99/9999", { placeholder: "__/__/____" });
    }

    /**
     * Hàm tạo một dòng khi nhấn click "Thêm dòng"
     */
    addRow() {
        let me = this,
            tr = $(`<tr>
                        <td class="text-alight-center"></td>
                        <td><input type="text" class="input-depreciation-sub-grid"></td>
                        <td></td>
                        <td class="text-alight-right" dataType="Money" ></td>
                        <td class="text-alight-right dataType="Number" "></td>
                        <td class="text-alight-right" dataType="Money"></td>
                        <td><button class="button btn-depr-delete hide" title="Xóa"><div class="icon-delete-row"></div></button></td>
                    </tr>`);

        $('#depreciation-sub-grid tbody').append(tr);
        me.bindingSTT();
        showTooltipElement($('.depreciation-sub-grid button'));

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

    closeForm() {
        let me = this;
        me.resetForm();
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

    getData() {
        let depreciation = {},
            sumMoney=0,
            listAsset = [];
        $('.depreciation-sub-grid tbody tr').each(function () {
            let asset = {},
                fieldNameAss,
                dataType;
            $(this).find('td[fieldName]').each(function () {

                fieldNameAss = $(this).attr('fieldName');
                dataType = $(this).attr("dataType");

                if (dataType == "Number" || dataType == "Money") {
                    asset[fieldNameAss] = parseInt($(this).prop("textContent").split(".").join(""));
                }
                else {
                    asset[fieldNameAss] = $(this).prop("textContent");
                }
                if (fieldNameAss == "AmountTotal") {
                    let AmountTotal = asset['Cost'] / 100 * asset['DepreciationRate'];
                    asset[fieldNameAss] = AmountTotal;
                    //$(this).append(AmountTotal);
                }
            })
            listAsset.push(asset);
        })
    
        $('td[fieldName="AmountTotal"]').each(function() {
            sumMoney += parseInt($(this).prop("textContent").split(".").join(""));
        })
        console.log(sumMoney);

        $('input[fieldName],textarea[fieldName],table[fieldName]').each(function () {
            let fieldName = $(this).attr('fieldName');
            if (fieldName == "RefDetail") {
                depreciation[fieldName] = listAsset;
            }
            else {
                depreciation[fieldName] = $(this).val();
            }
            depreciation['AmountTotal'] = sumMoney;
        });
        console.log(depreciation);
    }

}