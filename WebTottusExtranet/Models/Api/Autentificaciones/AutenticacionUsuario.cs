using System.Collections.Generic;
using WebTakerData.Models.Api.Menus;
using WebTakerData.Models.Api.Usuarios;

namespace WebTakerData.Models.Api.Autentificaciones
{
    public class AutenticacionUsuario
    {
        public ValidaUsuario ValidaUsuario { get; set; }
        public Usuario Usuario { get; set; }
        public List<Menu> Menu { get; set; }
    }
}
