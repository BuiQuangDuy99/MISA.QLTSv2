﻿$(document).ready(function () {
    $('#cbxDepartment').combobox();
})


// khởi tạo bảng và form màn hình danh sách phòng ban
class Department extends BaseGrid {
   
    constructor(gridId) {
        super(gridId);
        this.initEvents();
    }

    initEvents() {
        let me = this;
        super.initEvents();
        showTooltipElement($('button'));
        showTooltipElement($('td'));
    }

    /**
     * Hàm khởi tạo form của màn hình loại tài sản
     * @param {any} formID id form
     * @param {any} width chiều rộng
     * @param {any} height chiều cao
     * CreatedBY: DVVUONG(26/02/2021)
     */
    createFormDetail(formID, width, height) {
        let me = this;
        this.formDetail = new departmentForm(formID, width, height, me);
        debugger;
        this.formDetail.initLoadComboBox("DepartmentGroup", department);
    }

}

var departmentGrid = new Department('#gridDepartment');

// Biến config cho từng column trong bảng
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

//Khởi tạo form danh sách phòng ban
departmentGrid.createFormDetail("#department_dialog", 360);

// THiết lập config header
departmentGrid.setConFigColum(conFigColum);

// Load dữ liệu grid
departmentGrid.loadData(department);