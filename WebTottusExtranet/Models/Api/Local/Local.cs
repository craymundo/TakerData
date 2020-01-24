using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebTakerData.Models.Api.Local
{
    public class Local
    {

        public string CodigoPais { get; set; }
        public int IdLocal { get; set; }
        public int CodigoLocal { get; set; }
        public string DescripcionLocal { get; set; }
        public string DescripcionAlternativa { get; set; }
        public string CodigoFormato { get; set; }
        public string DescripcionFormato { get; set; }
        public string CodigoCluster { get; set; }
        public string Direccion { get; set; }
        public string DireccionPmm { get; set; }
        public string Region { get; set; }
        public string Departamento { get; set; }
        public string Provincia { get; set; }
        public string Distrito { get; set; }
        public string Dias { get; set; }
        public string Horario { get; set; }
        public string Telefono { get; set; }
        public string Imagen { get; set; }
        public string Geolocalizacion { get; set; }
        public string X { get; set; }
        public string Y { get; set; }
        public EstadoLocal EstadoLocal { get; set; }
        public TipoLocal TipoLocal { get; set; }
        public ClusterLocal ClusterLocal { get; set; }
        public bool EsPuntoRetiro { get; set; }

    }
}
