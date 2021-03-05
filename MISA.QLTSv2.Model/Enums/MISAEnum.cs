using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.Model.Enums
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
        NotValid = 900,
        /// <summary>
        /// Thành công
        /// </summary>
        Success = 200,
        /// <summary>
        /// Thất bại
        /// </summary>
        Failed = 400,
        /// <summary>
        /// Exception
        /// </summary>
        Exception = 500

    }
    /// <summary>
    /// xác định trạng thái của object
    /// </summary>
    public enum EntityState
    {
        Select = 0,
        Insert = 1,
        Update = 2,
        Delete = 3
    }
}
