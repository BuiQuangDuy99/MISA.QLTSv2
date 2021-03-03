using AutoMapper;
using MISA.QLTSv2.DL;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Model.Enums;
using MISA.QLTSv2.Model.Properties;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Services
{
    /// <summary>
    /// DepartmentBL cho Phòng Ban
    /// </summary>
    /// Author: DVVUONG (02/03/2021)
    public class DepartmentBL
    {
        #region Declare
        DepartmentDL _departmentDL;
        ServiceResult _serviceResult;
        #endregion

        #region Constructor
        public DepartmentBL(string connectionString, IMapper mapper)
        {
            _departmentDL = new DepartmentDL(connectionString, mapper);
            _serviceResult = new ServiceResult();
        }
        #endregion

        #region Method
        /// <summary>
        /// Lấy danh sách phòng ban
        /// </summary>
        /// <returns>danh sách phòng ban</returns>
        /// Author: DVVUONG (02/03/2021)
        public List<Department> GetEntities()
        {
            return _departmentDL.GetEntities();
        }

        /// <summary>
        /// Lấy ra một bản ghi theo ID
        /// </summary>
        /// <param name="entityId">ID</param>
        /// <returns>một bản ghi</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        public Department GetEntityById(Guid entityId)
        {
            return _departmentDL.GetEntityById(entityId);
        }

        /// <summary>
        /// Xóa phòng ban
        /// </summary>
        /// <param name="entityId">khóa chính</param>
        /// <returns>số bản ghi bị xóa</returns>
        /// Author: DVVUONG (02/03/2021)
        public int Delete(Guid entityId)
        {
            return _departmentDL.Delete(entityId);
        }


        /// <summary>
        /// Thêm một bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Số bản ghi thay đổi</returns>
        /// createdBy:DVVUONG(02/03/2021)
        public ServiceResult Insert(Department entity)
        {
            entity.EntityState = EntityState.Insert;
            var isValid = Validate(entity);

            if (isValid == true)
            {
                _serviceResult.Data = _departmentDL.Insert(entity);
                _serviceResult.MISACode = MISACode.Success;
                _serviceResult.Messenger = Resources.Msg_AddSuccess;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }
        }

        /// <summary>
        /// Chỉnh sửa một bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Một bản ghi thay đổi</returns>
        /// CreatedBy:DVVUONG(02/03/2021)
        public ServiceResult Update(Department entity)
        {
            entity.EntityState = EntityState.Update;
            var isValid = Validate(entity);
            if (isValid == true)
            {
                _serviceResult.Data = _departmentDL.Update(entity);
                _serviceResult.MISACode = MISACode.Success;
                _serviceResult.Messenger = Resources.Msg_UpdateSuccess;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }
        }


        /// <summary>
        /// Hàm Validate dữ liệu
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>True/False</returns>
        /// CreatedBy:DVVUONG(20/30/2021)
        private bool Validate(Department entity)
        {
            var mesArr = new List<string>();
            var isValidate = true;
            // Đọc các property
            var properties = entity.GetType().GetProperties();
            foreach (var property in properties)
            {
                var propertyValue = property.GetValue(entity);
                var displayName = string.Empty;
                var displayNameAttributes = property.GetCustomAttributes(typeof(DisplayName), true);
                if (displayNameAttributes.Length > 0)
                {
                    displayName = (displayNameAttributes[0] as DisplayName).Name;
                }
                // kiểm tra xem có attribute cần phải validate không
                if (property.IsDefined(typeof(Required), false))
                {
                    // check bat buoc nhap
                    if (propertyValue == null || propertyValue.ToString() == "")
                    {
                        isValidate = false;
                        mesArr.Add(string.Format(Resources.Msg_Required, displayName));
                        _serviceResult.MISACode = MISACode.NotValid;
                        _serviceResult.Messenger = Resources.Msg_IsNotValid;
                    }
                }
                if (property.IsDefined(typeof(CheckDuplicate), false))
                {
                    // check trùng dữ liệu
                    var propertyName = property.Name;
                    var entityDuplicate = _departmentDL.GetEntityByProperty(entity, property);
                    if (entityDuplicate != null)
                    {
                        isValidate = false;
                        mesArr.Add(string.Format(Resources.Msg_Dulicate, displayName));
                        _serviceResult.MISACode = MISACode.NotValid;
                        _serviceResult.Messenger = Resources.Msg_IsNotValid;
                    }
                }

                if (property.IsDefined(typeof(MaxLength), false))
                {
                    // lay do dai da khai bao
                    var attributeMaxLength = property.GetCustomAttributes(typeof(MaxLength), true)[0];
                    var length = (attributeMaxLength as MaxLength).Value;
                    var msg = (attributeMaxLength as MaxLength).ErrorMsg;
                    if (propertyValue.ToString().Trim().Length > length)
                    {
                        isValidate = false;
                        mesArr.Add(msg ?? $"Thông tin này vượt quá {length} ky tu cho phep");
                        _serviceResult.MISACode = MISACode.NotValid;
                        _serviceResult.Messenger = Resources.Msg_IsNotValid;
                    }
                }
            }
            _serviceResult.Data = mesArr;
            return isValidate;
        }

        #endregion
    }
}
