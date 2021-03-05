using MISA.QLTSv2.Model.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.Model.Entities
{
    /// <summary>
    /// Class lưu kết quả truy vấn tầng BL trả về cho Web
    /// </summary>
    /// Author: DVVUONG (01/03/2021)
    public class ServiceResult
    {
        #region Property

        /// <summary>
        /// Dữ liệu trả về
        /// </summary>
        public object Data { get; set; }

        /// <summary>
        /// Lời thông báo
        /// </summary>
        public string Messenger { get; set; } = "";

        /// <summary>
        /// MISACode của kết quả truy vấn
        /// </summary>
        public MISACode MISACode { get; set; } = MISACode.Success;
        #endregion
    }
}
