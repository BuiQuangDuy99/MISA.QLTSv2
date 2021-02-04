$(document).ready(function () {
    //callAjax("http://localhost:63927/api/v1/Employees", "GET", function (response) {
    //    console.log(response);
    //});
    new Grid('#test');
})

var conFigColum = [
    {
        dataType: "number",
        width: "55px",
        css: "text-align: center",
        height: "",
        field: "STT",
        FieldText: "STT",
        INDEX: 1
    },
    {
        dataType: "text",
        width: "250px",
        height: "",
        field: "name",
        FieldText: "Họ và tên",
        INDEX: 2
    },
    {
        dataType: "datetime",
        width: "100px",
        height: "",
        css: "text-align: center",
        field: "dateofbirth",
        FieldText: "Ngày sinh",
        INDEX: 3
    },
    {
        dataType: "text",
        width: "100px",
        height: "",
        field: "school",
        FieldText: "Trường học",
        INDEX: 4
    },
    {
        dataType: "money",
        width: "100px",
        height: "",
        css: "text-align: right",
        field: "salary",
        FieldText: "Lương",
        INDEX: 4
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

    initEvent() {
        this.grid.find('tbody').on('dblclick', 'tr', function () {
            formMode = 'Edit';
            console.log(formMode);
        })
    }

    /**
     * Hàm render các cột của bảng
     * CreatedBY: BQDUY(04/02/2021)
     * */
    renderColumn() {
        var tr = $(`<tr></tr>`);
        // số cột cần add vào tr
        var numOfCol = conFigColum.length;
        // for từ 1 đến số cột
        for (var i = 1; i <= numOfCol; i++) {
            $.each(conFigColum, function (index, col) {
                // i=0 đang ở cột một, cần tìm thằng col có INDEX = 1
                if (i == col.INDEX) {
                    var th = $(`<th fieldName="` + col.field + `" dataType="` + col.dataType + `" style="width:` + col.width + `;` + col.css + `">` + col.FieldText + `</th>`);
                    tr.append(th);
                }
            });
        }
        this.grid.find('thead').append(tr);
    }

    /**
     * Hàm render dữ liệu vào bảng
     * CreatedBY: BQDUY(04/02/2021)
     * */
    renderBody() {
        var grid = this.grid;
        $.getJSON("/js/data.json", function (data) {
            $.each(data, function (index, obj) {
                var tr = $(`<tr></tr>`);
                var dataType;
                grid.find('th').each(function () {
                    var fieldName = $(this).attr('fieldName');
                    dataType = $(this).attr('dataType');
                    var value = obj[fieldName];
                    var td;
                    switch (dataType) {
                        case "datetime":
                            value = formatDate(value);
                            td = $(`<td style="text-align: center">` + value + `</td>`);
                            break;
                        case "money":
                            value = formatMoney(value);
                            td = $(`<td style="text-align: right">` + value + `</td>`);
                            break;
                        case "number":
                            td = $(`<td style="text-align: center">` + value + `</td>`);
                            break;
                        default:
                            td = $(`<td>` + value + `</td>`);
                            break;
                    } 
                    tr.append(td);
                });
                grid.find('tbody').append(tr);
            });
        })
    }

    
}
var formMode = null;