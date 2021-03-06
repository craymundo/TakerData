﻿mntoForms = function () {
    var me = this;

    me.GlobalsUrl = {
        urlPostOnOnLoadBaseDatos: $("#urlPostOnOnLoadBaseDatos"),
        urlPostSendBaseDatos: $("#urlPostSendBaseDatos"),
    }

    me.Globals = {
        idUsuario: $("#hddidusuario"),
        idEmpresa: $("#hddidempresa"),
        tblHeaders: $("#tblHeaders"),
        hddcountHeader: $("#hddcountHeader"),
        tblBD: $("#tblBD"),
    }

    me.Funciones = {
        InicializarEventos: function () {
          
            $("#btnCargarBase").unbind().click(function () {me.Eventos.ValidaUploadPreview()});
            $("#btnUpload").unbind().click(function () { me.Eventos.ValidaUploadBD() });
        },
        PreviewCargarArchivo: function (formData) {
            $.ajax({
                url: me.GlobalsUrl.urlPostOnOnLoadBaseDatos.val(),
                type: "post",
                enctype: 'multipart/form-data',
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (response) {
                    //console.log(response);
                    resultado = response;
                    //console.log(resultado.data.header);
                    me.Globals.tblHeaders.SetDataTableResponseNoButtonsCustom(me.Funciones.DatatableHeadersColumn(), resultado.data.header , false);
                    me.Globals.tblBD.SetDataTableResponseNoButtons(me.Funciones.DatatableRowsColumn(resultado.data.header), resultado.data.rows);
                   console.log(resultado.data.header.length);
                }
            })
        },
        DatatableHeadersColumn: function () {
            var response = {};
            response = {
                columns: [
                    {
                        title: "Cabecera", data: null, visible: true, width: "60px", class: "dt-center",
                        mRender: function (data, type, full, rows) {
                            var str_html = "<label>"+data.header+"</label> ";

                            return str_html;
                        }
                    },
                  
                    {
                        title: "Action", data: null, width: "60px", className: "dt-center",
                        mRender: function (data, type, full, rows) {
                            var str_html = " <select class='form-control' id='cmb" + rows.row +"'> " +
                                " <option value='0'>Asignar</option>" +
                                " <option value='1'>Nombres</option>" +
                                " <option value='2'>Email</option>" +
                                " <option value='3'>DNI</option>" +
                                " <option value='4'>Celular</option>" +
                                "</select>";
                            return str_html;
                        }
                    }
                ]
            };
            return response;
        },
        DatatableRowsColumn: function (json) {
            console.log(json);

            var listOfObjects = [];
            // var a = ["car", "bike", "scooter"];
            var cont = 1;
            json.forEach(function (entry) {
              
                var singleObj = {};
                singleObj['title'] = entry.header;
                singleObj['data'] = "col" + cont;
                singleObj['visible'] = true;
                singleObj['class'] = "dt-center";
                listOfObjects.push(singleObj);
                cont++;
            });

            console.log(listOfObjects);
            var response = {};
            
            response = {
                columns: listOfObjects
            };
            return response;
        },
        CargarBD: function (http, parametros) {
            coreajax.ajax.PostAsync(http, parametros, function (data) {
                if (data.success) {

                    toastr.success("Se cargo correctamente la base de datos", conexion.titulo, { timeOut: 1000 });
                    $('#file').val("");
                    $("#page-wrapper > div:nth-child(3) > div:nth-child(1) > div > div > div > div > label").html("");
                    me.Globals.tblHeaders.ClearDataTable();
                    me.Globals.tblBD.ClearDataTable();
                    $("#tblHeaders").empty();
                    $("#tblBD").empty();

                } else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        }

    };
    
    me.Eventos = {
        ValidaUploadPreview: function () {
            var formData = new FormData();
            file = $('#file')[0].files[0];
            formData.append("idusuario", me.Globals.idUsuario.val());
            formData.append("idempresa", me.Globals.idEmpresa.val());
            formData.append("files", file);
            me.Funciones.PreviewCargarArchivo(formData);
        },
        ValidaUploadBD: function () {
            var headers = [];
            cont = 0;
            $("#tblHeaders tbody tr").each(function (index) {
                var valName = "";
                var valTypeColumn = "";
                $(this).children("td").each(function (index2) {
                    
                    switch (index2) {
                        case 0:
                            console.log($(this).find("label").text());
                            valName = $(this).find("label").text();
                            break;
                        case 1:
                            console.log($(this).find("select").val());
                            valTypeColumn  = $(this).find("select").val();
                            break;
                    }
                });
                var header = { name: valName, typeColumn: valTypeColumn };
                headers.push(header);
                cont++;
            });

            var rows = [];
            cont = 0;
            $("#tblBD tbody tr").each(function (index) {
                var valName = "";
                var valTypeColumn = "";
                $(this).children("td").each(function (index2) {

                    switch (index2) {
                        case 0:
                          
                            col1 = $(this).text();
                            break;
                        case 1:
                           
                            col2 = $(this).text();
                            break;
                        case 2:

                            col3 = $(this).text();
                            break;
                        case 3:

                            col4 = $(this).text();
                            break;
                        case 4:

                            col5 = $(this).text();
                            break;
                        case 5:

                            col6 = $(this).text();
                            break;

                        case 6:

                            col7 = $(this).text();
                            break;
                    }
                });
                var row = { col1: col1, col2: col2, col3: col3, col4: col4, col5: col5, col6: col6, col7: col7 };
                rows.push(row);
                cont++;
            });

            console.log(headers);
            var ruta = string_api(conexion.api, "api/Formularios/SendBaseDatos");
            var entidad = entidadmodel.requestSendBaseDatos();
            entidad.idEmpresa = conexion.codigoempresa;
            entidad.idUsuario = conexion.codigousuario;
            entidad.header = headers;
            entidad.rows = rows;
            //console.log(entidad);
            me.Funciones.CargarBD(ruta, entidad);
           
        },

    };


    me.Inicializar = function () {
        me.Funciones.InicializarEventos();
    };
};

$(document).ready(function () {


    var oForms = new mntoForms();
    oForms.Inicializar();

    $('.custom-file-input').on('change', function () {
        let fileName = $(this).val().split('\\').pop();
        console.log(fileName);
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    });
});