using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlowchartCreator.Models
{
    public class StepsViewModel
    {
        public StepsViewModel(int id, string name, string desc, List<int> children)
        {
            this.id = id;
            this.title = name;
            this.description = description;
            this.children = children;
        }

        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public int parentId { get; set; }
        public List<int> children { get; set; }
    }
}
