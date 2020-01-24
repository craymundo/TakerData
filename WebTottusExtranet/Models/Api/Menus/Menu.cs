using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebTakerData.Models.Api.Menus
{
    public class Menu
    {
        public Menu()
        {
            this.MenuId = 0;
            this.MenuPadreId = 0;
            this.CodigoIdentificador = string.Empty;
            this.Descripcion = string.Empty;
            this.Area = string.Empty;
            this.Controlador = string.Empty;
            this.Accion = string.Empty;
            this.Icono = string.Empty;
            this.Orden = 0;
            this.Estado = true;
        }

        public int MenuId { get; set; }
        public int MenuPadreId { get; set; }
        public string CodigoIdentificador { get; set; }
        public string Descripcion { get; set; }
        public string Area { get; set; }
        public string Controlador { get; set; }
        public string Accion { get; set; }
        public string Icono { get; set; }
        public int Orden { get; set; }
        public bool Estado { get; set; }
    }
}
