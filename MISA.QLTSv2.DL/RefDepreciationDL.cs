using AutoMapper;
using Dapper;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Model.Enums;
using MISA.QLTSv2.Model.Models;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;

namespace MISA.QLTSv2.DL
{
    public class RefDepreciationDL
    {
        #region DECLARE
        string _connectionString = string.Empty;
        IDbConnection _dbConnection = null;
        IMapper _mapper;
        #endregion
        #region Contrustor
        public RefDepreciationDL(string connectionString, IMapper mapper)
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
        public int Insert(RefDepreciation entity)
        {
            // Build thành đối tượng để lưu vào database:
            var parameters = MappingDbType(entity);
            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute($"Proc_InsertRefDepreciation", parameters, commandType: CommandType.StoredProcedure);
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
            parameterEntityId.Add($"$RefDepreciationId", entityId.ToString());
            // Thực thi commandText:
            var res = _dbConnection.Execute($"Proc_DeleteRefDepreciation", parameterEntityId, commandType: CommandType.StoredProcedure);
            // Trả về dữ liệu: 
            return res;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public List<RefDepreciation> GetEntities()
        {
            // Thực thi commandText:
            var entities = _dbConnection.Query<ref_depreciation>($"Proc_SelectRefDepreciationDatas", commandType: CommandType.StoredProcedure);

            // Trả về dữ liệu:
            return _mapper.Map<List<RefDepreciation>>(entities);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        public RefDepreciation GetEntityById(Guid entityId)
        {
            var parameterEntityId = new DynamicParameters();
            // Add param id của đối tượng cần lấy dữ liệu:
            parameterEntityId.Add($"$RefDepreciationId", entityId.ToString());

            // Thực thi commandText:
            var res = _dbConnection.QueryFirst<ref_depreciation>($"Proc_SelectRefDepreciationById", parameterEntityId, commandType: CommandType.StoredProcedure);
            return _mapper.Map<RefDepreciation>(res);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int Update(RefDepreciation entity)
        {
            // Build thành đối tượng để lưu vào database:
            var parameters = MappingDbType(entity);
            // Thực thi commandText và return:
            return _dbConnection.Execute($"Proc_UpdateRefDepreciation", parameters, commandType: CommandType.StoredProcedure);
        }

        /// <summary>
        /// Hàm chuyển kiểu dữ liệu từ c# sang sql
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        /// CreatedBy: BQDUY(18/01/2021)
        private DynamicParameters MappingDbType(RefDepreciation entity)
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
        public RefDepreciation GetEntityByProperty(RefDepreciation entity, System.Reflection.PropertyInfo property)
        {
            var propertyValue = property.GetValue(entity);
            var keyValue = entity.GetType().GetProperty($"RefDepreciationId").GetValue(entity);

            var query = string.Empty;

            if (entity.EntityState == EntityState.Insert)
            {
                var parameters = new DynamicParameters();
                parameters.Add($"$RefDepreciationId", keyValue, DbType.String);
                var entityReturn = _dbConnection.Query<ref_depreciation>($"Proc_SelectRefDepreciationById", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return _mapper.Map<RefDepreciation>(entityReturn);
            }
            else if (entity.EntityState == EntityState.Update)
            {
                var parameters = new DynamicParameters();
                parameters.Add($"$RefDepreciationId", keyValue, DbType.String);
                parameters.Add($"$RefNo", propertyValue);
                var entityReturn = _dbConnection.Query<ref_depreciation>($"Proc_CheckDuplicateRefDepreciationNo", parameters, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return _mapper.Map<RefDepreciation>(entityReturn);
            }
            else
            {
                return null;
            }

        }

        #endregion
    }
}
