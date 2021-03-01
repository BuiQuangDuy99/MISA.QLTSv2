using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MISA.QLTSv2.BL.Entities;
using MISA.QLTSv2.BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.QLTSv2.API
{
    /// <summary>
    /// API Phòng Ban
    /// </summary>
    /// Author: DVVUONG (01/03/2021)
    public class DepartmentController : BaseEntityController<Department>
    {
        #region Declare
        IDepartmentService _departmentService;
        #endregion
        #region Constructor
        public DepartmentController(IDepartmentService departmentService) : base(departmentService)
        {
            _departmentService = departmentService;
        }
        #endregion
    }
}
