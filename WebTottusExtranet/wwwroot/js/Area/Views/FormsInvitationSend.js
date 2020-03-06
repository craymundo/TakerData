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
        ListarBD: function (http) {
            coreajax.ajax.PostAsync(http, null, function (data) {
                if (data.success) {
                    me.Globals.tblBD.SetDataTableResponseNoButtons(me.Funciones.DatatableColumn(), data.result);
                    me.Globals.tblBD.show();
                } else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
        DatatableColumn: function () {
            var response = {};
            response = {
                columns: [
                    { title: "Columna 1", data: 'col1', visible: true, width: "150px", class: "dt-center" },
                    { title: "Columna 2", data: 'col2', visible: true, width: "150px",  class: "dt-center" },
                    { title: "Columna 3", data: 'col3', visible: true, width: "150px",  class: "dt-center" },
                    { title: "Columna 4", data: 'col4', visible: true, width: "150px",class: "dt-center" },
                    { title: "Columna 5", data: 'col5', visible: true, width: "150px", class: "dt-center" }
                  
                ]
            };
            return response;
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
        ValidarCargarBD: function (e) {
           // console.log(me.Globals.cmbBD.val());
            var ruta = string_api(conexion.api, "api/Formulario/GetOneBD");
            me.Funciones.ListarBD(ruta);
            if (e !== undefined) e.preventDefault();
        },
        ValidarEnviarInvitacion: function (e) {
           // console.log("VALIADR ENVIAR INVTIACION");
            var ruta = string_api(conexion.api, "api/Formulario/GetOneBD");
            parameter = "";
            me.Funciones.TransacionInvitationSend(ruta, parameter);
        },

    }

    me.Inicializar = function () {
        me.Funciones.InicializarEventos();
    
    };
}

$(document).ready(function () {
    var oForms = new mntoForms();
    oForms.Inicializar();
});