using MISA.QLTSv2.BL.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Entities
{
    [AttributeUsage(AttributeTargets.Property)]
    public class Required : Attribute
    {

    }
    /// <summary>
    /// Cờ check trùng
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class CheckDuplicate : Attribute
    {

    }
    /// <summary>
    /// cờ khóa chính
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class PrimaryKey : Attribute
    {

    }
    /// <summary>
    /// lấy tên
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public class DisplayName : Attribute
    {
        public string Name { get; set; }
        public DisplayName(string name = "")
        {
            this.Name = name;
        }
    }
    public class BaseEntity
    {
        /// <summary>
        /// Ngày lập
        /// </summary>
        public DateTime? CreatedDate { get; set; }
        /// <summary>
        /// Người lập
        /// </summary>
        public string CreatedBy { get; set; }
        /// <summary>
        /// Ngày sửa 
        /// </summary>
        public DateTime? ModifiedDate { get; set; }
        /// <summary>
        /// Người sửa
        /// </summary>
        public string ModifiedBy { get; set; }
        /// <summary>
        /// Cờ sác định phương thức
        /// </summary>
        public EntityState EntityState { get; set; } = EntityState.AddNew;
    }
}
