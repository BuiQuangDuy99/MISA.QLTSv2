using System;
using System.Collections.Generic;
using System.Text;

namespace MISA.QLTSv2.BL.Interfaces
{
    /// <summary>
    /// Interface giao tiếp với database
    /// </summary>
    /// <typeparam name="TEntity">Kiểu đối tượng cần xử lý</typeparam>
    /// CreatedBy: BQDUY(01/03/2021)
    public interface IBaseRepository<TEntity>
    {
        /// <summary>
        /// Hàm lấy toàn bộ danh sách
        /// </summary>
        /// <returns>Danh sách dữ liệu lấy được</returns>
        /// CreatedBy: BQDUY(01/03/2021)
        IEnumerable<TEntity> GetEntities();

        /// <summary>
        /// Lấy dữ liệu theo Id
        /// </summary>
        /// <param name="entityId">Id của đối tượng</param>
        /// <returns>Đối tượng lấy được</returns>
        /// CreatedBy: BQDUY(01/03/2021)
        TEntity GetEntityById(Guid entityId);

        /// <summary>
        /// Hàm thêm mới dữ liệu đối tượng
        /// </summary>
        /// <param name="entity">Đối tượng thêm mới</param>
        /// <returns>Số bản ghi thực hiện được</returns>
        /// CreatedBy: BQDUY(01/03/2021)
        int Insert(TEntity entity);

        /// <summary>
        /// Hàm sửa dữ liệu đối tượng
        /// </summary>
        /// <param name="entity">Đối tượng chỉnh sửa</param>
        /// <returns>Số bản ghi thực hiện được</returns>
        /// CreatedBy: BQDUY(01/03/2021)
        int Update(TEntity entity);

        /// <summary>
        /// Xóa dữ liệu đối tượng theo Id
        /// </summary>
        /// <param name="entityId">Id của đối tượng cần xóa</param>
        /// <returns>Số bản ghi thực hiện được</returns>
        /// CreatedBy: BQDUY(01/03/2021)
        int Delete(Guid entityId);
    }
}
