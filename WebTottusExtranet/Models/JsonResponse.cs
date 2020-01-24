using System.Collections.Generic;
using WebTakerData.Models.Api.Autentificaciones;
using WebTakerData.Models.Api.Local;


namespace WebTakerData.Models
{
    public class JsonResponseAutenticacionUsuario
    {
        public bool Success { get; set; }
        public string Code { get; set; }
        public string Message { get; set; }
        public AutenticacionUsuario Result { get; set; }
    }

       public class JsonResponseLocalesList
    {
        public bool success { get; set; }
        public string code { get; set; }
        public string message { get; set; }
        public List<Local> result { get; set; }
    }

}
