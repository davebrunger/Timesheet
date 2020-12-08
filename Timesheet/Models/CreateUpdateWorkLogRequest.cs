using System;
using System.ComponentModel.DataAnnotations;

namespace Timesheet.Models
{
    public class CreateUpdateWorkLogRequest
    {
        [Required]
        public DateTime Date { get; set; }

        public decimal Hours { get; set; }

        [Required]
        public EntityId User { get; set; } = null!;

        [Required]
        public EntityId Task { get; set; } = null!;        
    }
}