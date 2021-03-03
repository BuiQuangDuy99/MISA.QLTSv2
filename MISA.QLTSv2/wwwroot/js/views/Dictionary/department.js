$(document).ready(function () {
    $('#cboDepartment').autocomplete({
        source: availableTags
    })
})


// khởi tạo bảng và form màn hình danh sách phòng ban
class Department extends BaseGrid {
   
    constructor(gridId, entity) {
        super(gridId, entity);
        this.initEvents();
    }

    initEvents() {
        let me = this;
        super.initEvents();
        showTooltipElement($('button'));
        showTooltipElement($('td'));
    }
    /**
     * 
     * 
     * */
    setUrl() {
        this.url = 'https://localhost:44363/api/v1/Department';
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
        this.formDetail.initLoadComboBox("DepartmentGroup", department);
    }

}

var departmentGrid = new Department('#gridDepartment', "Department");

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
        FieldName: "ParentName",
        FieldText: "Trực thuộc",
        Index: 4
    },
    {
        DataType: "text",
        FieldName: "Description",
        FieldText: "Ghi chú",
        Index: 5
    }
];
var availableTags = [
    "Phòng nghiên cứu công nghệ",
    "Phòng giáo dục",
    "Phòng nhân sự",
    "Phòng hành chính sự nghiệp",
    "Phòng tài chính",

];
//Khởi tạo form danh sách phòng ban
departmentGrid.createFormDetail("#department_dialog", 360);

// THiết lập config header
departmentGrid.setConFigColum(conFigColum);

// Load dữ liệu grid
departmentGrid.loadAjaxData('https://localhost:44363/api/v1/Department');