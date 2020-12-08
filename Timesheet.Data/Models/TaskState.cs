using System.Collections.Generic;

namespace Timesheet.Data.Models
{
    public enum TaskStateId
    {
        Open = 1,
        Closed
    }

    public class TaskState
    {
        public static int NameMaxLength = 200;
 
        public TaskStateId Id { get; set; }

        public string Name { get; set; } = null!;

        public virtual ICollection<Task> Tasks { get; } = null!;
    }
}