const mntoForms = function () {
    var me = this;

    me.Globals = {
        titulo: $("#txtTitulo"),
        comentario: $("#txtComentario"), 
        fechavigencia: $("#txtFechaVigencia"),
        div_form_1: $("#div_form_1"),
        div_form_2: $("#div_form_2"),
        div_form_3: $("#div_form_3"),
    };


    me.Funciones = {
        InicializarEventos: function () {
            $(document).on('click', '#btnSiguiente1', me.Eventos.NextOne);
            $(document).on('click', '#btnAtras1', me.Eventos.PreviousOne);
            $(document).on('click', '#btnSiguiente2', me.Eventos.NextTwo);
            $(document).on('click', '#btnAtras2', me.Eventos.PreviousTwo);
            $(document).on('click', '#btnGuardar', me.Eventos.ValidarGuardar);
        },
        GetOneForm: function (http) {
            coreajax.ajax.PostAsync(http, null, function (data) {
                if (data.success) {
                    me.Globals.titulo.val(data.result.titulo);
                    me.Globals.comentario.val(data.result.comentario);
                    me.Globals.fechavigencia.val(data.result.fecha_vigencia);

                } else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
    };

    me.Eventos = {
        GetOneForm: function (e) {
            var ruta = string_api(conexion.api, "api/Formulario/GetOneForm");
            me.Funciones.GetOneForm(ruta);
            if (e !== undefined) e.preventDefault();
        },
        NextOne: function (e) {
            me.Globals.div_form_1.hide(1000);
            me.Globals.div_form_2.show(1000);
        },
        PreviousOne: function (e) {
            me.Globals.div_form_2.hide(1000);
            me.Globals.div_form_1.show(1000);
        },
        NextTwo: function (e) {
            me.Globals.div_form_2.hide(1000);
            me.Globals.div_form_3.show(1000);
        }, 
        PreviousTwo: function (e) {
            me.Globals.div_form_3.hide(1000);
            me.Globals.div_form_2.show(1000);
        },
        ValidarGuardar: function (e) {
            console.log("ACTUALIZAR FORM");
        }
    };

    me.Inicializar = function () {
        me.Funciones.InicializarEventos();
        me.Eventos.GetOneForm();
    };
};

$(document).ready(function () {
    var oForms = new mntoForms();
    oForms.Inicializar();
});

