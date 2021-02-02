function callAjax(url, method, data) {
    $.ajax({
        url: url,
        method: method,
        data: JSON.stringify(data)
    }).done(function (res) {
        return res;
    }).fail(function (res) {
        return res;
    })
}