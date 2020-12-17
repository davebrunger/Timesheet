using System;

namespace Timesheet.Data.Models
{
    public class WorkLog
    {
        public long Id { get; set; }

        public DateTime Date { get; set; }

        public decimal Hours { get; set; }

        public User User { get; set; } = null!;

        public Task Task { get; set; } = null!;

        public ActivityId? ActivityId { get; set; }

        public Activity? Activity { get; set; }
    }
}