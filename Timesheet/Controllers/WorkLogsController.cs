using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Timesheet.Data.Models;
using Timesheet.Data.SqlServer;
using Timesheet.Models;

namespace Timesheet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkLogsController : ControllerBase
    {
        private readonly TimesheetDataContext timesheetDataContext;

        private readonly ILogger<WorkLogsController> logger;

        public WorkLogsController(TimesheetDataContext timesheetDataContext, ILogger<WorkLogsController> logger)
        {
            this.timesheetDataContext = timesheetDataContext;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync(CancellationToken cancellationToken)
        {
            var data = await timesheetDataContext.WorkLogs
                .Select(wl => new
                {
                    wl.Id,
                    wl.Date,
                    wl.Hours,
                    User = new
                    {
                        wl.User.Id,
                        wl.User.Name,
                        wl.User.Location
                    },
                    Task = new
                    {
                        wl.Task.Id,
                        wl.Task.Name,
                        wl.Task.TaskStateId,
                        Project = new
                        {
                            wl.Task.Project.Id,
                            wl.Task.Project.Name
                        }
                    }
                })
                .ToListAsync(cancellationToken)
                .ConfigureAwait(false);

            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult> CreateAsync(CreateUpdateWorkLogRequest request, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = await timesheetDataContext.Tasks.AsQueryable()
                .SingleOrDefaultAsync(t => t.Id == request.Task.Id, cancellationToken)
                .ConfigureAwait(false);

            if (task == null)
            {
                ModelState.AddModelError("Task.Id", $"Cannot find task with ID: {request.Task.Id}");
            }
            else if (task.TaskStateId != TaskStateId.Open)
            {
                ModelState.AddModelError("Task.Id", $"Can only add work logs to open tasks");
            }

            var user = await timesheetDataContext.Users.AsQueryable()
                .SingleOrDefaultAsync(u => u.Id == request.User.Id, cancellationToken)
                .ConfigureAwait(false);

            if (user == null)
            {
                ModelState.AddModelError("User.Id", $"Cannot find user with ID: {request.User.Id}");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            timesheetDataContext.WorkLogs.Add(new WorkLog {
                Date = request.Date!.Value,
                Hours = request.Hours!.Value,
                Task = task!,
                User = user!
            });

            await timesheetDataContext.SaveChangesAsync(cancellationToken)
                .ConfigureAwait(false);

            return Ok();
        }
    }
}
