using Microsoft.AspNetCore.Mvc;
using MISA.QLTSv2.BL.Entities;
using MISA.QLTSv2.BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MISA.QLTSv2.API
{
    public class FixedAssetCategoriesController : BaseEntityController<FACategory>
    {
        IBaseService<FACategory> _baseService;

        public FixedAssetCategoriesController(IBaseService<FACategory> baseService) : base(baseService)
        {
            _baseService = baseService;
        }
    }
}
