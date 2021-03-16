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
    public class RefDepreciationBL
    {
        RefDepreciationDL _refDepreciationDL;
        ServiceResult _serviceResult;

        #region Contrustor
        public RefDepreciationBL(string connectionString, IMapper mapper)
        {
            _refDepreciationDL = new RefDepreciationDL(connectionString, mapper);
            _serviceResult = new ServiceResult();
        }
        #endregion

        #region Method
        /// <summary>
        /// Hàm xử lý kết quả của việc xóa trả xuống từ DL
        /// </summary>
        /// <param name="entityId">id của đối tượng cần xóa</param>
        /// <returns>Service result gồm dữ liệu, mã kết quả, message thông báo</returns>
        /// CreatedBY: BQDUY(05/03/2021)
        public ServiceResult Delete(String entityId)
        {
            var res = _refDepreciationDL.Delete(entityId);

            if (res > 0)
            {
                _serviceResult.Data = res;
                _serviceResult.HttpCode = HttpCodeResult.Success;
                _serviceResult.Messenger = Resources.Msg_DeleteSuccess;
            }
            else
            {
                _serviceResult.Data = res;
                _serviceResult.HttpCode = HttpCodeResult.Fail;
                _serviceResult.Messenger = Resources.Msg_DeleteFail;
            }

            return _serviceResult;
        }

        /// <summary>
        /// Hàm xử lý kết quả của việc lấy dữ liệu trả xuống từ DL
        /// </summary>
        /// <returns></returns>
        public ServiceResult GetEntities()
        {
            var res = _refDepreciationDL.GetEntities();

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
        /// 
        /// </summary>
        /// <param name="entityId"></param>
        /// <returns></returns>
        public ServiceResult GetEntityById(Guid entityId)
        {
            var res = _refDepreciationDL.GetEntityById(entityId);

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

        public ServiceResult Insert(RefDepreciation entity)
        {

            entity.EntityState = EntityState.Insert;
            var isValid = Validate(entity);

            if (isValid == true)
            {
                _serviceResult.Data = _refDepreciationDL.Insert(entity);
                _serviceResult.HttpCode = HttpCodeResult.Success;
                _serviceResult.Messenger = Resources.Msg_AddSuccess;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }
        }

        private bool Validate(RefDepreciation entity)
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
                    var entityDuplicate = _refDepreciationDL.GetEntityByProperty(entity, property);
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

        public ServiceResult Update(RefDepreciation entity)
        {
            entity.EntityState = EntityState.Update;
            var isValid = Validate(entity);
            if (isValid == true)
            {
                _serviceResult.Data = _refDepreciationDL.Update(entity);
                _serviceResult.HttpCode = HttpCodeResult.Success;
                _serviceResult.Messenger = Resources.Msg_UpdateSuccess;
                return _serviceResult;
            }
            else
            {
                return _serviceResult;
            }
        }

        #endregion
    }
}
