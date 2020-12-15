using System.Threading;
using System.Threading.Tasks;
using Timesheet.Data.Models;

namespace Timesheet.Data.SqlServer
{
    public class TimesheetRepository : ITimesheetRepository
    {
        private readonly TimesheetDataContext context;

        public TimesheetRepository(TimesheetDataContext context)
        {
            this.context = context;
        }

        public ITable<User> Users => DbSetWrapper.New(context.Users);

        public ITable<Project> Projects => DbSetWrapper.New(context.Projects);

        public ITable<Models.Task> Tasks => DbSetWrapper.New(context.Tasks);

        public ITable<WorkLog> WorkLogs => DbSetWrapper.New(context.WorkLogs);

        public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return context.SaveChangesAsync(cancellationToken);
        }
    }
}