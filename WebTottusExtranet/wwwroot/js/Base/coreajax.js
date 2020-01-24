var coreajax;
var ajaxrequest = null;

$(document).ready(function () {

    var request = function () {
        var input = this;
        input.ajax = {
            PostAsync: function (url, datasend, fresult) {

                $.ajax({
                    url: url,
                    cache: false,
                    async: true,
                    crossOrigin: true,
                    crossDomain: true,
                    dataType: 'json',
                    method: "POST",
                    data: JSON.stringify(datasend),
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        "accept": "application/json"
                    },
                    xhr: function () {
                        return this._xhr = new XMLHttpRequest();
                    },
                    beforeSend: function (jqXHR, settings) {
                        $.msg({ autoUnblock: false, clickUnblock: false });
                    },
                    complete: function (jqXHR, textStatus) {

                    },
                    success: function (data, textStatus, jqXHR) {
                        fresult(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        var motivo_error = "";
                        if (jqXHR.responseJSON !== null || jqXHR.responseJSON !== undefined) {
                            motivo_error = jqXHR.responseJSON.message;
                        }
                        else {
                            var error = strMethodToCall.split('/');
                            motivo_error = "Se produjo un error en el metodo - " + error[3];
                        }
                        if ($(".sweet-alert.visible").length > 0) {
                            swal.close();
                        }
                        toastr.error(motivo_error, conexion.tituto);
                        //try {
                        //    if (textStatus === 'parsererror') {
                        //        input.ajax.viewError(jqXHR, textStatus);
                        //    }
                        //    else {
                        //        var responseTitle = $(jqXHR.responseText).filter('title').get(0);
                        //        var mensaje = ($(responseTitle).text() + ": " + input.ajax.GetError(jqXHR, textStatus));
                        //        toastr.error(JSON.stringify(mensaje), 'Nao Solutions');
                        //    }
                        //} catch (e) {
                        //    toastr.error(JSON.stringify(e.meesage), 'Nao Solutions');
                        //}
                    }
                }).done(function (data) {
                }).fail(function (data) {
                    $.msg('unblock');
                });
            },
            Post: function (url, datasend) {

                if (ajaxrequest) ajaxrequest.abort();

                ajaxrequest =
                    $.ajax({
                        url: url,
                        cache: false,
                        async: false,
                        crossOrigin: true,
                        crossDomain: true,
                        dataType: 'json',
                        method: "POST",
                        data: datasend,
                        //data: JSON.stringify(datasend),
                        // contentType: 'application/json; charset=utf-8',
                        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
                        headers: {
                            "accept": "application/json"
                        },
                        xhr: function () {
                            return this._xhr = new XMLHttpRequest();
                        },
                        beforeSend: function (jqXHR, settings) { },
                        complete: function (jqXHR, textStatus) { },
                        success: function (data, textStatus, jqXHR) { },
                        error: function (jqXHR, textStatus, errorThrown) {
                            //var error = jqXHR.responseText;
                            var error = $.parseJSON(jqXHR.responseText).Message;
                            console.log("error : " + JSON.stringify(error));
                        }
                    }).done(function (data) {
                    }).fail(function (data) { });

                return ajaxrequest.responseJSON;
            },
            GetAsync: function (url, datasend, fresult) {

                $.ajax({
                    url: url,
                    cache: false,
                    async: true,
                    crossOrigin: true,
                    crossDomain: true,
                    dataType: 'json',
                    method: "GET",
                    data: datasend,
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        "accept": "application/json"
                    },
                    xhr: function () {
                        return this._xhr = new XMLHttpRequest();
                    },
                    beforeSend: function (jqXHR, settings) {
                        $.msg({ autoUnblock: false });
                    },
                    complete: function (jqXHR, textStatus) {

                    },
                    success: function (data, textStatus, jqXHR) {
                        fresult(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        var error = $.parseJSON(jqXHR.responseText).Message;
                        console.log("error : " + JSON.stringify(error));
                    }
                }).done(function (data) {
                }).fail(function (data) {
                    $.msg('unblock');
                });

            },
            Get: function (url, datasend) {

                if (ajaxrequest) ajaxrequest.abort();
                ajaxrequest =
                    $.ajax({
                        url: url,
                        cache: false,
                        async: false,
                        crossOrigin: true,
                        crossDomain: true,
                        dataType: 'json',
                        method: "GET",
                        data: datasend,
                        contentType: 'application/json; charset=utf-8',
                        headers: {
                            "accept": "application/json"
                        },
                        xhr: function () {
                            return this._xhr = new XMLHttpRequest();
                        },
                        beforeSend: function (jqXHR, settings) { },
                        complete: function (jqXHR, textStatus) { },
                        success: function (data, textStatus, jqXHR) { },
                        error: function (jqXHR, textStatus, errorThrown) {
                            var error = $.parseJSON(jqXHR.responseText).Message;
                            console.log("error : " + JSON.stringify(error));
                        }
                    }).done(function (data) {
                    }).fail(function (data) { });

                return ajaxrequest.responseJSON;
            },
            GetError: function (jqXHR, exception) {
                if (jqXHR.status === 0) {
                    return ('Not connected.\nPlease verify your network connection.');
                } else if (jqXHR.status === 404) {
                    return ('The requested page not found. [404]');
                } else if (jqXHR.status === 500) {
                    return ('Internal Server Error [500].');
                } else if (exception === 'parsererror') {
                    return ('Requested JSON parse failed.');
                } else if (exception === 'timeout') {
                    return ('Time out error.');
                } else if (exception === 'abort') {
                    return ('Ajax request aborted.');
                } else {
                    return ('Uncaught Error.\n' + jqXHR.responseText);
                }
            },
            viewError: function (jqXHR, exception) {
                var body_temporal = $("#bodyInspinia").html();

                try {
                    var body_error = null;
                    var tipo_error = null;
                    var existe = $(jqXHR.responseText).find("#bodyInspinia").length;

                    if (existe > 0) {
                        tipo_error = $(jqXHR.responseText).find("#bodyInspinia").find('text').get(0).id;
                        body_error = $(jqXHR.responseText).find("#bodyInspinia").html();
                    }
                    else {
                        tipo_error = $(jqXHR.responseText).filter('text').get(0).id;
                        body_error = jqXHR.responseText;
                    }

                    if (tipo_error === "viewAcceso" || tipo_error === "viewSession") {
                        $("#bodyInspinia").empty();
                        $("#bodyInspinia").append(body_error);
                    }
                } catch (e) {
                    $("#bodyInspinia").append(body_temporal);
                    toastr.error(JSON.stringify(e.meesage), 'Nao Solutions');
                }
            },
            DeleteAsync: function (url, datasend, fresult) {

                $.ajax({
                    url: url,
                    cache: false,
                    async: true,
                    crossOrigin: true,
                    crossDomain: true,
                    dataType: 'json',
                    method: "DELETE",
                    data: JSON.stringify(datasend),
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        "accept": "application/json"
                    },
                    xhr: function () {
                        return this._xhr = new XMLHttpRequest();
                    },
                    beforeSend: function (jqXHR, settings) {
                        $.msg({ autoUnblock: false, clickUnblock: false });
                    },
                    complete: function (jqXHR, textStatus) {

                    },
                    success: function (data, textStatus, jqXHR) {
                        fresult(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        debugger;
                        try {
                            if (textStatus === 'parsererror') {
                                input.ajax.viewError(jqXHR, textStatus);
                            }
                            else {
                                var responseTitle = $(jqXHR.responseText).filter('title').get(0);
                                var mensaje = ($(responseTitle).text() + ": " + input.ajax.GetError(jqXHR, textStatus));
                                toastr.error(JSON.stringify(mensaje), 'Nao Solutions');
                            }
                        } catch (e) {
                            toastr.error(JSON.stringify(e.meesage), 'Nao Solutions');
                        }
                    }
                }).done(function (data) {
                }).fail(function (data) {
                    $.msg('unblock');
                });
            },
            PutAsync: function (url, datasend, fresult) {

                $.ajax({
                    url: url,
                    cache: false,
                    async: true,
                    crossOrigin: true,
                    crossDomain: true,
                    dataType: 'json',
                    method: "PUT",
                    data: JSON.stringify(datasend),
                    contentType: 'application/json; charset=utf-8',
                    headers: {
                        "accept": "application/json"
                    },
                    xhr: function () {
                        return this._xhr = new XMLHttpRequest();
                    },
                    beforeSend: function (jqXHR, settings) {
                        $.msg({ autoUnblock: false, clickUnblock: false });
                    },
                    complete: function (jqXHR, textStatus) {

                    },
                    success: function (data, textStatus, jqXHR) {
                        fresult(data);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        debugger;
                        try {
                            if (textStatus === 'parsererror') {
                                input.ajax.viewError(jqXHR, textStatus);
                            }
                            else {
                                var responseTitle = $(jqXHR.responseText).filter('title').get(0);
                                var mensaje = ($(responseTitle).text() + ": " + input.ajax.GetError(jqXHR, textStatus));
                                toastr.error(JSON.stringify(mensaje), 'Nao Solutions');
                            }
                        } catch (e) {
                            toastr.error(JSON.stringify(e.meesage), 'Nao Solutions');
                        }
                    }
                }).done(function (data) {
                }).fail(function (data) {
                    $.msg('unblock');
                });
            }
        };
    };
    coreajax = new request();
});