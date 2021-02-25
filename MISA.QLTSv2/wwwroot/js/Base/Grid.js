// Lớp dùng để render ra các bảng
class Grid {

    // Hàm khởi tạo, truyền vào id của bảng
    constructor(tableId) {
        var me = this;

        // Biến lưu grid
        me.grid = $(tableId);
        // Danh sách config cho các cột
        me.conFigColum = null;
        me.formDetail = null;

        // Khởi tạo các sự kiện cho grid
        me.initEvents();
    }

    /**
     * Hàm khởi tạo các sự kiện trong grid 
     * CreatedBY: BQDUY(04/02/2021)
     * */
    initEvents() {
        var me = this,
            grid = me.grid;

        // Sự kiện double click vào 1 row thì chuyển formMode thành dạng form Edit, và binding dữ liệu của row lên form
        grid.find('tbody').off('dblclick', 'tr');
        grid.find('tbody').on('dblclick', 'tr', me.dbClickRow.bind(this));

        // Sự kiện click một dòng, hoặc giữ ctrl để click được nhiều dòng
        grid.find('tbody').off('click', 'tr');
        grid.find('tbody').on('click', 'tr', me.gridRowOnClick);
    }

    /**
    * Sự kiện click một dòng, hoặc giữ ctrl để click được nhiều dòng
    * CreatedBY: BQDUY(04/02/2021)
    * */
    gridRowOnClick(event) {
        if (event.ctrlKey) {
            if ($(this).hasClass('selected-row')) {
                $(this).removeClass('selected-row');
            } else {
                $(this).addClass('selected-row');
                console.log($(this).data('recordId'));
            }
        } else {
            $(this).addClass('selected-row');
            $(this).siblings().removeClass('selected-row');
        }
    }

    /**
     * Hàm render các cột của bảng
     * CreatedBY: BQDUY(04/02/2021)
     * */
    renderColumn() {
        var me = this;
        var tr = $(`<tr></tr>`);
        var th;

        // Sort lại mảng cho đúng thứ tự cột tăng dần:
        me.conFigColum.sort(function (a, b) {
            return parseInt(a.Index) - parseInt(b.Index);
        });

        // Build thẻ th
        $.each(me.conFigColum, function (index, col) {
            th = $(`<th>` + col.FieldText + `</th>`);
            th = me.addAttribute(th, 'fieldName', col.FieldName);
            th = me.addAttribute(th, 'dataType', col.DataType);
            th = me.addClassFormat(th, col.DataType);
            th = me.addWidthForTh(th, col.FieldName, col.DataType);
            tr.append(th);
        }
        );

        me.grid.find('thead').append(tr);
    }



    /**
     * Hàm xét độ rộng cho td trong grind
     * @param {any} element đối tượng cần định dạng độ rộng
     * @param {any} FieldName fileName của đối tượng 
     * @param {any} DataType kiểu dữ liệu của đối tượng
     * CreatedBy: DVVUONG (24/04/2021)
     */
    addWidthForTh(element, fieldName, dataType) {
        try {
            let strEqual = "Code";

            if (String(fieldName).includes(strEqual) && dataType == "text") {
                element.addClass("width-code");
                return element;
            }

            switch (fieldName) {
                case "STT":
                    element.addClass("width-stt");
                    element.addClass("padding-stt");
                    break;
                case "DateTime":
                    element.addClass("width-datetime");
                    break;
                case "Price":
                    element.addClass("width-price");
                    break;
                default:
                    break;
            }
            return element;
        } catch (e) {
            console.log(e);
        }

    }

    /**
     * @param {any} element đối tượng cần đinh dạng format
     * @param {any} DataType kiểu của đói tượng
     * Hàm format ẩn text khi độ dài vượt quá quy định
     * CreatedBy: DVVUONG (24/04/2021)
     */
    addFormatTd(element, DataType) {
        try {
            if (DataType == "text") {
                element.addClass("hidden-text");
            }
            return element;
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Hàm load data vào bảng
     * @param {any} data dữ liệu cần add vào bảng
     * CreatedBY: BQDUY(25/02/2021)
     */
    loadData(data) {
        let me = this,
            grid = this.grid;

        if (data) {
            $.each(data, function (index, obj) {
                $(grid).find('tbody').append(me.renderBody(obj));
            })
        }
    }

    /**
     * Hàm render dữ liệu vào bảng
     * CreatedBY: BQDUY(04/02/2021)
     * */
    renderBody(object) {
        try {
            let me = this,
                grid = this.grid,
                column = $(grid).find('th'),
                row,
                dataType,
                fieldName,
                value,
                td;

            row = $(`<tr></tr>`);
            $(row).data('recordId', object['Id']);
            column.each(function () {
                dataType = $(this).attr('dataType');
                fieldName = $(this).attr('fieldName');
                value = object[fieldName];
                td = me.addValueInTd(td, value, dataType);
                td = me.addFormatTd(td, dataType);
                td = td.attr("title", value);
                $(row).append(td);
            });

            $(row).data("value", object);

            return row;  
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Hàm để add attribute cho một đối tượng
     * @param {any} element đối tượng cần add attribute
     * @param {any} attrName tên attribte
     * @param {any} attrValue giá trị của attribute
     * CreatedBY: BQDUY(05/02/2021)
     */
    addAttribute(element, attrName, attrValue) {
        element.attr(String(attrName), attrValue);
        return element;
    }

    /**
     * Hàm add class cho một đối tượng dựa vào kiểu dữ liệu của đối tượng
     * @param {any} element đối tượng cần add class
     * @param {any} dataType kiểu dữ liệu của đối tượng để xét
     * CreatedBY: BQDUY(05/02/2021)
     */
    addClassFormat(element, dataType) {
        switch (dataType) {
            case "number":
                element.addClass("text-center");
                break;
            case "datetime":
                element.addClass("text-center");
                break;
            case "money":
                element.addClass("text-right");
                break;
            case 'percent':
                element.addClass("text-right");
                break;
            case 'year':
                element.addClass("text-right");
                break;
            case 'function':
                element.addClass("function-content");
            default:
                break;
        }

        return element;
    }

    /**
     * Hàm thêm giá trị từng cột của dòng, trong bảng
     * @param {any} td cột cần truyền giá trị
     * @param {any} value giá trị truyền vào
     * @param {any} dataType kiểu dữ liệu truyền vào
     * CreatedBY: BQDUY(05/02/2021)
     */
    addValueInTd(td, value, dataType) {
        let me = this;

        switch (dataType) {
            case "datetime":
                value = formatDate(value);
                td = $(`<td>` + value + `</td>`);
                td = me.addClassFormat(td, dataType);
                break;
            case "year":
                td = $(`<td>` + value + `</td>`);
                td = me.addClassFormat(td, dataType);
                break;
            case "money":
                value = formatMoney(value);
                td = $(`<td>` + value + `</td>`);
                td = me.addClassFormat(td, dataType);
                break;
            case "number":
                td = $(`<td>` + value + `</td>`);
                td = me.addClassFormat(td, dataType);
                break;
            case "percent":
                td = $(`<td>` + value + `</td>`);
                td = me.addClassFormat(td, dataType);
                break;
            case "function":
                td = $(`<td style="display:flex; padding: 8px 16px;">` +
                    `<button class="btn-function hide" title="Chỉnh sửa">
                            <div class="icon-pencil">
                            </div>
                        </button>
                        <button class="btn-function hide" title="Xóa">
                            <div class="icon-remove-function">
                            </div>
                        </button>
                        <button class="btn-function hide" title="Lịch sử">
                            <div class="icon-pie">
                            </div>
                        </button>
                        </button>`
                    + `</td>`);
                td = me.addClassFormat(td, dataType);
                break;
            default:
                td = $(`<td>` + value + `</td>`);
                break;
        }
        return td;
    }

    /**
     * Hàm set config column
     * CreatedBY: BQDUY(06/02/2021)
     * */
    setConFigColum(conFigColum) {
        this.conFigColum = conFigColum;

        if (this.conFigColum) {
            this.renderColumn();
        }
    };

    /**
     * Hàm lấy giá trị của 1 hàng đang được selected
     * CreatedBY: BQDUY(23/02/2021)
     * */
    getDataSelected() {
        let data = [],
            id = this.grid.find(".selected-row").data('recordId');

        console.log(id);    

        this.grid.find(".selected-row").each(function () {
            let item = $(this).data("value");
            data.push(item);
        });

        return data;
    }

    /**
     * Hàm khi xảy ra sự kiện double click vào 1 dòng
     * CreatedBY: BQDUY(23/02/2021)
     * */
    dbClickRow() {

    };
}
