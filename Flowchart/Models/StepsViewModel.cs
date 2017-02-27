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
            this.name = name;
            this.desc = desc;
            this.children = children;
        }

        public int id { get; set; }
        public string name { get; set; }
        public string desc { get; set; }
        public List<int> children { get; set; }
    }
}
