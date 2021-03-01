using Microsoft.Extensions.Configuration;
using MISA.QLTSv2.BL.Entities;
using MISA.QLTSv2.BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.DL
{
    public class FixedAssetRepository:BaseRepository<FixedAsset>,IFixedAssetRepository
    {
        public FixedAssetRepository(IConfiguration configuration) : base(configuration)
        {

        }
    }
}
