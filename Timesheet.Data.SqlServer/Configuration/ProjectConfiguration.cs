using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Data.Models;

namespace Timesheet.Data.SqlServer.Configuration
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.HasIndex(u => u.Name).IsUnique();

            builder.Property(p => p.Name).HasMaxLength(Project.NameMaxLength);
            builder.Property(wl => wl.DueDate).HasColumnType("DATE");

            builder.HasData(new Project
            {
                Id = -1,
                Name = "Example Project"
            });
        }
    }
}