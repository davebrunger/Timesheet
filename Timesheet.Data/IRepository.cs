using System.Threading;
using System.Threading.Tasks;

namespace Timesheet.Data
{
    public interface IRepository
    {
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}