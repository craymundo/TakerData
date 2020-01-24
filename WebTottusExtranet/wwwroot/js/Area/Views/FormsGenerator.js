$(document).ready(function () {


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
            //console.log(evt);
            var d = new Date();
            var timer = d.getTime();
            var newIndex = evt.newIndex;
            var objeto_nodo = $("#div_rigth_contenido").children().eq(newIndex);
            var html_object = $("#div_rigth_contenido li")[newIndex].innerHTML;
            var id_li = 'li_' + timer;
            

            objeto_nodo.attr('id', id_li);


            var id_del= timer + "_" + newIndex + "_del";
            var lnk_del = "<a href='#' class='btn btn-white btn-bitbucket btn-li-delete' data-li-id='" + id_li+"' data-index='" + newIndex +"' id='" + id_del+"'><i class='fa fa-trash-o'></i></a>";

            var id_edit = timer + "_" + newIndex + "_edit";
            //var attr_modal = "data-toggle='modal' data-target='#myModalVer' data-backdrop='static' data-keyboard='false'";
            

            var pattern = /fa-list/g;
            if (pattern.test(html_object)) {
                var lnk_edit = "<a href='#' class='btn btn-white btn-bitbucket btn-li-edit' data-tipo='1' data-li-id='" + id_li + "' data-index='" + newIndex + "' id='" + id_edit + "'><i class='fa fa-edit'></i></a>";
                html_fa_list = "<b>" + (newIndex + 1) + "</b>  <i class='fa fa-list'></i> Opcion <span class='float-right controles'>" + lnk_edit +  lnk_del+"</span>";
                objeto_nodo.html(html_fa_list);
            }

            var pattern = /fa-square-o/g;
            if (pattern.test(html_object)) {
                var lnk_edit = "<a href='#' class='btn btn-white btn-bitbucket btn-li-edit' data-tipo='2' data-li-id='" + id_li + "' data-index='" + newIndex + "' id='" + id_edit + "'><i class='fa fa-edit'></i></a>";
                html_fa_square = "<b>" + (newIndex + 1) + "</b>  <i class='fa fa-square-o'></i> Texto <span class='float-right controles'>" + lnk_edit + lnk_del + "</span>";
                objeto_nodo.html(html_fa_square);
            }

            var pattern = /fa-calendar/g;
            if (pattern.test(html_object)) {
                var lnk_edit = "<a href='#' class='btn btn-white btn-bitbucket btn-li-edit' data-tipo='3' data-li-id='" + id_li + "' data-index='" + newIndex + "' id='" + id_edit + "'><i class='fa fa-edit'></i></a>";
                html_fa_list = "<b>" + (newIndex + 1) + "</b>  <i class='fa fa-calendar'></i> Fecha <span class='float-right controles'>" + lnk_edit + lnk_del + "</span>";
                objeto_nodo.html(html_fa_list);
            }

            var pattern = /fa-star-o/g;
            if (pattern.test(html_object)) {
                var lnk_edit = "<a href='#' class='btn btn-white btn-bitbucket btn-li-edit' data-tipo='4' data-li-id='" + id_li + "' data-index='" + newIndex + "' id='" + id_edit + "'><i class='fa fa-edit'></i></a>";
                html_fa_square = "<b>" + (newIndex + 1) + "</b>  <i class='fa fa-star-o'></i> Calificación <span class='float-right controles'>" + lnk_edit + lnk_del + "</span>";
                objeto_nodo.html(html_fa_square);
            }

            var pattern = /fa-list-ol/g;
            if (pattern.test(html_object)) {
                var lnk_edit = "<a href='#' class='btn btn-white btn-bitbucket btn-li-edit' data-tipo='5' data-li-id='" + id_li + "' data-index='" + newIndex + "' id='" + id_edit + "'><i class='fa fa-edit'></i></a>";
                html_fa_square = "<b>" + (newIndex + 1) + "</b>  <i class='fa fa-list-ol'></i> Clasificación <span class='float-right controles'>" + lnk_edit + lnk_del + "</span>";
                objeto_nodo.html(html_fa_square);
            }




            $("#div_rigth_contenido > li.list-group-item > span.float-right").removeClass("controles");

            $("#div_rigth_contenido > li > span > a.btn.btn-white.btn-bitbucket.btn-li-delete").click(function (e) {
                var id = $(this).attr("id")
                var index = $(this).attr('data-index');
                var id_li = $(this).attr('data-li-id');
                $("#" + id_li).remove();
                e.preventDefault();
                return false;

            });

            $("#div_rigth_contenido > li > span > a.btn.btn-white.btn-bitbucket.btn-li-edit").click(function (e) {
                var id = $(this).attr("id")
                var index = $(this).attr('data-index');
                var id_li = $(this).attr('data-li-id');
                var data_tipo = $(this).attr("data-tipo")
                $("#hddTipoPregunta").val(data_tipo);
                //console.log("data_tipo" + data_tipo);
                switch (data_tipo) {
                    case "1":
                        $("#div_tipo_respuestas").show();
                        $(".div_opciones").show();
                        $("#div_respuesta").hide();
                        $("#div_restricciones").hide();
                        $("#div_rspt_larga_1").hide();
                        $("#div_rspt_larga_2").hide();
                        $("#div_calificacion").hide();
                        break;
                    case "2":
                        $("#div_tipo_respuestas").hide();
                        $(".div_opciones").hide();
                        $("#div_restricciones").show();
                        $("#div_respuesta").show();

                        $("#div_rspt_larga_1").show();
                        $("#div_rspt_larga_2").show();
                        $("#div_calificacion").hide();
                        break;
                    case "3":
                        $("#div_tipo_respuestas").hide();
                        $(".div_opciones").hide();
                        $("#div_restricciones").hide();
                        $("#div_rspt_larga_1").hide();
                        $("#div_rspt_larga_2").hide();
                        $("#div_calificacion").hide();
                        $("#div_respuesta").show();
                        break;
                    case "4":
                        $("#div_calificacion").show();
                        $(".div_opciones").hide();
                        $("#div_tipo_respuestas").hide();
                        $("#div_restricciones").hide();
                        $("#div_rspt_larga_1").hide();
                        $("#div_rspt_larga_2").hide();
                        $("#div_respuesta").hide();
                        break;
                    case "5":
                        $("#div_tipo_respuestas").hide();
                        $(".div_opciones").show();
                        $("#div_restricciones").hide();
                        $("#div_rspt_larga_1").hide();
                        $("#div_rspt_larga_2").hide();
                        $("#div_calificacion").hide();
                        $("#div_respuesta").hide();
                        break;
                    default:
                }
                $("#myModalVer").modal("show");
                e.preventDefault();
                return false;
            });


           
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

   

});

var id_opciones = 1;

function agregar_opciones() {

    var str_html = " <div class='col-md-12 col-sm-12 div_opciones' id='div_opciones_array_" + id_opciones + "'>" +
        "                   <div class='form-group row' >" +
        "                       <div class='col-sm-10'>" +
        "                            <input type='text' name='txtopciones[]' class='form-control' autocomplete='off'  />" +
        "                        </div>" +
        "                        <div class='col-sm-2'>" +
        "                            <a href='#' class='btn btn-success btn-bitbucket btn-li-quitar-opciones' data-id-opciones='" + id_opciones + "' ><i class='fa fa-trash-o'></i></a>" +
        "                       </div>" +
        "                  </div >" +
        "              </div >";

    
    if (id_opciones == 1)
        $("#div_opciones_2").after(str_html);
    else {
        var id = parseInt(id_opciones) - 1;
        $("#div_opciones_array_" + id).after(str_html);
    }

    $(".div_opciones > div > div.col-sm-2 > a").unbind().click(function (e) {
        var id = $(this).attr("data-id-opciones")
        quitar_opcion(id);
        e.preventDefault();
        return false;

    });

    id_opciones++;

}

function quitar_opcion(id) {
    $("#div_opciones_array_" + id).remove();
}

function guardar_datos_texto() {
    var entindad = entidadmodel.formulario();
    entindad.titulo = "";

    var text = new Array();
    $("input[name='txtopciones[]']").each(function () {
        text.push($(this).val());
    }); 

    console.log(text);

    var objeto = entidadmodel.control();

    var d = new Date();
    var timer = d.getTime();

    objeto.id = timer;
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
        console.log("NO EXISTE");
        controls = new Array();
        console.log(objeto);
        controls.push(objeto);
        console.log(controls.length);
        var myJSON = JSON.stringify(controls);
        console.log(myJSON);
        window.sessionStorage.setItem("controls", myJSON);
    } else {
        console.log("EXISTE");
        var newObj = JSON.parse(controls);
        newObj.push(objeto);
        var myJSON = JSON.stringify(newObj);
        window.sessionStorage.setItem("controls", myJSON);
        
    }

}


