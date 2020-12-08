using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Data.Models;

namespace Timesheet.Data.SqlServer.Configuration
{
    public class ProjectConfiguration : IEntityTypeConfiguration<Project>
    {
        public void Configure(EntityTypeBuilder<Project> builder)
        {
            builder.Property(p => p.Name).HasMaxLength(Project.NameMaxLength);

            builder.HasMany(p => p.Tasks)
                .WithOne(wl => wl.Project)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasData(new Project
            {
                Id = -1,
                Name = "Example Project"
            });
        }
    }
}