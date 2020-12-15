using System.ComponentModel.DataAnnotations;
using Timesheet.Data.Models;

namespace Timesheet.Models
{
    public class CreateUpdateUserRequest
    {
        [Required]
        [MaxLength(User.NameMaxLength)]
        public string Name { get; set; } = null!;

        [MaxLength(User.LocationMaxLength)]
        public string? Location { get; set; }
    }
}