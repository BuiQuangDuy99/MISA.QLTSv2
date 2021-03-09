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
    /// <summary>
    /// RefDecrement cho  Ghi giảm tài sản
    /// </summary>
    /// Author: DVVUONG (09/03/2021)
    public class RefDecrementDL
    {
        #region Declare
        string _connectionString = string.Empty;
        IDbConnection _dbConnection = null;
        IMapper _mapper;
        #endregion

        #region Constructor
        public RefDecrementDL(string connectionString, IMapper mapper)
        {
            _connectionString = connectionString;
            _dbConnection = new MySqlConnection(_connectionString);
            _mapper = mapper;
        }
        #endregion

        #region Method
        /// <summary>
        /// Lấy toàn bộ danh sách ghi giảm
        /// </summary>
        /// <returns>danh sách ghi giảm</returns>
        /// Author: DVVUONG (09/03/2021)
        public List<RefDecrement> GetRefDecrement()
        {
            // Thực thi commandText:
            var ref_decrement = _dbConnection.Query<ref_decrement>($"Proc_SelectRefDecrementDatas", null, commandType: CommandType.StoredProcedure);

            // Trả về dữ liệu:
            return _mapper.Map<List<RefDecrement>>(ref_decrement);
        }


        /// <summary>
        /// Lấy ghi giảm theo khóa chính
        /// </summary>
        /// <param name="entityId">khóa chính</param>
        /// <returns>Một bản ghi</returns>
        /// CreatedBy:DVVUONG(02/03/2021)
        public RefDecrement GetRefDecrementById(Guid entityId)
        {
            var parameter = new DynamicParameters();
            var tableName = typeof(RefDecrement).Name;
            // Add param id của đối tượng cần lấy dữ liệu:
            parameter.Add($"${tableName}Id", entityId.ToString());

            // Thực thi commandText:
            var ref_decrement = _dbConnection.Query<ref_decrement>($"Proc_Select{tableName}ById", parameter, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return _mapper.Map<RefDecrement>(ref_decrement);
        }

        /// <summary>
        /// Thêm mới phòng ban
        /// </summary>
        /// <param name="entity">object phòng ban</param>
        /// <returns>số bản ghi thêm mơi được</returns>
        /// Author: DVVUONG (02/03/2021)
        public int InsertRefDecrement(RefDecrement refDecrement)
        {
            // Build thành đối tượng để lưu vào database:
            var parameters = MappingDbType(refDecrement);
            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute($"Proc_InsertRefDecrement", parameters, commandType: CommandType.StoredProcedure);
            // Trả về dữ liệu (số bản ghi thêm mới được): 
            return rowAffects;
        }

        /// <summary>
        /// Sửa bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>SỐ lương bản ghi thay đổi</returns>
        /// createdBy:DVUONG(02/03/2021)
        public int UpdateRefDecrement(RefDecrement entity)
        {
            // Build thành đối tượng để lưu vào database:
            var parameters = MappingDbType(entity);
            // Thực thi commandText và return:
            var rowAffects = _dbConnection.Execute($"Proc_UpdateRefDecrement", parameters, commandType: CommandType.StoredProcedure);
            return rowAffects;
        }

        /// <summary>
        /// Xóa phòng ban
        /// </summary>
        /// <param name="entityId">khóa chính bản ghi cần xóa</param>
        /// <returns>số bản ghi bị xóa</returns>
        /// Author: DVVUONG (02/03/2021)
        public int DeleteRefDecrement(Guid entityId)
        {
            var parameter = new DynamicParameters();
            // Add param id của bảng cần xóa:
            parameter.Add($"$RefDecrementId", entityId.ToString());
            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute($"Proc_DeleteRefDecrement", parameter, commandType: CommandType.StoredProcedure);
            // Trả về dữ liệu:
            return rowAffects;
        }


        /// <summary>
        /// Hàm chuyển kiểu dữ liệu từ c# sang sql
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        /// CreatedBy: DVVUONG(18/01/2021)
        private DynamicParameters MappingDbType(RefDecrement entity)
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
        /// CreatedBy: DVVUONG(02/03/2021)
        public RefDecrement GetEntityByProperty(RefDecrement entity, System.Reflection.PropertyInfo property)
        {
            var propertyValue = property.GetValue(entity);
            var keyValue = entity.GetType().GetProperty($"RefDecrementId").GetValue(entity);
            var query = string.Empty;
            if (entity.EntityState == EntityState.Insert)
            {
                query = $"SELECT * FROM ref_decrement WHERE ref_no = '{propertyValue}'";
            }
            else if (entity.EntityState == EntityState.Update)
            {
                query = $"SELECT * FROM ref_decrement WHERE ref_no = '{propertyValue}' AND ref_decrement_id <> '{keyValue}'";
            }
            else
            {
                return null;
            }
            var entityReturn = _dbConnection.Query<ref_decrement>(query, commandType: CommandType.Text).FirstOrDefault();
            return _mapper.Map<RefDecrement>(entityReturn);
        }
        #endregion

    }
}
