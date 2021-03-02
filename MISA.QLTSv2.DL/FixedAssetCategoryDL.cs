using AutoMapper;
using Dapper;
using Microsoft.Extensions.Configuration;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Model.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace MISA.QLTSv2.DL
{
    public class FixedAssetCategoryDL
    {
        #region DECLARE
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        IDbConnection _dbConnection = null;
        IMapper _mapper;
        #endregion
        #region Contrustor
        public FixedAssetCategoryDL(string connectionString, IMapper mapper)
        {
            _connectionString = connectionString;
            _dbConnection = new MySqlConnection(_connectionString);
            _mapper = mapper;
        }
        #endregion

        #region Method
        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int Insert(FACategory entity)
        {
            // Build thành đối tượng để lưu vào database:
            var parameters = MappingDbType(entity);
            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute($"Proc_InsertFACategory", parameters, commandType: CommandType.StoredProcedure);
            // Trả về dữ liệu (số bản ghi thêm mới được): 
            return rowAffects;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        public int Delete(Guid entityId)
        {
            var parameterEntityId = new DynamicParameters();
            // Add param id của bảng cần xóa:
            parameterEntityId.Add($"$FixedAssetCategoryId", entityId.ToString());
            // Thực thi commandText:
            var res = _dbConnection.Execute($"Proc_DeleteFACategory", parameterEntityId, commandType: CommandType.StoredProcedure);
            // Trả về dữ liệu: 
            return res;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<FACategory> GetEntities()
        {
            // Thực thi commandText:
            var entities = _dbConnection.Query<fixed_asset_category>($"Proc_SelectFACategoryDatas", null, commandType: CommandType.StoredProcedure);

            // Trả về dữ liệu:
            return _mapper.Map<List<FACategory>>(entities);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        public FACategory GetEntityById(Guid entityId)
        {
            var parameterEntityId = new DynamicParameters();
            var tableName = typeof(FACategory).Name;
            // Add param id của đối tượng cần lấy dữ liệu:
            parameterEntityId.Add($"{tableName}Id", entityId.ToString());

            // Thực thi commandText:
            var res = _dbConnection.QueryFirst<FACategory>($"Proc_Select{tableName}ById", parameterEntityId, commandType: CommandType.StoredProcedure);
            return res;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int Update(FACategory entity)
        {
            // Build thành đối tượng để lưu vào database:
            var parameters = MappingDbType(entity);
            // Thực thi commandText và return:
            return _dbConnection.Execute($"Proc_UpdateFACategory", parameters, commandType: CommandType.StoredProcedure);
        }

        /// <summary>
        /// Hàm chuyển kiểu dữ liệu từ c# sang sql
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        /// CreatedBy: BQDUY(18/01/2021)
        private DynamicParameters MappingDbType(FACategory entity)
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
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="property"></param>
        /// <returns></returns>
        public FACategory GetEntityByProperty(FACategory entity,System.Reflection.PropertyInfo property)
        {
            var propertyValue = property.GetValue(entity);
            string query = $"SELECT * FROM fixed_asset_category WHERE fixed_asset_category_code = '{propertyValue}'";
            var entityReturn = _dbConnection.Query<fixed_asset_category>(query, commandType: CommandType.Text).FirstOrDefault();
            return _mapper.Map<FACategory>(entityReturn);
        }


        #endregion
    }
}
