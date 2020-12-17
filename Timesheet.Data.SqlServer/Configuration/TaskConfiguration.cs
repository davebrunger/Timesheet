using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Data.Models;

namespace Timesheet.Data.SqlServer.Configuration
{
    public class TaskConfiguration : IEntityTypeConfiguration<Task>
    {
        public void Configure(EntityTypeBuilder<Task> builder)
        {
            builder.HasIndex(u => u.Name).IsUnique();

            builder.Property(t => t.Name).HasMaxLength(Task.NameMaxLength);

            builder.Property(t => t.TaskStateId).HasConversion<int>();

            builder.HasData(new
            {
                Id = -1L,
                Name = "Example Task",
                ProjectId = -1L,
                TaskStateId = TaskStateId.Open
            });
        }
    }
}