using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Data.Models;

namespace Timesheet.Data.SqlServer.Configuration
{
    public class ActivityConfiguration : IEntityTypeConfiguration<Activity>
    {
        public void Configure(EntityTypeBuilder<Activity> builder)
        {
            builder.Property(t => t.Id).HasConversion<int>();
            builder.Property(p => p.Name).HasMaxLength(Activity.NameMaxLength);

            builder.HasData(
                Enum.GetValues(typeof(ActivityId))
                    .Cast<ActivityId>()
                    .Select(s => new Activity()
                    {
                        Id = s,
                        Name = s.ToString()
                    })
            );
        }
    }
}