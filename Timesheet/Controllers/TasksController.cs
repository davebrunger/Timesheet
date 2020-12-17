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
    public class TasksController : ControllerBase
    {
        private readonly ITimesheetRepository timesheetRepository;

        private readonly ILogger<TasksController> logger;

        public TasksController(ITimesheetRepository timesheetRepository, ILogger<TasksController> logger)
        {
            this.timesheetRepository = timesheetRepository;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync(CancellationToken cancellationToken)
        {
            var data = await timesheetRepository.Tasks
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

        [HttpPost]
        public async Task<ActionResult> CreateAsync(CreateUpdateTaskRequest request, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = await timesheetRepository.Tasks
                .SingleOrDefaultAsync(t => t.Name == request.Name, cancellationToken)
                .ConfigureAwait(false);

            if (task != null)
            {
                ModelState.AddModelError(nameof(CreateUpdateTaskRequest.Name), $"A task with the name: {request.Name} already exists");
            }

            var project = await timesheetRepository.Projects
                .SingleOrDefaultAsync(p => p.Id == request.Project.Id, cancellationToken)
                .ConfigureAwait(false);

            if (project == null)
            {
                ModelState.AddModelError($"{nameof(CreateUpdateTaskRequest.Project)}.{nameof(CreateUpdateTaskRequest.Project.Id)}",
                    $"Cannot find project with ID: {request.Project.Id}");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            timesheetRepository.Tasks.Add(new Data.Models.Task {
                Name = request.Name,
                Project = project!,
                TaskStateId = TaskStateId.Open
            });

            await timesheetRepository.SaveChangesAsync(cancellationToken)
                .ConfigureAwait(false);

            return Ok();
        }
    }
}
