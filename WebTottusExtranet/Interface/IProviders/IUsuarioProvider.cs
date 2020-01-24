using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebTakerData.Models;
using WebTakerData.Models.Login;

namespace WebTakerData.Interface.IProviders
{
    public interface IUsuarioProvider
    {
        Task<JsonResponseAutenticacionUsuario> AutenticacionLogin(LoginModel model);
    }
}
