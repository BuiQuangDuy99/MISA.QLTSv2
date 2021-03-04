using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MISA.QLTSv2.BL.Services;
using MISA.QLTSv2.Model.Entities;
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
        public FixedAssetController(IConfiguration configuration, IMapper mapper)
        {
            _connectionString = configuration.GetConnectionString("MISAQLTSv2ConnectionString");
            _fixedAssetBL = new FixedAssetBL(_connectionString, mapper);
        }
        /// <summary>
        /// Lấy toàn bộ danh sách
        /// </summary>
        /// <returns>danh sách thỏa mãn</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
            }
            catch (Exception ex)
            {

            }

            return Ok(_fixedAssetBL.GetEntities());
        }
        /// <summary>
        /// Lấy ra một bản ghi theo ID
        /// </summary>
        /// <param name="entityId">ID</param>
        /// <returns>Một bản ghi</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        [HttpGet("{entityId}")]
        public IActionResult GetEntityById([FromRoute] Guid entityId)
        {
            return Ok(_fixedAssetBL.GetEntityById(entityId));
        }
        /// <summary>
        /// Xóa Một bản ghi
        /// </summary>
        /// <returns>Số bản ghi bị xóa</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        [HttpDelete("{entityId}")]
        public IActionResult Delete(Guid entityId)
        {
            return Ok(_fixedAssetBL.Delete(entityId));
        }
        /// <summary>
        /// Thêm một bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Số bản ghi thay đổi</returns>
        /// createdBy:NVTUYEN(02/03/2021)
        [HttpPost]
        public IActionResult Insert([FromBody] FixedAsset entity)
        {
            var res = _fixedAssetBL.Insert(entity);
            return Ok(res);
        }
        /// <summary>
        /// Chỉnh sửa một bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Một bản ghi thay đổi</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        [HttpPut("{entityId}")]
        public IActionResult Put([FromRoute] string entityId, [FromBody] FixedAsset entity)
        {
            var res = _fixedAssetBL.Update(entity);
            return Ok(res);
        }
    }
}
