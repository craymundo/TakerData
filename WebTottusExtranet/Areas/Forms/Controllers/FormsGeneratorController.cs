using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebTakerData.Base;
using WebTakerData.Interface.ICore;

namespace WebTakerData.Areas.Forms.Controllers
{
    [Area("Forms")]
    public class FormsGeneratorController : BaseControllerAuthorize
    {

        public FormsGeneratorController(ISettings appSettings, IResponse _responses, ILogger<Controller> logger) : base(appSettings, _responses, logger)
        {

          
        }
        public IActionResult Index() => View();
    }
}