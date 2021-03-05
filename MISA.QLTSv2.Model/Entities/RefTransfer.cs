using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.Model.Entities
{
    /// <summary>
    /// Điểu chuyển
    /// </summary>
    /// CreatedBy:NVTUYEN(05/03/2021)
    public class RefTransfer:BaseEntity
    {
        /// <summary>
        /// ID chứng từ
        /// </summary>
        public string RefTransferId { get; set; }
        /// <summary>
        /// Thuộc đơn vị
        /// </summary>
        public string OrganizationId { get; set; }
        /// <summary>
        /// Số chứng từ
        /// </summary>
        public string RefNo { get; set; }
        /// <summary>
        /// Loại chứng từ
        /// </summary>
        public int RefType { get; set; }
        /// <summary>
        /// Ngày chứng từ, (CT tính hao mòn: là ngày cuối kỳ)
        /// </summary>
        public DateTime RefDate { get; set; }
        /// <summary>
        /// Chi tiết danh sách tài sản của chứng từ
        /// </summary>
        public string RefDetail { get; set; }
        /// <summary>
        /// Diễn giải
        /// </summary>
        public string JournalMemo { get; set; }
        /// <summary>
        /// Ngày thực hiện điều chuyển....
        /// </summary>
        public DateTime PostedDate { get; set; }
        /// <summary>
        /// Năm làm việc ~ năm chứng từ
        /// </summary>
        public int TrackedYear { get; set; }
    }
}
