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
        //public static MapperConfiguration MapperConfiguration;
        //public static void RegisterMappings()
        //{
        //    MapperConfiguration = new MapperConfiguration(cfg =>
        //    {
        //        cfg.SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
        //        cfg.DestinationMemberNamingConvention = new PascalCaseNamingConvention();
        //        cfg.CreateMap<fixed_asset, FixedAsset>();
        //        cfg.CreateMap<FixedAsset, fixed_asset>();
        //        cfg.CreateMap<fixed_asset_category, FACategory>();
        //        cfg.CreateMap<FACategory, fixed_asset_category>();
        //        cfg.CreateMap<department, Department>();
        //        cfg.CreateMap<Department, department>();
        //    });
        //}

        public MappingProfile()
        {
            CreateMap<fixed_asset, FixedAsset>();
            CreateMap<FixedAsset, fixed_asset>();
            CreateMap<fixed_asset_category, FACategory>();
            CreateMap<FACategory, fixed_asset_category>();
            CreateMap<department, Department>();
            CreateMap<Department, department>();
        }
    }
}
