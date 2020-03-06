using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NPOI.HSSF.UserModel;
using NPOI.SS.UserModel;
using NPOI.XSSF.UserModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WebTakerData.Base;
using WebTakerData.Interface.ICore;
using WebTakerData.Models.Api.Forms;

namespace WebTakerData.Areas.Forms.Controllers
{
    [Area("Forms")]
    public class FormsGeneratorController : BaseControllerAuthorize
    {
        private readonly ILogger<Controller> _logger;
        private readonly IHostingEnvironment _hostingEnvironment;

        public FormsGeneratorController(ISettings appSettings, IResponse _responses, ILogger<Controller> logger, IHostingEnvironment hostingEnvironment) : base(appSettings, _responses, logger)
        {
            _logger = logger;
            _hostingEnvironment = hostingEnvironment;

        }
        public IActionResult Index() => View();

        public IActionResult Editar() => View();

        [HttpGet]
        public IActionResult EditarForm(string id)
        {
            ViewBag.idform = id;
            return View();
        }

        public IActionResult InvitacionFormulario() => View();

        public IActionResult CargaInvitados() => View();

        [HttpPost]
        public JsonResult OnLoadBaseDatos(IFormFile files, string idusuario, string idempresa)
        {
            var success = true;
            JsonResponseModel result = new JsonResponseModel(false, null, "");
            List<ObjectRowsExcel> data = new List<ObjectRowsExcel>();
            List<ObjectHeaderExcel> dataHeader = new List<ObjectHeaderExcel>();
            ObjectExcel oExcel = new ObjectExcel();
            try
            {
                //var fileName = files.Name;
                string folderName = "FilesUpload";
                string webRootPath = _hostingEnvironment.WebRootPath;
                string newPath = Path.Combine(webRootPath, folderName);
                string sFileExtension = Path.GetExtension(files.FileName);
                string filename = Path.GetFileName(files.FileName.ToString());

                string fullPath = Path.Combine(newPath, files.FileName);
                ISheet sheet;
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    files.CopyTo(stream);
                    stream.Position = 0;
                    if (sFileExtension == ".xls")
                    {
                        HSSFWorkbook hssfwb = new HSSFWorkbook(stream); //This will read the Excel 97-2000 formats  
                        sheet = hssfwb.GetSheetAt(0); //get first sheet from workbook  
                    }
                    else
                    {
                        XSSFWorkbook hssfwb = new XSSFWorkbook(stream); //This will read 2007 Excel format  
                        sheet = hssfwb.GetSheetAt(0); //get first sheet from workbook   
                    }

                    IRow headerRow = sheet.GetRow(0); //Get Header Row
                    int cellCount = headerRow.LastCellNum;

                    for (int j = 0; j < cellCount; j++)
                    {
                        ICell cell = headerRow.GetCell(j);
                        if (cell == null || string.IsNullOrWhiteSpace(cell.ToString())) continue;
                        ObjectHeaderExcel tmpHeader = new ObjectHeaderExcel();
                        tmpHeader.header = cell.ToString();
                        dataHeader.Add(tmpHeader);
                    }

                    for (int i = (sheet.FirstRowNum + 1); i <= sheet.LastRowNum; i++) //Read Excel File
                    {
                        IRow row = sheet.GetRow(i);
                        if (row == null) continue;
                        if (row.Cells.All(d => d.CellType == CellType.Blank)) continue;
                        ObjectRowsExcel tmpRows = new ObjectRowsExcel();
                        tmpRows.col1 = row.GetCell(0).ToString();
                        tmpRows.col2 = row.GetCell(1).ToString();
                        tmpRows.col3 = row.GetCell(2).ToString();
                        tmpRows.col4 = row.GetCell(3).ToString();
                        tmpRows.col5 = row.GetCell(4).ToString();

                        data.Add(tmpRows);

                    }
                }

                oExcel.header = dataHeader.ToList();
                oExcel.rows = data.ToList();

                result.result = oExcel;
                System.IO.File.Delete(fullPath);

                success = true;
            }
            catch (Exception ex)
            {
                success = false;
                _logger.LogError(default(EventId), ex, ex.Message);
            }

            return Json(new
            {
                success = success,
                data = result.result
            });
        }


        [HttpPost]
        public JsonResult SendBaseDatos(IFormFile files, int idLocal, string codigoPais, string pathfile)
        {
            var success = true;
            JsonResponseModel result = new JsonResponseModel(false, null, "");


            return Json(new
            {
                success = success,
                data = result.result
            });
        }
    }
}