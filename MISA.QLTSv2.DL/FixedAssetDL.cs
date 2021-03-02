using AutoMapper;
using AutoMapper.Configuration;
using Dapper;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Models;
using MySql.Data.MySqlClient;
using System.Collections.Generic;
using System.Data;

namespace MISA.QLTSv2.DL
{
    public class FixedAssetDL
    {
        #region DECLARE
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        IDbConnection _dbConnection = null;
        IMapper _mapper;
        #endregion
        public FixedAssetDL(string connectionString, IMapper mapper)
        {
            _connectionString = connectionString;
            _dbConnection = new MySqlConnection(_connectionString);
            _mapper = mapper;

        }

        public List<FixedAsset> GetEntities()
        {
            // Thực thi commandText:
            var entities = _dbConnection.Query<fixed_asset>($"Proc_SelectFixedAssetDatas", null, commandType: CommandType.StoredProcedure);

            // Trả về dữ liệu:
            return _mapper.Map<List<FixedAsset>>(entities);
        }
    }
}
