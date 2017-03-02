using FlowchartCreator.Models;
using System.IO;
using FlowchartCreator.Helpers;
using System.Text;
using System.Collections.Generic;

namespace FlowchartCreator.Helpers
{
    public static class Parsers
    {
        /// <summary>
        /// Takes a flowchart object and parses it, sending the data 
        /// to an XML file which can be saved for later retrieval.
        /// </summary>
        /// <param name="flowchart">Flowchart object containing the relationships within the flowchart.</param>
        public static void ToXml(Flowchart flowchart)
        {
            string fullPath = Accessors.GetFtpUrl(flowchart.CreatedBy) + "/" + flowchart.Url;

            using (TextWriter tw = new StreamWriter(new MemoryStream(Encoding.UTF8.GetBytes(fullPath))))
            {
                tw.WriteLine("<flowchart>");
                foreach(var steps in flowchart.Steps)
                {
                    tw.WriteLine("  <step id=\"" + steps.id + "\"" );
                    tw.WriteLine("      <name>" + steps.name + "</name>");
                    tw.WriteLine("      <description>" + steps.desc + "</description>");
                    tw.WriteLine("      <children>" + steps.children.ToString() + "</children>");
                    tw.WriteLine("  </step>");
                }
                tw.WriteLine("</flowchart>");
            }
        }

        /// <summary>
        /// Takes a file and parses it, sending the data to an object
        /// which can be passed easily to the view for manipulation.
        /// </summary>
        /// <param name="url">URL pointing to the location of the file.</param>
        public static void ToObject(string url)
        {

        }
    }
}
