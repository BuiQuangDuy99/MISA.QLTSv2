using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Entities
{
    public class Asset:BaseEntity
    {
        #region Declare
        #endregion
        #region Constructor
        public Asset()
        {

        }
        #endregion
        #region properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid AssetId { get; set; }
        /// <summary>
        /// Mã tài sản
        /// </summary>
        public string AssetCode { get; set; }
        /// <summary>
        /// Tên tài sản
        /// </summary>
        public string AssetName { get; set; }
        /// <summary>
        /// ID của đợn vị
        /// </summary>
        public Guid? OrganizationId { get; set; }
        /// <summary>
        /// Mã đợn vị
        /// </summary>
        public string OrganizationCode { get; set; }
        /// <summary>
        /// Tên dơn vị
        /// </summary>
        public string OrganizationName { get; set; }
        /// <summary>
        /// ID phòng ban
        /// </summary>
        public Guid? DepartmentId { get; set; }
        /// <summary>
        /// Mã Phòng ban
        /// </summary>
        public string DepartmentCode { get; set; }
        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public string DepartmentName { get; set; }
        /// <summary>
        /// ID loại tài sản
        /// </summary>
        public Guid? AssetCategoryId { get; set; }
        /// <summary>
        /// Mã loại tài sản
        /// </summary>
        public string AssetCategoryCode { get; set; }
        /// <summary>
        /// Tên loại tài sản
        /// </summary>
        public string AssetCategoryName { get; set; }
        /// <summary>
        /// Ngày ghi tăng tài sản
        /// </summary>
        public DateTime? IncrementDate { get; set; }
        /// <summary>
        /// Nguyên giá
        /// </summary>
        public decimal? Cost { get; set; }
        /// <summary>
        /// Số lượng
        /// </summary>
        public int? Quantity { get; set; }
        /// <summary>
        /// Tỷ lệ hao mòn (%)
        /// </summary>
        public float DepreciationRate { get; set; }
        /// <summary>
        /// Giá trị hao mòn năm
        /// </summary>
        public decimal? DepreciationYearPrice { get; set; }
        /// <summary>
        /// Năm bắt đầu theo dõi tài sản trên phần mềm
        /// </summary>
        public int? TrackedYear { get; set; }
        /// <summary>
        /// Số năm sử dụng 
        /// </summary>
        public int? LifeTime { get; set; }
        /// <summary>
        /// Năm sử dụng
        /// </summary>
        public int? ProductionYear { get; set; }
        /// <summary>
        /// Sử dụng
        /// </summary>
        public Boolean? Active { get; set; }
        #endregion
        #region Method
        #endregion
    }
}
