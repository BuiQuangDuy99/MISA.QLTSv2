using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Enums
{
    /// <summary>
    /// MISACode để xác định trạng thái của việc validate
    /// </summary>
    public enum MISACode
    {
        /// <summary>
        /// Dữ liệu hợp lên
        /// </summary>
        IsValid = 100,
        /// <summary>
        /// Dữ liệu chưa hợp lệ
        /// </summary>
        Notvalid = 900,
        /// <summary>
        /// Thành công
        /// </summary>
        Success = 200
    }
    /// <summary>
    /// xác định trạng thái của object
    /// </summary>
    public enum EntityState
    {
        AddNew = 1,
        Update = 2,
        Delete = 3
    }
}
