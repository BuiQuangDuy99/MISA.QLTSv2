using AutoMapper;
using MISA.QLTSv2.BL.Models;
using MISA.QLTSv2.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Entities
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<fixed_asset, Asset>();
            CreateMap<fixed_asset_category, AssetCategory>();
            CreateMap<department, Department>();
        }
    }
}
