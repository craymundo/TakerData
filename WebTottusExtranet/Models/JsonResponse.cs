using System.Collections.Generic;
using WebTakerData.Models.Api.Autentificaciones;



namespace WebTakerData.Models
{
    public class JsonResponseAutenticacionUsuario
    {
        public bool Success { get; set; }
        public string Code { get; set; }
        public string Message { get; set; }
        public AutenticacionUsuario Result { get; set; }
    }

   

}
