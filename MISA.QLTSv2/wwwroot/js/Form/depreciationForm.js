
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

        $('.depreciation-sub-grid tbody tr').find("td input").eq(2).off('keyup').keyup(function () {
            me.setDepreciation();
        });
        $('.depreciation-sub-grid tbody tr').find("td input").eq(3).off('keyup').keyup(function () {
            me.setDepreciation();
        });
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
     * Hàm xóa một dòng khi nhấn click nút xóa trên dòng trong form
     * CreatedBy:NDTUNG (2/3/2021)
     */
    deleteRow(button) {
        $(button).parents('tr').remove();
    }

    /**
     * Hàm xóa toàn bộ dòng trong form
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
                case "money":
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

    /**
     * Hàm lấy dữ liệu trong Form của form
     * CreatedBy:NDTUNG (9/3/2021)
     * */
    getData() {
        let depreciation = {},
            sumMoney = 0,
            listAsset = [],
            list;
        $('.depreciation-sub-grid tbody tr ').each(function () {
            let asset = {},
                fieldNameAss,
                dataType;
            $(this).find('[fieldName]').each(function () {

                fieldNameAss = $(this).attr('fieldName');
                dataType = $(this).attr("dataType");

                if (dataType == "Number" || dataType == "Money") {
                    asset[fieldNameAss] = parseInt($(this).val().split(".").join(""));
                }
                else {
                    asset[fieldNameAss] = $(this).val();
                }
                //if (fieldNameAss == "AmountTotal") {
                //    let AmountTotal = asset['Cost'] / 100 * asset['DepreciationRate'];
                //    asset[fieldNameAss] = AmountTotal;
                //}
            })
            listAsset.push(asset);
            list = JSON.stringify(listAsset);
        })

        $('input[fieldName="AmountTotal"]').each(function () {
            sumMoney += parseInt($(this).val().split(".").join(""));
        })
        console.log(sumMoney);

        $('input[fieldName],textarea[fieldName],table[fieldName]').each(function () {

            let fieldName = $(this).attr('fieldName');

            if (fieldName == "RefDetail") {
                depreciation[fieldName] = list;
            }
            else if (fieldName == "PostedDate") {
                depreciation[fieldName] = $(this).val();
            }
            else if (fieldName == "RefNo" || fieldName == "JournalMemo") {
                depreciation[fieldName] = $(this).val();
            }

            depreciation['Id'] = createGuid();
            depreciation['AmountTotal'] = sumMoney;
        });
        return depreciation;
    }

    setDepreciation() {
        let cost,
            depreciationRate,
            amountTotal;
        $('.depreciation-sub-grid tbody tr').each(function () {
            // Mai tách hàm(1 hàm hiển thị , 1 hàm cất) Note: Không biết có làm được không ???
            cost = parseInt($(this).find("td input").eq(2).val().split(".").join(""));
            depreciationRate = parseInt($(this).find("td input").eq(3).val().split(".").join(""));
            amountTotal = roundToTwo(cost / 100 * depreciationRate).toFixed(2);
            amountTotal = amountTotal.toString().replace(".", ",");
            amountTotal = formatMoney(parseInt(amountTotal.split(",")[0])).toString() + "," + parseInt(amountTotal.split(",")[1]).toString();
            amountTotal = parseFloat(amountTotal.replace(",",".")); 
            $(this).find("td input").eq(4).val(amountTotal);
        })
    };


}

