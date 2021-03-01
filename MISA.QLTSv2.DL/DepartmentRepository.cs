using Microsoft.Extensions.Configuration;
using MISA.QLTSv2.BL.Entities;
using MISA.QLTSv2.BL.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.DL
{
    /// <summary>
    /// Repository Phòng Ban
    /// </summary>
    /// Author: DVVUONG (01/03/2021)
    public class DepartmentRepository : BaseRepository<Department>, IDepartmentRepository
    {
        #region Constructor
        public DepartmentRepository(IConfiguration configuration):base(configuration){

        }
        #endregion

        #region Method
        #endregion
    }
}
