using AutoMapper;
using MISA.QLTSv2.DL;
using MISA.QLTSv2.Model.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Services
{
    /// <summary>
    /// DepartmentBL cho Phòng Ban
    /// </summary>
    /// Author: DVVUONG (02/03/2021)
    public class DepartmentBL
    {
        #region Declare
        DepartmentDL _departmentDL; 
        #endregion

        #region Constructor
        public DepartmentBL(string connectionString, IMapper mapper)
        {
            _departmentDL = new DepartmentDL(connectionString, mapper);
        }
        #endregion

        #region Method
        /// <summary>
        /// Lấy danh sách phòng ban
        /// </summary>
        /// <returns>danh sách phòng ban</returns>
        /// Author: DVVUONG (02/03/2021)
        public List<Department> GetEntities()
        {
            return _departmentDL.GetEntities();
        }

        /// <summary>
        /// Xóa phòng ban
        /// </summary>
        /// <param name="entityId">khóa chính</param>
        /// <returns>số bản ghi bị xóa</returns>
        /// Author: DVVUONG (02/03/2021)
        public int Delete(Guid entityId)
        {

            return _departmentDL.Delete(entityId);
        }
        #endregion
    }
}
