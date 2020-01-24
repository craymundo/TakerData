using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using WebTakerData.Interface.ICore;

namespace WebTakerData.Core
{
    public class Response : IResponse
    {
        private readonly IServices _services;
        private const string _mediaType = "application/json";
        public Response(IServices services)
        {
            _services = services;
        }

        public async Task<T> GetAsync<T>(string path) where T : class, new()
        {
            var responseBody = string.Empty;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_services.Api);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(_mediaType));
                var response = await client.GetAsync(path);
                response.EnsureSuccessStatusCode();
                responseBody = await response.Content.ReadAsStringAsync();
            }
            var list = JsonConvert.DeserializeObject<T>(responseBody);
            return list;
        }

        public async Task<T> PostAsync<T>(string path, object obj) where T : class, new()
        {
            //var list;
            try
            {
                var responseBody = await PostAsync(path, obj);
               var list = JsonConvert.DeserializeObject<T>(responseBody);
                return list;
            }
            catch (Exception ex)
            {
                var mensaje = ex.Message;
            }
            finally
            {
                
            }
            return null;

        }

        private async Task<string> PostAsync(string path, object obj)
        {
            var responseBody = string.Empty;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(_services.Api);
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(_mediaType));
                var postBody = new StringContent(JsonConvert.SerializeObject(obj).ToString(), Encoding.UTF8, "application/json");
                var response = await client.PostAsync(path, postBody);
                response.EnsureSuccessStatusCode();
                responseBody = await response.Content.ReadAsStringAsync();
            }
            return responseBody;
        }
    }
}
