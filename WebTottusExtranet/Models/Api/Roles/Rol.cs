using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebTakerData.Models.Api.Perfiles
{
    public class Rol
    {
        public Rol()
        {
            this.RolId = 0;
            this.Descripcion = string.Empty;
            this.Codigo = string.Empty;
            this.Estado = true;
        }

        public int RolId { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public bool Estado { get; set; }
    }
}
