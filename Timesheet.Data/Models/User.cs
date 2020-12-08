using System.Collections.Generic;

namespace Timesheet.Data.Models
{
    public class User
    {
        public static int NameMaxLength = 200;

        public static int LocationMaxLength = 100;

        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public string? Location { get; set; }

        public virtual ICollection<WorkLog> WorkLogs { get; } = null!;
    }
}