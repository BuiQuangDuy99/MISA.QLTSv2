using MISA.QLTSv2.BL.Entities;
using MISA.QLTSv2.BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Services
{
    public class FixedAssetCategoryService: BaseService<FACategory>, IFixedAssetCategoryService
    {
        IFixedAssetCategoryRepository _fixedAssetCategory;
        #region Contrustor
        public FixedAssetCategoryService(IFixedAssetCategoryRepository fixedAssetCategory) : base(fixedAssetCategory)
        {
            _fixedAssetCategory = fixedAssetCategory;
        }
        #endregion
    }
}
