using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace FlowchartCreator.Models
{
    public class FlowchartDataViewModel
    {
        public int id { get; set; }

        public IEnumerable<StepsViewModel> Steps { get; set; }
    }
}
