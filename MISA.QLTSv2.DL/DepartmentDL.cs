using AutoMapper;
using Dapper;
using Microsoft.Extensions.Configuration;
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
    /// DepartmentDL cho Phòng Ban
    /// </summary>
    /// Author: DVVUONG (02/03/2021)
    public class DepartmentDL
    {
        #region Declare
        IConfiguration _configuration;
        string _connectionString = string.Empty;
        IDbConnection _dbConnection = null;
        IMapper _mapper;
        #endregion

        #region Constructor
        public DepartmentDL(string connectionString, IMapper mapper)
        {
            _connectionString = connectionString;
            _dbConnection = new MySqlConnection(_connectionString);
            _mapper = mapper;
        }

        #endregion

        #region Method
        /// <summary>
        /// Lấy toàn bộ danh sách phòng ban
        /// </summary>
        /// <returns>list phòng ban</returns>
        /// Author: DVVUONG (02/03/2021)
        public List<Department> GetEntities()
        {
            // Thực thi commandText:
            var entities = _dbConnection.Query<department>($"Proc_SelectDepartmentDatas", null, commandType: CommandType.StoredProcedure);

            // Trả về dữ liệu:
            return _mapper.Map<List<Department>>(entities);
        }


        /// <summary>
        /// Lấy ra một bản ghi theo ID
        /// </summary>
        /// <param name="entityId">ID</param>
        /// <returns>Một bản ghi</returns>
        /// CreatedBy:DVVUONG(02/03/2021)
        public Department GetEntityById(Guid entityId)
        {
            var parameterEntityId = new DynamicParameters();
            var tableName = typeof(Department).Name;
            // Add param id của đối tượng cần lấy dữ liệu:
            parameterEntityId.Add($"${tableName}Id", entityId.ToString());

            // Thực thi commandText:
            var res = _dbConnection.Query<department>($"Proc_Select{tableName}ById", parameterEntityId, commandType: CommandType.StoredProcedure).FirstOrDefault();
            return _mapper.Map<Department>(res);
        }

        /// <summary>
        /// Thêm mới phòng ban
        /// </summary>
        /// <param name="entity">object phòng ban</param>
        /// <returns>số bản ghi thêm mơi được</returns>
        /// Author: DVVUONG (02/03/2021)
        public int Insert(Department department)
        {
            // Build thành đối tượng để lưu vào database:
            var parameters = MappingDbType(department);
            // Thực thi commandText:
            var rowAffects = _dbConnection.Execute($"Proc_InsertDepartment", parameters, commandType: CommandType.StoredProcedure);
            // Trả về dữ liệu (số bản ghi thêm mới được): 
            return rowAffects;
        }

        /// <summary>
        /// Sửa bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>SỐ lương bản ghi thay đổi</returns>
        /// createdBy:DVUONG(02/03/2021)
        public int Update(Department entity)
        {
            // Build thành đối tượng để lưu vào database:
            var parameters = MappingDbType(entity);
            // Thực thi commandText và return:
            return _dbConnection.Execute($"Proc_UpdateDepartment", parameters, commandType: CommandType.StoredProcedure);
        }

        /// <summary>
        /// Xóa phòng ban
        /// </summary>
        /// <param name="entityId">khóa chính bản ghi cần xóa</param>
        /// <returns>số bản ghi bị xóa</returns>
        /// Author: DVVUONG (02/03/2021)
        public int Delete(Guid entityId)
        {
            var parameter = new DynamicParameters();
            // Add param id của bảng cần xóa:
            parameter.Add($"$DepartmentId", entityId.ToString());
            // Thực thi commandText:
            var res = _dbConnection.Execute($"Proc_DeleteDepartment", parameter, commandType: CommandType.StoredProcedure);
            // Trả về dữ liệu:
            return res;
        }


        /// <summary>
        /// Hàm chuyển kiểu dữ liệu từ c# sang sql
        /// </summary>
        /// <typeparam name="TEntity"></typeparam>
        /// <param name="entity"></param>
        /// CreatedBy: BQDUY(18/01/2021)
        private DynamicParameters MappingDbType(Department entity)
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
        public Department GetEntityByProperty(Department entity, System.Reflection.PropertyInfo property)
        {
            var propertyValue = property.GetValue(entity);
            var keyValue = entity.GetType().GetProperty($"DepartmentId").GetValue(entity);
            var query = string.Empty;
            if (entity.EntityState == EntityState.Insert)
            {
                query = $"SELECT * FROM department WHERE department_code = '{propertyValue}'";
            }
            else if (entity.EntityState == EntityState.Update)
            {
                query = $"SELECT * FROM department WHERE department_code = '{propertyValue}' AND department_id <> '{keyValue}'";
            }
            else
            {
                return null;
            }
            var entityReturn = _dbConnection.Query<department>(query, commandType: CommandType.Text).FirstOrDefault();
            return _mapper.Map<Department>(entityReturn);
        }
        #endregion
    }
}
