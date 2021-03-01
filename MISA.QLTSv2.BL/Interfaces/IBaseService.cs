using MISA.QLTSv2.BL.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Interfaces
{
    /// <summary>
    /// Interface giao tiếp giữa tầng Web và BL
    /// </summary>
    /// <typeparam name="TEntity">Object Generic</typeparam>
    /// Author: DVVUONG (01/03/2021)
    public interface IBaseService<TEntity>
    {
        #region Method
        /// <summary>
        /// lấy toàn bộ danh sách 
        /// </summary>
        /// <returns>danh sách đối tượng</returns>
        /// Author: DVVUONG (01/03/2021)
        IEnumerable<TEntity> GetEntities();

        /// <summary>
        /// lấy đối tượng theo khóa chính
        /// </summary>
        /// <param name="entityId">khóa chính bản ghi cần lấy</param>
        /// <returns>bản ghi có khóa chính thỏa mãn</returns>
        /// Author: DVVUONG (01/03/2021)
        TEntity GetEntityById(Guid entityId);

        /// <summary>
        /// Thực hiện thêm mới bản ghi
        /// </summary>
        /// <param name="entity">object cần thêm mới</param>
        /// <returns>Object chứa kết quả thêm mới</returns>
        /// Author: DVVUONG (01/03/2021)
        ServiceResult Add(TEntity entity);

        /// <summary>
        /// Chỉnh sửa thông tin bản ghi theo khóa chính
        /// </summary>
        /// <param name="entity">object</param>
        /// <returns>Object chứa kết quả chỉnh sửa</returns>
        /// Author: DVVUONG (01/03/2021)
        ServiceResult Update(TEntity entity);

        /// <summary>
        /// Thực hiện xóa bản ghi theo khóa chính
        /// </summary>
        /// <param name="entityId">khóa chính bản ghi cần xóa</param>
        /// <returns>Object chứa kết quả việc xóa</returns>
        /// Author: DVVUONG (01/03/2021)
        ServiceResult Delete(Guid entityId);
        #endregion
    }
}
