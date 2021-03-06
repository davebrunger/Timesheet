using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Data.Models;

namespace Timesheet.Data.SqlServer.Configuration
{
    public class TaskStateConfiguration : IEntityTypeConfiguration<TaskState>
    {
        public void Configure(EntityTypeBuilder<TaskState> builder)
        {
            builder.Property(t => t.Id).HasConversion<int>();
            builder.Property(t => t.Name).HasMaxLength(TaskState.NameMaxLength);

            builder.HasData(
                Enum.GetValues(typeof(TaskStateId))
                    .Cast<TaskStateId>()
                    .Select(s => new TaskState()
                    {
                        Id = s,
                        Name = s.ToString()
                    })
            );
        }
    }
}