using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Timesheet.Data.SqlServer
{
    public class DbSetWrapper<T> : ITable<T> where T : class
    {
        private readonly DbSet<T> dbSet;

        public DbSetWrapper(DbSet<T> dbSet)
        {
            this.dbSet = dbSet;
        }

        public Type ElementType => dbSet.AsQueryable().ElementType;

        public Expression Expression => dbSet.AsQueryable().Expression;

        public IQueryProvider Provider => dbSet.AsQueryable().Provider;

        public void Add(T t)
        {
            dbSet.Add(t);
        }

        public IEnumerator<T> GetEnumerator() => dbSet.AsQueryable().GetEnumerator();

        IEnumerator IEnumerable.GetEnumerator() => dbSet.AsQueryable().GetEnumerator();
    }

    public static class DbSetWrapper
    {
        public static DbSetWrapper<T> New<T>(DbSet<T> dbSet) where T : class
        {
            return new DbSetWrapper<T>(dbSet);
        }
    }
}