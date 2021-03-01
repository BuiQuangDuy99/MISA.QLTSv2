using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MISA.QLTSv2.Models
{
    /// <summary>
    /// Tài sản
    /// </summary>
    /// createBy:NVTUYEN(01/03/2021)
    public class fixed_asset
    {
        #region Declare
        #endregion
        #region Constructor
        public fixed_asset()
        {

        }
        #endregion
        #region properties
        /// <summary>
        /// Khóa chính
        /// </summary>
        public Guid fixed_asset_id { get; set; }
        /// <summary>
        /// Mã tài sản
        /// </summary>
        public string fixed_asset_code { get; set; }
        /// <summary>
        /// Tên tài sản
        /// </summary>
        public string fixed_asset_name { get; set; }
        /// <summary>
        /// ID của đợn vị
        /// </summary>
        public Guid? organization_id { get; set; }
        /// <summary>
        /// Mã đợn vị
        /// </summary>
        public string organization_code { get; set; }
        /// <summary>
        /// Tên dơn vị
        /// </summary>
        public string organization_name { get; set; }
        /// <summary>
        /// ID phòng ban
        /// </summary>
        public Guid? department_id { get; set; }
        /// <summary>
        /// Mã Phòng ban
        /// </summary>
        public string department_code { get; set; }
        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public string department_name { get; set; }
        /// <summary>
        /// ID loại tài sản
        /// </summary>
        public Guid? fixed_asset_category_id { get; set; }
        /// <summary>
        /// Mã loại tài sản
        /// </summary>
        public string fixed_asset_category_code { get; set; }
        /// <summary>
        /// Tên loại tài sản
        /// </summary>
        public string fixed_asset_category_name { get; set; }
        /// <summary>
        /// Ngày ghi tăng tài sản
        /// </summary>
        public DateTime? increment_date { get; set; }
        /// <summary>
        /// Nguyên giá
        /// </summary>
        public decimal? cost { get; set; }
        /// <summary>
        /// Số lượng
        /// </summary>
        public int? quantity { get; set; }
        /// <summary>
        /// Tỷ lệ hao mòn (%)
        /// </summary>
        public float depreciation_rate { get; set; }
        /// <summary>
        /// Giá trị hao mòn năm
        /// </summary>
        public decimal? depreciation_year_price { get; set; }
        /// <summary>
        /// Năm bắt đầu theo dõi tài sản trên phần mềm
        /// </summary>
        public int? tracked_year { get; set; }
        /// <summary>
        /// Số năm sử dụng 
        /// </summary>
        public int? life_time { get; set; }
        /// <summary>
        /// Năm sử dụng
        /// </summary>
        public int? production_year { get; set; }
        /// <summary>
        /// Sử dụng
        /// </summary>
        public Boolean? active { get; set; }
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
