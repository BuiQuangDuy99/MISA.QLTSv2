using AutoMapper;
using MISA.QLTSv2.BL.Properties;
using MISA.QLTSv2.DL;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Model.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Services
{
    /// <summary>
    /// Ghi giảm BL
    /// </summary>
    /// Author: DVVUONG (10/03/2021)
    public class RefDecrementBL
    {
        #region Declare
        RefDecrementDL _refDecrementDL;
        ServiceResult _serviceResult;
        #endregion

        #region Constructor
        public RefDecrementBL(string connectionString, IMapper mapper)
        {
            _refDecrementDL = new RefDecrementDL(connectionString, mapper);
            _serviceResult = new ServiceResult();
        }
        #endregion

        #region Method
        /// <summary>
        /// Lấy danh sách ghi giảm
        /// </summary>
        /// <returns>danh sách ghi giảm</returns>
        /// Author: DVVUONG (10/03/2021)
        public ServiceResult GetRefDecrements()
        {
            var result = _refDecrementDL.GetRefDecrements();
            _serviceResult.Data = result;
            if (result != null)
            {
                _serviceResult.Messenger = Resources.Msg_GetAllSuccess;
                _serviceResult.HttpCode = HttpCodeResult.Success;
            }
            else
            {
                _serviceResult.Messenger = Resources.Msg_GetAllFail;
                _serviceResult.HttpCode = HttpCodeResult.Fail;
            }
            return _serviceResult;
        }

        /// <summary>
        /// Lấy ra một bản ghi giảm theo khóa chính
        /// </summary>
        /// <param name="entityId">khóa chính</param>
        /// <returns>một bản ghi</returns>
        /// CreatedBy: DVVUONG (10/03/2021)
        public ServiceResult GetRefDecrementById(Guid entityId)
        {
            var result = _refDecrementDL.GetRefDecrementById(entityId);
            _serviceResult.Data = result;
            if (result != null)
            {
                _serviceResult.Messenger = Resources.Msg_GetSuccess;
                _serviceResult.HttpCode = HttpCodeResult.Success;
            }
            else
            {
                _serviceResult.Messenger = Resources.Msg_GetFail;
                _serviceResult.HttpCode = HttpCodeResult.Fail;
            }
            return _serviceResult;
        }

        /// <summary>
        /// Xóa bản ghi ghi giảm
        /// </summary>
        /// <param name="entityId">khóa chính</param>
        /// <returns>số bản ghi bị xóa</returns>
        /// Author: DVVUONG (10/03/2021)
        public ServiceResult DeleteRefDecrement(Guid entityId)
        {
            var res = _refDecrementDL.DeleteRefDecrement(entityId);
            _serviceResult.Data = res;

            if (res == 1)
            {
                _serviceResult.HttpCode = HttpCodeResult.Success;
                _serviceResult.Messenger = Resources.Msg_DeleteSuccess;
            }
            else
            {
                _serviceResult.HttpCode = HttpCodeResult.Fail;
                _serviceResult.Messenger = Resources.Msg_DeleteFail;
            }
            return _serviceResult;
        }


        /// <summary>
        /// Thêm một bản ghi ghi giảm
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Số bản ghi thay đổi</returns>
        /// Author: DVVUONG(10/03/2021)
        public ServiceResult InsertRefDecrement(RefDecrement entity)
        {
            entity.EntityState = EntityState.Insert;
            var isValid = Validate(entity);

            if (isValid == true)
            {
                _serviceResult.Data = _refDecrementDL.InsertRefDecrement(entity);
                _serviceResult.HttpCode = HttpCodeResult.Success;
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
        public ServiceResult UpdateRefDecrement(RefDecrement entity)
        {
            entity.EntityState = EntityState.Update;
            var isValid = Validate(entity);
            if (isValid == true)
            {
                _serviceResult.Data = _refDecrementDL.UpdateRefDecrement(entity);
                _serviceResult.HttpCode = HttpCodeResult.Success;
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
        private bool Validate(RefDecrement entity)
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
                        _serviceResult.HttpCode = HttpCodeResult.Fail;
                        _serviceResult.Messenger = Resources.Msg_IsNotValid;
                    }
                }
                if (property.IsDefined(typeof(CheckDuplicate), false))
                {
                    // check trùng dữ liệu
                    var propertyName = property.Name;
                    var entityDuplicate = _refDecrementDL.GetEntityByProperty(entity, property);
                    if (entityDuplicate != null)
                    {
                        isValidate = false;
                        mesArr.Add(string.Format(Resources.Msg_Dulicate, displayName));
                        _serviceResult.HttpCode = HttpCodeResult.Fail;
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
                        _serviceResult.HttpCode = HttpCodeResult.Fail;
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
