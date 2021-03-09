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
                        _serviceResult.MISACode = MISACode.NotValid;
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
