mntoForms = function () {
    var me = this;

    me.Globals = {
        cmbForm: $("#cmbForm"),
        cmbBD: $("#cmbBD"),
        tblBD: $("#tblBD"),
    };

    me.Funciones = {
        InicializarEventos: function () {
            $("#cmbBD").unbind().change(function () { me.Eventos.ValidarCargarBD() });
            $("#btnEnviar").unbind().click(function () { me.Eventos.ValidarEnviarInvitacion() });

            
        },
        ListarBD: function (http , parameters) {
            coreajax.ajax.PostAsync(http, parameters, function (data) {
                if (data.success) {
                    resultado = data.result;
                    me.Globals.tblBD.SetDataTableResponseNoButtons(me.Funciones.HeaderRow(resultado.header), resultado.rows);
                    me.Globals.tblBD.show();
                } else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
        HeaderRow: function (json) {
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
        TrxGetAllForms: function (http, parameter) {
            coreajax.ajax.PostAsync(http, parameter, function (data) {
                if (data.success) {
                    var res = data.result;
                    //console.log(res);

                    me.Globals.cmbForm.empty();
                    me.Globals.cmbForm.append('<option value="0">--Seleccionar--</option>');
                    for (i = 0; i < res.length - 1; i++) {
                        me.Globals.cmbForm.append('<option value=' + res[i]["idform"] + '>' + res[i]["titulo"] + '</option>');
                    }

                }
                else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
        TrxGetAllBD: function (http, parameter) {
            coreajax.ajax.PostAsync(http, parameter, function (data) {
                if (data.success) {
                    var res = data.result;
                    //console.log(res);

                    me.Globals.cmbBD.empty();
                    me.Globals.cmbBD.append('<option value="0">--Seleccionar--</option>');
                    for (i = 0; i < res.length - 1; i++){
                        me.Globals.cmbBD.append('<option value=' + res[i]["idbd"] + '>' + res[i]["name"] + '</option>');
                    }
                }
                else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
        TransacionInvitationSend: function (http, parameter) {
            coreajax.ajax.PostAsync(http, parameter, function (data) {
                if (data.success) {
                    toastr.success("Se envió la invitación correctamente", conexion.titulo, { timeOut: 1000 });
                    me.Globals.tblBD.hide();
                }
                else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
    }

    me.Eventos = {
        CargarComboGetAllForm: function (e) {
            var ruta = string_api(conexion.api, "api/Formularios/GetAllFormularios");
            var entidad = entidadmodel.requestGetAllParameters();
            entidad.idEmpresa = conexion.codigoempresa;
            entidad.idUsuario = conexion.codigousuario;

            me.Funciones.TrxGetAllForms(ruta, entidad);
        },
        CargarComboGetAllBD: function (e) {
            var ruta = string_api(conexion.api, "api/Formularios/GetAllBaseDatos");
            var entidad = entidadmodel.requestGetAllParameters();
            entidad.idEmpresa = conexion.codigoempresa;
            entidad.idUsuario = conexion.codigousuario;


            me.Funciones.TrxGetAllBD(ruta, entidad);
        },
        ValidarCargarBD: function (e) {
           // console.log(me.Globals.cmbBD.val());
            idBD = me.Globals.cmbBD.val();
            if (idBD != "" & idBD != undefined) {
                var ruta = string_api(conexion.api, "api/Formularios/GetOneBaseDatos");
                var entidad = entidadmodel.requestGetOneBD();
                entidad.idEmpresa = conexion.codigoempresa;
                entidad.idUsuario = conexion.codigousuario;
                entidad.idbd = idBD;
                
                me.Funciones.ListarBD(ruta, entidad);
                if (e !== undefined) e.preventDefault();
            }
           
        },
        ValidarEnviarInvitacion: function (e) {
           // console.log("VALIADR ENVIAR INVTIACION");
            var ruta = string_api(conexion.api, "api/Formularios/SendInvitation");
            var entidad = entidadmodel.requestSendInvitation();
            entidad.idEmpresa = conexion.codigoempresa;
            entidad.idUsuario = conexion.codigousuario;
            entidad.idForm = me.Globals.cmbForm.val();
                entidad.idBaseDatos = me.Globals.cmbBD.val();
            me.Funciones.TransacionInvitationSend(ruta, entidad);
        },

    }

    me.Inicializar = function () {
        me.Funciones.InicializarEventos();
        me.Eventos.CargarComboGetAllBD();
        me.Eventos.CargarComboGetAllForm();
    };
}

$(document).ready(function () {
    var oForms = new mntoForms();
    oForms.Inicializar();


});