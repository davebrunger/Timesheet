using System;

namespace Timesheet.Data.Models
{
    public class WorkLog
    {
        public long Id { get; set; }

        public DateTime Date { get; set; }

        public decimal Hours { get; set; }

        public long UserId { get; set; }

        public User User { get; set; } = null!;

        public long TaskId { get; set; }

        public Task Task { get; set; } = null!;
    }
}