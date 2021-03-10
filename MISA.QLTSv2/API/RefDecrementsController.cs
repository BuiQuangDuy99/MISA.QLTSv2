using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MISA.QLTSv2.BL.Properties;
using MISA.QLTSv2.BL.Services;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Model.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace MISA.QLTSv2.API
{
    /// <summary>
    /// API ghi giảm tài sản
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class RefDecrementsController : ControllerBase
    {
        #region Declare
        string _connectionString;
        RefDecrementBL _refDecrementBL;
        ServiceResult _serviceResult;
        #endregion

        #region Constructor
        public RefDecrementsController(IConfiguration configuration, IMapper mapper)
        {
            _connectionString = configuration.GetConnectionString("MISAQLTSv2ConnectionString");
            _refDecrementBL = new RefDecrementBL(_connectionString, mapper);
            _serviceResult = new ServiceResult();
        }
        #endregion

        #region Method
        /// <summary>
        /// Lấy toàn bộ danh sách
        /// </summary>
        /// <returns>danh sách thỏa mãn</returns>
        /// Author: DVVUONG (10/03/2021)
        [HttpGet]
        public ServiceResult GetRefDecrements()
        {
            try
            {
                return _refDecrementBL.GetRefDecrements();
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
        /// CreatedBy:DVVUONG(10/03/2021)
        [HttpGet("{entityId}")]
        public ServiceResult GetRefDecrementById(Guid entityId)
        {
            try
            {
                return _refDecrementBL.GetRefDecrementById(entityId);
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
        /// Author: DVVUONG (10/03/2021)
        [HttpDelete("{entityId}")]
        public ServiceResult DeleteRefDecrement(Guid entityId)
        {
            try
            {
                return _refDecrementBL.DeleteRefDecrement(entityId);
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
        /// Author: DVVUONG (10/03/2021)
        [HttpPost]
        public ServiceResult PostRefDecrement([FromBody] RefDecrement entity)
        {
            try
            {
                return _refDecrementBL.InsertRefDecrement(entity);
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
        /// CreatedBy: DVVUONG (10/03/2021)
        [HttpPut("{entityId}")]
        public ServiceResult PutRefDecrement([FromRoute] string entityId, [FromBody] RefDecrement entity)
        {
            try
            {
                return _refDecrementBL.UpdateRefDecrement(entity);
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
