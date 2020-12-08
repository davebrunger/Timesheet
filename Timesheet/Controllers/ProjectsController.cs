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
    public class ProjectsController : ControllerBase
    {
        private readonly TimesheetDataContext timesheetDataContext;

        private readonly ILogger<ProjectsController> logger;

        public ProjectsController(TimesheetDataContext timesheetDataContext, ILogger<ProjectsController> logger)
        {
            this.timesheetDataContext = timesheetDataContext;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync(CancellationToken cancellationToken)
        {
            var data = await timesheetDataContext.Projects
                .Select(p => new {
                    p.Id,
                    p.Name
                })
                .ToListAsync(cancellationToken)
                .ConfigureAwait(false);

            return Ok(data);
        }
    }
}
