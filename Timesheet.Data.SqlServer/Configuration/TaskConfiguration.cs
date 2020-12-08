using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Data.Models;

namespace Timesheet.Data.SqlServer.Configuration
{
    public class TaskConfiguration : IEntityTypeConfiguration<Task>
    {
        public void Configure(EntityTypeBuilder<Task> builder)
        {
            builder.Property(t => t.Name).HasMaxLength(Task.NameMaxLength);

            builder.Property(t => t.TaskStateId).HasConversion<int>();

            builder.HasMany(t => t.WorkLogs)
                .WithOne(wl => wl.Task)
                .HasForeignKey(wl => wl.TaskId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasData(new Task
            {
                Id = -1,
                Name = "Example Task",
                ProjectId = -1,
                TaskStateId = TaskStateId.Open
            });
        }
    }
}