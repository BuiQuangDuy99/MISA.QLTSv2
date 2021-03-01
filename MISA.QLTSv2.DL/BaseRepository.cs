using AutoMapper.Configuration;
using MISA.QLTSv2.BL.Entities;
using MISA.QLTSv2.BL.Interfaces;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Text;

namespace MISA.QLTSv2.DL
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {

        #region DECLARE
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        protected IDbConnection _dbConnection = null;
        protected string _tableName;
        #endregion
        #region Constructor
        public BaseRepository(IConfiguration configuration)
        {
            _configuration = configuration;
            _connectionString = _configuration.GetConnectionString("MISAQLTSv2ConnectionString");
            _dbConnection = new MySqlConnection(_connectionString);
            _tableName = typeof(TEntity).Name;
        }
        #endregion

        public int Insert(TEntity entity)
        {
            throw new NotImplementedException();
        }

        public int Delete(Guid entityId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<TEntity> GetEntities()
        {
            throw new NotImplementedException();
        }

        public TEntity GetEntityById(Guid entityId)
        {
            throw new NotImplementedException();
        }

        public int Update(TEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
