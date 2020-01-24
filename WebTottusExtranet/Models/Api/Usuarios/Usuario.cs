using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebTakerData.Models.Api.Perfiles;

namespace WebTakerData.Models.Api.Usuarios
{
    public class Usuario
    {
        public int      UsuarioId           { get; set; }
        public string   CodigoUsuario       { get; set; }
        public string   ClaveSecreta        { get; set; }
        public Rol      Rol                 { get; set; }
        public string   Email               { get; set; }
        public string   ApellidoPaterno     { get; set; }
        public string   ApellidoMaterno     { get; set; }
        public string   PrimerNombre        { get; set; }
        public string   SegundoNombre       { get; set; }
        public string   Alias               { get; set; }
        public string   UsuarioCreacion     { get; set; }
        public string   UsuarioModificacion { get; set; }
        public DateTime FechaCreacion       { get; set; }
        public DateTime FechaModificacion   { get; set; }
        public bool     Estado              { get; set; }
    }
}
