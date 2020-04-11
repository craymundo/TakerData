using System;
using System.Linq;
using System.Threading.Tasks;
using WebTakerData.Core;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using WebTakerData.Interface.ICore;
using WebTakerData.Models.Api.Menus;
using WebTakerData.Models.Api.Usuarios;

namespace WebTakerData.Base
{
    [Authorize]
    public class BaseControllerAuthorize : Controller
    {
        public readonly ISettings _appSettings;
        public readonly IResponse _appResponses;
        private readonly ILogger<Controller> _logger;

        public BaseControllerAuthorize(ISettings _settings, IResponse _responses, ILogger<Controller> logger)
        {
            _logger = logger;
            _appSettings = _settings;
            _appResponses = _responses;
        }

        protected Usuario UsuarioActual { get; private set; }
        protected string ConeccionToken { get; private set; }
        protected string CodigoUsuario { get; private set; }

        public override Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {

            try
            {

                UsuarioActual = ObtenerUsuarioActual().Result;

                ConeccionToken = ObtenerConeccionToken().Result;

                CodigoUsuario = ObtenerCodigoUsuario().Result;

                if (UsuarioActual == null)
                {
                    var error = new InvalidOperationException("ObtenerUsuarioActual vacio");
                    _logger.LogError(default(EventId), error, error.Message);
                    HttpContext.Session.Clear();
                    context.Result = new RedirectResult(_appSettings.UrlLogOut);
                    return Task.FromResult(0);
                }

                bool isAjaxCall = Request.Headers["X-Requested-With"] == "XMLHttpRequest";
                if (isAjaxCall)
                {
                    base.OnActionExecutionAsync(context, next);
                    return Task.FromResult(0);
                }

                var listaMenu = ObtenerMenuActual(1).Result ?? new List<Menu>();
                if (!listaMenu.Any())
                {
                    // listaMenu = _menuProvider.ObtenerMenuByRol(UsuarioActual.RolId).Result;
                    // Task.FromResult(SetSession(Constantes.Session.Menu + UsuarioActual.RolId, listaMenu));
                }

                var controladorActual = ControllerContext.ActionDescriptor.ControllerName;
                var accionActual = ControllerContext.ActionDescriptor.ActionName;
                var isPaginaValida = ValidarAccesoMenu(listaMenu, controladorActual, accionActual);
                if (!isPaginaValida)
                {
                    //context.Result = new RedirectResult(_appSettings.UrlHome);
                    //return Task.FromResult(0);
                }
                CargarViewBag(ConeccionToken, CodigoUsuario, UsuarioActual, listaMenu);
                
            }
            catch (Exception ex)
            {
                _logger.LogError(default(EventId), ex, ex.Message  + ex.StackTrace);
               // throw;
            }
            return base.OnActionExecutionAsync(context, next);

        }

        private bool ValidarAccesoMenu(List<Menu> listaMenu, string controladorName, string actionName)
        {
            bool resultado = false;

            if (controladorName == "Home" && actionName == "Index")
                return true;

            var menu = listaMenu.FirstOrDefault(p => p.Controlador == controladorName && p.Accion == actionName);
            if (menu == null)
                resultado = false;
            else
                resultado = true;

            return resultado;
        }

        private void CargarViewBag(string token, string codigo, Usuario usuarioActual, List<Menu> listaMenu)
        {
            ViewBag.ListaMenu = listaMenu.ToList();
            ViewBag.NombreUsuarioBienvenida = usuarioActual.Alias ?? "";
            ViewBag.NombreUsuario = string.Format("{0} {1}", usuarioActual.PrimerNombre, usuarioActual.ApellidoPaterno);
            ViewBag.IdPerfil = "1";
            ViewBag.PerfilDescripcion = "Administrador";
            ViewBag.CodigoUsuario = codigo;
            ViewBag.ConeccionToken = token;
            ViewBag.IdUsuario = "1";
            ViewBag.IdEmpresa = "1";
        }

        private async Task<string> ObtenerConeccionToken()
        {
            return await GetSession<string>(Constante.Session.TokenConeccion);
        }

        private async Task<string> ObtenerCodigoUsuario()
        {
            return await GetSession<string>(Constante.Session.CodigoUsuario);
        }

        private async Task<Usuario> ObtenerUsuarioActual()
        {
            return await GetSession<Usuario>(Constante.Session.UsuarioActual);
        }

        private async Task<List<Menu>> ObtenerMenuActual(int idPerfil)
        {
            return await GetSession<List<Menu>>(Constante.Session.Menu);
        }

        public async Task<T> GetSession<T>(string key)
        {
            return await HttpContext.Session.GetData<T>(key);
        }

        public async Task SetSession(string key, object value)
        {
            await HttpContext.Session.SetData(key, value);
        }
    }
}
