using AutoMapper;
using MISA.QLTSv2.Model.Entities;
using System.Collections.Generic;

namespace MISA.QLTSv2.BL.Services
{
    public class FixedAssetBL
    {
        FixedAssetBL _fixedAssetBL;  
        #region contructor
        public FixedAssetBL(string connectionString, IMapper mapper)
        {
            _fixedAssetBL = new FixedAssetBL(connectionString, mapper);
        }
        #endregion
        public List<FixedAsset> GetEntities()
        {
            return _fixedAssetBL.GetEntities();
        }
    }
}
