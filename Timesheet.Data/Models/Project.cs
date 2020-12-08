using System.Collections.Generic;

namespace Timesheet.Data.Models
{
    public class Project
    {
        public static int NameMaxLength = 200;

        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public virtual ICollection<Task> Tasks { get; } = null!;
    }
}