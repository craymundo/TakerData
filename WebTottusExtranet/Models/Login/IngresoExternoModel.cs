using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebTakerData.Models.Login
{
    public class IngresoExternoModel
    {
        public string Pais { get; set; }
        public string NumeroDocumento { get; set; }
        public string NumeroCompra { get; set; }
        public string Pagina { get; set; }
        public string Version { get; set; }
        public bool EsMobile { get; set; }
    }
}
