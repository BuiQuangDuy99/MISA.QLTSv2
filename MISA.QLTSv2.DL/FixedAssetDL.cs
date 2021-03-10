using AutoMapper;
using Dapper;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Model.Enums;
using MISA.QLTSv2.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace MISA.QLTSv2.DL
{
    public class FixedAssetDL
    {
        #region DECLARE
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
        public List<FixedAsset> GetFixedAssets()
        {
            // Thực thi commandText:
            var entities = _dbConnection.Query<fixed_asset>($"Proc_SelectFixedAssetDatas", null, commandType: CommandType.StoredProcedure);

            // Trả về dữ liệu:
            return _mapper.Map<List<FixedAsset>>(entities);
        }
        /// <summary>
        /// Lấy ra một bản ghi theo ID
        /// </summary>
        /// <param name="entityId">ID</param>
        /// <returns>Một bản ghi</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        public FixedAsset GetFixedAssetById(Guid entityId)
        {
            var parameterEntityId = new DynamicParameters();
            var tableName = typeof(FixedAsset).Name;
            // Add param id của đối tượng cần lấy dữ liệu:
            parameterEntityId.Add($"${tableName}Id", entityId.ToString());

            // Thực thi commandText:
            var res = _dbConnection.Query<fixed_asset>($"Proc_Select{tableName}ById", parameterEntityId, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return _mapper.Map<FixedAsset>(res);
        }
        /// <summary>
        /// Xóa một bản ghi
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns>số bản ghi xóa được</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        public int DeleteFixedAsset(Guid entityId)
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
        public int InsertFixedAsset(FixedAsset entity)
        {
            // Build thành đối tượng để lưu vào database:
            var parameters = MappingDbType(entity);
            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute($"Proc_InsertFixedAsset", parameters, commandType: CommandType.StoredProcedure);
            // Trả về dữ liệu (số bản ghi thêm mới được): 
            return rowAffects;
        }
        /// <summary>
        /// Sửa bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>SỐ lương bản ghi thay đổi</returns>
        /// createdBy:NVTUYEN(02/03/2021)
        public int UpdateFixedAsset(FixedAsset entity)
        {
            // Build thành đối tượng để lưu vào database:
            var parameters = MappingDbType(entity);
            // Thực thi commandText và return:
            return _dbConnection.Execute($"Proc_UpdateFixedAsset", parameters, commandType: CommandType.StoredProcedure);
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

        /// <summary>
        /// lấy ra bản ghi theo property
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="property"></param>
        /// <returns>1 bản ghi</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        public FixedAsset GetEntityByProperty(FixedAsset entity, System.Reflection.PropertyInfo property)
        {
            var propertyValue = property.GetValue(entity);
            var keyValue = entity.GetType().GetProperty($"FixedAssetId").GetValue(entity);
            var query = string.Empty;
            if (entity.EntityState == EntityState.Insert)
            {
                query = $"SELECT * FROM fixed_asset WHERE fixed_asset_code = '{propertyValue}'";
            }
            else if (entity.EntityState == EntityState.Update)
            {
                query = $"SELECT * FROM fixed_asset WHERE fixed_asset_code = '{propertyValue}' AND fixed_asset_id <> '{keyValue}'";
            }
            else
            {
                return null;
            }
            var entityReturn = _dbConnection.Query<fixed_asset>(query, commandType: CommandType.Text).FirstOrDefault();
            return _mapper.Map<FixedAsset>(entityReturn);
        }


    }
}
