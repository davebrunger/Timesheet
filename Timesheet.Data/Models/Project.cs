using System;
using System.Collections.Generic;

namespace Timesheet.Data.Models
{
    public class Project
    {
        public const int NameMaxLength = 200;

        public long Id { get; set; }

        public string Name { get; set; } = null!;

        public DateTime? DueDate { get; set; }

        public virtual ICollection<Task> Tasks { get; } = null!;
    }
}