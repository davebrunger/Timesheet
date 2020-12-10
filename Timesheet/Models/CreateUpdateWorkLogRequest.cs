using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace Timesheet.Models
{
    public class CreateUpdateWorkLogRequest : IValidatableObject
    {
        [Required]
        public DateTime? Date { get; set; }

        [Required]
        [Range(0.01, 24)]
        public decimal? Hours { get; set; }

        [Required]
        public EntityId User { get; set; } = null!;

        [Required]
        public EntityId Task { get; set; } = null!;

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Hours.HasValue)
            {
                var hoursAsString = Hours.Value.ToString(CultureInfo.InvariantCulture).TrimEnd('0');
                var parts = hoursAsString.Split('.');
                if (parts.Length == 2 && parts[1].Length > 2)
                {
                    yield return new ValidationResult("Hours can only be specified to a maximum of two decimal places", new[] { nameof(Hours) });
                }
            }

            if (Date.HasValue && Date.Value.TimeOfDay.TotalMilliseconds != 0)
            {
                yield return new ValidationResult("Date must not have a time component", new[] { nameof(Date) });
            }
        }
    }
}