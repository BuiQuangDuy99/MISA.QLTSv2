$(document).ready(function () {
    new Grid('#test');
})

// Biến config cho từng column trong bảng
var conFigColum = [
    {
        DataType: "number",
        Field: "STT",
        FieldText: "STT",
        Index: 1
    },
    {
        DataType: "text",
        Field: "name",
        FieldText: "Họ và tên",
        Index: 2
    },
    {
        DataType: "datetime",
        Field: "dateofbirth",
        FieldText: "Ngày sinh",
        Index: 3
    },
    {
        DataType: "text",
        Field: "school",
        FieldText: "Trường học",
        Index: 4
    },
    {
        DataType: "money",
        Field: "salary",
        FieldText: "Lương",
        Index: 5
    }
];


// Lớp dùng để render ra các bảng
class Grid {
    // Hàm khởi tạo, truyền vào id của bảng
    constructor(tableId) {
        this.grid = $(tableId);
        this.renderColumn();
        this.renderBody();
        this.initEvent();
    }

    /**
     * Hàm khởi tạo các sự kiện trong grid 
     * CreatedBY: BQDUY(04/02/2021)
     * */
    initEvent() {
        var grid = this.grid;

        // Sự kiện double click vào 1 row thì chuyển formMode thành dạng form Edit
        this.grid.find('tbody').on('dblclick', 'tr', function () {
            formMode = 'Edit';
            console.log(formMode);
        })

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
        })
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
        conFigColum.sort(function (a, b) {
            return parseInt(a.Index) - parseInt(b.Index);
        });

        // Build thẻ th
        $.each(conFigColum, function (index, col) {
            th = $(`<th>` + col.FieldText + `</th>`);
            th = me.addAttribute(th, 'fieldName', col.Field);
            th = me.addAttribute(th, 'dataType', col.DataType);
            th = me.addClassFormat(th, col.DataType);
            tr.append(th);
        }
        );

        this.grid.find('thead').append(tr);
    }

    /**
     * Hàm render dữ liệu vào bảng
     * CreatedBY: BQDUY(04/02/2021)
     * */
    renderBody() {
        try {
            var me = this;
            var grid = this.grid;

            $.getJSON("/js/data.json", function (data) {
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
                element.addClass("text-align-center");
                element.addClass("th-number");
                break;
            case "money":
                element.addClass("text-align-right");
                break;
            case 'datetime':
                element.addClass("text-align-center");
                break;
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
            case "money":
                value = formatMoney(value);
                td = $(`<td>` + value + `</td>`);
                td = me.addClassFormat(td, dataType);
                break;
            case "number":
                td = $(`<td>` + value + `</td>`);
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