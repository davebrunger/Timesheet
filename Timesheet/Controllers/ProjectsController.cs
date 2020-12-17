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
    public class ProjectsController : ControllerBase
    {
        private readonly ITimesheetRepository timesheetRepository;

        private readonly ILogger<ProjectsController> logger;

        public ProjectsController(ITimesheetRepository timesheetRepository, ILogger<ProjectsController> logger)
        {
            this.timesheetRepository = timesheetRepository;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync(CancellationToken cancellationToken)
        {
            var data = await timesheetRepository.Projects
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.DueDate
                })
                .ToListAsync(cancellationToken)
                .ConfigureAwait(false);

            return Ok(data);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult> GetAsync(long id, CancellationToken cancellationToken)
        {
            var data = await timesheetRepository.Projects
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.DueDate,
                    Tasks = p.Tasks.Select(t => new
                    {
                        t.Id,
                        t.Name,
                        WorkLogs = t.WorkLogs.Select(wl => new
                        {
                            wl.Id,
                            User = new
                            {
                                wl.User.Id,
                                wl.User.Name
                            },
                            wl.Date,
                            wl.Hours,
                            wl.ActivityId
                        })
                    })
                })
                .SingleOrDefaultAsync(p => p.Id == id)
                .ConfigureAwait(false);

            return data != null
                ? Ok(data)
                : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> CreateAsync(CreateUpdateProjectRequest request, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var project = await timesheetRepository.Tasks
                .SingleOrDefaultAsync(t => t.Name == request.Name, cancellationToken)
                .ConfigureAwait(false);

            if (project != null)
            {
                ModelState.AddModelError(nameof(CreateUpdateProjectRequest.Name), $"A project with the name: {request.Name} already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            timesheetRepository.Projects.Add(new Project
            {
                Name = request.Name,
                DueDate = request.DueDate
            });

            await timesheetRepository.SaveChangesAsync(cancellationToken)
                .ConfigureAwait(false);

            return Ok();
        }
    }
}
