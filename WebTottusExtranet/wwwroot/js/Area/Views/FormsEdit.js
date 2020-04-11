mntoForms = function () {
    var me = this;

    me.Globals = {
        tblforms: $("#tblforms"),
        hddidform: $("#hddidform"),
    };

    me.GlobalModalDelete = {
        formulario: $("#modal-form-eliminar"),
    };


    me.Funciones = {
        InicializarEventos: function () {
            $("#btnEliminar").unbind().click(function () { me.Eventos.ValidaEliminar(); });
            $(document).on('click', '#tblforms tr td .btnEditar', me.Eventos.ValidaEditar);
            $(document).on('click', '#tblforms tr td .btnEliminar', me.Eventos.VerModalEliminar);
        },
        InicializarAcciones: function () {
            me.Funciones.InicializarDatatable(me.Globals.tblforms);
        },
        InicializarDatatable: function (datatable) {
            datatable.ClearDataTable();
            datatable.SetDataTableResponseLoad(me.Funciones.DatatableColumn());
        },
        Listar: function (http,parametros) {
            coreajax.ajax.PostAsync(http, parametros, function (data) {
                if (data.success) {
                    me.Globals.tblforms.SetDataTableResponseNoButtons(me.Funciones.DatatableColumn(), data.result);
                } else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
        DatatableColumn: function () {
            var response = {};
            response = {
                columns: [
                    { title: "Titulo", data: 'titulo', visible: true, width: "60px", class: "dt-center" },
                    { title: "Fecha Vigencia", data: 'fecha_vigencia', visible: true, width: "150px", class: "dt-center" },
                    { title: "Comentaio", data: 'comentario', visible: true, width: "150px", class: "dt-center" },
                    {
                        title: "Estado", data: null, visible: true, width: "100px", className: "dt-center",
                        mRender: function (data, type, full, rows) {
                            if (data.estado == "1")
                                return '<i class="fa fa-check-circle-o" style="color:green;font-size:15px;"></i> <span style="color:green"> Activo </span>';
                            else
                                return '<i class="fa fa-ban" style="color:red;font-size:15px;"></i><span style="color:red"> Inactivo </span> ';
                        }
                    },
                    {
                        title: "Action", data: null, width: "60px", className: "dt-center",
                        mRender: function (data, type, full, rows) {
                            var str_html = "<div class='btn-group'> " +
                                "<a class='btn btn-white btn-bitbucket btnEditar' href='/Forms/FormsGenerator/EditarForm/" + data.idform+"' data-fila='" + rows.row + "' data-id-fila='" + data.idform + "'><i class='fa fa-edit'></i> </a>" +
                                "<a class='btn btn-white btn-bitbucket btnEliminar'  data-fila='" + rows.row + "' data-id-fila='" + data.idform + "' data-toggle='modal' data-target='#myModalEliminar' data-backdrop='static' data-keyboard='false'><i class='fa fa-trash-o'></i> </a>" +
                                
                                "</div>";
                            return str_html;
                        }
                    }
                ]
            };
            return response;
        },

        TransacionDelete: function (http, parameter) {
            coreajax.ajax.PostAsync(http, parameter, function (data) {
                if (data.success) {
                    toastr.success("Se elimino correctamente", conexion.titulo, { timeOut: 1000 });
                    me.GlobalModalDelete.formulario.find(".close").click();
                    me.Eventos.ValidaListar();
                }
                else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
    };

    me.Eventos = {
         ValidaListar: function (e) {
            var ruta = string_api(conexion.api, "api/Formularios/GetAllFormularios");
            var entidad = entidadmodel.requestGetAllFormularios();
            entidad.idEmpresa = conexion.codigoempresa;
            entidad.idUsuario = conexion.codigousuario;
            me.Funciones.Listar(ruta, entidad);
            if (e !== undefined) e.preventDefault();
        },
        ValidaEditar: function (e) {
            
        },
        VerModalEliminar: function (e) {
            var rowIndex = $(this).attr("data-fila");
            var tables = me.Globals.tblforms.DataTable();
            var data_table = tables.row(rowIndex).data();
            me.Globals.hddidform.val(data_table.idform);
        },
        ValidaEliminar: function (e) {
            var ruta = string_api(conexion.api, "api/Formularios/DeleteFormulario");
            var entidad = entidadmodel.requestGetAllFormularios();
            entidad.idEmpresa = conexion.codigoempresa;
            entidad.idUsuario = conexion.codigousuario;
            entidad.idForm = me.Globals.hddidform.val();
            me.Funciones.TransacionDelete(ruta, entidad);
        },
    };

    me.Inicializar = function () {
        me.Funciones.InicializarEventos();
        me.Funciones.InicializarAcciones();
        me.Eventos.ValidaListar();
    };
};

$(document).ready(function () {
    var oForms = new mntoForms();
    oForms.Inicializar();
});

