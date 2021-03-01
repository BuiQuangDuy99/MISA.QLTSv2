using MISA.QLTSv2.BL.Entities;
using MISA.QLTSv2.BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Services
{
    public class FixedAssetService:BaseService<FixedAsset>,IFixedAssetService
    {
        IFixedAssetRepository _FixedAssetRepository;
        #region contructor
        public FixedAssetService(IFixedAssetRepository FixedAssetRepository) : base(FixedAssetRepository)
        {
            _FixedAssetRepository = FixedAssetRepository;
        }
        #endregion
    }
}
