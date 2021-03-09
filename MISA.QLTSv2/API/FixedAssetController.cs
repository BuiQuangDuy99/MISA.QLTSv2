using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MISA.QLTSv2.BL.Services;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Model.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.QLTSv2.API
{
    [Route("api/[controller]")]
    [ApiController]

    public class FixedAssetController : ControllerBase
    {
        FixedAssetBL _fixedAssetBL;
        string _connectionString;
        ServiceResult _serviceResult;
        public FixedAssetController(IConfiguration configuration, IMapper mapper)
        {
            _connectionString = configuration.GetConnectionString("MISAQLTSv2ConnectionString");
            _fixedAssetBL = new FixedAssetBL(_connectionString, mapper);
            _serviceResult = new ServiceResult();
        }
        /// <summary>
        /// Lấy toàn bộ danh sách
        /// </summary>
        /// <returns>danh sách thỏa mãn</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        [HttpGet]
        public ServiceResult GetFixedAsset()
        {
            try
            {
                return _fixedAssetBL.GetFixedAssets();
            }
            catch (Exception ex)
            {
                _serviceResult.Messenger = ex.Message.ToString();
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                return _serviceResult;
            }
        }
        /// <summary>
        /// Lấy ra một bản ghi theo ID
        /// </summary>
        /// <param name="entityId">ID</param>
        /// <returns>Một bản ghi</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        [HttpGet("{entityId}")]
        public ServiceResult GetFixedAssetById([FromRoute] Guid entityId)
        {
            try
            {
                return _fixedAssetBL.GetFixedAssetById(entityId);
            }
            catch (Exception ex)
            {
                _serviceResult.Messenger = ex.Message.ToString();
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                return _serviceResult;
            }
        }
        /// <summary>
        /// Xóa Một bản ghi
        /// </summary>
        /// <returns>Số bản ghi bị xóa</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        [HttpDelete("{entityId}")]
        public ServiceResult DeleteFixedAsset(Guid entityId)
        {
            try
            {
                return _fixedAssetBL.DeleteFixedAsset(entityId);
            }
            catch (Exception ex)
            {
                _serviceResult.Messenger = ex.Message.ToString();
                _serviceResult.HttpCode = HttpCodeResult.Exception;
                return _serviceResult;
            }
        }
        /// <summary>
        /// Thêm một bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Số bản ghi thay đổi</returns>
        /// createdBy:NVTUYEN(02/03/2021)
        [HttpPost]
        public ServiceResult InsertFixedAsset([FromBody] FixedAsset entity)
        {
            try
            {
                return _fixedAssetBL.InsertFixedAsset(entity);
            }
            catch (Exception ex)
            {
                _serviceResult.Messenger = ex.Message.ToString();
                _serviceResult.HttpCode = HttpCodeResult.Exception;
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
        public ServiceResult PutFixedAsset([FromRoute] string entityId, [FromBody] FixedAsset entity)
        {
            try
            {
                return _fixedAssetBL.UpdateFixedAsset(entity);
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
