
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
        //Sự kiện nhấn thêm dòng trong form
        $('.btn-add-row').off('click').click(function () {
            me.addRow();
        });

        //Sự kiện nhấn xóa dòng trong form
        $('.depreciation-sub-grid').off('click').on('click', 'tr td button', (function () {
            me.deleteRow($(this));
        }));

        //Sự kiện nhấn xóa toàn bộ dòng trong form
        $('.btn-delete-all-row').off('click').click(function () {
            me.deleteAllRow();
        });

        //Format td trong form
        me.formatTd();

        //$('.depreciation-sub-grid tbody tr').each(function () {

        //}).find("td input").eq(2).off('keyup').keyup(function () {
        //    me.setDepreciation();
        $('.depreciation-sub-grid tbody').off('blur').on('blur', 'tr ', function () {
            me.setDepreciation($(this));
        });

        //$('.depreciation-sub-grid tbody').off('blur').on('blur', 'input[dataType="Percent"]', function () {
        //    me.checkPercent($(this));
        //});


    }

    /**
     * Hàm tạo một dòng khi nhấn click "Thêm dòng"
     * CreatedBy:NDTUNG (2/3/2021)
     */
    addRow() {
        let me = this,
            tr = $(`<tr>
                        <td class="text-alight-center"></td>
                            <td ><input fieldName="FixedAssetCode" type="text" class="input-depreciation-sub-grid" /></td>
                            <td ><input fieldName="FixedAssetName" type="text" class="input-depreciation-sub-grid" /></td>
                            <td><input fieldName="Cost" type="text" class="input-depreciation-sub-grid text-alight-right" dataType="money"/></td>
                            <td><input fieldName="DepreciationRate" type="text" dataType="Percent" class="input-depreciation-sub-grid text-alight-right" /></td>
                            <td><input fieldName="AmountTotal" type="text" class="input-depreciation-sub-grid text-alight-right" disabled /></td>
                        <td><button class=" btn-depr-delete hide" title="Xóa"><div class="icon-delete-row"></div></button></td>
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
        this.bindingSTT();
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
        let me = this,
            depreciation = {},
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

                if (dataType == "money") {
                    asset[fieldNameAss] = parseInt($(this).val().split(".").join(""));
                }
                else if (dataType == "Number") {
                    asset[fieldNameAss] = parseFloat($(this).val());
                }
                else {
                    asset[fieldNameAss] = $(this).val();
                }
            })
            listAsset.push(asset);
            list = JSON.stringify(listAsset);
        })

        $('input[fieldName="AmountTotal"]').each(function () {
            if ($(this).val() != "") {
                sumMoney += parseFloat(me.getDepreciationForm($(this)));
            }
        })

        $('input[fieldName],textarea[fieldName],table[fieldName]').each(function () {

            let fieldName = $(this).attr('fieldName');

            if (fieldName == "RefDetail") {
                depreciation[fieldName] = list;
            }
            else if (fieldName == "PostedDate") {
                depreciation[fieldName] = $(this).datepicker("getDate");
            }
            else if (fieldName == "RefNo") {
                depreciation[fieldName] = $(this).val().toUpperCase();
            }
            else if (fieldName == "JournalMemo") {
                depreciation[fieldName] = $(this).val();
            }

            depreciation['Id'] = createGuid();
            depreciation['AmountTotal'] = sumMoney;
        });
        console.log(depreciation);
        return depreciation;
    }

    //bindingData(data) {
    //}

    setDepreciation(tr) {
        let me = this,
            cost,
            depreciationRate,
            amountTotal;

        // Mai tách hàm(1 hàm hiển thị , 1 hàm cất) Note: Không biết có làm được không ???
        cost = parseInt(tr.find('input[fieldName="Cost"]').val().split(".").join(""));
        depreciationRate = parseFloat(tr.find('input[fieldName="DepreciationRate"]').val());
        if (!isNaN(cost) && !isNaN(depreciationRate)) {
            amountTotal = roundToTwo(cost / 100 * depreciationRate);
        }

        tr.find('input[fieldName="AmountTotal"]').val(me.showDepreciation(amountTotal));

    };

    /**
     * Hàm dùng để định dạng hiển thị số tiền hao mòn lên Form
     * CreatedBy:NDTUNG (10/3/2021)
     * @param {any} amountTotal Số tiền hao mòn
     */
    showDepreciation(amountTotal) {
        if (!isNaN(amountTotal)) {
            amountTotal = amountTotal.toString();
            amountTotal = formatMoney(parseInt(amountTotal));
            return amountTotal;
        }
    }

    /**
     * Hàm dùng để tính tổng hao mòn các tài sản trong form 
     * CreatedBy:NDTUNG (10/3/2021)
     * @param {any} value 
     */
    getDepreciationForm(input) {
        let value;

        value = input.val().split(".").join("");
        value = value.split(",").join(".");

        return value;
    }

    /**
     * Hàm kiểm tra nhập phần trăm
     */
    checkPercent(td) {
        let percent = td.val(),
            x = parseFloat(percent);
        if (x > 0 || x < 100 || percent == "") {
            td.removeClass("border-red");
            td.removeAttr("title");
        }
        else if (isNaN(x) || x < 0 || x > 100) {
            td.addClass("border-red");
            td.attr("title", "Vui lòng nhập đúng định dạng phần trăm!");
        }
    }

}

