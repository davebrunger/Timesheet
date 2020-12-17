using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Timesheet.Data;

namespace Timesheet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : ControllerBase
    {
        private readonly ITimesheetRepository timesheetRepository;

        private readonly ILogger<ActivitiesController> logger;

        public ActivitiesController(ITimesheetRepository timesheetRepository, ILogger<ActivitiesController> logger)
        {
            this.timesheetRepository = timesheetRepository;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync(CancellationToken cancellationToken)
        {
            var data = await timesheetRepository.Activities
                .Select(p => new
                {
                    p.Id,
                    p.Name
                })
                .ToListAsync(cancellationToken)
                .ConfigureAwait(false);

            return Ok(data);
        }
    }
}
