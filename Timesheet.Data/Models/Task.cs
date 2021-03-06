using System.Collections.Generic;

namespace Timesheet.Data.Models
{
    public class Task
    {
        public const int NameMaxLength = 200;

        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public Project Project { get; set; } = null!;

        public TaskStateId TaskStateId { get; set; }

        public TaskState TaskState { get; set; } = null!;

        public virtual ICollection<WorkLog> WorkLogs { get; } = null!;
    }
}