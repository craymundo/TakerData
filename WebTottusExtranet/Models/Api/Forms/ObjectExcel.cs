using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebTakerData.Models.Api.Forms
{
    public class ObjectExcel
    {
        public List<ObjectHeaderExcel> header { get; set; }
        public List<ObjectRowsExcel> rows { get; set; }
    }
}
