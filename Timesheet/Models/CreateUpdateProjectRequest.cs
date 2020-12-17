using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Timesheet.Data.Models;

namespace Timesheet.Models
{
    public class CreateUpdateProjectRequest : IValidatableObject
    {
        [Required]
        [MaxLength(Project.NameMaxLength)]
        public string Name { get; set; } = null!;

        public DateTime? DueDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (DueDate.HasValue && DueDate.Value.TimeOfDay.TotalMilliseconds != 0)
            {
                yield return new ValidationResult("DueDate must not have a time component", new[] { nameof(DueDate) });
            }
        }
    }
}