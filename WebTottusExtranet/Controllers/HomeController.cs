using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebTakerData.Base;
using WebTakerData.Interface.ICore;

namespace WebTakerData.Controllers
{
    [Route("[controller]/[action]")]
    public class HomeController : BaseControllerAuthorize
    {
        public HomeController(ISettings appSettings, IResponse _responses, ILogger<Controller> logger) : base(appSettings, _responses, logger)
        {
        }

        public IActionResult Index() => View();

      
    }
}