using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Timesheet.Data.Models;

namespace Timesheet.Data.SqlServer
{
    public class TimesheetDataContext : DbContext
    {
        public DbSet<User> Users { get; set; } = null!;

        public DbSet<Project> Projects { get; set; } = null!;

        public DbSet<Task> Tasks { get; set; } = null!;

        public DbSet<WorkLog> WorkLogs { get; set; } = null!;

        public DbSet<TaskState> TaskStates { get; set; } = null!;

        public DbSet<Activity> Activities { get; set; } = null!;

        public TimesheetDataContext(DbContextOptions<TimesheetDataContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var configTypes = typeof(TimesheetDataContext).Assembly.GetTypes()
                .Where(t => t.GetConstructors().Any(c => c.GetParameters().Length == 0))
                .Where(ImplementsIEntityTypeConfiguration)
                .Select(t => (Type: t, ConfiguredType: GetConfiguredType(t)));

            var applyMethod = typeof(ModelBuilder).GetMethods()
                .Single(m => m.Name == nameof(ModelBuilder.ApplyConfiguration));

            foreach (var t in configTypes)
            {
                var instance = Activator.CreateInstance(t.Type);
                var typedMethod = applyMethod.MakeGenericMethod(t.ConfiguredType);
                typedMethod.Invoke(modelBuilder, new[] { instance });
            }
        }

        private Type GetConfiguredType(Type type)
        {
            var configurationInterfaces = type.GetInterfaces()
                .Where(i => i.IsGenericType)
                .Where(i => i.GetGenericTypeDefinition() == typeof(IEntityTypeConfiguration<>));

            return configurationInterfaces.Single().GetGenericArguments()[0];
        }

        private bool ImplementsIEntityTypeConfiguration(Type type)
        {
            return type.GetInterfaces()
                .Where(i => i.IsGenericType)
                .Select(i => i.GetGenericTypeDefinition())
                .Contains(typeof(IEntityTypeConfiguration<>));
        }
    }
}