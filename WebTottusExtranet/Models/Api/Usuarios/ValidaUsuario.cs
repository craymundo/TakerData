using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebTakerData.Models.Api.Usuarios
{
    public class ValidaUsuario
    {
        public int Identificador { get; set; }
        public string CodigoUsuario { get; set; }
        public string Mensaje { get; set; }
        public bool IsAutenticado { get; set; }
    }
}
