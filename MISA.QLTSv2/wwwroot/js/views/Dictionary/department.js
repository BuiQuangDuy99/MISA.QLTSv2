$(document).ready(function () {
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
        $('#btn-add-department').click(function () {
            me.formDetail.show();
        })
    }

    createFormDetail(formID, width, height) {
        var me = this;
        this.formDetail = new departmentForm(formID, width, height, me);
        this.formDetail.initLoadComboBox("DepartmentGroup", department);
    }

}

var departmentGrid = new Department('#gridDepartment');

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