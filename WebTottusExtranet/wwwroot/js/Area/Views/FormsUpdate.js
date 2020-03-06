mntoForms = function () {
    var me = this;

    me.Globals = {
        titulo: $("#txtTitulo"),
        comentario: $("#txtComentario"), 
        fechavigencia: $("#txtFechaVigencia"),
        div_form_1: $("#div_form_1"),
        div_form_2: $("#div_form_2"),
        div_form_3: $("#div_form_3"),
        titleFormPaso2: $("#titleFormPaso2"),
        lblComentarioForm: $("#lblComentarioForm"),
        lblFechaVigenteForm: $("#lblFechaVigenteForm"),
        titleForm: $("#titleForm"),
    };

    me.GlobalsPopUp = {

    };

    var id_opciones = 1;
    
    me.Funciones = {
        InicializarEventos: function () {
            $(document).on('click', '#btnSiguiente1', me.Eventos.NextOne);
            $(document).on('click', '#btnAtras1', me.Eventos.PreviousOne);
            $(document).on('click', '#btnSiguiente2', me.Eventos.NextTwo);
            $(document).on('click', '#btnAtras2', me.Eventos.PreviousTwo);
            $(document).on('click', '#btnGuardar', me.Eventos.ValidarGuardar);
            $(document).on('click', '#btnGuardarControl', me.Eventos.ValidarGuardarPregunta);
            $(document).on('click', '#btnAgregarOpcion', me.Eventos.ValidarAgregarOpcPregunta);      

            $('#myModalVer').unbind().on("hidden.bs.modal", function () {

                var id_lista = $("#hddIdlsta").val();
                var pregunta = $("#txtPregunta").val();

                if (pregunta != "" && pregunta != null && pregunta != undefined)
                    $("#" + id_lista).find("span.class-text").text(pregunta);

                $("#hddIdlsta").val("");
                $("#hddidcontrol").val("");
                $("#hddTipoPregunta").val("");
                $("#txtPregunta").val("");
                $("#cmbTipoRspta").val("0");
                $('input[name="rdbRsptaObg"]:checked').val();
                $('input[name="rdbRsptaLarga"]:checked').val();
                $("#cmbSimbolo").val("0");
                $("#cmbNiveles").val("0");
                $("#cmbrestriccion").val("0");
                $("#txtvalor1").val("");
                $("#txtvalor2").val("");

                $("input[name=rdbRsptaObg][value='0']").attr('checked', 'checked');
                $("input[name=rdbRsptaLarga][value='0']").attr('checked', 'checked');
                $('input:radio[name="rdbRsptaObg"]').filter('[value="0"]').iCheck('check');
                $('input:radio[name="rdbRsptaLarga"]').filter('[value="0"]').iCheck('check');
                $("#myModalVer").find(".div_opcioness").remove();


            });   
            

            me.Funciones.CargarSortable();
        },
        CargarSortable: function () {
          
            var example4Left = document.getElementById('div_left_control');
            var example4Right = document.getElementById('div_rigth_contenido');

            new Sortable(example4Left, {
                group: {
                    name: 'shared',
                    pull: 'clone',
                    put: false 
                },
                animation: 150,
                sort: false 
            });

            new Sortable(example4Right, {
                group: 'shared',
                animation: 150,
                dataIdAttr: 'data-id',
                onSort: function (evt) {

                    if (evt.pullMode == "clone") {
                        var d = new Date();
                        var timer = d.getTime();
                        var newIndex = evt.newIndex;
                        var objeto_nodo = $("#div_rigth_contenido").children().eq(newIndex);
                        var html_object = $("#div_rigth_contenido").find("li")[newIndex].innerHTML;
                        var id_li = 'li_' + timer;
                        var id_del = timer + "_" + newIndex + "_del";
                        var id_edit = timer + "_" + newIndex + "_edit";
                        var lnk_del = "<a href='#' class='btn btn-white btn-bitbucket btn-li-delete' data-li-id='" + id_li + "' data-index='" + newIndex + "' id='" + id_del + "'><i class='fa fa-trash-o'></i></a>";

                        $("#hddidcontrol").val(timer);
                        $("#hddIdlsta").val(id_li);

                        objeto_nodo.attr('id', id_li);

                        $("#myModalVer > div > div > div.modal-header > h4").html("<b>" + (newIndex + 1) + "</b>&nbsp;&nbsp;<b>Detalle de Pregunta</b>");
                        $("#txtPregunta").parent().find("label").html("<strong>Pregunta</strong>");
                        $("#txtPregunta").attr("placeholder", "Escriba su Pregunta");

                        var pattern = /fa-list/g;
                        if (pattern.test(html_object)) {
                            var lnk_edit = "<a href='#' class='btn btn-white btn-bitbucket btn-li-edit' data-tipo='1' data-li-id='" + id_li + "' data-index='" + newIndex + "' id='" + id_edit + "'><i class='fa fa-edit'></i></a>";
                            html_fa_list = "<b>" + (newIndex + 1) + "</b>  <i class='fa fa-list'></i> <span class='class-text'>Opcion</span> <span class='float-right controles'>" + lnk_edit + lnk_del + "</span>";
                            objeto_nodo.html(html_fa_list);
                            $("#hddTipoPregunta").val("1");
                            $("#div_tipo_respuestas").show();
                            $(".div_opciones").show();
                            $("#div_opciones").show();
                            $("#div_respuesta").hide();
                            $("#div_restricciones").hide();
                            $("#div_rspt_larga_1").hide();
                            $("#div_rspt_larga_2").hide();
                            $("#div_calificacion").hide();

                            $("#div_tipo_preguntas").show();
                        }

                        var pattern = /fa-square-o/g;
                        if (pattern.test(html_object)) {
                            var lnk_edit = "<a href='#' class='btn btn-white btn-bitbucket btn-li-edit' data-tipo='2' data-li-id='" + id_li + "' data-index='" + newIndex + "' id='" + id_edit + "'><i class='fa fa-edit'></i></a>";
                            html_fa_square = "<b>" + (newIndex + 1) + "</b>  <i class='fa fa-square-o'></i> <span class='class-text'>Texto</span> <span class='float-right controles'>" + lnk_edit + lnk_del + "</span>";
                            objeto_nodo.html(html_fa_square);
                            $("#hddTipoPregunta").val("2");
                            $("#div_tipo_respuestas").hide();
                            $(".div_opciones").hide();
                            $("#div_opciones").hide();
                            $("#div_restricciones").show();
                            $("#div_respuesta").show();

                            $("#div_rspt_larga_1").show();
                            $("#div_rspt_larga_2").show();
                            $("#div_calificacion").hide();

                            $("#div_tipo_preguntas").show();
                        }

                        var pattern = /fa-calendar/g;
                        if (pattern.test(html_object)) {
                            var lnk_edit = "<a href='#' class='btn btn-white btn-bitbucket btn-li-edit' data-tipo='3' data-li-id='" + id_li + "' data-index='" + newIndex + "' id='" + id_edit + "'><i class='fa fa-edit'></i></a>";
                            html_fa_list = "<b>" + (newIndex + 1) + "</b>  <i class='fa fa-calendar'></i> <span class='class-text'>Fecha</span> <span class='float-right controles'>" + lnk_edit + lnk_del + "</span>";
                            objeto_nodo.html(html_fa_list);
                            $("#hddTipoPregunta").val("3");
                            $("#div_tipo_respuestas").hide();
                            $(".div_opciones").hide();
                            $("#div_opciones").hide();
                            $("#div_restricciones").hide();
                            $("#div_rspt_larga_1").hide();
                            $("#div_rspt_larga_2").hide();
                            $("#div_calificacion").hide();
                            $("#div_respuesta").show();

                            $("#div_tipo_preguntas").show();
                        }

                        var pattern = /fa-star-o/g;
                        if (pattern.test(html_object)) {
                            var lnk_edit = "<a href='#' class='btn btn-white btn-bitbucket btn-li-edit' data-tipo='4' data-li-id='" + id_li + "' data-index='" + newIndex + "' id='" + id_edit + "'><i class='fa fa-edit'></i></a>";
                            html_fa_square = "<b>" + (newIndex + 1) + "</b>  <i class='fa fa-star-o'></i> <span class='class-text'>Calificación</span> <span class='float-right controles'>" + lnk_edit + lnk_del + "</span>";
                            objeto_nodo.html(html_fa_square);
                            $("#hddTipoPregunta").val("4");
                            $("#div_calificacion").show();
                            $(".div_opciones").hide();
                            $("#div_opciones").hide();
                            $("#div_tipo_respuestas").hide();
                            $("#div_restricciones").hide();
                            $("#div_rspt_larga_1").hide();
                            $("#div_rspt_larga_2").hide();
                            $("#div_respuesta").hide();

                            $("#div_tipo_preguntas").show();
                        }

                        var pattern = /fa-list-ol/g;
                        if (pattern.test(html_object)) {
                            var lnk_edit = "<a href='#' class='btn btn-white btn-bitbucket btn-li-edit' data-tipo='5' data-li-id='" + id_li + "' data-index='" + newIndex + "' id='" + id_edit + "'><i class='fa fa-edit'></i></a>";
                            html_fa_square = "<b>" + (newIndex + 1) + "</b>  <i class='fa fa-list-ol'></i> <span class='class-text'>Clasificación</span> <span class='float-right controles'>" + lnk_edit + lnk_del + "</span>";
                            objeto_nodo.html(html_fa_square);
                            $("#hddTipoPregunta").val("5");
                            $("#div_tipo_respuestas").hide();
                            $(".div_opciones").show();
                            $("#div_opciones").show();
                            $("#div_restricciones").hide();
                            $("#div_rspt_larga_1").hide();
                            $("#div_rspt_larga_2").hide();
                            $("#div_calificacion").hide();
                            $("#div_respuesta").hide();

                            $("#div_tipo_preguntas").show();

                        }

                        var pattern = /fa-cube/g;
                        if (pattern.test(html_object)) {
                            var lnk_edit = "<a href='#' class='btn btn-white btn-bitbucket btn-li-edit' data-tipo='6' data-li-id='" + id_li + "' data-index='" + newIndex + "' id='" + id_edit + "'><i class='fa fa-edit'></i></a>";
                            html_fa_square = "<b>" + (newIndex + 1) + "</b>  <i class='fa fa-cube'></i> <span class='class-text'>Región</span> <span class='float-right controles'>" + lnk_edit + lnk_del + "</span>";
                            objeto_nodo.html(html_fa_square);
                            $("#hddTipoPregunta").val("6");
                            $("#div_tipo_respuestas").hide();
                            $(".div_opciones").hide();
                            $("#div_opciones").hide();
                            $("#div_restricciones").hide();
                            $("#div_rspt_larga_1").hide();
                            $("#div_rspt_larga_2").hide();
                            $("#div_calificacion").hide();
                            $("#div_respuesta").hide();
                            $("#myModalVer > div > div > div.modal-header > h4").html("<b>" + (newIndex + 1) + "</b>&nbsp;&nbsp;<b>Detalle de la Región</b>");
                            $("#txtPregunta").parent().find("label").html("<strong>Titulo</strong>");
                            $("#txtPregunta").attr("placeholder", "Escriba el título de la Región");

                            $("#div_tipo_preguntas").hide();
                        }


                        $("#myModalVer").modal("show");


                        $("#div_rigth_contenido > li.list-group-item > span.float-right").removeClass("controles");

                        $("#div_rigth_contenido > li > span > a.btn.btn-white.btn-bitbucket.btn-li-delete").unbind().click(function (e) {
                            var id = $(this).attr("id")
                            var index = $(this).attr('data-index');
                            var id_li = $(this).attr('data-li-id');
                            $("#" + id_li).remove();
                            e.preventDefault();
                            return false;
                        });

                        $("#div_rigth_contenido > li > span > a.btn.btn-white.btn-bitbucket.btn-li-edit").unbind().click(function (e) {
                            var id = $(this).attr("id")
                            var index = $(this).attr('data-index');
                            var id_li = $(this).attr('data-li-id');
                            var data_tipo = $(this).attr("data-tipo")
                            $("#hddTipoPregunta").val(data_tipo);
                            $("#hddIdlsta").val(id_li);
                            $("#hddidcontrol").val("");

                            me.Funciones.CargarDatosPopUp(id_li);
                            
                            switch (data_tipo) {
                                case "1":
                                    $("#div_tipo_respuestas").show();
                                    $(".div_opciones").show();
                                    $("#div_opciones").show();
                                    $("#div_respuesta").hide();
                                    $("#div_restricciones").hide();
                                    $("#div_rspt_larga_1").hide();
                                    $("#div_rspt_larga_2").hide();
                                    $("#div_calificacion").hide();
                                    $("#div_tipo_preguntas").show();
                                    break;
                                case "2":
                                    $("#div_tipo_respuestas").hide();
                                    $(".div_opciones").hide();
                                    $("#div_opciones").hide();
                                    $("#div_restricciones").show();
                                    $("#div_respuesta").show();

                                    $("#div_rspt_larga_1").show();
                                    $("#div_rspt_larga_2").show();
                                    $("#div_calificacion").hide();

                                    $("#div_tipo_preguntas").show();
                                    break;
                                case "3":
                                    $("#div_tipo_respuestas").hide();
                                    $(".div_opciones").hide();
                                    $("#div_opciones").hide();
                                    $("#div_restricciones").hide();
                                    $("#div_rspt_larga_1").hide();
                                    $("#div_rspt_larga_2").hide();
                                    $("#div_calificacion").hide();
                                    $("#div_respuesta").show();

                                    $("#div_tipo_preguntas").show();
                                    break;
                                case "4":
                                    $("#div_calificacion").show();
                                    $(".div_opciones").hide();
                                    $("#div_opciones").hide();
                                    $("#div_tipo_respuestas").hide();
                                    $("#div_restricciones").hide();
                                    $("#div_rspt_larga_1").hide();
                                    $("#div_rspt_larga_2").hide();
                                    $("#div_respuesta").hide();

                                    $("#div_tipo_preguntas").show();
                                    break;
                                case "5":
                                    $("#div_tipo_respuestas").hide();
                                    $(".div_opciones").show();
                                    $("#div_opciones").show();
                                    $("#div_restricciones").hide();
                                    $("#div_rspt_larga_1").hide();
                                    $("#div_rspt_larga_2").hide();
                                    $("#div_calificacion").hide();
                                    $("#div_respuesta").hide();

                                    $("#div_tipo_preguntas").show();
                                    break;
                                case "6":
                                    $("#div_tipo_respuestas").hide();
                                    $(".div_opciones").hide();
                                    $("#div_opciones").hide();
                                    $("#div_restricciones").hide();
                                    $("#div_rspt_larga_1").hide();
                                    $("#div_rspt_larga_2").hide();
                                    $("#div_calificacion").hide();
                                    $("#div_respuesta").hide();

                                    $("#div_opciones_1").hide();
                                    $("#div_tipo_preguntas").hide();

                                    break;
                                default:
                            }

                            $("#myModalVer").modal("show");
                            e.preventDefault();
                            return false;
                        });
                    }

                    else {
                        console.log(evt);
                        $('#div_rigth_contenido li').each(function (indice, elemento) {
                            $(this).find("b").text(indice + 1);
                        });
                    }
                },
            });
        },
        GetOneForm: function (http) {
            coreajax.ajax.PostAsync(http, null, function (data) {
                if (data.success) {
                    me.Globals.titulo.val(data.result.titulo);
                    me.Globals.comentario.val(data.result.comentario);
                    me.Globals.fechavigencia.val(data.result.fecha_vigencia);
                    me.Globals.titleFormPaso2.text(data.result.titulo);
                    me.Globals.titleForm.text(data.result.titulo);
                    me.Globals.lblComentarioForm.text(data.result.comentario);
                    me.Globals.lblFechaVigenteForm.text(data.result.fecha_vigencia);
                    controls = data.result.controls;
                    me.Funciones.CargarDatosLista(controls);
                    var myJSON = JSON.stringify(controls);
                    window.sessionStorage.setItem("controls", myJSON);

                } else
                    toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
                $.msg('unblock');
            });
        },
        CargarDatosPopUp: function (id_lsta) {
            var controls = window.sessionStorage.getItem("controls");
            if (controls != null) {

                var newObj = JSON.parse(controls);

                for (var i = 0; i < newObj.length; i++) {

                    if (newObj[i].controlId == id_lsta) {

                        opciones = newObj[i].opciones;
                        var str_html = "";
                        var cont_opc = 1;
                        for (var j = 0; j < opciones.length; j++) {
                            str_html = str_html + " <div class='col-md-12 col-sm-12 div_opcioness' id='div_opciones_array_" + (j + 1) + "' style='padding:0px 0px'>" +
                                "                   <div class='form-group row' >" +
                                "                       <div class='col-sm-1'>" +
                                "                           <label class='control-label' '><strong>" + (j + 1) + "</strong></label> " +
                                "                       </div>" +
                                "                       <div class='col-sm-9'>" +
                                "                            <input type='text' name='txtopciones[]' value='" + opciones[j] + "' class='form-control' autocomplete='off'  />" +
                                "                        </div>" +
                                "                        <div class='col-sm-2'>" +
                                "                            <a href='#' class='btn btn-success btn-bitbucket btn-li-quitar-opciones' data-id-opciones='" + (j + 1) + "' ><i class='fa fa-trash-o'></i></a>" +
                                "                       </div>" +
                                "                  </div >" +
                                "              </div >";
                            cont_opc++;
                        }
                        $("#myModalVer").find(".div_opcioness").remove();
                        $("#div_opciones").append(str_html);

                        if (cont_opc > 3) {
                            $("#div_opciones").css("height", "150px");
                            $("#div_opciones").css("overflowY", "auto");
                        }

                        $(".div_opcioness > div > div.col-sm-2 > a").unbind().click(function (e) {
                            var id = $(this).attr("data-id-opciones")
                            me.Funciones.QuitarOpcion(id);
                            e.preventDefault();
                            return false;

                        });

                        $("#hddIdlsta").val(id_lsta);
                        $("#hddidcontrol").val(newObj[i].id);
                        $("#hddTipoPregunta").val(newObj[i].tipo);
                        $("#txtPregunta").val(newObj[i].pregunta);
                        $("#cmbTipoRspta").val(newObj[i].tipo_respuesta);
                        $("input[name=rdbRsptaObg][value=" + newObj[i].respuesta_obligatoria + "]").attr('checked', 'checked');
                        $("input[name=rdbRsptaLarga][value=" + newObj[i].respuesta_larga + "]").attr('checked', 'checked');

                        $("#cmbSimbolo").val(newObj[i].tipo_simbolo);
                        $("#cmbNiveles").val(newObj[i].niveles);
                        $("#cmbrestriccion").val(newObj[i].restriccion);
                        $("#txtvalor1").val(newObj[i].valor1);
                        $("#txtvalor2").val(newObj[i].valor2);

                        $('input:radio[name="rdbRsptaObg"]').filter('[value="' + newObj[i].respuesta_obligatoria + '"]').iCheck('check');
                        $('input:radio[name="rdbRsptaLarga"]').filter('[value="' + newObj[i].respuesta_larga + '"]').iCheck('check');

                        $("#myModalVer > div > div > div.modal-header > h4").find("b").eq(1).text(newObj[i].pregunta);

                        break;
                    }
                }


            }
        },
        CargarDatosLista: function (controls) {

            var html = "";

            for (var i = 0; i < controls.length; i++) {

                icon_class = "";
                tipo_control = controls[i]["tipo"];
                switch (tipo_control) {
                    case "1": icon_class = "fa-list";
                        break;
                    case "2": icon_class = "fa-square-o";
                        break;
                    case "3": icon_class = "fa-calendar";
                        break;
                    case "4": icon_class = "fa-star-o";
                        break;
                    case "5": icon_class = "fa-list-ol";
                        break;
                    case "6": icon_class = "fa-cube";
                        break;
                    
                }

                html = html + " <li class='nav-item list-group-item' draggable='false' id='" + controls[i]["controlId"] + "' style=''> "+
                   " <b> "+(i+1)+" </b>"+
                    " <i class='fa " + icon_class+"' ></i> "+
                    " <span class='class-text' > " + controls[i]["pregunta"] + "</span> "+
                   " <span class='float-right' > "+
                    " <a href = '#' class='btn btn-white btn-bitbucket btn-li-edit' data-tipo='" + controls[i]["tipo"] + "' data-li-id='" + controls[i]["controlId"] + "' data-index='" + i + "' id='" + controls[i]["id"] + "_" + i +"_edit' > "+
                   " <i class='fa fa-edit' ></i> "+
                   "         </a> "+
                    " <a href = '#' class='btn btn-white btn-bitbucket btn-li-delete' data-li-id='" + controls[i]["controlId"] + "' data-index='" + i + "' id='" + controls[i]["id"] + "_" + i +"_del' > "+
                   " <i class='fa fa-trash-o' ></i> "+
                   "         </a> "+
                   "     </span>";
                   " </li >";
            }
            $("#div_rigth_contenido").empty();
            $("#div_rigth_contenido").append(html);

            $("#div_rigth_contenido > li > span > a.btn.btn-white.btn-bitbucket.btn-li-delete").unbind().click(function (e) {
                var id = $(this).attr("id")
                var index = $(this).attr('data-index');
                var id_li = $(this).attr('data-li-id');
                $("#" + id_li).remove();
                e.preventDefault();
                return false;
            });

            $("#div_rigth_contenido > li > span > a.btn.btn-white.btn-bitbucket.btn-li-edit").unbind().click(function (e) {
                var id = $(this).attr("id")
                var index = $(this).attr('data-index');
                var id_li = $(this).attr('data-li-id');
                var data_tipo = $(this).attr("data-tipo")
                $("#hddTipoPregunta").val(data_tipo);
                $("#hddIdlsta").val(id_li);
                $("#hddidcontrol").val("");

                me.Funciones.CargarDatosPopUp(id_li);

                switch (data_tipo) {
                    case "1":
                        $("#div_tipo_respuestas").show();
                        $(".div_opciones").show();
                        $("#div_opciones").show();
                        $("#div_respuesta").hide();
                        $("#div_restricciones").hide();
                        $("#div_rspt_larga_1").hide();
                        $("#div_rspt_larga_2").hide();
                        $("#div_calificacion").hide();
                        $("#div_tipo_preguntas").show();
                        break;
                    case "2":
                        $("#div_tipo_respuestas").hide();
                        $(".div_opciones").hide();
                        $("#div_opciones").hide();
                        $("#div_restricciones").show();
                        $("#div_respuesta").show();

                        $("#div_rspt_larga_1").show();
                        $("#div_rspt_larga_2").show();
                        $("#div_calificacion").hide();

                        $("#div_tipo_preguntas").show();
                        break;
                    case "3":
                        $("#div_tipo_respuestas").hide();
                        $(".div_opciones").hide();
                        $("#div_opciones").hide();
                        $("#div_restricciones").hide();
                        $("#div_rspt_larga_1").hide();
                        $("#div_rspt_larga_2").hide();
                        $("#div_calificacion").hide();
                        $("#div_respuesta").show();

                        $("#div_tipo_preguntas").show();
                        break;
                    case "4":
                        $("#div_calificacion").show();
                        $(".div_opciones").hide();
                        $("#div_opciones").hide();
                        $("#div_tipo_respuestas").hide();
                        $("#div_restricciones").hide();
                        $("#div_rspt_larga_1").hide();
                        $("#div_rspt_larga_2").hide();
                        $("#div_respuesta").hide();

                        $("#div_tipo_preguntas").show();
                        break;
                    case "5":
                        $("#div_tipo_respuestas").hide();
                        $(".div_opciones").show();
                        $("#div_opciones").show();
                        $("#div_restricciones").hide();
                        $("#div_rspt_larga_1").hide();
                        $("#div_rspt_larga_2").hide();
                        $("#div_calificacion").hide();
                        $("#div_respuesta").hide();

                        $("#div_tipo_preguntas").show();
                        break;
                    case "6":
                        $("#div_tipo_respuestas").hide();
                        $(".div_opciones").hide();
                        $("#div_opciones").hide();
                        $("#div_restricciones").hide();
                        $("#div_rspt_larga_1").hide();
                        $("#div_rspt_larga_2").hide();
                        $("#div_calificacion").hide();
                        $("#div_respuesta").hide();

                        $("#div_opciones_1").hide();
                        $("#div_tipo_preguntas").hide();

                        break;
                    default:
                }

                $("#myModalVer").modal("show");
                e.preventDefault();
                return false;
            });
        },
        GenerarPreview: function () {
          
            var controls = window.sessionStorage.getItem("controls");
            var newObj = JSON.parse(controls);
            var str_html = "";
            var cont_pregunta = 1;
            for (var i = 0; i < newObj.length; i++) {
                var objeto = newObj[i];

                switch (objeto.tipo) {
                    case "1":
                        str_html_controls = "";

                        for (var j = 0; j < objeto.opciones.length; j++) {
                            if (objeto.tipo_respuesta == '1') {
                                str_html_controls = str_html_controls + "  <div class='i-checks'><label> <input type='radio' value='" + objeto.opciones[j] + "' name='rdb" + objeto.id + "'> <i></i> " + objeto.opciones[j] + " </label></div>";
                            } else if (objeto.tipo_respuesta == '2') {
                                str_html_controls = str_html_controls + "  <div class='i-checks'><label> <input type='checkbox' value='" + objeto.opciones[j] + "' name='ckb" + objeto.id + "'> <i></i> " + objeto.opciones[j] + " </label></div>";
                            } else if (objeto.tipo_respuesta == '3') {
                                if (j == 0) {
                                    str_html_controls = str_html_controls + "<select class='form-control' id='cmb" + objeto.id + "' name='cmb" + objeto.id + "'>";
                                    str_html_controls = str_html_controls + " <option>" + objeto.opciones[j] + "</option>";
                                } else if (j == objeto.opciones.length - 1) {
                                    str_html_controls = str_html_controls + " <option>" + objeto.opciones[j] + "</option>";
                                    str_html_controls = str_html_controls + "</select>";
                                } else {
                                    str_html_controls = str_html_controls + " <option>" + objeto.opciones[j] + "</option>";
                                }
                            }
                        }



                        str_html = str_html + "<div class='form-group'> " +
                            "    <label class='col-sm-12 col-form-label'><h3><b>" + cont_pregunta + ". </b>" + objeto.pregunta + "</h3></label > " +
                            "    <div class='col-sm-12'>" + str_html_controls + "</div> " +
                            "</div>";
                        cont_pregunta++;
                        break;
                    case "2":
                        str_html_controls = "";
                        if (objeto.respuesta_larga == '0') {
                            str_html_controls = "<input type='text' class='form-control' id='txt" + objeto.id + "' name='txt" + objeto.id + "'>";
                        } else {
                            str_html_controls = "<textarea class='form-control' id='text" + objeto.id + "' text='cmb" + objeto.id + "'></textarea>";
                        }

                        str_html = str_html + "<div class='form-group'> " +
                            "    <label class='col-sm-12 col-form-label'><h3><b>" + cont_pregunta + ". </b>" + objeto.pregunta + "</h3></label > " +
                            "    <div class='col-sm-12'>" + str_html_controls + "</div> " +
                            "</div>";
                        cont_pregunta++;
                        break;
                    case "3":

                        str_html_controls = "";
                        str_html_controls = "<input type='text' class='form-control datepicker' id='txtfec" + objeto.id + "' name='txtfec" + objeto.id + "' placeholder='dd/MM/YY'>";


                        str_html = str_html + "<div class='form-group'> " +
                            "    <label class='col-sm-12 col-form-label'><h3><b>" + cont_pregunta + ". </b>" + objeto.pregunta + "</h3></label > " +
                            "    <div class='col-sm-12'>" + str_html_controls + "</div> " +
                            "</div>";
                        cont_pregunta++;
                        break;
                    case "4":

                        str_html_controls = "";
                        if (objeto.tipo_simbolo == "1")
                            str_html_controls = "<div id='" + objeto.id + "' class='default_circle' data-number='" + objeto.niveles + "'></div>";
                        else
                            str_html_controls = "<div id='" + objeto.id + "' class='default_start' data-number='" + objeto.niveles + "'></div>";


                        str_html = str_html + "<div class='form-group'> " +
                            "    <label class='col-sm-12 col-form-label'><h3><b>" + cont_pregunta + ". </b>" + objeto.pregunta + "</h3></label > " +
                            "    <div class='col-sm-12'>" + str_html_controls + "</div> " +
                            "</div>";
                        cont_pregunta++;
                        break;
                    case "5":
                        str_html_controls = "<ul class='list-group clear-list m-t ul_drag_drop' style='font-size:16px!important;' id='" + objeto.id + "' >";

                        for (var j = 0; j < objeto.opciones.length; j++) {
                            str_html_button_desc = "";
                            str_html_button_asc = "";
                            str_html_controls = str_html_controls + "<li class='list-group-item fist-item infont' style='cursor:pointer'>  " + str_html_button_desc + " <span>" + objeto.opciones[j] + "</span> " + str_html_button_asc + " </li>";
                        }
                        str_html_controls = str_html_controls + "</ul>";

                        str_html = str_html + "<div class='form-group'> " +
                            "    <label class='col-sm-12 col-form-label'><h3><b>" + cont_pregunta + ". </b>" + objeto.pregunta + "</h3></label > " +
                            "    <div class='col-sm-12'>" + str_html_controls + "</div> " +
                            "</div>";
                        cont_pregunta++;
                        break;

                    case "6":
                        str_html_controls = " <div class='hr-line-dashed'></div>";
                        str_html = str_html + "<div class='form-group'> " +
                            "    <label class='col-sm-12 col-form-label'><h4 style='font-size: 22px!important;'>" + objeto.pregunta + "</h4></label > " +
                            "     " + str_html_controls + "" +
                            "</div>";
                        break;
                    default:
                }


            }


            $("#div_preview").empty();
            $("#div_preview").html(str_html);
            $('.i-checks').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green',
            });

            $('.default_start').raty(
                {
                    number: function () {
                        return $(this).attr('data-number');
                    },
                    click: function (score, evt) {
                        console.log('ID: ' + this.id + "\nscore: " + score + "\nevent: " + evt.type);
                    },
                    starOff: '/lib/raty-master/images/star-off.png',
                    starOn: '/lib/raty-master/images/star-on.png'
                }
            );

            $('.default_circle').raty(
                {
                    number: function () {
                        return $(this).attr('data-number');
                    },
                    click: function (score, evt) {
                        console.log('ID: ' + this.id + "\nscore: " + score + "\nevent: " + evt.type);
                    },
                    starOff: '/lib/raty-master/images/circle-off.png',
                    starOn: '/lib/raty-master/images/circle-on.png'
                }
            );

            $(".ul_drag_drop").sortable();

            $(".datepicker").datepicker({
                changeMonth: true,
                changeYear: true,
                yearRange: "-80:+0",
                beforeShow: function (input, inst) {
                    var rect = input.getBoundingClientRect();
                    setTimeout(function () {
                        inst.dpDiv.css({ top: rect.top + 40, left: rect.left + 0 });
                    }, 0);
                }
            });
        },
        QuitarOpcion: function () {
            var controls = window.sessionStorage.getItem("controls");
            var controlId = $("#hddidcontrol").val();
            if (controls == null) {
                $("#div_opciones_array_" + id).remove();
            } else {

                var newObj = JSON.parse(controls);
                for (var i = 0; i < newObj.length; i++) {
                    if (newObj[i].id == controlId) {
                        var tmp_opciones = newObj[i].opciones;
                        var new_opciones = [];
                        for (var j = 0; j < tmp_opciones.length; j++) {
                            if (j != (id - 1)) {
                                new_opciones.push(tmp_opciones[j]);
                            }
                        }
                        console.log(new_opciones);
                        newObj[i].opciones = new_opciones;
                        break;
                    }
                }
                var myJSON = JSON.stringify(newObj);
                window.sessionStorage.setItem("controls", myJSON);
                $("#div_opciones_array_" + id).remove();
            }



            $("#div_opciones").children().each(function (index) {
                $(this).find("strong").text(index + 1);
            });
        }
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

            me.Globals.titleFormPaso2.text( me.Globals.titulo.val() );
            me.Globals.titleForm.text(me.Globals.titulo.val());
            me.Globals.lblComentarioForm.text(me.Globals.comentario.val());
            me.Globals.lblFechaVigenteForm.text(me.Globals.fechavigencia.val());

        },
        PreviousOne: function (e) {
            me.Globals.div_form_2.hide(1000);
            me.Globals.div_form_1.show(1000);
        },
        NextTwo: function (e) {
            me.Globals.div_form_2.hide(1000);
            me.Globals.div_form_3.show(1000);

            me.Globals.titleFormPaso2.text(me.Globals.titulo.val());
            me.Globals.titleForm.text(me.Globals.titulo.val());
            me.Globals.lblComentarioForm.text(me.Globals.comentario.val());
            me.Globals.lblFechaVigenteForm.text(me.Globals.fechavigencia.val());

            me.Funciones.GenerarPreview();
        }, 
        PreviousTwo: function (e) {
            me.Globals.div_form_3.hide(1000);
            me.Globals.div_form_2.show(1000);
        },
        ValidarGuardar: function (e) {
           // console.log("ACTUALIZAR FORM");
            toastr.success("Se registro correctamente el formulario", conexion.titulo, { timeOut: 1000 });
            // limpiar_formulario(); redireccionar al listar.
            
            window.location.href = "/Forms/FormsGenerator/Editar";
        },
        ValidarAgregarOpcPregunta: function () {
            var contador = $("#div_opciones").children().length;
            console.log('contador:' + contador + ' id_opciones:' + id_opciones);
            if (id_opciones + 1 < contador) {
                id_opciones = contador + 1;
            }


            var str_html = " <div class='col-md-12 col-sm-12 div_opcioness' id='div_opciones_array_" + id_opciones + "' style='padding:0px 0px'>" +
                "                   <div class='form-group row' >" +
                "                       <div class='col-sm-1'>" +
                "                           <label class='control-label' '><strong>" + (id_opciones) + "</strong></label> " +
                "                       </div>" +
                "                       <div class='col-sm-9'>" +
                "                            <input type='text' name='txtopciones[]' class='form-control' autocomplete='off'  />" +
                "                        </div>" +
                "                        <div class='col-sm-2'>" +
                "                            <a href='#' class='btn btn-success btn-bitbucket btn-li-quitar-opciones' data-id-opciones='" + id_opciones + "' ><i class='fa fa-trash-o'></i></a>" +
                "                       </div>" +
                "                  </div >" +
                "              </div >";

            $("#div_opciones").append(str_html);

            if (id_opciones > 3) {
                $("#div_opciones").css("height", "150px");
                $("#div_opciones").css("overflowY", "auto");
            }

            $(".div_opcioness > div > div.col-sm-2 > a").unbind().click(function (e) {
                var id = $(this).attr("data-id-opciones")
                me.Funciones.QuitarOpcion(id);
                e.preventDefault();
                return false;

            });

            id_opciones++;
        },
        ValidarGuardarPregunta: function (e) {
            var entindad = entidadmodel.formulario();
            entindad.titulo = "";

            var text = new Array();
            $("input[name='txtopciones[]']").each(function () {
                if ($(this).val() != "" && $(this).val() != null && $(this).val() != undefined)
                    text.push($(this).val());
            });

            var d = new Date();
            var timer = d.getTime();

            if ($("#hddidcontrol").val() == "" || $("#hddidcontrol").val() == null) {
                $("#hddidcontrol").val(timer);
            }

            var objeto = entidadmodel.control();

            objeto.controlId = $("#hddIdlsta").val();
            objeto.id = $("#hddidcontrol").val();
            objeto.tipo = $("#hddTipoPregunta").val();
            objeto.pregunta = $("#txtPregunta").val();
            objeto.opciones = text;
            objeto.tipo_respuesta = $("#cmbTipoRspta").val();
            objeto.respuesta_obligatoria = $('input[name="rdbRsptaObg"]:checked').val();
            objeto.respuesta_larga = $('input[name="rdbRsptaLarga"]:checked').val();
            objeto.tipo_simbolo = $("#cmbSimbolo").val();
            objeto.niveles = $("#cmbNiveles").val();
            objeto.restriccion = $("#cmbrestriccion").val();
            objeto.valor1 = $("#txtvalor1").val();
            objeto.valor2 = $("#txtvalor2").val();

            var controls = window.sessionStorage.getItem("controls");


            if (controls == null) {
                controls = new Array();
                controls.push(objeto);
                var myJSON = JSON.stringify(controls);
                window.sessionStorage.setItem("controls", myJSON);
            } else {
                var newObj = JSON.parse(controls);
                var bolExiste = false;
                for (var i = 0; i < newObj.length; i++) {
                    if (newObj[i].controlId == objeto.controlId) {

                        newObj[i].controlId = objeto.controlId;
                        newObj[i].id = objeto.id;
                        newObj[i].tipo = objeto.tipo;
                        newObj[i].pregunta = objeto.pregunta;
                        newObj[i].opciones = objeto.opciones;
                        newObj[i].tipo_respuesta = objeto.tipo_respuesta;
                        newObj[i].respuesta_obligatoria = objeto.respuesta_obligatoria;
                        newObj[i].respuesta_larga = objeto.respuesta_larga;
                        newObj[i].tipo_simbolo = objeto.tipo_simbolo;
                        newObj[i].niveles = objeto.niveles;
                        newObj[i].restriccion = objeto.restriccion;
                        newObj[i].valor1 = objeto.valor1;
                        newObj[i].valor2 = objeto.valor2;

                        bolExiste = true;
                        break;
                    }
                }

                if (!bolExiste)
                    newObj.push(objeto);

                var myJSON = JSON.stringify(newObj);
                $("#myModalVer .close").click();
                window.sessionStorage.setItem("controls", myJSON);


            }
        },
        
    };

    me.Inicializar = function () {
        me.Funciones.InicializarEventos();
        me.Eventos.GetOneForm();
    };
};

$(document).ready(function () {

    $.datepicker.regional['es'] = {
        closeText: 'Cerrar',
        prevText: '< Ant',
        nextText: 'Sig >',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
        weekHeader: 'Sm',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);


    var oForms = new mntoForms();
    oForms.Inicializar();

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });
});

