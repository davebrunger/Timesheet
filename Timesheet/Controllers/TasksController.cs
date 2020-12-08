using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Timesheet.Data.SqlServer;

namespace Timesheet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly TimesheetDataContext timesheetDataContext;

        private readonly ILogger<TasksController> logger;

        public TasksController(TimesheetDataContext timesheetDataContext, ILogger<TasksController> logger)
        {
            this.timesheetDataContext = timesheetDataContext;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync(CancellationToken cancellationToken)
        {
            var data = await timesheetDataContext.Tasks
                .Select(t => new
                {
                    t.Id,
                    t.Name,
                    t.TaskStateId,
                    Project = new
                    {
                        t.Project.Id,
                        t.Project.Name
                    }
                })
                .ToListAsync(cancellationToken)
                .ConfigureAwait(false);

            return Ok(data);
        }
    }
}
