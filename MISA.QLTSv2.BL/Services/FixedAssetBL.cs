using AutoMapper;
using MISA.QLTSv2.BL.Properties;
using MISA.QLTSv2.DL;
using MISA.QLTSv2.Model.Entities;
using MISA.QLTSv2.Model.Enums;
using System;
using System.Collections.Generic;

namespace MISA.QLTSv2.BL.Services
{
    public class FixedAssetBL
    {
        FixedAssetDL _fixedAssetDL;
        ServiceResult _serviceResult;
        #region contructor
        public FixedAssetBL(string connectionString, IMapper mapper)
        {
            _fixedAssetDL = new FixedAssetDL(connectionString, mapper);
            _serviceResult = new ServiceResult();

        }
        #endregion
        /// <summary>
        /// Lấy dánh sách tài sản
        /// </summary>
        /// <returns>Danh sách tài sản</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        public ServiceResult GetFixedAssets()
        {
            var res = _fixedAssetDL.GetFixedAssets();

            if (res != null)
            {
                _serviceResult.Data = res;
                _serviceResult.HttpCode = HttpCodeResult.Success;
                _serviceResult.Messenger = Resources.Msg_GetSuccess;
            }
            else
            {
                _serviceResult.Data = res;
                _serviceResult.HttpCode = HttpCodeResult.Fail;
                _serviceResult.Messenger = Resources.Msg_GetFail;
            }

            return _serviceResult;
        }
        /// <summary>
        /// Lấy ra một bản ghi theo ID
        /// </summary>
        /// <param name="entityId">ID</param>
        /// <returns>một bản ghi</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        public ServiceResult GetFixedAssetById(Guid entityId)
        {
            var res = _fixedAssetDL.GetFixedAssetById(entityId);

            if (res != null)
            {
                _serviceResult.Data = res;
                _serviceResult.HttpCode = HttpCodeResult.Success;
                _serviceResult.Messenger = Resources.Msg_GetSuccess;
            }
            else
            {
                _serviceResult.Data = res;
                _serviceResult.HttpCode = HttpCodeResult.Fail;
                _serviceResult.Messenger = Resources.Msg_GetFail;
            }

            return _serviceResult;
        }
        /// <summary>
        /// Xóa Một bản ghi
        /// </summary>
        /// <returns>Số bản ghi bị xóa</returns>
        /// CreatedBy:NVTUYEN(02/03/2021)
        public ServiceResult DeleteFixedAsset(Guid entityId)
        {
            var res = _fixedAssetDL.DeleteFixedAsset(entityId);

            if (res > 0)
            {
                _serviceResult.Data = res;
                _serviceResult.HttpCode = HttpCodeResult.Success;
                _serviceResult.Messenger = Resources.Msg_GetSuccess;
            }
            else
            {
                _serviceResult.Data = res;
                _serviceResult.HttpCode = HttpCodeResult.Fail;
                _serviceResult.Messenger = Resources.Msg_GetFail;
            }

            return _serviceResult;
        }
        /// <summary>
        /// Thêm một bản ghi
        /// </summary>
        /// <param name="entity"></param>
        /// <returns>Số bản ghi thay đổi</returns>
        /// createdBy:NVTUYEN(02/03/2021)
        public ServiceResult InsertFixedAsset(FixedAsset entity)
        {
            entity.EntityState = EntityState.Insert;
            var isValid = Validate(entity);

            if (isValid == true)
            {
                _serviceResult.Data = _fixedAssetDL.InsertFixedAsset(entity);
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
        /// CreatedBy:NVTUYEN(02/03/2021)
        public ServiceResult UpdateFixedAsset(FixedAsset entity)
        {
            entity.EntityState = EntityState.Update;
            var isValid = Validate(entity);
            if (isValid == true)
            {
                _serviceResult.Data = _fixedAssetDL.UpdateFixedAsset(entity);
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
        /// CreatedBy:NVTUYEN(20/30/2021)
        private bool Validate(FixedAsset entity)
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
                    var entityDuplicate = _fixedAssetDL.GetEntityByProperty(entity, property);
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

    }
}
