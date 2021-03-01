using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Enums
{
    /// <summary>
    /// QLTSv2Enum để xác định trạng thái của việc validate dữ liệu
    /// </summary>
    public enum QLTSv2Code
    {
        /// <summary>
        /// Dữ liệu hợp lệ
        /// </summary>
        IsValid = 100,

        /// <summary>
        /// Dữ liệu chưa hợp lệ
        /// </summary>
        NotValid = 900,

        /// <summary>
        /// Thành công
        /// </summary>
        Success = 200
    }

    /// <summary>
    /// Xác định trạng thái của việc truy vấn
    /// </summary>
    public enum EntityState
    {
        AddNew = 1,
        Update = 2,
        Delete = 3
    }
}
