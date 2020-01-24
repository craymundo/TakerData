const mainmntolocales = function () {

    var me = this;

    me.Globals = {
        tblinformaciontienda: $("#tblinformaciontienda"),
        tipo: $("#cboTipo"),
        cluster: $("#cboCluster"),
        estado: $("#cboEstado"),
        esPuntoRetiro: $("input:radio[name=radioInline]")
    };

    me.GlobalModal = {
        formulario: $("#modal-form-modal"),
        title: $("#Modal-Title"),
        idLocal: $("#hddIdLocal"),
        codigo: $("#txtCodigo"),
        nombre: $("#txtNombre"),
        nombrealternativo: $("#txtNombreAlternativo"),
        direccion: $("#txtDireccion"),
        tipo: $("#cboTipoLocalModal"),
        cluster: $("#cboClusterModal"),
        estado: $("#cboEstadoModal"),
        departamento: $("#txtDepartamento"),
        provincia: $("#txtProvincia"),
        distrito: $("#txtDistrito"),
        dias: $("#txtDias"),
        horario: $("#txtHorario"),
        telefono: $("#txtTelefono"),
        x: $("#txtCoordenadax"),
        y: $("#txtCoordenaday"),
        ubicacion: $("#txtUbicacion"),
        imagenLocal: $("#imagenLocal"),
        esPuntoRetiro: $("input:radio[name=radioInlinemodal]")
    };

    me.GlobalModalVer = {
        title: $("#Modal-Title-Ver"),
        codigo: $("#txtCodigoModalView"),
        nombre: $("#txtNombreModalView"),
        nombrealternativo: $("#txtNombreAlternativoModalView"),
        direccion: $("#txtDireccionModalView"),
        tipo: $("#txtTipoLocalModalView"),
        cluster: $("#txtClusterModalView"),
        estado: $("#txtEstadoModalView"),
        departamento: $("#txtDepartamentoModalView"),
        provincia: $("#txtProvinciaModalView"),
        distrito: $("#txtDistritoModalView"),
        dias: $("#txtDiasModalView"),
        horario: $("#txtHorarioModalView"),
        telefono: $("#txtTelefonoModalView"),
        x: $("#txtCoordenadaxModalView"),
        y: $("#txtCoordenadayModalView"),
        ubicacion: $("#txtUbicacionModalView"),
        imagenLocal: $("#imagenLocalView"),
    }

    me.GlobalModalEstado = {
        formulario: $("#modal-form-estado"),
        title: $("#Modal-Title-Estado"),
        nota: $("#txtNota"),
        bottonestado: $("#btnEstado"),
        IdEstado: $("#hddIdEstado"),
    }

    me.GlobalModalImagen = {
        formulario: $("#dropzoneForm"),
    }

    me.Funciones = {
        InicializarEventos: function () {
            $(document).on('click', '#btnBuscar', me.Eventos.ValidaListar);
            $(document).on('click', '#btnRegistrar', me.Eventos.ValidaRegistrar);
            $(document).on('click', '#tblinformaciontienda tr td #lnkVer', me.Eventos.ValidaVer);
            $(document).on('click', '#tblinformaciontienda tr td #lnkActualizar', me.Eventos.ValidaActulizar);
            $(document).on('click', '#tblinformaciontienda tr td #lnkActivar', me.Eventos.ValidaActivar);
            $(document).on('click', '#tblinformaciontienda tr td #lnkDesactivar', me.Eventos.ValidaDesactivar);
            $(document).on('click', '#tblinformaciontienda tr td #lnkUpload', me.Eventos.ValidaUploadImage);
        },
        InicializarAcciones: function () {
            me.Funciones.InicializarDatatable(me.Globals.tblinformaciontienda);
        },
        InicializarDatatable: function (datatable) {
            datatable.ClearDataTable();
            datatable.SetDataTableResponseLoad(me.Funciones.DatatableColumn());
        },
        Carga: function (http, parameter) {
            coreajax.ajax.PostAsync(http, parameter, function (data) {
                if (data.success) {
                    me.Globals.cluster.CreateSelected(data.result.clusterLocal, "idClusterLocal", "descripcion");
                    me.Globals.tipo.CreateSelected(data.result.tipoLocal, "idTipoLocal", "descripcion");
                    me.Globals.estado.CreateSelected(data.result.estadoLocal, "idEstadoLocal", "descripcion");
                    me.Globals.tipo.prop('selectedIndex', 1);
                    me.GlobalModal.idLocal.val("0");
                } else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
        Listar: function (http, parameter) {
            coreajax.ajax.PostAsync(http, parameter, function (data) {
                if (data.success) {
                    me.Globals.tblinformaciontienda.SetDataTableResponseNoButtons(me.Funciones.DatatableColumn(), data.result);
                } else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
        DatatableColumn: function () {
            var response = {};
            response = {
                columns: [
                    { title: "Codigo", data: 'codigoLocal', visible: true, width: "60px", class: "dt-center" },
                    { title: "Nombre", data: 'descripcionLocal', visible: true, width: "150px", class: "dt-center" },
                    {
                        title: "Tipo local", data: null, width: "150px", className: "dt-center",
                        mRender: function (data, type, full, rows) {
                            return data.tipoLocal.descripcion;
                        }
                    },
                    {
                        title: "Punto Retiro", data: null, visible: true, width: "60px", className: "dt-center",
                        mRender: function (data, type, full, rows) {
                            if (data.esPuntoRetiro)
                                return '<i class="fa fa-check" style="color:green;"></i>';
                            else
                                return '';
                        }
                    },
                    {
                        title: "Distrito/Comuna", data: null, visible: true, width: "100px", className: "dt-center",
                        mRender: function (data, type, full, rows) {
                            var descripcion = data.distrito;
                            return descripcion;
                        }
                    },
                    {
                        title: "Estado", data: null, visible: true, width: "100px", className: "dt-center",
                        mRender: function (data, type, full, rows) {
                            if (data.estadoLocal.idEstadoLocal == 1)
                                return '<i class="fa fa-check-circle-o" style="color:green;font-size:15px;"></i> <span style="color:green"> ' + data.estadoLocal.descripcion + ' </span>';
                            else
                                return '<i class="fa fa-ban" style="color:red;font-size:15px;"></i><span style="color:red"> ' + data.estadoLocal.descripcion + ' </span> ';
                        }
                    },
                    {
                        title: "Action", data: null, width: "60px", className: "dt-center",
                        mRender: function (data, type, full, rows) {
                            var str_html = "<div class='btn-group'> " +
                                "<button data-toggle='dropdown' class='btn btn-sm fa fa-bars'></button>" +
                                "<ul class='dropdown-menu' > " +
                                "<li> <a class='dropdown-item' href='#' id='lnkVer' data-fila='" + rows.row + "' data-id-fila='" + data.idLocal + "' data-toggle='modal' data-target='#myModalVer' data-backdrop='static' data-keyboard='false'>Ver</a></li> " +
                                "<li> <a class='dropdown-item' href='#' id='lnkActualizar' data-fila='" + rows.row + "' data-id-fila='" + data.idLocal + "' data-toggle='modal' data-target='#myModal' data-backdrop='static' data-keyboard='false'>Editar</a></li> " +
                                ((data.estadoLocal.idEstadoLocal != 1) ? "<li><a class='dropdown-item' href='#' id='lnkActivar' data-fila='" + rows.row + "' data-id-fila='" + data.idLocal + "' data-toggle='modal' data-target='#myModalEstado' data-backdrop='static' data-keyboard='false'> Activar </a></li>" : "<li><a class='dropdown-item' href='#' id='lnkDesactivar' data-fila='" + rows.row + "' data-id-fila='" + data.idLocal + "' data-toggle='modal' data-target='#myModalEstado' data-backdrop='static' data-keyboard='false'> Desactivar </a></li> ") +
                                "<li> <a class='dropdown-item' href='#' id='lnkUpload' data-fila='" + rows.row + "' data-id-fila='" + data.idLocal + "' data-toggle='modal' data-target='#myModalUpload' data-backdrop='static' data-keyboard='false'>Subir Imagen de Tienda</a></li> " +
                                "</ul > " +
                                "</div>";
                            return str_html;
                        }
                    }
                ]
            };
            return response;
        },
        CargaModal: function (http, parameter, index) {
            coreajax.ajax.PostAsync(http, parameter, function (data) {
                if (data.success) {
                    var id = parseInt(me.GlobalModal.idLocal.val());
                    me.Eventos.LimpiarModal();
                    me.GlobalModal.cluster.CreateSelected(data.result.clusterLocal, "idClusterLocal", "descripcion");
                    me.GlobalModal.tipo.CreateSelected(data.result.tipoLocal, "idTipoLocal", "descripcion");
                    me.GlobalModal.estado.CreateSelected(data.result.estadoLocal, "idEstadoLocal", "descripcion");
                    me.GlobalModal.tipo.prop('selectedIndex', 1);
                    me.GlobalModal.cluster.prop('selectedIndex', 1);

                    if (id === 0) {
                        me.GlobalModal.title.html("Agregar Tienda");
                    }
                    else {
                        
                        var tables = me.Globals.tblinformaciontienda.DataTable();
                        var data_table = tables.row(index).data();
                        me.GlobalModal.title.html("Tienda " + data_table.descripcionLocal);
                        me.GlobalModal.idLocal.val(data_table.idLocal);
                        me.GlobalModal.codigo.val(data_table.codigoLocal);
                        me.GlobalModal.codigo.attr("readonly", "readonly");
                        me.GlobalModal.codigo.attr("disabled", "disabled");
                        me.GlobalModal.nombre.val(data_table.descripcionLocal);
                        me.GlobalModal.nombrealternativo.val(data_table.descripcionAlternativa);
                        me.GlobalModal.direccion.val(data_table.direccion);
                        me.GlobalModal.departamento.val(data_table.departamento);
                        me.GlobalModal.provincia.val(data_table.provincia);
                        me.GlobalModal.distrito.val(data_table.distrito);
                        me.GlobalModal.dias.val(data_table.dias);
                        me.GlobalModal.horario.val(data_table.horario);
                        me.GlobalModal.telefono.val(data_table.telefono);
                        me.GlobalModal.x.val(data_table.x);
                        me.GlobalModal.y.val(data_table.y);
                        me.GlobalModal.ubicacion.val(data_table.geolocalizacion);
                        me.GlobalModal.estado.val(data_table.estadoLocal.idEstadoLocal);
                        me.GlobalModal.cluster.val(data_table.clusterLocal.idClusterLocal);
                        me.GlobalModal.tipo.val(data_table.tipoLocal.idTipoLocal);
                        var puntoretiro = data_table.esPuntoRetiro ? "P" : "T";
                        me.GlobalModal.esPuntoRetiro.filter("[value='" + puntoretiro + "']").prop('checked', true);
                        me.GlobalModal.imagenLocal.attr("src", data_table.imagen);
                    }
                } else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
        Transacion: function (http, parameter) {
            coreajax.ajax.PostAsync(http, parameter, function (data) {
                if (data.success) {
                    toastr.success("Se registro correctamente", conexion.titulo, { timeOut: 1000 });
                    me.GlobalModal.formulario.find(".close").click();
                    me.Eventos.ValidaListar();
                }
                else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
        TransacionEstado: function (http, parameter) {
            coreajax.ajax.PostAsync(http, parameter, function (data) {
                if (data.success) {
                    toastr.success("Se actualizo correctamente", conexion.titulo, { timeOut: 1000 });
                    me.GlobalModalEstado.formulario.find(".close").click();
                    me.Eventos.ValidaListar();
                }
                else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
    };

    me.Eventos = {
        InicializarCarga: function () {
            var ruta = string_api(conexion.api, "api/Local/LocalCargaInicial");
            var entidad = entidadmodel.localFiltroDto();
            me.Funciones.Carga(ruta, entidad);
        },
        ValidaListar: function (e) {
            var ruta = string_api(conexion.api, "api/Local/GetAllLocalTottus");
            var entidad = entidadmodel.localFiltroDto();
            entidad.idEstadoLocal = parseInt(me.Globals.estado.values());
            entidad.idTipoLocal = parseInt(me.Globals.tipo.values());
            entidad.idClusterLocal = parseInt(me.Globals.cluster.values());
            entidad.esPuntoRetiro = me.Globals.esPuntoRetiro.filter(":checked").val() == "P" ? true : false;
            me.Funciones.Listar(ruta, entidad);
            if (e !== undefined) e.preventDefault();
        },
        ValidaRegistrar: function (e) {
            me.GlobalModal.idLocal.val(0);
            var ruta = string_api(conexion.api, "api/Local/LocalCargaInicial");
            var entidad = entidadmodel.localFiltroDto();
            me.Funciones.CargaModal(ruta, entidad, undefined);
            me.Eventos.Rule();
        },
        LimpiarModal: function () {
            me.GlobalModal.codigo.val("");
            me.GlobalModal.nombre.val("");
            me.GlobalModal.nombrealternativo.val("");
            me.GlobalModal.direccion.val("");
            me.GlobalModal.departamento.val("");
            me.GlobalModal.provincia.val("");
            me.GlobalModal.distrito.val("");
            me.GlobalModal.dias.val("");
            me.GlobalModal.horario.val("");
            me.GlobalModal.telefono.val("");
            me.GlobalModal.x.val("");
            me.GlobalModal.y.val("");
            me.GlobalModal.ubicacion.val("");
            me.GlobalModal.estado.ClearSelect();
            me.GlobalModal.cluster.ClearSelect();
            me.GlobalModal.tipo.ClearSelect();
            me.GlobalModal.esPuntoRetiro.filter("[value='T']").prop('checked', true);
        },
        ValidaVer: function (e) {
            var rowIndex = $(this).attr("data-fila");
            var tables = me.Globals.tblinformaciontienda.DataTable();
            var data_table = tables.row(rowIndex).data();
            me.GlobalModalVer.title.html("Tienda " + data_table.descripcionLocal);
            me.GlobalModalVer.codigo.html(data_table.codigoLocal);
            me.GlobalModalVer.nombre.html(data_table.descripcionLocal);
            if (data_table.descripcionAlternativa == "") {
                me.GlobalModalVer.nombrealternativo.html("-");
            } else {
                me.GlobalModalVer.nombrealternativo.html(data_table.descripcionAlternativa);
            }
            
            me.GlobalModalVer.direccion.html(data_table.direccion);
            me.GlobalModalVer.tipo.html(data_table.tipoLocal.descripcion);
            me.GlobalModalVer.cluster.html(data_table.clusterLocal.descripcion);
            me.GlobalModalVer.estado.html(data_table.estadoLocal.descripcion);
            me.GlobalModalVer.departamento.html(data_table.departamento);
            me.GlobalModalVer.provincia.html(data_table.provincia);
            me.GlobalModalVer.distrito.html(data_table.distrito);
            me.GlobalModalVer.dias.html(data_table.dias);
            me.GlobalModalVer.horario.html(data_table.horario);
            me.GlobalModalVer.telefono.html(data_table.telefono);
            me.GlobalModalVer.x.html(data_table.x);
            me.GlobalModalVer.y.html(data_table.y);
            me.GlobalModalVer.ubicacion.attr("href", data_table.geolocalizacion);
            me.GlobalModalVer.ubicacion.attr("target", "_blank");
            me.GlobalModalVer.imagenLocal.attr("src", data_table.imagen);
        },
        ValidaActulizar: function (e) {
            var rowIndex = $(this).attr("data-fila");
            var localId = $(this).attr("data-id-fila")
            me.GlobalModal.idLocal.val(localId);
            var ruta = string_api(conexion.api, "api/Local/LocalCargaInicial");
            var entidad = entidadmodel.localFiltroDto();
            me.Funciones.CargaModal(ruta, entidad, rowIndex);
            me.Eventos.Rule();
        },
        ValidaActivar: function (e) {
            var rowIndex = $(this).attr("data-fila");
            var localId = $(this).attr("data-id-fila")
            me.GlobalModal.idLocal.val(localId);
            var tables = me.Globals.tblinformaciontienda.DataTable();
            var data_table = tables.row(rowIndex).data();
            me.GlobalModalEstado.title.html("¿Deseas activar la Tienda " + data_table.descripcionLocal + "?");
            me.GlobalModalEstado.bottonestado.html("Si, deseo activarla");
            me.GlobalModalEstado.IdEstado.val("1");
            me.GlobalModalEstado.nota.html(" ");
            me.Eventos.RuleEstado();
        },
        ValidaDesactivar: function (e) {
            var rowIndex = $(this).attr("data-fila");
            var localId = $(this).attr("data-id-fila")
            me.GlobalModal.idLocal.val(localId);
            var tables = me.Globals.tblinformaciontienda.DataTable();
            var data_table = tables.row(rowIndex).data();
            me.GlobalModalEstado.title.html("¿Deseas desactivar la Tienda " + data_table.descripcionLocal + "?");
            me.GlobalModalEstado.bottonestado.html("Si, deseo desactivarla");
            me.GlobalModalEstado.IdEstado.val("2");
            me.GlobalModalEstado.nota.html(" ");
            me.Eventos.RuleEstado();
        },
        ValidaUploadImage: function (e) {

        },
        ValidaTransacionEstado: function (e) {
            var ruta = string_api(conexion.api, "api/Local/UpdateStatusLocal");
            var entidad = entidadmodel.locales();
            var id = parseInt(me.GlobalModal.idLocal.val());
            entidad.idLocal = id;
            entidad.estadoLocal.idEstadoLocal = me.GlobalModalEstado.IdEstado.val();
            me.Funciones.TransacionEstado(ruta, entidad);
        },
        ValidaTransacion: function () {
            var entidad = entidadmodel.locales();
            var id = parseInt(me.GlobalModal.idLocal.val());
            entidad.idLocal = id;
            entidad.codigoLocal = me.GlobalModal.codigo.val();
            entidad.descripcionLocal = me.GlobalModal.nombre.val();
            entidad.descripcionAlternativa = me.GlobalModal.nombrealternativo.val();
            entidad.direccion = me.GlobalModal.direccion.val();
            entidad.departamento = me.GlobalModal.departamento.val();
            entidad.provincia = me.GlobalModal.provincia.val();
            entidad.distrito = me.GlobalModal.distrito.val();
            entidad.dias = me.GlobalModal.dias.val();
            entidad.horario = me.GlobalModal.horario.val();
            entidad.telefono = me.GlobalModal.telefono.val();
            entidad.x = me.GlobalModal.x.val();
            entidad.y = me.GlobalModal.y.val();
            entidad.geolocalizacion = me.GlobalModal.ubicacion.val();
            entidad.estadoLocal.idEstadoLocal = me.GlobalModal.estado.val();
            entidad.clusterLocal.idClusterLocal = me.GlobalModal.cluster.val();
            entidad.tipoLocal.idTipoLocal = me.GlobalModal.tipo.val();
            entidad.esPuntoRetiro = me.GlobalModal.esPuntoRetiro.filter(":checked").val() == "P" ? true : false;
            //entidad.codigoFormato = "";
            //entidad.descripcionFormato ="";
            //entidad.codigoCluster = "";
            //entidad.imagen = "";
            //entidad.direccionPmm = "";
            //entidad.region = "";
            if (id === 0)
                me.Funciones.Transacion(string_api(conexion.api, "api/Local/InsertLocal"), entidad);
            else
                me.Funciones.Transacion(string_api(conexion.api, "api/Local/UpdateLocal"), entidad);
        },
        Rule: function (id) {
            $(me.GlobalModal.formulario).validate({
                rules: {
                    txtCodigo: { required: true, number: true },
                    txtNombre: {
                        required: true,
                        spacelettersonlyNumber: {
                            depends: function (element) {
                                var status = true;
                                var ob = $(element).val();
                                if (ob.length > 0)
                                    status = true;
                                else
                                    status = false;
                                return status
                            }
                        }
                    },
                    txtNombreAlternativo: {
                        required: {
                            depends: function (element) {
                                var status = true;
                                var ob = $(element).val();
                                if (ob.length > 0)
                                    status = true;
                                else
                                    status = false;
                                return status
                            }
                        },
                        spacelettersonlyNumber: {
                            depends: function (element) {
                                var status = true;
                                var ob = $(element).val();
                                if (ob.length > 0)
                                    status = true;
                                else
                                    status = false;
                                return status
                            }
                        },
                    },
                    txtDireccion: { required: true },
                    txtDepartamento: { required: true, lettersonly: true },
                    txtProvincia: { required: true, lettersonly: true },
                    txtDistrito: { required: true, lettersonly: true },
                    txtDias: { required: true },
                    horario: { required: true },
                    txtTelefono: { required: true, number: true },
                    txtCoordenadax: { required: true },
                    txtCoordenaday: { required: true },
                    txtUbicacion: { required: true },
                    cboTipoLocalModal: { required: true, valueNotEquals: "0" },
                    cboClusterModal: { required: true, valueNotEquals: "0" },
                    cboEstadoModal: { required: true, valueNotEquals: "0" },
                },
                messages: {
                    txtCodigo: { required: "* ingrese codigo", number: "* el codigo es solo numero" },
                    txtNombre: { required: "* ingrese nombre", spacelettersonlyNumber: "* el nombre es letras y numeros" },
                    txtNombreAlternativo: { required: "* ingrese nombre alternativo", spacelettersonlyNumber: "* el nombre es letras y numeros" },
                    txtDireccion: { required: "* ingrese la dirección" },
                    txtDepartamento: { required: "* ingrese departamento", lettersonly: "* el departamento es solo letras" },
                    txtProvincia: { required: "* ingrese provincia", lettersonly: "* la provincia es solo letras" },
                    txtDistrito: { required: "* ingrese distrito", lettersonly: "* el distrito es solo letras" },
                    txtDias: { required: "* ingrese dias" },
                    horario: { required: "* ingrese el horario" },
                    txtTelefono: { required: "* ingrese telefono", number: "* el telefono es solo numero" },
                    txtCoordenadax: { required: "* ingrese la latitup" },
                    txtCoordenaday: { required: "* ingrese la longitud" },
                    txtUbicacion: { required: "* ingrese ubicación" },
                    cboTipoLocalModal: { required: "* seleccione el tipo local", valueNotEquals: "* seleccione el tipo local" },
                    cboClusterModal: { required: "* seleccione el cluster", valueNotEquals: "* seleccione el cluster" },
                    cboEstadoModal: { required: "* seleccione el estado", valueNotEquals: "* seleccione el estado" },
                },
                highlight: function (element) {
                    $(element).closest('.control-group').removeClass('success').addClass('error');
                },
                success: function (element) {
                    $(element).addClass('valid').closest('.control-group').removeClass('error').addClass('success');
                },
                submitHandler: function (form) {
                    me.Eventos.ValidaTransacion();
                }
            });
        },
        RuleEstado: function (id) {
            $(me.GlobalModalEstado.formulario).validate({
                rules: {
                    txtNota: { required: true },
                    hddIdLocal: { required: true },
                },
                messages: {
                    txtNota: { required: "* ingrese nota" },
                    hddIdLocal: { required: "* no tiene id" },
                },
                highlight: function (element) {
                    $(element).closest('.control-group').removeClass('success').addClass('error');
                },
                success: function (element) {
                    $(element).addClass('valid').closest('.control-group').removeClass('error').addClass('success');
                },
                submitHandler: function (form) {
                    me.Eventos.ValidaTransacionEstado();
                }
            });
        },
    };

    me.Inicializar = function () {
        me.Funciones.InicializarEventos();
        me.Funciones.InicializarAcciones();
        me.Eventos.InicializarCarga();
    };
};

$(document).ready(function () {
    const mntolocales = new mainmntolocales();
    mntolocales.Inicializar();
});

// $("#dropzoneForm").dropzone({ url: "/file/post" });
//Dropzone.options.dropzoneForm = {
//    paramName: "file", // The name that will be used to transfer the file
//    maxFilesize: 2, // MB
//    uploadMultiple: false,
//    acceptedFiles: "image/*",
//    dictDefaultMessage: "<strong>Drop files here or click to upload. </strong></br> (This is just a demo dropzone. Selected files are not actually uploaded.)"
//};


