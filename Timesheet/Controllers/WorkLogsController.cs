using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Timesheet.Data;
using Timesheet.Data.Models;
using Timesheet.Models;

namespace Timesheet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkLogsController : ControllerBase
    {
        private readonly ITimesheetRepository timesheetRepository;

        private readonly ILogger<WorkLogsController> logger;

        public WorkLogsController(ITimesheetRepository timesheetRepository, ILogger<WorkLogsController> logger)
        {
            this.timesheetRepository = timesheetRepository;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync(CancellationToken cancellationToken)
        {
            var data = await timesheetRepository.WorkLogs
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
                    },
                    ActivityId = wl.ActivityId
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

            var task = await timesheetRepository.Tasks
                .SingleOrDefaultAsync(t => t.Id == request.Task.Id, cancellationToken)
                .ConfigureAwait(false);

            if (task == null)
            {
                ModelState.AddModelError($"{nameof(CreateUpdateWorkLogRequest.Task)}.{nameof(CreateUpdateWorkLogRequest.Task.Id)}", 
                    $"Cannot find task with ID: {request.Task.Id}");
            }
            else if (task.TaskStateId != TaskStateId.Open)
            {
                ModelState.AddModelError($"{nameof(CreateUpdateWorkLogRequest.Task)}.{nameof(CreateUpdateWorkLogRequest.Task.Id)}",
                    $"Can only add work logs to open tasks");
            }

            var user = await timesheetRepository.Users
                .SingleOrDefaultAsync(u => u.Id == request.User.Id, cancellationToken)
                .ConfigureAwait(false);

            if (user == null)
            {
                ModelState.AddModelError($"{nameof(CreateUpdateWorkLogRequest.User)}.{nameof(CreateUpdateWorkLogRequest.User.Id)}",
                    $"Cannot find user with ID: {request.User.Id}");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            timesheetRepository.WorkLogs.Add(new WorkLog {
                Date = request.Date!.Value,
                Hours = request.Hours!.Value,
                Task = task!,
                User = user!,
                ActivityId = request.ActivityId
            });

            await timesheetRepository.SaveChangesAsync(cancellationToken)
                .ConfigureAwait(false);

            return Ok();
        }
    }
}
