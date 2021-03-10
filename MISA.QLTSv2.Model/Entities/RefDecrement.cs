using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.Model.Entities
{
    public class RefDecrement : BaseEntity
    {
    
        #region Property
        /// <summary>
        /// ID chứng từ
        /// </summary>
        public Guid RefDecrementId { get; set; }

        /// <summary>
        /// Thuộc đơn vị
        /// </summary>
        public Guid? OrganizationId { get; set; }

        /// <summary>
        /// Số chứng từ
        /// </summary>
        public string RefNo { get; set; }

        /// <summary>
        /// Loại chứng từ
        /// </summary>
        public int? RefType { get; set; }

        /// <summary>
        /// Ngày chứng từ
        /// </summary>
        public DateTime? RefDate { get; set; }

        /// <summary>
        /// Chi tiết danh sách tài sản của chứng từ
        /// </summary>
        public string RefDetail { get; set; }

        /// <summary>
        /// Diễn giải
        /// </summary>
        public string JournalMemo { get; set; }

        /// <summary>
        /// Ngày ghi giảm
        /// </summary>
        public DateTime? PostedDate { get; set; }

        /// <summary>
        /// Năm làm việc ~ năm chứng từ
        /// </summary>
        public int? TrackedYear { get; set; }

        /// <summary>
        /// Tổng nguyên giá
        /// </summary>
        public decimal? CostTotal { get; set; }
        #endregion
    }
}
