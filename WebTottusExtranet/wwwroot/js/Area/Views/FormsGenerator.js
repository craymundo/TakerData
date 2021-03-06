﻿

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

    $("#btnSiguiente1").unbind().click(function () {

        $("#form_paso1").valid();
        if (!$("#form_paso1").valid()) {
            return false;
        } else {
            $("#div_form_1").hide(1000);
            $("#div_form_2").show(1000);
            $("#titleFormPaso2").text($("#txtTitulo").val().toUpperCase());
        }


      
    });

    $("#btnAtras1").unbind().click(function () {
        $("#div_form_2").hide(1000);
        $("#div_form_1").show(1000);
    });

    $("#btnSiguiente2").unbind().click(function () {
        $("#div_form_2").hide(1000);
        $("#div_form_3").show(1000);
        generar_preview();
    });

    $("#btnAtras2").unbind().click(function () {
        $("#div_form_3").hide(1000);
        $("#div_form_2").show(1000);
    });

    $("#btnGuardar").unbind().click(function () {

        var ruta = string_api(conexion.api, "api/Formularios/InsertForm");
        var controls = window.sessionStorage.getItem("controls");
        var entidad = entidadmodel.formulario();


        if (controls == null) {
            toastr.error("No se ha configurado correctamente el formulario", conexion.titulo, { timeOut: 1000 });
            $.msg('unblock');

            return false;
        }

        entidad.titulo = $("#txtTitulo").val();
        entidad.comentario = $("#txtComentario").val();
        entidad.fecha_vigencia = $("#txtFechaVigencia").val();
        entidad.idusuario = $("#hddidusuario").val();
        entidad.idempresa = $("#hddidempresa").val();
        var newObj = JSON.parse(controls);

        entidad.controls = newObj;

        coreajax.ajax.PostAsync(ruta, entidad, function (data) {
            if (data.success) {
                toastr.success("Se registro correctamente el formulario", conexion.titulo, { timeOut: 1000 });
                limpiar_formulario();
            }
            else
                toastr.error(data.message, conexion.titulo, { timeOut: 1000 });
            $.msg('unblock');
        });

       
    });

    var example4Left = document.getElementById('div_left_control');
    var example4Right = document.getElementById('div_rigth_contenido');


    new Sortable(example4Left, {
        group: {
            name: 'shared',
            pull: 'clone',
            put: false // Do not allow items to be put into this list
        },
        animation: 150,
        sort: false // To disable sorting: set sort to false
    });

    new Sortable(example4Right, {
        group: 'shared',
        animation: 150,
        dataIdAttr: 'data-id',
        onSort: function (/**Event*/evt) {
          
            if (evt.pullMode == "clone") {
                var d = new Date();
                var timer = d.getTime();
                var newIndex = evt.newIndex;
                var objeto_nodo = $("#div_rigth_contenido").children().eq(newIndex);
                var html_object = $("#div_rigth_contenido li")[newIndex].innerHTML;
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
                   
                    cargar_datos_opcion(id_li);
                    console.log(data_tipo);
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
                    $(this).find("b").text(indice+1);
                });
            }
        },
    });

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    $("#btnGuardarControl").unbind().click(function () {
        guardar_datos_texto();
      });

    $("#btnAgregarOpcion").unbind().click(function () {
        agregar_opciones();
    });

    $('#myModalVer').unbind().on("hidden.bs.modal", function () {

        var id_lista = $("#hddIdlsta").val();
        var pregunta = $("#txtPregunta").val();

        if (pregunta!= "" && pregunta!=null && pregunta != undefined)
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



    $("#form_paso1").validate({
        ignore: [],
        rules: {
            txtTitulo: { required: true },
            txtFechaVigencia: { required: true },

        },
        messages: {
            txtTitulo: { required: "* Ingrese el titulo del formulario" },
            txtFechaVigencia: { required: "* Ingrese la fecha de vigencia del formulario" },
        },
        highlight: function (element) {
            $(element).closest('.control-group').removeClass('success').addClass('error');
        },
        success: function (element) {
            $(element).addClass('valid').closest('.control-group').removeClass('error').addClass('success');
        },
    });

 
  

});

var id_opciones = 1;



function agregar_opciones() {

    var contador = $("#div_opciones").children().length;

    if (contador + 1 < id_opciones) {
        id_opciones = contador + 1;
    }


    var str_html = " <div class='col-md-12 col-sm-12 div_opcioness' id='div_opciones_array_" + id_opciones + "' style='padding:0px 0px'>" +
        "                   <div class='form-group row' >" +
        "                       <div class='col-sm-1'>" +
        "                           <label class='control-label' '><strong>" + (id_opciones)  +"</strong></label> " +
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
        quitar_opcion(id);
        e.preventDefault();
        return false;

    });

    id_opciones++;

}

function quitar_opcion(id) {
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
                    if (j != (id-1)) {
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

   

    $("#div_opciones").children().each(function (index ) {
        $(this).find("strong").text(index +1);
    });
   
}

function cargar_datos_opcion(id_lsta) {
   
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
                        "                            <input type='text' name='txtopciones[]' value='" + opciones[j]+"' class='form-control' autocomplete='off'  />" +
                        "                        </div>" +
                        "                        <div class='col-sm-2'>" +
                        "                            <a href='#' class='btn btn-success btn-bitbucket btn-li-quitar-opciones' data-id-opciones='" + (j + 1)  + "' ><i class='fa fa-trash-o'></i></a>" +
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
                    quitar_opcion(id);
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
}

function guardar_datos_texto() {
    var entindad = entidadmodel.formulario();
    entindad.titulo = "";

    var text = new Array();
    $("input[name='txtopciones[]']").each(function () {
        if ($(this).val() != "" && $(this).val() != null && $(this).val()!=undefined)
        text.push($(this).val());
    }); 

    var d = new Date();
    var timer = d.getTime();

    if ($("#hddidcontrol").val() == "" || $("#hddidcontrol").val() ==null ) {
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
                newObj[i].pregunta = objeto.pregunta ;
                newObj[i].opciones = objeto.opciones;
                newObj[i].tipo_respuesta = objeto.tipo_respuesta;
                newObj[i].respuesta_obligatoria = objeto.respuesta_obligatoria ;
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

}

function generar_preview() {

    $("#titleForm").html($("#txtTitulo").val().toUpperCase());
    $("#lblComentarioForm").text($("#txtComentario").val());
    $("#lblFechaVigenteForm").text($("#txtFechaVigencia").val());

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
                    "    <label class='col-sm-12 col-form-label'><h3><b>" + cont_pregunta+". </b>" + objeto.pregunta+"</h3></label > " +
                    "    <div class='col-sm-12'>" + str_html_controls+"</div> " +
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
                    "    <label class='col-sm-12 col-form-label'><h3><b>" + cont_pregunta +". </b>" + objeto.pregunta + "</h3></label > " +
                    "    <div class='col-sm-12'>" + str_html_controls+"</div> " +
                    "</div>";
                cont_pregunta++;
                break;
            case "3":

                str_html_controls = "";
                str_html_controls = "<input type='text' class='form-control datepicker' id='txtfec" + objeto.id + "' name='txtfec" + objeto.id + "' placeholder='dd/MM/YY'>";
               

                str_html = str_html + "<div class='form-group'> " +
                    "    <label class='col-sm-12 col-form-label'><h3><b>" + cont_pregunta +". </b>" + objeto.pregunta + "</h3></label > " +
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
                    "    <label class='col-sm-12 col-form-label'><h3><b>" + cont_pregunta +". </b>" + objeto.pregunta + "</h3></label > " +
                    "    <div class='col-sm-12'>" + str_html_controls + "</div> " +
                    "</div>";
                cont_pregunta++;
                break;
            case "5":
                str_html_controls = "<ul class='list-group clear-list m-t ul_drag_drop' style='font-size:16px!important;' id='" + objeto.id + "' >";
                
                for (var j = 0; j < objeto.opciones.length; j++) {
                    str_html_button_desc = "";
                    str_html_button_asc = "";
                    str_html_controls = str_html_controls + "<li class='list-group-item fist-item infont' style='cursor:pointer'>  " + str_html_button_desc + " <span>" + objeto.opciones[j] + "</span> " + str_html_button_asc +" </li>";
                }
                str_html_controls = str_html_controls + "</ul>";
 
                str_html = str_html + "<div class='form-group'> " +
                    "    <label class='col-sm-12 col-form-label'><h3><b>" + cont_pregunta +". </b>" + objeto.pregunta + "</h3></label > " +
                    "    <div class='col-sm-12'>" + str_html_controls + "</div> " +
                    "</div>";
                cont_pregunta++;
                break;

            case "6":
                str_html_controls = " <div class='hr-line-dashed'></div>";
                str_html = str_html + "<div class='form-group'> " +
                    "    <label class='col-sm-12 col-form-label'><h4 style='font-size: 22px!important;'>" + objeto.pregunta + "</h4></label > " +
                    "     " + str_html_controls + ""+ 
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

}

function limpiar_formulario() {
    $("#txtTitulo").val("");
    $("#txtComentario").val("");
    $("#txtFechaVigencia").val("");
    window.sessionStorage.clear();
    $("#div_preview").empty();
    $("#div_rigth_contenido").empty();
    $("#div_form_3").hide(1000);
    $("#div_form_1").show(1000);
}


