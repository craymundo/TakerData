var string_api = jQuery.validator.format("{0}/{1}");
var conexion;
var query = function () {
    var hdnconecciontoken = $("#hdnconecciontoken").val();
    var hdapi = $("#hdapi").val();
    var hdncodigousuario = $("#hdncodigousuario").val();
    return {
        titulo: 'Tottus Extranet',
        conexiontoken: hdnconecciontoken,
        codigousuario: hdncodigousuario,
        api: hdapi
    };
};
conexion = new query();
