// Lớp dùng để render ra các bảng
class Grid {
    // Hàm khởi tạo, truyền vào id của bảng
    constructor(tableId, filename) {
        this.grid = $(tableId);
        this.conFigColum = null;
        this.setConFigColum();
        this.renderColumn();
        this.renderBody(filename);
        this.initEvent();
    }

    /**
     * Hàm set config column
     * CreatedBY: BQDUY(06/02/2021)
     * */
    setConFigColum() {

    };

    /**
     * Hàm khi xảy ra sự kiện double click vào 1 dòng
     * CreatedBY: BQDUY(23/02/2021)
     * */
    dbClickRow() {
        
    };

    /**
     * Hàm khởi tạo các sự kiện trong grid 
     * CreatedBY: BQDUY(04/02/2021)
     * */
    initEvent() {
        var grid = this.grid;

        // Sự kiện double click vào 1 row thì chuyển formMode thành dạng form Edit, và binding dữ liệu của row lên form
        this.grid.find('tbody').on('dblclick', 'tr', this.dbClickRow);

        // Sự kiện click một dòng, hoặc giữ ctrl để click được nhiều dòng
        grid.find('tbody').on('click', 'tr', function (event) {
            if (event.ctrlKey) {
                if ($(this).hasClass('selected-row')) {
                    $(this).removeClass('selected-row');
                } else {
                    $(this).addClass('selected-row');
                    console.log($(this).data('recordId'));
                }
            } else {
                if ($(this).hasClass('selected-row')) {
                    $(this).removeClass('selected-row');
                } else {
                    $(this).addClass('selected-row');
                    $(this).siblings().removeClass('selected-row');
                }
            }
            //$('#function').addClass('show-dialog');
            //$('#function').removeClass('hide-dialog');
        })

        // Sự kiện click chuột phải vào một dòng show menu context (chưa hoàn thiện)
        //grid.find('tbody').on('contextmenu', function (e) {
        //    var menu = $('.menu');//get the menu
        //    e.preventDefault();//Prevent the default action: the normal right-click-menu to show
        //    menu.css({
        //        display: 'block',//show the menu
        //        top: e.pageY,//make the menu be where you click (y)
        //        left: e.pageX,//make the menu be where you click (x)
        //        position: 'fixed'
        //    });
        //    $(document).click(function () { //When you left-click
        //        menu.css({ display: 'none' });//Hide the menu
        //    });
        //})
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
            th = me.addWithForTh(th, col.FieldName, col.DataType);
            tr.append(th);
        }
        );

        this.grid.find('thead').append(tr);
    }

    /**
     * Hàm xét độ rộng cho từng th trong grid
     * CreatedBy: DVVUONG (24/02/2021)
     * */
    addWithForTh(element, FieldName, DataType) {
        try {
            let strEqual = "Code";
            if (String(FieldName).includes(strEqual) && DataType == "text") {
                element.addClass("width-code");
                return element;
            }

            switch (FieldName) {
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
     * Hàm render dữ liệu vào bảng
     * CreatedBY: BQDUY(04/02/2021)
     * */
    renderBody(filename) {
        try {
            var me = this;
            var grid = this.grid;
            $.getJSON("/js/" + filename+".json", function (data) {
                var tr;
                var dataType;
                var fieldName;
                var value;
                var td;
                $.each(data, function (index, obj) {
                    tr = $(`<tr></tr>`);
                    $(tr).data('recordId', obj['Id']);
                    grid.find('th').each(function () {
                        dataType = $(this).attr('dataType');
                        fieldName = $(this).attr('fieldName');
                        value = obj[fieldName];
                        td = me.addValueInTd(td, value, dataType);
                        tr.append(td);
                    });
                    grid.find('tbody').append(tr);
                });
                showTooltipElement($('button'));
            })
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
        var me = this;

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
}
// Biến thay đổi giá trị của form khi ấn nút Thêm mới, hoặc Double Click vào 1 dòng trong bảng
var formMode = null;