using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlowchartCreator.Models
{
    // Used to represent the flowchart in the view.
    public class FlowchartDataViewModel
    {
        public int id { get; set; }

        // The list of steps for a flowchart.
        public virtual IEnumerable<StepsViewModel> Steps { get; set; }
    }
}
