using AutoMapper;
using MISA.QLTSv2.Model.Models;
using MISA.QLTSv2.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.Model.Entities
{
    /// <summary>
    /// Auto mapping các đối tượng
    /// </summary>
    /// createBy:NVTUYEN(01/03/2021)
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
            DestinationMemberNamingConvention = new PascalCaseNamingConvention();

            CreateMap<fixed_asset, FixedAsset>();
            CreateMap<FixedAsset, fixed_asset>();

            CreateMap<ref_transfer, RefTransfer>();
            CreateMap<RefTransfer, ref_transfer>();

            CreateMap<fixed_asset_category, FACategory>();
            CreateMap<FACategory, fixed_asset_category>();

            CreateMap<department, Department>();
            CreateMap<Department, department>();
        }
    }
}
