using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.Model.Entities
{
    public class RefDepreciation : BaseEntity
    {
        public RefDepreciation()
        {
            RefDepreciationId = new Guid();
        }

        /// <summary>
        /// Mã chứng từ
        /// </summary>
        public Guid RefDepreciationId { get; set; }

        /// <summary>
        /// Số chứng từ
        /// </summary>
        [CheckDuplicate]
        [MaxLength(50)]
        [DisplayName("Số chứng từ")]
        public string RefNo { get; set; }

        /// <summary>
        /// Số tiền
        /// </summary>
        [MaxLength(20)]
        public decimal AmountTotal { get; set; }

        /// <summary>
        /// Chi tiết danh sách tài sản của chứng từ
        /// </summary>
        public string RefDetail { get; set; }

        /// <summary>
        /// Diễn giải
        /// </summary>
        public string JournalMemo { get; set; }

        /// <summary>
        /// Ngày tạo chứng từ
        /// </summary>
        public DateTime PostedDate { get; set; }
    }
}
