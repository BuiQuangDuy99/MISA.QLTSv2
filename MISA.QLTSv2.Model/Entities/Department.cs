using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.Model.Entities
{
    /// <summary>
    /// Phòng Ban
    /// </summary>
    /// CreatedBy:NVTUYEN(01/03/2021)
    public class Department:BaseEntity
    {
        #region Declare
        #endregion
        #region Constructor
        public Department()
        {

        }
        #endregion
        #region properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        [PrimaryKey]
        public Guid DepartmentId { get; set; }
        /// <summary>
        /// Mã phòng ban
        /// </summary>
        [CheckDuplicate]
        [Required]
        [DisplayName("Mã Phòng Ban")]
        public string DepartmentCode { get; set; }
        /// <summary>
        /// Tên phòng ban
        /// </summary>
        [Required]
        [DisplayName("Tên Phòng Ban")]
        public string DepartmentName { get; set; }
        /// <summary>
        /// Ghi chú
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Có phải là cha không
        /// </summary>
        public Boolean? IsParent { get; set; }
        /// <summary>
        /// Id phòng ban cha
        /// </summary>
        public Guid? ParentId { get; set; }
        /// <summary>
        /// Tên phòng ban cha
        /// </summary>
        public string ParentName { get; set; }
        /// <summary>
        /// Id của đơn vị
        /// </summary>
        public Guid? OrganizationId { get; set; }
        #endregion
        #region Method
        #endregion
    }
}
