using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MISA.QLTSv2.BL.Services;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.QLTSv2.API
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class FixedAssetCategoriesController : ControllerBase
    {
        string _connectionString;
        FixedAssetCategoryBL _fixedAssetCategoryBL;
        public FixedAssetCategoriesController(IConfiguration configuration, IMapper mapper)
        {
            _connectionString = configuration.GetConnectionString("MISAQLTSv2ConnectionString");
            _fixedAssetCategoryBL = new FixedAssetCategoryBL(_connectionString, mapper);
        }

        /// <summary>
        /// Lấy toàn bộ danh sách
        /// </summary>
        /// <returns>danh sách thỏa mãn</returns>
        /// Author: DVVUONG (01/03/2021)
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
            }
            catch (Exception ex)
            {

            }

            return Ok(_fixedAssetCategoryBL.GetEntities());
        }

        /// <summary>
        /// Lấy đối tượng theo khóa chính
        /// </summary>
        /// <param name="id">khóa chính</param>
        /// <returns>object có khóa chính thỏa mãn</returns>
        /// Author: DVVUONG (01/03/2021)
        [HttpGet("{entityId}")]
        public IActionResult Get(Guid entityId)
        {
            var entities = _fixedAssetCategoryBL.GetEntityById(entityId);
            return Ok(entities);
        }

        ///// <summary>
        ///// Thêm mới bản ghi
        ///// </summary>
        ///// <param name="entity">object cần thêm mới</param>
        ///// <returns>số bản ghi thêm mới được</returns>
        ///// Author: DVVUONG (01/03/2021)
        //[HttpPost]
        //public IActionResult Post([FromBody] TEntity entity)
        //{
        //    return Ok();
        //}

        ///// <summary>
        ///// Chỉnh sửa thông tin bản ghi
        ///// </summary>
        ///// <param name="entityId">khóa chính bản ghi cần chỉnh sửa</param>
        ///// <param name="entity">thông tin object cần chỉnh sửa</param>
        ///// <returns>số bản ghi chỉnh sửa được</returns>
        ///// Author: DVVUONG (01/03/2021)
        //[HttpPut("{entityId}")]
        //public IActionResult Put([FromRoute] string entityId, [FromBody] TEntity entity)
        //{
        //    return Ok();
        //}

        ///// <summary>
        ///// Xóa bản ghi
        ///// </summary>
        ///// <param name="entityId">khóa chính bản ghi cần xóa</param>
        ///// <returns>số bản ghi xóa thành công</returns>
        ///// Author: DVVUONG (01/03/2021)
        //[HttpDelete("{entityId}")]
        //public IActionResult Delete(Guid entityId)
        //{
        //    var serviceResult = _baseService.Delete(entityId);
        //    return Ok();
        //}
    }
}
