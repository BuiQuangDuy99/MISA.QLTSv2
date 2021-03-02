using AutoMapper;
using MISA.QLTSv2.DL;
using MISA.QLTSv2.Model.Entities;
using System;
using System.Collections.Generic;

namespace MISA.QLTSv2.BL.Services
{
    public class FixedAssetBL
    {
        FixedAssetDL _fixedAssetDL;  
        #region contructor
        public FixedAssetBL(string connectionString, IMapper mapper)
        {
            _fixedAssetDL = new FixedAssetDL(connectionString, mapper);
        }
        #endregion
        /// <summary>
        /// Lấy dánh sách tài sản
        /// </summary>
        /// <returns>Danh sách tài sản</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        public List<FixedAsset> GetEntities()
        {
            return _fixedAssetDL.GetEntities();
        }
        /// <summary>
        /// Xóa Một bản ghi
        /// </summary>
        /// <returns>Số bản ghi bị xóa</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        public int Delete(Guid entityId)
        {

            return _fixedAssetDL.Delete(entityId);
        }
    }
}
