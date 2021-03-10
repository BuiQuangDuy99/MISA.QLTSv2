using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.Model.Models
{
    class ref_depreciation
    {
        #region Constructor
        public ref_depreciation()
        {
            ref_depreciation_id = new Guid();
        }
        #endregion

        #region Property
        /// <summary>
        /// Mã chứng từ
        /// </summary>
        public Guid ref_depreciation_id { get; set; }

        /// <summary>
        /// Số chứng từ
        /// </summary>
        public string ref_no { get; set; }

        /// <summary>
        /// Số tiền
        /// </summary>
        public decimal amount_total { get; set; }

        /// <summary>
        /// Chi tiết danh sách tài sản của chứng từ
        /// </summary>
        public string ref_detail { get; set; }

        /// <summary>
        /// Diễn giải
        /// </summary>
        public string journal_memo { get; set; }

        /// <summary>
        /// Ngày tạo chứng từ
        /// </summary>
        public DateTime posted_date { get; set; }

        /// <summary>
        /// Người tạo
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
