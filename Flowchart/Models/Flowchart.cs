using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FlowchartCreator.Models
{
    // More fine-grained work will be done here and in the ../Data/FlowchartContext file.
    public class Flowchart
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(20, ErrorMessage = "The flowchart name must be between 1 and 20 characters.", MinimumLength = 1)]
        public string Name { get; set; }

        public string Url { get; set; }

        public string CreatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime LastModified { get; set; }

        [NotMapped]
        public virtual IEnumerable<StepsViewModel> Steps { get; set; }
    }
}
