using Timesheet.Data.Models;

namespace Timesheet.Data
{
    public interface ITimesheetRepository : IRepository
    {
        ITable<User> Users {get;}
        
        ITable<Project> Projects {get;}
        
        ITable<Task> Tasks {get;}
        
        ITable<WorkLog> WorkLogs {get;}

        ITable<Activity> Activities {get;}
    }
}