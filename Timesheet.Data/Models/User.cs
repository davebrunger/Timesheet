using System.Collections.Generic;

namespace Timesheet.Data.Models
{
    public class User
    {
        public const int NameMaxLength = 200;

        public const int LocationMaxLength = 100;

        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Location { get; set; }

        public virtual ICollection<WorkLog> WorkLogs { get; } = null!;
    }
}