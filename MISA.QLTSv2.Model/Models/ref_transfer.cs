using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.Model.Models
{
    /// <summary>
    /// Điểu chuyển
    /// </summary>
    /// CreatedBy:NVTUYEN(05/03/2021)
    public class ref_transfer
    {
        /// <summary>
        /// ID chứng từ
        /// </summary>
        public string ref_transfer_id { get; set; }
        /// <summary>
        /// Thuộc đơn vị
        /// </summary>
        public string organization_id { get; set; }
        /// <summary>
        /// Số chứng từ
        /// </summary>
        public string ref_no { get; set; }
        /// <summary>
        /// Loại chứng từ
        /// </summary>
        public int ref_type { get; set; }
        /// <summary>
        /// Ngày chứng từ, (CT tính hao mòn: là ngày cuối kỳ)
        /// </summary>
        public DateTime ref_date { get; set; }
        /// <summary>
        /// Chi tiết danh sách tài sản của chứng từ
        /// </summary>
        public string ref_detail { get; set; }
        /// <summary>
        /// Diễn giải
        /// </summary>
        public string journal_memo { get; set; }
        /// <summary>
        /// Ngày thực hiện điều chuyển....
        /// </summary>
        public DateTime posted_date { get; set; }
        /// <summary>
        /// Năm làm việc ~ năm chứng từ
        /// </summary>
        public int tracked_year { get; set; }
        /// <summary>
        /// Người Lập
        /// </summary>
        public string created_by { get; set; }
        /// <summary>
        /// Ngày lập
        /// </summary>
        public DateTime created_date { get; set; }
        /// <summary>
        /// Người sửa
        /// </summary>
        public string modified_by { get; set; }
        /// <summary>
        /// Ngày sửa
        /// </summary>
        public DateTime modified_date { get; set; }
    }
}
