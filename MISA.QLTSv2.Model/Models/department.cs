using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.Model.Models
{
    /// <summary>
    /// Phòng ban
    /// </summary>
    /// CreatedBy:NVTUYEN(01/03/2021)
    public class department
    {
        #region Declare
        #endregion
        #region Constructor
        public department()
        {

        }
        #endregion
        #region properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid department_id { get; set; }
        /// <summary>
        /// Mã phòng ban
        /// </summary>
        public string department_code { get; set; }
        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public string department_name { get; set; }
        /// <summary>
        /// Ghi chú
        /// </summary>
        public string description { get; set; }
        /// <summary>
        /// Có phải là cha không
        /// </summary>
        public Boolean? is_parent { get; set; }
        /// <summary>
        /// Id phòng ban cha
        /// </summary>
        public Guid? parent_id { get; set; }
        /// <summary>
        /// Tên phòng ban cha
        /// </summary>
        public string parent_name { get; set; }
        /// <summary>
        /// Id của đơn vị
        /// </summary>
        public Guid? organization_id { get; set; }
        /// <summary>
        /// Người Lập
        /// </summary>
        public string created_by { get; set; }
        /// <summary>
        /// Ngày lập
        /// </summary>
        public DateTime? created_date { get; set; }
        /// <summary>
        /// Người sửa
        /// </summary>
        public string modified_by { get; set; }
        /// <summary>
        /// Ngày sửa
        /// </summary>
        public DateTime? modified_date { get; set; }
        #endregion
        #region Method
        #endregion
    }
}
