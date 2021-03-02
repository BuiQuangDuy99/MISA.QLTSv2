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
    [Route("api/v1/[controller]")]
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

            return Ok(_fixedAssetBL.GetEntities());
        }
        /// <summary>
        /// Xóa một bản ghi
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        [HttpDelete("{entityId}")]
        public IActionResult Delete(Guid entityId)
        {
            return Ok(_fixedAssetBL.Delete(entityId));
        }

        [HttpPost]
        public IActionResult Insert([FromBody] FixedAsset entity)
        {
            return Ok(_fixedAssetBL.Insert(entity));
        }
    }
}
