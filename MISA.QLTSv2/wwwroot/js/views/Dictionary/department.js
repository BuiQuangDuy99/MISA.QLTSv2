﻿$(document).ready(function () {
    new DepartmentJS();
    $('#v-cbxdepartment').combobox();
})

// Class quản lý sự kiện cho trang Departments
class DepartmentJS extends BaseGrid {
    constructor(gridId) {
        super(gridId);
    }

    initEvents() {
        super.initEvents();
    }
}

var departmentGrid = new DepartmentJS('#gridDepartment');

var conFigColum = [
    {
        DataType: "number",
        FieldName: "STT",
        FieldText: "STT",
        Index: 1
    },
    {
        DataType: "text",
        FieldName: "DepartmentCode",
        FieldText: "Mã bộ phận",
        Index: 2
    },
    {
        DataType: "text",
        FieldName: "DepartmentName",
        FieldText: "Tên bộ phận",
        Index: 3
    },
    {
        DataType: "text",
        FieldName: "DepartmentGroupName",
        FieldText: "Trực thuộc",
        Index: 4
    },
    {
        DataType: "text",
        FieldName: "Note",
        FieldText: "Ghi chú",
        Index: 5
    }
];

departmentGrid.setConFigColum(conFigColum);

departmentGrid.loadData(departments);
