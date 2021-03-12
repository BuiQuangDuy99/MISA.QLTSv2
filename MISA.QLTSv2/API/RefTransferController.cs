using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MISA.QLTSv2.BL.Services;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Model.Enums;
using System;
using System.Collections.Generic;

namespace MISA.QLTSv2.API
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefTransferController : ControllerBase
    {
        RefTransferBL _refTransferBL;
        string _connectionString;
        ServiceResult _serviceResult;
        public RefTransferController(IConfiguration configuration, IMapper mapper)
        {
            _connectionString = configuration.GetConnectionString("MISAQLTSv2ConnectionString");
            _refTransferBL = new RefTransferBL(_connectionString, mapper);
            _serviceResult = new ServiceResult();
        }
        /// <summary>
        /// Lấy ra danh sách Điều chuyển phòng ban
        /// </summary>
        /// <returns>danh sách Điều chuyển phòng ban</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        [HttpGet]
        public ServiceResult GetRefTransfer()
        {
            try
            {
                return _refTransferBL.GetRefTransfers();
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
        public ServiceResult GetRefTransferById([FromRoute] Guid entityId)
        {
            try
            {
                return _refTransferBL.GetRefTransferById(entityId);
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
        [HttpDelete]
        public ServiceResult DeleteRefTransfer([FromBody] List<Guid> entityId)
        {
            try
            {
                int count = 0;
                foreach (var item in entityId)
                {
                    _refTransferBL.DeleteRefTransfer(item);
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
        /// <summary>
        /// Thêm một bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Số bản ghi thay đổi</returns>
        /// createdBy:NVTUYEN(02/03/2021)
        [HttpPost]
        public ServiceResult InsertRefTransfer([FromBody] RefTransfer entity)
        {
            try
            {
                return _refTransferBL.InsertRefTransfer(entity);
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
        public ServiceResult PutRefTransfer([FromRoute] string entityId, [FromBody] RefTransfer entity)
        {
            try
            {
                return _refTransferBL.UpdateRefTransfer(entity);
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
