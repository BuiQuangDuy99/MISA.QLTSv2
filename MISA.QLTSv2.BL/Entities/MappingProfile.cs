using AutoMapper;
using MISA.QLTSv2.BL.Models;
using MISA.QLTSv2.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Entities
{
    /// <summary>
    /// Auto mapping các đối tượng
    /// </summary>
    /// createBy:NVTUYEN(01/03/2021)
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<fixed_asset, FixedAsset>();
            CreateMap<FixedAsset, fixed_asset>();
            CreateMap<fixed_asset_category, FixedAssetCategory>();
            CreateMap<FixedAssetCategory, fixed_asset_category>();
            CreateMap<department, Department>();
            CreateMap<Department, department>();
        }
    }
}
