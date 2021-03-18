using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MISA.QLTSv2.BL.Services;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Model.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.QLTSv2.API
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class RefDepreciationsController : ControllerBase
    {
        string _connectionString;
        RefDepreciationBL _refDepreciationBL;
        ServiceResult _serviceResult;
        public RefDepreciationsController(IConfiguration configuration, IMapper mapper)
        {
            _connectionString = configuration.GetConnectionString("MISAQLTSv2ConnectionString");
            _refDepreciationBL = new RefDepreciationBL(_connectionString, mapper);
            _serviceResult = new ServiceResult();
        }

        /// <summary>
        /// Lấy toàn bộ danh sách
        /// </summary>
        /// <returns>danh sách thỏa mãn</returns>
        /// CreatedBY: BQDUY (05/03/2021)
        [HttpGet]
        public ServiceResult Get()
        {
            try
            {
                return _refDepreciationBL.GetEntities();
            }
            catch (Exception ex)
            {
                _serviceResult.Messenger = ex.Message.ToString();
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                return _serviceResult;
            }
        }

        /// <summary>
        /// Lấy đối tượng theo khóa chính
        /// </summary>
        /// <param name="id">khóa chính</param>
        /// <returns>object có khóa chính thỏa mãn</returns>
        /// CreatedBY: BQDUY (05/03/2021)
        [HttpGet("{entityId}")]
        public ServiceResult Get(Guid entityId)
        {
            try
            {
                return _refDepreciationBL.GetEntityById(entityId);
            }
            catch (Exception ex)
            {
                _serviceResult.Messenger = ex.Message.ToString();
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                return _serviceResult;
            }
        }

        /// <summary>
        /// Thêm mới bản ghi
        /// </summary>
        /// <param name="entity">object cần thêm mới</param>
        /// <returns>số bản ghi thêm mới được</returns>
        /// CreatedBY: BQDUY (05/03/2021)
        [HttpPost]
        public ServiceResult Post([FromBody] RefDepreciation entity)
        {
            try
            {
                return _refDepreciationBL.Insert(entity);
            }
            catch (Exception ex)
            {
                _serviceResult.Messenger = ex.Message.ToString();
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                return _serviceResult;
            }
        }

        /// <summary>
        /// Chỉnh sửa thông tin bản ghi
        /// </summary>
        /// <param name="entityId">khóa chính bản ghi cần chỉnh sửa</param>
        /// <param name="entity">thông tin object cần chỉnh sửa</param>
        /// <returns>số bản ghi chỉnh sửa được</returns>
        /// CreatedBY: BQDUY (05/03/2021)
        [HttpPut("{entityId}")]
        public ServiceResult Put([FromRoute] string entityId, [FromBody] RefDepreciation entity)
        {
            try
            {
                return _refDepreciationBL.Update(entity);
            }
            catch (Exception ex)
            {
                _serviceResult.Messenger = ex.Message.ToString();
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                return _serviceResult;
            }
        }

        /// <summary>
        /// Xóa một hoặc nhiều bản ghi
        /// </summary>
        /// <param name="entityId">danh sach khóa chính bản ghi cần xóa</param>
        /// <returns>số bản ghi xóa thành công</returns>
        /// CreatedBY: BQDUY (05/03/2021)
        [HttpDelete]
        public ServiceResult DeleteRefTransfer([FromBody] List<Guid> entityId)
        {
            try
            {
                int count = 0;
                foreach (var item in entityId)
                {
                    _refDepreciationBL.Delete(item);
                    count++;
                }
                _serviceResult.Data = count;
                _serviceResult.HttpCode = HttpCodeResult.Success;
                return _serviceResult;
            }
            catch (Exception ex)
            {
                _serviceResult.Messenger = ex.Message.ToString();
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                return _serviceResult;
            }
        }
    }
}
