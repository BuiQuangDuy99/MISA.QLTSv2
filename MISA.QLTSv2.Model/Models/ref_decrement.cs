using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.Model.Models
{
    /// <summary>
    /// Ghi giảm tài sản
    /// </summary>
    /// Author: DVVUONG (09/03/2021)
    public class ref_decrement
    {
        #region Property
        /// <summary>
        /// ID chứng từ
        /// </summary>
        public Guid ref_decrement_id { get; set; }

        /// <summary>
        /// Thuộc đơn vị
        /// </summary>
        public Guid? organization_id { get; set; }

        /// <summary>
        /// Số chứng từ
        /// </summary>
        public string ref_no { get; set; }

        /// <summary>
        /// Loại chứng từ
        /// </summary>
        public int? ref_type { get; set; }

        /// <summary>
        /// Ngày chứng từ
        /// </summary>
        public DateTime? ref_date { get; set; }

        /// <summary>
        /// Chi tiết danh sách tài sản của chứng từ
        /// </summary>
        public string ref_detail { get; set; }

        /// <summary>
        /// Diễn giải
        /// </summary>
        public string journal_memo { get; set; }

        /// <summary>
        /// Ngày ghi giảm
        /// </summary>
        public DateTime? posted_date { get; set; }

        /// <summary>
        /// Năm làm việc ~ năm chứng từ
        /// </summary>
        public int? tracked_year { get; set; }

        /// <summary>
        /// Giá trị còn lại
        /// </summary>
        public decimal? cost_remainder { get; set; }

        /// <summary>
        /// Tổng nguyên giá
        /// </summary>
        public decimal? cost_total { get; set; }

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
    }
}
