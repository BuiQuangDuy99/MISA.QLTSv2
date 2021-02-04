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
        FieldText: "name",
        INDEX: 2
    },
    {
        dataType: "datetime",
        width: "100px",
        height: "",
        field: "dateofbirth",
        FieldText: "dateofbirth",
        INDEX: 3
    },
    {
        dataType: "text",
        width: "100px",
        height: "",
        field: "school",
        FieldText: "school",
        INDEX: 4
    },
    {
        dataType: "money",
        width: "100px",
        height: "",
        field: "salary",
        FieldText: "salary",
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
                    var th = $(`<th fieldName="` + col.field + `" style="width:` + col.width + `;">` + col.FieldText + `</th>`);
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


                    var td = $(`<td>` + value + `</td>`);
                    tr.append(td);
                });
                grid.find('tbody').append(tr);
            });
        })
    }

    
}
var formMode = null;