using AutoMapper;
using AutoMapper.Configuration;
using Dapper;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Models;
using MySql.Data.MySqlClient;
using System;
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
        /// <summary>
        /// Lấy ra danh sách Tài sản
        /// </summary>
        /// <returns>danh sách tài sản</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        public List<FixedAsset> GetEntities()
        {
            // Thực thi commandText:
            var entities = _dbConnection.Query<fixed_asset>($"Proc_SelectFixedAssetDatas", null, commandType: CommandType.StoredProcedure);

            // Trả về dữ liệu:
            return _mapper.Map<List<FixedAsset>>(entities);
        }
        /// <summary>
        /// Xóa một bản ghi
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns>số bản ghi xóa được</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        public int Delete(Guid entityId)
        {
            var parameterEntityId = new DynamicParameters();
            // Add param id của bảng cần xóa:
            parameterEntityId.Add($"$FixedAssetId", entityId.ToString());
            // Thực thi commandText:
            var res = _dbConnection.Execute($"Proc_DeleteFixedAsset", parameterEntityId, commandType: CommandType.StoredProcedure);
            // Trả về dữ liệu: 
            return res;
        }
        /// <summary>
        /// Thêm một bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>số bản ghi được thêm</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        public int Insert(FixedAsset entity)
        {
            // Build thành đối tượng để lưu vào database:
            var parameters = MappingDbType(entity);
            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute($"Proc_InsertFixedAsset", parameters, commandType: CommandType.StoredProcedure);
            // Trả về dữ liệu (số bản ghi thêm mới được): 
            return rowAffects;
        }
        /// <summary>
        /// Hàm chuyển kiểu dữ liệu từ c# sang sql
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        /// CreatedBy: BQDUY(18/01/2021)
        private DynamicParameters MappingDbType(FixedAsset entity)
        {
            var properties = entity.GetType().GetProperties();
            var parameters = new DynamicParameters();
            foreach (var property in properties)
            {
                var propertyName = property.Name;
                var propertyValue = property.GetValue(entity);
                var propertyType = property.PropertyType;
                if (propertyType == typeof(Guid) || propertyType == typeof(Guid?))
                {
                    parameters.Add($"${propertyName}", propertyValue, DbType.String);
                }
                else
                {
                    parameters.Add($"${propertyName}", propertyValue);
                }
            }
            return parameters;
        }

    }
}
