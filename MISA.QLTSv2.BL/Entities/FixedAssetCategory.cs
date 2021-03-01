using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Entities
{
    /// <summary>
    /// Loại tài sản
    /// </summary>
    /// CreatedBy:NVTUYEN(01/03/2021)
    public class FixedAssetCategory:BaseEntity
    {
        #region Declare
        #endregion
        #region Constructor
        public FixedAssetCategory()
        {

        }
        #endregion
        #region properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid FixedAssetCategoryId { get; set; }
        /// <summary>
        /// Mã loại tài sản
        /// </summary>
        public string FixedAssetCategoryCode { get; set; }
        /// <summary>
        /// Có phải là cha không
        /// </summary>
        public Boolean? IsParent { get; set; }
        /// <summary>
        /// ID loại tài sản cha
        /// </summary>
        public Guid ParentId { get; set; }
        /// <summary>
        /// Loại tài sản này thuộc loại tài sản lớn hơn nào
        /// </summary>
        public string ParentName { get; set; }
        /// <summary>
        /// Tên loại tài sản
        /// </summary>
        public string FixedAssetCategoryName { get; set; }
        /// <summary>
        /// Id của đơn vị
        /// </summary>
        public Guid? OrganizationId { get; set; }
        /// <summary>
        /// Tỷ lệ hao mòn (%)
        /// </summary>
        public float? DepreciationRate { get; set; }
        /// <summary>
        /// Số năm sử dụng 
        /// </summary>
        public int? LifeTime { get; set; }
        /// <summary>
        /// Ghi chú
        /// </summary>
        public string Description { get; set; }
        #endregion
        #region Method
        #endregion
    }
}
