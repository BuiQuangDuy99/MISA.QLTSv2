﻿using MISA.QLTSv2.Model.Enums;
using System;

namespace MISA.QLTSv2.Model.Entities
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
    /// Attribute kiểm tra độ dài theo yêu cầu
    /// </summary>
    /// CreatedBy: DVVUONG (01/03/2021)
    [AttributeUsage(AttributeTargets.Property)]
    public class MaxLength : Attribute
    {
        #region Property
        /// <summary>
        /// Giá trị độ dài muốn đặt
        /// </summary>
        public int Value { get; set; }

        /// <summary>
        /// chuỗi thông báo
        /// </summary>
        public string ErrorMsg { get; set; }
        #endregion

        #region Constructor
        public MaxLength(int lengh, string erroMsg = null)
        {
            this.Value = lengh;
            this.ErrorMsg = erroMsg;
        }
        #endregion
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
        public EntityState EntityState { get; set; } = EntityState.Insert;
    }
}