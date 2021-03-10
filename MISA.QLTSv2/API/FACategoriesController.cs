using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MISA.QLTSv2.BL.Services;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Model.Enums;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.QLTSv2.API
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class FACategoriesController : ControllerBase
    {
        string _connectionString;
        FixedAssetCategoryBL _fixedAssetCategoryBL;
        ServiceResult _serviceResult;
        public FACategoriesController(IConfiguration configuration, IMapper mapper)
        {
            _connectionString = configuration.GetConnectionString("MISAQLTSv2ConnectionString");
            _fixedAssetCategoryBL = new FixedAssetCategoryBL(_connectionString, mapper);
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
                return _fixedAssetCategoryBL.GetEntities();
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
                return _fixedAssetCategoryBL.GetEntityById(entityId);
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
        public ServiceResult Post([FromBody] FACategory entity)
        {
            try
            {
                return _fixedAssetCategoryBL.Insert(entity);
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
        public ServiceResult Put([FromRoute] string entityId, [FromBody] FACategory entity)
        {
            try
            {
                return _fixedAssetCategoryBL.Update(entity);
            }
            catch (Exception ex)
            {
                _serviceResult.Messenger = ex.Message.ToString();
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                return _serviceResult;
            }
        }

        /// <summary>
        /// Xóa bản ghi
        /// </summary>
        /// <param name="entityId">khóa chính bản ghi cần xóa</param>
        /// <returns>số bản ghi xóa thành công</returns>
        /// CreatedBY: BQDUY (05/03/2021)
        [HttpDelete("{entityId}")]
        public ServiceResult Delete(Guid entityId)
        {
            try
            {
                return _fixedAssetCategoryBL.Delete(entityId);
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
