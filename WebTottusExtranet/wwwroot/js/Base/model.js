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
            titulo: "",
            comentario: "",
            fecha_vigencia: "",
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
            },
            html: "",
        };
    };

};


