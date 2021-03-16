
class FormAdd extends baseForm {
    constructor(formId, width, height, jsCaller) {
        super(formId, jsCaller);

        this.FormAdd = $(formId).dialog({
            autoOpen: false,
            height: height,
            width: width,
            modal: true,
        })
        $('#txtreftranfer').autocomplete({
            minLength: 0,
            source: function (request, response) {
                $.ajax({
                    url: "https://localhost:44363/api/FixedAsset",
                    dataType: "json",
                    data: {
                        q: request.term
                    },
                    success: function (data) {
                        response(data);
                    }
                });
            },
            focus: function (event, ui) {
                $("#txtreftranfer").val(ui.item.label);
                return false;
            },
            select: function (event, ui) {
                $("#txtreftranfer").val(ui.item.name);
                $("#project-id").val(ui.item.email);

                return false;
            }
        })
            .data("ui-autocomplete")._renderItem = function (ul, item) {
                return $("<li>")
                    .data("ui-autocomplete-item", item)
                    .append("<a> " + item.name + "<br>" + item.email + "</a>")
                    .appendTo(ul);
            };
    }

    show(data) {
        let me = this;
        if (data) {
            me.bindingData(data);
            me.FormAdd.dialog('open');
        }
        me.FormAdd.dialog('open');
    }

    closeForm() {
        let me = this;
        me.resetForm();
        me.FormAdd.dialog('close');
    }

    saveChangeData(data) {
        debugger
        let me = this,
            grid = this.jsCaller.jsCaller.grid;
        //    column = $(grid).find('th'),
        //    row,
        //    dataType,
        //    fieldName,
        //    value,
        //    td;
        //column = row = $(`<tr></tr>`);
        //$(row).data('recordId', object[me.entity + 'Id']);

        //object["STT"] = index + 1;
        me.jsCaller.renderBody(data);

    }
}