using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebTakerData.Models.Dto
{
    public class UsuarioLoginDto
    {
        public string CodigoPais { get; set; }
        public string CodigoEmpresa { get; set; }
        public string CodigoSistema { get; set; }
        public string Usuario { get; set; }
        public string Contrasena { get; set; }
    }
}
