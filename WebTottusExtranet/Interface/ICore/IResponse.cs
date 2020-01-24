using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebTakerData.Interface.ICore
{
    public interface IResponse
    {
        Task<T> GetAsync<T>(string path) where T : class, new();
        Task<T> PostAsync<T>(string path, object obj) where T : class, new();
    }
}
