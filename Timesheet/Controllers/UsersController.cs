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
    public class UsersController : ControllerBase
    {
        private readonly TimesheetDataContext timesheetDataContext;

        private readonly ILogger<UsersController> logger;

        public UsersController(TimesheetDataContext timesheetDataContext, ILogger<UsersController> logger)
        {
            this.timesheetDataContext = timesheetDataContext;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync(CancellationToken cancellationToken)
        {
            var data = await timesheetDataContext.Users
                .Select(u => new {
                    u.Id,
                    u.Name,
                    u.Location
                })
                .ToListAsync(cancellationToken)
                .ConfigureAwait(false);

            return Ok(data);
        }
    }
}
