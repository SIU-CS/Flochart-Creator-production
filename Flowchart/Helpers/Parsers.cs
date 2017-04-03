using FlowchartCreator.Models;
using System.IO;
using System.Text;
using System.Collections.Generic;
using System.Xml.Linq;
using System.Linq;
using System;
using Newtonsoft.Json.Linq;

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
                tw.WriteLine("<flowchart id=\"" + flowchart.Id + "\" name=\"" + flowchart.Name + "\">");
                foreach(var steps in flowchart.Steps)
                {
                    string children =  "";
                    foreach(var child in steps.children)
                    {
                        children = child + ",";
                    }
                    tw.WriteLine("  <step>" );
                    tw.WriteLine("      <id>" + steps.id + "</id>");
                    tw.WriteLine("      <name>" + steps.title + "</name>");
                    tw.WriteLine("      <description>" + steps.description + "</description>");
                    tw.WriteLine("      <children>" + children + "</children>");
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
        /// <param name="type">The type of file from which data is parsed.</param>
        /// <returns>A flowchart object containing all elements from the file.</returns>
        public static Flowchart ToObject(string url, string type)
        {
            switch(type){
                case "xml":
                    return FromXml(url);
                case "json":
                    return FromJson(url);
                default:
                    throw new InvalidDataException("The parameter value for type is not a valid type that we can convert from.");
            }
        }

        /// <summary>
        /// Parses an XML file and puts all data into a Flowchart object.
        /// </summary>
        /// <param name="url">URL pointing to the location of the file.</param>
        /// <returns>Flowchart object containing XML data.</returns>
        private static Flowchart FromXml(string url)
        {
            XDocument xml;
            if (File.Exists(url))
                xml = XDocument.Load(url);
            else
                throw new IOException("The file at " + url + " doesn't exist!");

            Flowchart flowchart = new Flowchart();
            flowchart.Id = Convert.ToInt32(xml.Root.Attribute("id")?.Value);
            flowchart.Name = xml.Root.Attribute("name")?.Value;

            var selectSteps = from s in xml.Descendants("flowchart")
                              select s;

            List<StepsViewModel> temp = new List<StepsViewModel>();
            foreach (var step in selectSteps)
            {
                // Parse the list of children.
                string[] tempChildren = step.Element("children")?.Value.Split(',');
                List<int> children = new List<int>();
                foreach(var child in tempChildren)
                {
                    children.Add(Convert.ToInt32(child));
                }

                // May need to handle when children are null here.

                temp.Add(new StepsViewModel(
                    Convert.ToInt32(step.Element("id")?.Value),
                    step.Element("name")?.Value,
                    step.Element("description")?.Value,
                    Convert.ToInt32(step.Element("parentId")?.Value),
                    children));
            }

            flowchart.Steps = temp;

            return flowchart;
        }

        /// <summary>
        /// Parses a JSON file and puts all data into a Flowchart object.
        /// </summary>
        /// <param name="url">URL pointing to the location of the file.</param>
        /// <returns>Flowchart object containing XML data.</returns>
        private static Flowchart FromJson(string url)
        {
            var json = File.ReadAllText("JSON.json");
            var objects = JArray.Parse(json); //Parses it as an array
            Flowchart flowchart = new Flowchart();
            foreach (JObject root in objects)
            {
                foreach (KeyValuePair<String, JToken> app in root)
                {
                    flowchart.Id = Convert.ToInt32(app.Key);
                    flowchart.Name = (String)app.Value["name"];

                    var selectSteps = from s in app.Value.["flowchart"]
                                      select s;

                    List<StepsViewModel> temp = new List<StepsViewModel>();
                    foreach (var step in selectSteps)
                    {
                        
                        
                    }


                }
            }
            return new Flowchart();
        }
    }
}
