using System.Linq;

namespace Timesheet.Data
{
    public interface ITable<T> : IQueryable<T>
    {
        void Add(T t);
    }
}