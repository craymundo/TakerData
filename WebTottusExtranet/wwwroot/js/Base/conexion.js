var string_api = jQuery.validator.format("{0}/{1}");
var conexion;
var query = function () {
    var hdnconecciontoken = $("#hdnconecciontoken").val();
    var hdapi = $("#hdapi").val();
    var hdncodigousuario = $("#hdncodigousuario").val();
    var hdncodigoempresa = $("#hdncodigoempresa").val();
    return {
        titulo: 'TakerData Web',
        conexiontoken: hdnconecciontoken,
        codigousuario: hdncodigousuario,
        codigoempresa: hdncodigoempresa,
        api: hdapi
    };
};
conexion = new query();
