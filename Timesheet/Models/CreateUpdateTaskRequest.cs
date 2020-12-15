using System.ComponentModel.DataAnnotations;
using Timesheet.Data.Models;

namespace Timesheet.Models
{
    public class CreateUpdateTaskRequest
    {
        [Required]
        [MaxLength(Task.NameMaxLength)]
        public string Name { get; set; } = null!;

        [Required]
        public EntityId Project { get; set; } = null!;
    }
}