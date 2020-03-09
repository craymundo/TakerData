using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WebTakerData.Core;
using WebTakerData.Interface.ICore;
using WebTakerData.Interface.IProviders;
using WebTakerData.Models;
using WebTakerData.Models.Api.Autentificaciones;
using WebTakerData.Models.Api.Menus;
using WebTakerData.Models.Api.Usuarios;
using WebTakerData.Models.Login;
using WebTakerData.Utilities;

namespace WebTakerData.Controllers
{
    public class LoginController : Controller
    {
        private readonly IUsuarioProvider _usuarioProvider;
        public readonly ISettings _appSettings;

        public LoginController(IUsuarioProvider usuarioProvider, ISettings appSettings, IServices services)
        {
            _appSettings = appSettings;
            _usuarioProvider = usuarioProvider;
        }

        public IActionResult Index(string returnUrl = null)
        {
            var model = new LoginModel
            {
                ReturnUrl = returnUrl
            };
            return View(model);
        }

        [HttpPost]
        public async Task<IActionResult> Index(LoginModel model, string returnUrl = null)
        {
            if (ModelState.IsValid)
            {
                var parameter = new LoginModel
                {
                    CodigoUsuario = model.CodigoUsuario,
                    ClaveSecreta = model.ClaveSecreta
                };
                try
                {
                    var autenticacion = await _usuarioProvider.AutenticacionLogin(parameter) ?? new JsonResponseAutenticacionUsuario();
                    var resultado = autenticacion.Result ?? new AutenticacionUsuario();
                    var usuario = resultado.Usuario ?? new Usuario();
                    var valida = resultado.ValidaUsuario ?? new ValidaUsuario();
                    var accesoMenu = resultado.Menu ?? new List<Menu>();
                    if (!valida.IsNull() && valida.Identificador == Constante.LoginResultado.UsuarioValido)
                    {
                        if (valida.IsAutenticado)
                        {
                            return RedirectToAction("CambiarClave", "Login");
                        }
                        else
                        {
                            await GuardarClaimsSesion(valida.CodigoUsuario, usuario, accesoMenu);
                            if (!returnUrl.IsNull())
                            {
                                if (returnUrl.Contains('/'))
                                    return await Task.Run(() => RedirectToAction("Index", "Home"));
                                else if (Url.IsLocalUrl(returnUrl))
                                    return await Task.Run(() => Redirect(returnUrl));
                                else
                                    return await Task.Run(() => RedirectToAction("Index", "Home"));
                            }
                            else
                                return await Task.Run(() => RedirectToAction("Index", "Home"));
                        }
                    }
                    else
                    {
                        model.Mensaje = "no ingreso";
                    }
                }
                catch (TaskCanceledException t)
                {
                    model.Mensaje = t.Message;
                }
                catch (Exception e)
                {
                    model.Mensaje = e.Message;
                }
            }
            return await Task.Run(() => View("Index", model));
            
        }


        //[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        //public async Task<IActionResult> Error()
        //{
        //    await ExpireSession();
        //    return await Task.Run(() => View("Error"));
        //}

        //[HttpGet]
        //public async Task<IActionResult> Forbidden()
        //{
        //    return await Task.Run(() => View());
        //}

        //[HttpGet]
        //public async Task<IActionResult> LogOut()
        //{
        //    await ExpireSession();
        //    return await Task.Run(() => RedirectToAction("Index"));
        //}

        //private async Task ExpireSession()
        //{
        //    await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        //    HttpContext.Session.Clear();
       // }

        private async Task GuardarClaimsSesion(string codigoUsuario, Usuario usuario, List<Menu> Menus)
        {
            try
            {
                var claims = new[] {
                                new Claim(ClaimTypes.Country, usuario.CodigoUsuario),
                                new Claim(ClaimTypes.NameIdentifier, usuario.UsuarioId.ToString()),
                                new Claim(ClaimTypes.Name, usuario.Alias)

                            };

                var userIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                var principal = new ClaimsPrincipal(userIdentity);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);
                await HttpContext.Session.SetData(Constante.Session.UsuarioActual, usuario);
                await HttpContext.Session.SetData(Constante.Session.CodigoUsuario, codigoUsuario);
                await HttpContext.Session.SetData(Constante.Session.Menu, Menus);
            }
            catch (Exception ex)
            {
                var mensaje = ex.Message;
                throw;
            }


        }

    }
}