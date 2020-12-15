using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Timesheet.Data.Models;

namespace Timesheet.Data.SqlServer.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasIndex(u => u.Name).IsUnique();

            builder.Property(u => u.Name).HasMaxLength(User.NameMaxLength);
            builder.Property(u => u.Location).HasMaxLength(User.LocationMaxLength);

            builder.HasMany(u => u.WorkLogs)
                .WithOne(wl => wl.User)
                .HasForeignKey(wl => wl.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasData(new User
            {
                Id = -1,
                Name = "Example User"
            });

        }
    }
}