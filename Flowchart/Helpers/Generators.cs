using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlowchartCreator.Helpers
{
    public static class Generators
    {
        /// <summary>
        /// Creates a URL from a GUID.
        /// </summary>
        /// <returns></returns>
        public static string Url()
        {
            return Convert.ToBase64String(Guid.NewGuid().ToByteArray()).Replace("=", "").Replace("+", "").Replace("/", "");
        }
    }
}
