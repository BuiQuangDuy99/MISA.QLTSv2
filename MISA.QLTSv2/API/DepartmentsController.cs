using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MISA.QLTSv2.BL.Properties;
using MISA.QLTSv2.BL.Services;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Model.Enums;
using System;

namespace MISA.QLTSv2.API
{
    /// <summary>
    /// API Phòng Ban
    /// </summary>
    /// Author: DVVUONG (01/03/2021)
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        #region Declare
        string _connectionString;
        DepartmentBL _departmentBL;
        ServiceResult _serviceResult;
        #endregion

        #region Constructor
        public DepartmentsController(IConfiguration configuration, IMapper mapper)
        {
            _connectionString = configuration.GetConnectionString("MISAQLTSv2ConnectionString");
            _departmentBL = new DepartmentBL(_connectionString, mapper);
            _serviceResult = new ServiceResult();
        }
        #endregion

        #region Method
        /// <summary>
        /// Lấy toàn bộ danh sách
        /// </summary>
        /// <returns>danh sách thỏa mãn</returns>
        /// Author: DVVUONG (01/03/2021)
        [HttpGet]
        public ServiceResult GetDepartments()
        {
            try
            {
                return _departmentBL.GetDepartments();
            }
            catch (Exception e)
            {
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                _serviceResult.Messenger = e.Message;
                return _serviceResult;
            }
        }


        /// <summary>
        /// Lấy ra một bản ghi theo ID
        /// </summary>
        /// <param name="entityId">ID</param>
        /// <returns>Một bản ghi</returns>
        /// CreatedBy:DVVUONG(02/03/2021)
        [HttpGet("{entityId}")]
        public ServiceResult GetDepartmentById(Guid entityId)
        {
            try
            {
                return _departmentBL.GetDepartmentById(entityId);
            }
            catch (Exception e)
            {
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                _serviceResult.Messenger = e.Message;
                return _serviceResult;
            }
            
        }

        /// <summary>
        /// Xóa bản ghi
        /// </summary>
        /// <param name="entityId">khóa chính bản ghi cần xóa</param>
        /// <returns>số bản ghi xóa thành công</returns>
        /// Author: DVVUONG (01/03/2021)
        [HttpDelete("{entityId}")]
        public ServiceResult DeleteDepartment(Guid entityId)
        {
            try
            {
                return _departmentBL.DeleteDepartment(entityId);
            }
            catch (Exception e)
            {
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                _serviceResult.Messenger = e.Message;
                return _serviceResult;
            }
            
        }

        /// <summary>
        /// Thêm mới bản ghi
        /// </summary>
        /// <param name="entity">object cần thêm mới</param>
        /// <returns>số bản ghi thêm mới được</returns>
        /// Author: DVVUONG (01/03/2021)
        [HttpPost]
        public ServiceResult PostDepartment([FromBody] Department entity)
        {
            try
            {
               return _departmentBL.InsertDepartment(entity);
            }
            catch (Exception e)
            {
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                _serviceResult.Messenger = e.Message;
                return _serviceResult;
            }
        }

        /// <summary>
        /// Chỉnh sửa một bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Một bản ghi thay đổi</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        [HttpPut("{entityId}")]
        public ServiceResult PutDepartment([FromRoute] string entityId, [FromBody] Department entity)
        {
            try
            {
                return _departmentBL.UpdateDepartment(entity);
            }
            catch (Exception e)
            {
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                _serviceResult.Messenger = e.Message;
                return _serviceResult;
            }
        }
        #endregion
    }
}
