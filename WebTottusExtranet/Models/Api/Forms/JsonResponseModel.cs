using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebTakerData.Models.Api.Forms
{
    public class JsonResponseModel
    {
        public bool success { get; set; }
        public string code { get; set; }
        public string message { get; set; }
        public object result { get; set; }

        public JsonResponseModel(bool success, object result, string message = null)
        {
            this.success = success;
            this.result = result;
            this.message = message;
            this.code = string.Empty;
        }
    }
}
