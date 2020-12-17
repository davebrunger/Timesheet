using System.Collections.Generic;

namespace Timesheet.Data.Models
{
    public enum ActivityId
    {
        Plan = 1,
        Design,
        Development,
        Test
    }

    public class Activity
    {
        public const int NameMaxLength = 200;

        public ActivityId Id { get; set; }

        public string Name { get; set; } = null!;

        public virtual ICollection<WorkLog> WorkLogs { get; } = null!;
    }
}