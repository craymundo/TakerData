const entidadmodel = new function () {
    this.control = function () {
        return {
            id:"",
            tipo: "",
            pregunta: "",
            opciones: new Array(),
            tipo_respuesta: "",
            respuesta_obligatoria: "",
            respuesta_larga: "",
            tipo_simbolo: "",
            niveles: "",
            restriccion: "",
            valor1: "",
            valor2: "",
            controlId: "",
           
        };
    };


    this.formulario = function () {
        return {
            idform: "0",
            titulo: "",
            fecha_vigencia: "",
            comentario: "",
            estado: "0",
            idusuario: "",
            idempresa: "",
            controls: {
                id: "",
                tipo: "",
                pregunta: "",
                opciones: new Array(),
                tipo_respuesta: "",
                respuesta_obligatoria: "",
                respuesta_larga: "",
                tipo_simbolo: "",
                niveles: "",
                restriccion: "",
                valor1: "",
                valor2: "",
                controlId: "",
            }
           
        };
    };

    this.responseInvitationSend = function () {
        return {
            idUsuario: "",
            idEmpresa: "",
            idForm: "",
            idBD: ""
        };
    };

    this.requestGetAllFormularios = function () {
        return {
            idUsuario:"0",
            idEmpresa: "0"
        };
    };


    this.requestGetAllParameters = function () {
        return {
            idUsuario: "0",
            idEmpresa: "0"
        };
    };

    this.requestGetOneBD = function () {
        return {
            idUsuario: "0",
            idEmpresa: "0",
            idbd:"0"
        };
    };


    this.requestSendInvitation = function () {
        return {
            idUsuario: "0",
            idEmpresa: "0",
            idForm: "0",
            idBaseDatos: "0"
        };
    };

   this.requestGetOneForm = function () {
        return {
            idUsuario: "0",
            idEmpresa: "0",
            idForm: "0"
        };
    };


    this.requestDeleteForm = function () {
        return {
            idUsuario: "0",
            idEmpresa: "0",
            idForm: "0"
        };
    };

    this.objHeader = function () {
        return {
            header: "",
            typeColumn: ""
        };
    };


    this.objRow = function () {
        return {
            col1: "",
            col2: "",
            col3: "",
            col4: "",
            col5: "",
            col6: "",
            col7: "",
        };
    };

    this.requestSendBaseDatos = function () {
        return {
            idUsuario: "0",
            idEmpresa: "0",
            header: new Array(),
            rows: new Array()
        };
    };

};


