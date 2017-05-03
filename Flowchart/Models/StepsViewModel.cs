using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FlowchartCreator.Models
{
    public class StepsViewModel
    {
        // Steps view model. Allows instantiation of a step object with the following characteristics.
        public StepsViewModel(int id, string name, string description, int parentId, List<int> children)
        {
            this.id = id;
            this.title = name;
            this.description = description;
            this.parentId = parentId;
            this.children = children;
        }

        public int id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        
        // The step id of a step's parent (if one exists).
        public int? parentId { get; set; }
        
        // The list of children for a particular step. This can be null.
        public List<int> children { get; set; }
    }
}
