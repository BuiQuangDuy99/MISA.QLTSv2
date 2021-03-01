using Microsoft.Extensions.Configuration;
using MISA.QLTSv2.BL.Entities;
using MISA.QLTSv2.BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.DL
{
    public class FixedAssetCategoryRepository: BaseRepository<FACategory>, IFixedAssetCategoryRepository
    {
        #region Contrustor
        public FixedAssetCategoryRepository(IConfiguration configuration) : base(configuration)
        {

        }
        #endregion
    }
}
