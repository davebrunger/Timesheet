using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Timesheet.Data;
using Timesheet.Models;

namespace Timesheet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ITimesheetRepository timesheetRepository;

        private readonly ILogger<UsersController> logger;

        public UsersController(ITimesheetRepository timesheetRepository, ILogger<UsersController> logger)
        {
            this.timesheetRepository = timesheetRepository;
            this.logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult> GetAsync(CancellationToken cancellationToken)
        {
            var data = await timesheetRepository.Users
                .Select(u => new {
                    u.Id,
                    u.Name,
                    u.Location
                })
                .ToListAsync(cancellationToken)
                .ConfigureAwait(false);

            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult> CreateAsync(CreateUpdateUserRequest request, CancellationToken cancellationToken)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await timesheetRepository.Users
                .SingleOrDefaultAsync(u => u.Name == request.Name, cancellationToken)
                .ConfigureAwait(false);

            if (user != null)
            {
                ModelState.AddModelError(nameof(CreateUpdateUserRequest.Name), $"A user with the name: {request.Name} already exists");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            timesheetRepository.Users.Add(new Data.Models.User {
                Name = request.Name,
                Location = request.Location
            });

            await timesheetRepository.SaveChangesAsync(cancellationToken)
                .ConfigureAwait(false);

            return Ok();
        }
    }
}
