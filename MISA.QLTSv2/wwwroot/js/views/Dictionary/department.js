
$(document).ready(function () {
    new DepartmentJS('#gridDepartment');
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
        Field: "DepartmentCode",
        FieldText: "Mã bộ phận",
        Index: 2
    },
    {
        DataType: "text",
        Field: "DepartmentName",
        FieldText: "Tên bộ phận",
        Index: 3
    },
    {
        DataType: "text",
        Field: "DepartmentGroupName",
        FieldText: "Trực thuộc",
        Index: 4
    },
    {
        DataType: "text",
        Field: "Note",
        FieldText: "Ghi chú",
        Index: 5
    }
];

// Class quản lý sự kiện cho trang Departments
class DepartmentJS extends Grid {
    constructor(tableId) {
        super(tableId);
    }

    renderBody() {
        try {
            var me = this;
            var grid = this.grid;

            $.getJSON("/js/departments.json", function (data) {
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
}