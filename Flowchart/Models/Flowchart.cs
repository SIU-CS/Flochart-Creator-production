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

        // The URL where the flowchart is being stored.
        public string Url { get; set; }

        // Who initially created the flowchart.
        public string CreatedBy { get; set; }

        /// Michael: This needs to be mapped to a particular username from 
        /// the ApplicationUser. You will need a virtual property pointing 
        /// to this as well. Remember, we don't map virtual properties as 
        /// well. Be sure to brush up on Data Annotations or Fluent Validation.
        /// The latter is probably the better way to go eventually.
        public DateTime CreatedDate { get; set; }

        // The last date in which a user modified a flowchart.
        public DateTime LastModified { get; set; }

        // The list of steps for each flowchart. This is generated dynamically from a file.
        [NotMapped]
        public virtual IEnumerable<StepsViewModel> Steps { get; set; }
    }
}
