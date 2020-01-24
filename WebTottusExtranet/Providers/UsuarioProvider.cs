using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebTakerData.Core;
using WebTakerData.Interface.ICore;
using WebTakerData.Interface.IProviders;
using WebTakerData.Models;
using WebTakerData.Models.Dto;
using WebTakerData.Models.Login;

namespace WebTakerData.Providers
{
    public class UsuarioProvider : IUsuarioProvider
    {
        private readonly IResponse requestclient;

        public UsuarioProvider(IResponse _requestclient)
        {
            this.requestclient = _requestclient;
        }

        public async Task<JsonResponseAutenticacionUsuario> AutenticacionLogin(LoginModel model)
        {
            var obj = new UsuarioLoginDto
            {
                Usuario         = model.CodigoUsuario,
                Contrasena      = model.ClaveSecreta
            };
            return await requestclient.PostAsync<JsonResponseAutenticacionUsuario>(Constante.Api.Login.AutentificacionUsuario, obj);
        }

    }
}
