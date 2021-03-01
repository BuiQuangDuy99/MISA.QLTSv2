using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Models
{
    /// <summary>
    /// Loại tài sản
    /// </summary>
    /// CreatedBy:NVTUYEN(01/03/2021)
    public class fixed_asset_category
    {
        #region Declare
        #endregion
        #region Constructor
        public fixed_asset_category()
        {

        }
        #endregion
        #region properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid fixed_asset_category_id { get; set; }
        /// <summary>
        /// Mã loại tài sản
        /// </summary>
        public string fixed_asset_category_code { get; set; }
        /// <summary>
        /// Có phải là cha không
        /// </summary>
        public Boolean? is_parent { get; set; }
        /// <summary>
        /// ID loại tài sản cha
        /// </summary>
        public Guid parent_id { get; set; }
        /// <summary>
        /// Loại tài sản này thuộc loại tài sản lớn hơn nào
        /// </summary>
        public string parent_name { get; set; }
        /// <summary>
        /// Tên loại tài sản
        /// </summary>
        public string fixed_asset_category_name { get; set; }
        /// <summary>
        /// Id của đơn vị
        /// </summary>
        public Guid? organization_id { get; set; }
        /// <summary>
        /// Tỷ lệ hao mòn (%)
        /// </summary>
        public float? depreciation_rate { get; set; }
        /// <summary>
        /// Số năm sử dụng 
        /// </summary>
        public int? life_time { get; set; }
        /// <summary>
        /// Ghi chú
        /// </summary>
        public string description { get; set; }
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
