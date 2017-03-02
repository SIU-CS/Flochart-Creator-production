using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlowchartCreator.Helpers
{
    public class Accessors
    {
        // This may change depending on the directory structure we determine.
        protected internal const string IP = "0.0.0.0";
        protected internal const string FTP = "ftp://" + IP;

        public static string GetFtpUrl(string username)
        {
            return FTP + "/flowcharts/" + username;
        }
    }
}
