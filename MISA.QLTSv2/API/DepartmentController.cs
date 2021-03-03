using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MISA.QLTSv2.BL.Services;
using MISA.QLTSv2.Model.Entities;
using System;

namespace MISA.QLTSv2.API
{
    /// <summary>
    /// API Phòng Ban
    /// </summary>
    /// Author: DVVUONG (01/03/2021)
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        #region Declare
        string _connectionString;
        DepartmentBL _departmentBL;
        #endregion

        #region Constructor
        public DepartmentController(IConfiguration configuration, IMapper mapper)
        {
            _connectionString = configuration.GetConnectionString("MISAQLTSv2ConnectionString");
            _departmentBL = new DepartmentBL(_connectionString, mapper);
        }
        #endregion

        #region Method
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
            catch (Exception)
            {

            }

            return Ok(_departmentBL.GetEntities());
        }


        /// <summary>
        /// Xóa bản ghi
        /// </summary>
        /// <param name="entityId">khóa chính bản ghi cần xóa</param>
        /// <returns>số bản ghi xóa thành công</returns>
        /// Author: DVVUONG (01/03/2021)
        [HttpDelete("{entityId}")]
        public IActionResult Delete(Guid entityId)
        {
            try
            {

            }
            catch (Exception)
            {

            }
            return Ok(_departmentBL.Delete(entityId));
        }


        /// <summary>
        /// Thêm mới bản ghi
        /// </summary>
        /// <param name="entity">object cần thêm mới</param>
        /// <returns>số bản ghi thêm mới được</returns>
        /// Author: DVVUONG (01/03/2021)
        [HttpPost]
        public IActionResult Post([FromBody] Department entity)
        {
            var res = _departmentBL.Insert(entity);
            return Ok(res);
        }
        #endregion
    }
}
